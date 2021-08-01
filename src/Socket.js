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
      socket.emit("ela.system.SUBSCRIBE", "ela.system")
    })
    socket.on("disconnect", () => {
      console.log("disconnected")
    })
    socket.on("connect_error", (response) => {
      console.log(response)
    })
  }, [socket])
  return children({ elaStatus, handleCheckStatus })
}
export default Socket
