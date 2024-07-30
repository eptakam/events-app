import { Fragment, useContext } from "react";
import MainHeader from "./main-header";
import Notification from "../ui/notification";
import NotificationContext from "../../store/notification-context";

export default function Layout(props) {
  // consommer le contexte des notifications
  const notificationCtx = useContext(NotificationContext);

  // extraire les donnees du contexte
  const activeNotification = notificationCtx.notification;

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {/* s'assurer que activeNotification n'est pas null avant d'afficher la notification */}
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  );
}
