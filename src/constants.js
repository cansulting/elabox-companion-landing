export const SYSTEM_STATUS_CHANGED = "ela.broadcast.SYSTEM_STATUS_CHANGED"  // action broadcast when system status was changed
export const SYSTEM_SHUTDOWN_STATUS = "ela.system.APP_CHECK_SHUTDOWN_STATUS"  // action rpc use to check restart status
export const SYSTEM_DISK_CHECK= "ela.system.APP_DISK_CHECK"  // action rpc use to check disk
export const SYSTEM_PKID = "ela.system"
export const SETUP_PKID = "ela.setup"
export const SETUP_CHECK_STATUS = "setup.actions.CHECK_STATUS"              // action rpc use to check setup status


// action states
export const UPDATING = "updating"

// shutdown states
export const NOT_PROPERLY_SHUTDOWN = "not_properly_shutdown"
export const PROPERLY_SHUTDOWN = "properly_shutdown"
// disk states
export const DISK_CHECKING = "checking_disk"
export const DISK_CHECKED = "disk_checked"
export const DISK_CHECKING_ERROR = "disk_checking_error"