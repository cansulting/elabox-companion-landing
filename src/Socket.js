import { useEffect } from "react"
import io from "socket.io-client"
const PUBLIC_URI = window.location.hostname + ":9000"
window.socket = io(PUBLIC_URI, { transports: ["websocket"] })

function Socket({ children }) {
  const socket = window.socket
  useEffect(() => {
    if (!socket) return
    socket.on("connect", () => {
      console.log("connected")
      socket.emit("ela.system.SUBSCRIBE", {
        id: "ela.broadcast.SYSTEM_STATUS_CHANGE",
      })
    })
    socket.on("disconnect", () => {
      console.log("disconnected")
    })
    socket.on("connect_error", (response) => {
      console.log(response)
    })
    socket.on("error", (response) => {
      console.log(response)
    })
    socket.onopen = function (e) {
      alert("[open] Connection established")
      alert("Sending to server")
      // socket.send("My name is John")
    }
  }, [socket])
  return children
}
export default Socket
