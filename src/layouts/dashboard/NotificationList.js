import {Box, Divider, List, ListSubheader, Tooltip, Typography} from "@material-ui/core";
import {MIconButton} from "../../components/@material-extend";
import {Icon} from "@iconify/react";
import doneAllFill from "@iconify/icons-eva/done-all-fill";
import Scrollbar from "../../components/Scrollbar";
import NotificationItem from "./NotificationItem";
import {isEmpty} from "lodash";
import {useDispatch} from "../../redux/store";
import {setNotificationsAsRead} from "../../redux/slices/notifications";

export default function NotificationList({unReadNotifications, readNotifications, totalUnRead,onClose}) {
    const hasUnRead = totalUnRead > 0;

    const dispatch = useDispatch();

    const handleMarkAllAsRead = () => {
        dispatch(setNotificationsAsRead({
            notificationIds: [...unReadNotifications.map(one => one.id)],
        }))
    };

    const handleCloseSignal = () => {
      onClose && onClose()
    }
    return (
        <>
            <Box sx={{display: 'flex', alignItems: 'center', py: 2, px: 2.5}}>
                <Box sx={{flexGrow: 1}}>
                    <Typography color="inherit" variant="subtitle1">Notifications</Typography>
                    {
                        hasUnRead && (
                            <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                Vous avez {totalUnRead} messages non {`lu${totalUnRead > 1 ? 's' : ''}`}
                            </Typography>
                        )
                    }
                </Box>

                {
                    hasUnRead && (
                        <Tooltip title=" Marquer tout comme lu">
                            <MIconButton color="primary" onClick={handleMarkAllAsRead}>
                                <Icon icon={doneAllFill} width={20} height={20}/>
                            </MIconButton>
                        </Tooltip>
                    )
                }
            </Box>

            <Divider/>

            <Scrollbar sx={{height: {xs: 340, sm: 'auto'}}}>
                {
                    !isEmpty(unReadNotifications) && (
                        <List
                            disablePadding
                            subheader={
                                <ListSubheader
                                    disableSticky
                                    sx={{py: 1, px: 2.5, typography: 'overline'}}
                                >
                                    Nouveau
                                </ListSubheader>
                            }
                        >
                            {unReadNotifications.map((notification) => (
                                <NotificationItem
                                    key={notification.id}
                                    notification={notification}
                                />
                            ))}
                        </List>
                    )
                }


                {
                    !isEmpty(readNotifications) && (
                        <List
                            disablePadding
                            subheader={
                                <ListSubheader
                                    disableSticky
                                    sx={{py: 1, px: 2.5, typography: 'overline'}}
                                >
                                    Déja consulté
                                </ListSubheader>
                            }
                        >
                            {
                                readNotifications.map((notification) => (
                                    <NotificationItem
                                        key={notification.id}
                                        notification={notification}
                                        onClose={handleCloseSignal}
                                    />
                                ))
                            }
                        </List>
                    )
                }

            </Scrollbar>

        </>
    )
}
