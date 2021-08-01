import Landing from "./components/landing"
import "./App.css"

function App({ elaStatus, handleCheckStatus }) {
  return (
    <div className="App">
      <Landing elaStatus={elaStatus} handleCheckStatus={handleCheckStatus} />
    </div>
  )
}

export default App
