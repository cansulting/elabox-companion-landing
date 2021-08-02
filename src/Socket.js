import { useEffect, useState } from "react"
import io from "socket.io-client"
const PUBLIC_URI = window.location.hostname + ":9000"
window.socket = io(PUBLIC_URI, { transports: ["websocket"] })
function Socket({ children }) {
  const [elaStatus, setElaStatus] = useState("")
  const socket = window.socket
  const handleCheckStatus = () => {
    socket.emit("elastatus", (currentStatus) => {
      setElaStatus(currentStatus)
    })
  }
  useEffect(() => {
    if (!socket) return
    socket.on("connect", () => {
      console.log("connected")
      handleCheckStatus()
      socket.emit(
        "ela.system",
        { id: "ela.system.SUBSCRIBE", data: "ela.system" },
        (response) => {
          console.log(response)
        }
      )
      socket.on("ela.broadcast.SYSTEM_STATUS_CHANGED", (data) => {
        console.log("Response from ela.system " + data)
      })
    })
    socket.on("disconnect", () => {
      console.log("disconnected")
    })
    socket.on("connect_error", (response) => {
      console.log("ERRR " + response)
    })
    //eslint-disable-next-line
  }, [socket])
  return children({ elaStatus, handleCheckStatus })
}
export default Socket
