import {Dialog, DialogContent} from "@material-ui/core";
import NotificationList from "./NotificationList";

export default function NotificationModal({show, onClose,unReadNotifications,readNotifications,totalUnRead}) {
    const handleClose = () => onClose && onClose();

    return (
        <Dialog open={show} onClose={handleClose} fullWidth maxWidth={"md"}>

           <DialogContent>
               <NotificationList
                   readNotifications={readNotifications}
                   unReadNotifications={unReadNotifications}
                   totalUnRead={totalUnRead}
                   onClose={handleClose}
               />
           </DialogContent>

        </Dialog>
    )
}
