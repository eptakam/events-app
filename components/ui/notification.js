import { useContext } from 'react';

import classes from '../../styles/ui/notification.module.css';
import NotificationContext from '../../store/notification-context';

function Notification(props) {
  // on utilise le contexte pour pouvoir fermer/caher la notification
  const notificationCtx = useContext(NotificationContext);

  const { title, message, status } = props;

  let statusClasses = '';

  if (status === 'success') {
    statusClasses = classes.success;
  }

  if (status === 'error') {
    statusClasses = classes.error;
  }

  if (status === 'pending') {
    statusClasses = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    // faire un click sur la notification pour la fermer(cacher)
    <div className={activeClasses} onClick={notificationCtx.hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
