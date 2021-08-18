import { useEffect, useState } from "react"
import io from "socket.io-client"
const PUBLIC_URI = window.location.hostname + ":9000"
export const socket = io(PUBLIC_URI, { transports: ["websocket"] })

socket.on("connect", () => {
  console.log("connected")
  // subscribe to ela system
  socket.emit(
    "ela.system",
    { id: "ela.system.SUBSCRIBE" },
    (response) => {
      console.log(response)
    }
  )
})
socket.on("disconnect", () => {
  console.log("disconnected")
})
socket.on("connect_error", (response) => {
  console.log("ERRR " + response)
})

function Socket({ children }) {
  const [elaStatus, setElaStatus] = useState("")
  const handleCheckStatus = () => {
    socket.emit("elastatus", (currentStatus) => {
      setElaStatus(currentStatus)
    })
  }
  useEffect(() => {
    if (!socket) return
    handleCheckStatus()
    socket.on("ela.broadcast.SYSTEM_STATUS_CHANGED", (data) => {
      if (typeof(data) === 'string') {
        data = JSON.parse(data)
      }
      console.log("Response from ela.system " + data)
      setElaStatus(data.status)
    })
    
    //eslint-disable-next-line
  }, [socket])
  return children({ elaStatus, handleCheckStatus })
}
export default Socket
