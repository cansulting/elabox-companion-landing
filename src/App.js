import React  from "react"
import Logger from "./components/installView"
import "./App.css"
import { EboxEvent } from 'elabox-foundation'
import { SETUP_CHECK_STATUS, SETUP_PKID } from "./constants"

const elaEvent = new EboxEvent('http://' + window.location.hostname)

// statuses
const ACTIVE = "active"   // flag is sytem is ready   
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
    //console.log("checksetup", res)
    return res
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
        if (res.code === SUCCESS_CODE && res.message === SETUP) {
          window.location.href = "/ela.companion"
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
