import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-circle-fill';
import { 
    Card,
    Stack,
    Drawer,
    IconButton
 } from '@material-ui/core';
import Scrollbar from './Scrollbar';

export default function DrawerContainer({open, onClose, children, sx, md= 800}) {
    return (
        <Drawer open={open} onClose={onClose} anchor="right" PaperProps={{ sx: { width: { xs: 1, sm: 480, md:md }, bgcolor: 'transparent', p:0.5} }}>
            <Stack direction="row" justifyContent="flex-end" >
                <IconButton onClick={onClose} size="medium" color="primary">
                    <Icon icon={closeFill} width={40} height={40} />
                </IconButton>
            </Stack>
                <Card sx={{ p: 1, height:"90vh", ...sx }}>
                    <Scrollbar>
                        {children}
                    </Scrollbar>
                </Card>
        </Drawer>
    )
}
