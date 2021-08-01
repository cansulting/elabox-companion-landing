import React, { useEffect, useState, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons"
import Logo from "../../static/images/logo.png"
import styles from "../../static/css/landing.module.css"
export default function Index({ elaStatus, handleCheckStatus }) {
  const [installerLogs, setInstallerLogs] = useState("")
  const [isUpdateAlreadyRan, setIsUpdateAlreadyRan] = useState(false)
  const installerLogsRef = useRef()
  const socket = window.socket
  const showInstallerLogs = installerLogs?.length > 0
  useEffect(() => {
    if (installerLogsRef.current) {
      installerLogsRef.current.scrollIntoView()
    }
  }, [installerLogs])
  useEffect(() => {
    if (!socket) {
      return
    }
    socket.on("log", (response) => {
      setInstallerLogs((prevLogs) => prevLogs + response)
      if (elaStatus !== "updating") {
        handleCheckStatus()
      }
      if (isUpdateAlreadyRan !== true) {
        setIsUpdateAlreadyRan(true)
      }
    })
    //eslint-disable-next-line
  }, [])
  useEffect(() => {
    if (elaStatus === "active" && isUpdateAlreadyRan) {
      window.location.replace("http://192.168.18.70:3000")
    }
  }, [elaStatus, isUpdateAlreadyRan])
  return (
    <div className={styles.container}>
      <img src={Logo} alt="elabox logo" />
      <FontAwesomeIcon
        className={styles.spinner}
        icon={faCircleNotch}
        spin
        size={"4x"}
      />
      <p className={styles.message}>
        {elaStatus === "updating" && showInstallerLogs
          ? "Updating"
          : "Please Wait"}
      </p>
      {showInstallerLogs && (
        <p className={styles.logs} ref={installerLogsRef}>
          {installerLogs}
          <AlwaysScrollToBottom />
        </p>
      )}
    </div>
  )
}
const AlwaysScrollToBottom = () => {
  const elementRef = useRef()
  useEffect(() => elementRef.current.scrollIntoView())
  return <span ref={elementRef} />
}
