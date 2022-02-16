import { isEmpty } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import useAuth from './useAuth';
import { gfDate } from '../utils/formatTime';
import { useDispatch } from '../redux/store';
import { getAllNotification, setNotificationsAsRead } from '../redux/slices/notifications';
import {  useNavigate } from 'react-router-dom';
import { NOTIFICATION_TYPES } from '../constant';
import { PATH_DASHBOARD, PATH_PAGE } from '../routes/paths';
import { DateTime } from 'luxon';


const getResult = (getList, id) => {
  const preResult = isEmpty(getList) ? [] : getList;
  return preResult.map(one => {
    return {
      ...one,
      rawCreatedAt: one?.createdAt,
      createdAt: gfDate(one?.createdAt),
      isUnRead: one.isUnRead ? one?.isUnRead[id] : true
    };
  });
};

const dataF = DateTime.now().minus({ days: 7 }).toJSDate();

export default function useNotifications() {
  const { user: { id } } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [loading, setLoading] = useState(false);

  const getNotifications = useSelector((state) => state.firestore.ordered.notifications);
  const getBroadcasts = useSelector((state) => state.firestore.ordered.broadcasts);

  const notifications = useMemo(() => getResult(getNotifications, id), [getNotifications, id]);
  const broadcasts = useMemo(() => getResult(getBroadcasts, id), [getBroadcasts, id]);

  const combine = useMemo(() => [...notifications, ...broadcasts], [notifications, broadcasts]);

  const executeNotification = (notification) => {
    const { isUnRead, type, action, id } = notification;

    console.log(notification)

    switch (type) {

      case NOTIFICATION_TYPES.CALL_REQUEST:
        navigate(PATH_DASHBOARD.admin.callRequest);
        break;

      case NOTIFICATION_TYPES.ESTATE_STATE_CHANGE:
        action?.id && navigate(PATH_PAGE.detail?.replace(':id', action?.id));
        break;

      default:
        console.error(`Type "${type}" for the notification with id "${id}" not recognized!`);
    }

    isUnRead && dispatch(setNotificationsAsRead({
      notificationIds: [notification.id]
    }));
  };

  useFirestoreConnect(() => [
    {
      collection: 'notifications',
      where: [['canAccess', 'array-contains', id], ['createdAt', '>=', dataF]],
      orderBy: ['createdAt', 'desc'],
      storeAs: 'notifications'
    },
    {
      collection: 'notifications',
      where: [['isBroadcast', '==', true], ['createdAt', '>=', dataF]],
      orderBy: ['createdAt', 'desc'],
      limit: 30,
      storeAs: 'broadcasts'
    }
  ]);

  useEffect(() => {
    const state = isLoaded(getNotifications) && isLoaded(getBroadcasts);

    setLoading(state);

    state && dispatch(getAllNotification([...getNotifications, ...getBroadcasts]));

  }, [getNotifications, getBroadcasts, combine, dispatch]);


  return { loading, notifications, broadcasts, combine, executeNotification };
}
