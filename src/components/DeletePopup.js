import { 
    Stack, 
    Alert, 
    Button, 
    CircularProgress 
} from '@material-ui/core';
import PropTypes from 'prop-types';
import MenuPopover from './MenuPopover';
import NotistackProvider from './NotistackProvider';


DeletePopup.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    pending: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
};

export default function DeletePopup({open, onClose, onDelete, pending, anchorRef, text}) {
    return (
    <MenuPopover sx={{width: 500}} open={open} onClose={onClose} anchorEl={anchorRef.current}>
        <NotistackProvider>
            <Alert severity="error" > 
               {`Vous êtes sur le point de supprimer ${text}, Continuer ?`}
            </Alert>
        </NotistackProvider>
        <Stack direction="row" spacing={3} sx={{p:1, float:'right'}}>
                <Button color="info" disabled={pending} onClick={onClose}> Non, annuler</Button>
                <Button color="error" disabled={pending} onClick={onDelete} >
                    {pending ? <CircularProgress color="primary" size={20} /> : ' Oui, supprimer'}
                </Button>
        </Stack>
    </MenuPopover>
    )
}
