import React  from "react"
import Logger from "./components/installView"
import "./App.css"
import { EboxEvent } from 'elabox-foundation'
import { SETUP_CHECK_STATUS, SETUP_PKID,SYSTEM_SHUTDOWN_STATUS,SYSTEM_DISK_CHECK,DISK_CHECKED,DISK_CHECKING,DISK_CHECKING_ERROR,PROPERLY_SHUTDOWN, NOT_PROPERLY_SHUTDOWN } from "./constants"

const elaEvent = new EboxEvent('http://' + window.location.hostname)
// statuses
const ACTIVE = "active"   // flag for sytem if ready   
const SETUP = "setup"     // flag for already setup
const SUCCESS_CODE = 200
const SETUP_URL = "ela.setup"

class App extends React.Component {
  state = { status: "unknown"}
  constructor(props) {
    super(props)
  }
  async checkSetup() {
    const res = await elaEvent.sendRPC(SETUP_PKID, SETUP_CHECK_STATUS)
    console.log(res)
    //console.log("checksetup", res)
    return res
  }
  async checkShutdownStatus() {
    const res = await elaEvent.sendSystemRPC(SYSTEM_SHUTDOWN_STATUS)
    return res
  }
  async diskCheck(){
    const res = await elaEvent.sendSystemRPC(SYSTEM_DISK_CHECK)
    return res
  }
  //listen on state change react class component
  componentDidUpdate(_, prevState) {
    if(prevState.status !== this.state.status){
        switch (this.state.status) {
          case DISK_CHECKED:
          case PROPERLY_SHUTDOWN:
            window.location.href = "/ela.companion"            
            break;       
          default:
            break;
        }
    }
  }

  async componentDidMount() {
    await elaEvent.waitUntilConnected()
      elaEvent.getStatus(
        (status) => this.onChangedSysStatus(status),
        true,
    )
  }
  // onchanged status check whether it needed setup or not.
  // redirect to setup if it not yet
  onChangedSysStatus(status) {
    if (status === ACTIVE) {
      this.checkSetup().then( res => {
        if (res.code === SUCCESS_CODE && res.message === SETUP)  {
            this.checkShutdownStatus().then( res => {
              if(res.code === SUCCESS_CODE) {
                switch (res.message) {
                  case NOT_PROPERLY_SHUTDOWN:
                    this.setState({status: DISK_CHECKING},()=>{
                      this.diskCheck().then( res => {
                        if(res.code === SUCCESS_CODE) {
                          if(res.message){
                            this.setState({status: DISK_CHECKED})
                            return
                          }
                            this.setState({status: DISK_CHECKING_ERROR})                  
                        }
                      })
                    })                    
                    break;
                    default:
                      this.setState({status:res.message})              
                    break; 
                }        
             }
            })          
          return
        }
        window.location.href = "/" + SETUP_URL
      })
    }
    this.setState({status: status})
    console.log("System status", status)
  }
  render() {
    return (
        <div className="App">
          <Logger elaStatus={this.state.status} socket={elaEvent}/>
        </div>
    )
  }
}

export default App
