import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons"
import Logo from "../../static/images/logo.png"
import styles from "../../static/css/landing.module.css"
export default function Index() {
  const [status, setStatus] = useState("")
  const socket = window.socket
  useEffect(() => {
    // socket.emit("ela.system", {
    //   id: "ela.action.SYSTEM_INSTALL",
    //   data: "/var/tmp/1.box",
    // })
    socket.on("logs", (response) => {
      console.log(response)
    })
  }, [])
  const handleCheckStatus = (e) => {
    socket.emit("elastatus", (response) => {
      console.log(response)
      setStatus(response)
    })
  }
  return (
    <div className={styles.container}>
      <img src={Logo} alt="elabox logo" />
      <FontAwesomeIcon
        className={styles.spinner}
        icon={faCircleNotch}
        spin
        size={"4x"}
      />
      <p className={styles.message}>Please Wait</p>
      <button onClick={handleCheckStatus}>Check Status</button>
    </div>
  )
}
