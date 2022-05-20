import { useEffect, useState } from "react"
import io from "socket.io-client"
const PUBLIC_URI = window.location.hostname
let onStatusChanged;
let status = "";
export const socket = io(PUBLIC_URI, { transports: ["websocket"] })

socket.on("connect", () => {
  console.log("connected")
  socket.emit("elastatus", (currentStatus) => {
    console.log("elastatus ", currentStatus)
    status = currentStatus
    if (onStatusChanged)
      onStatusChanged(currentStatus)
  })
  // subscribe to ela system
  socket.emit(
    "ela.system",
    { id: "ela.system.SUBSCRIBE" },
    (response) => {
      console.log(response)
    }
  )
  socket.on("ela.broadcast.SYSTEM_STATUS_CHANGED", (data) => {
    if (typeof(data) === 'string') {
      data = JSON.parse(data)
    }
    console.log("Response from ela.system " + data)
    status = data.status
    if (onStatusChanged)
      onStatusChanged(status)
  })
})
socket.on("disconnect", () => {
  console.log("disconnected")
})
socket.on("connect_error", (response) => {
  console.log("ERRR " + response)
})

function Socket({ children }) {
  const [elaStatus, setElaStatus] = useState(status)
  const handleCheckStatus = () => {
    socket.emit("elastatus", (currentStatus) => {
      console.log("elastatus ", currentStatus)
      if (elaStatus !== currentStatus)
        setElaStatus(currentStatus)
    })
  }

  useEffect(() => {
    handleCheckStatus()
    onStatusChanged = (_status) => {
      if (elaStatus !== _status)
        setElaStatus(_status)
    }
    //eslint-disable-next-line
  }, [socket])
  
  
  return children({ elaStatus, handleCheckStatus })
}
export default Socket
