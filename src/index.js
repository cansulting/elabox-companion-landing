import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import Socket from "./Socket"
import App from "./App"

ReactDOM.render(
  <React.StrictMode>
    <Socket>
      {(parent) => (
        <App
          elaStatus={parent.elaStatus}
          handleCheckStatus={parent.handleCheckStatus}
        />
      )}
    </Socket>
  </React.StrictMode>,
  document.getElementById("root")
)
