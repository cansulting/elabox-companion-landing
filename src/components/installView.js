import React, { useEffect, useState, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons"
import Logo from "../static/images/logo.png"
import styles from "../static/css/landing.module.css"
import { DISK_CHECKING} from "../constants"
import { elaStatusMessage } from "../utils/messages"

// displays the log information for current install
export default function Index({ elaStatus, socket }) {
  console.log(elaStatus)
  const [installerLogs, setInstallerLogs] = useState("")
  const [showLogs, setShowLogs] = useState(false)
  const installerLogsRef = useRef()
  const hasLogs = installerLogs?.length > 0 && elaStatus !== DISK_CHECKING
  let statusMessage = elaStatusMessage(elaStatus)
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
    })
  }, [socket])

  return (
    <div className={styles.container}>
      <img src={Logo} alt="elabox logo" style={{width:"200px", padding:"20px"}}/>
      <FontAwesomeIcon
        className={styles.spinner}
        icon={faCircleNotch}
        spin
        size={"2x"}
      />
      <p className={styles.message}>
        {statusMessage}
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

