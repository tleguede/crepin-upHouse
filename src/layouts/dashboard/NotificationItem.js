import { Avatar, Box, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import  HTMLParser from 'html-react-parser';
import { Icon } from '@iconify/react';
import { fr as LocalFr } from 'date-fns/locale';
import clockFill from '@iconify/icons-eva/clock-fill';
import { formatDistanceToNow } from 'date-fns';
import { getNotificationIcon } from 'src/constant';
import useNotifications from '../../hooks/useNotifications';
import { gDate } from 'src/utils/formatTime';

function renderContent(notification) {
  const icon = getNotificationIcon(notification.type);

  return {
    avatar: (
      <img
        alt={notification.title}
        src={icon}
        height="80%"
        width="80%"
      />
    ),
    title: (
      <Typography color="inherit" variant='subtitle2'>
        {notification.title}
        <Typography
          component='span'
          variant='body2'
          sx={{ color: 'text.secondary' }}>
          &nbsp; {HTMLParser(notification.description)}
        </Typography>
      </Typography>
    )
  };

}

NotificationItem.propTypes = {
  notification: PropTypes.object.isRequired
};

export default function NotificationItem({ notification, onClose }) {
  const { avatar, title } = renderContent(notification);

  const { executeNotification } = useNotifications();

  const handleClick = () => {
    onClose && onClose();
    executeNotification(notification);
  };

  return (
    <ListItem
      button
      disableGutters
      key={notification.id}
      onClick={handleClick}
      sx={{
        py: 1.5,
        px: 2.5,
        '&:not(:last-of-type)': { mb: '1px' },
        ...(notification.isUnRead && {
          bgcolor: 'action.selected'
        })
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primaryTypographyProps={{ color:"inherit" }}
        primary={title}
        secondary={
          <Typography        
            variant='caption'
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled'
            }}
          >
            <Box
              component={Icon}
              icon={clockFill}
              sx={{ mr: 0.5, width: 16, height: 16 }}
            />
            {formatDistanceToNow(gDate(notification.rawCreatedAt) || new Date(), {
                addSuffix: true,
                locale: LocalFr
            })}
          </Typography>
        }
      />
    </ListItem>
  );
}
