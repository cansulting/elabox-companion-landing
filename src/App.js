import Logger from "./components/installView"
import "./App.css"

function App({ elaStatus, handleCheckStatus }) {
  return (
    <div className="App">
      <Logger elaStatus={elaStatus} handleCheckStatus={handleCheckStatus} />
    </div>
  )
}

export default App
