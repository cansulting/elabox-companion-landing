import { DISK_CHECKING, DISK_CHECKING_ERROR,UPDATING } from "../constants";
export const elaStatusMessage = (elaStatus) => {
  switch(elaStatus){
    case DISK_CHECKING:
      return "Checking Disk"
    case DISK_CHECKING_ERROR:
      return "Disk Checking Error"
    case "updating":
      return UPDATING;
    default:
      return "Please Wait"
  }
}