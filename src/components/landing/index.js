import React, { useEffect, useState, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons"
import { socket } from "../../Socket"
import Logo from "../../static/images/logo.png"
import styles from "../../static/css/landing.module.css"
export default function Index({ elaStatus, handleCheckStatus }) {
  const [installerLogs, setInstallerLogs] = useState("")
  const [showLogs, setShowLogs] = useState(false)
  const installerLogsRef = useRef()
  const hasLogs = installerLogs?.length > 0
  const handleShowInstallerLogs = () => {
    setShowLogs(!showLogs)
  }
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
      setInstallerLogs((prevLogs) => prevLogs + response + "\n")
      if (elaStatus !== "updating") {
        handleCheckStatus()
      }
    })
    //eslint-disable-next-line
  }, [socket])
  useEffect(() => {
    if (elaStatus === "active") {
      window.location.href = "/ela.companion"
    }
  }, [elaStatus])
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
        {elaStatus === "updating" ? "Updating" : "Please Wait"}
      </p>
      {hasLogs && (
        <button
          className={styles.btnShowLogs}
          onClick={handleShowInstallerLogs}
        >
          {showLogs ? "Hide" : "Show"} Logs
        </button>
      )}

      {showLogs && (
        <div className={styles.logs} ref={installerLogsRef}>
          {installerLogs.split("\n").map((log, key) => (
            <p className={styles.log} key={key}>
              {log}
            </p>
          ))}
          <AlwaysScrollToBottom />
        </div>
      )}
    </div>
  )
}
const AlwaysScrollToBottom = () => {
  const elementRef = useRef()
  useEffect(() => elementRef.current.scrollIntoView())
  return <span ref={elementRef} />
}
