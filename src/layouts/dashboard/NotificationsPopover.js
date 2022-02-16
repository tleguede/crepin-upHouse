import {useRef, useState} from 'react';
import {Icon} from '@iconify/react';
import bellFill from '@iconify/icons-eva/bell-fill';
// material
import {
    Box,
    Badge,
    Button,
    Divider,
} from '@material-ui/core';
// components
import MenuPopover from '../../components/MenuPopover';
import {MIconButton} from '../../components/@material-extend';
import useNotifications from 'src/hooks/useNotifications';
import NotificationList from "./NotificationList";
import useToggle from "../../hooks/useToggle";
import NotificationModal from "./NotificationModal";

// ----------------------------------------------------------------------

const getLimit = (total, idealLLimit) => {
    return (idealLLimit > total) ?total: idealLLimit
}
const getMiniList = (list, limit) => {
    return list.slice(0, getLimit(list.length, limit))
}
export default function NotificationsPopover({hasTitle}) {
    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const {open: show, handleClose, handleOpen} = useToggle();
    const {combine:notifications} = useNotifications()

    const totalUnRead = notifications
        .filter((item) => item.isUnRead === true)
        .length;

    const unReadNotifications = notifications.filter(item => item.isUnRead === true);
    const readNotifications = notifications.filter(item => item.isUnRead === false);

    const miniListUnReadNotifications = getMiniList(unReadNotifications, 3)
    const miniListReadNotifications = getMiniList(readNotifications, 5-miniListUnReadNotifications.length);

    const handleModalOpening = () => {
        setOpen(false)
        handleOpen()
    }

    return (
        <>
            <MIconButton
                ref={anchorRef}
                onClick={() => setOpen(true)}
                // color={!hasTitle ? 'inherit' : 'default'}
                color='inherit'
            >
                <Badge badgeContent={totalUnRead} color="error">
                    <Icon color="#BABABC" icon={bellFill} width={20} height={20}/>
                </Badge>
            </MIconButton>

            <MenuPopover
                open={open}
                onClose={() => setOpen(false)}
                anchorEl={anchorRef.current}
                sx={{width: 360}}
            >
                <NotificationList
                    readNotifications={miniListReadNotifications}
                    unReadNotifications={miniListUnReadNotifications}
                    totalUnRead={totalUnRead}
                />

                <Divider/>

                <Box sx={{p: 1}}>
                    <Button fullWidth disableRipple onClick={handleModalOpening}>
                        Tout voir
                    </Button>
                </Box>
            </MenuPopover>

            <NotificationModal
                show={show}
                onClose={handleClose}
                readNotifications={readNotifications}
                unReadNotifications={unReadNotifications}
                totalUnRead={totalUnRead}
            />

        </>
    );
}
