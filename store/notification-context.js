/*
    le but est de creer un nouveau contexte qui permettra le management des notifications dans l'application.

    En React (et donc en Next.js, qui est basé sur React), un contexte est un moyen de partager des données entre plusieurs composants sans avoir à passer explicitement des props à travers chaque niveau de l'arborescence des composants. Le contexte est particulièrement utile pour les données globales telles que les thèmes, les préférences utilisateur, ou, comme dans notre cas, les notifications.

    1. Création du contexte : Utilisez createContext pour créer un contexte. Cela crée un objet avec un Provider et un Consumer.

    2. Fournir le contexte : Utilisez le Provider pour encapsuler les composants qui doivent avoir accès aux données du contexte. Le Provider accepte une prop value qui sera accessible par tous les composants descendants.
    Ceci sera fait au niveau de _app.js

    3. Consommer le contexte : Utilisez le Consumer ou le hook useContext pour accéder aux données du contexte dans les composants descendants.

    4. Cacher les notifications automatiquement : Pour cacher les notifications automatiquement après un certain temps, vous pouvez utiliser setTimeout pour appeler la méthode hideNotification après un certain délai. Vous pouvez le faire dans le composant NotificationContextProvider grace à useEffect.
*/

import { createContext, useEffect, useState } from 'react';
// creer un contexte pour les notifications
const NotificationContext = createContext({
  notification: null, //  initialise a null mais sera un objet: { title: 'Test', message: 'This is a test.', status: 'pending' }`
  showNotification: function(notificationData) {},  // methode pour afficher une notification
  hideNotification: function() {}
});

// creer un provider pour les notifications: ce composant enveloppera les composants qui doivent avoir acces aux notifications
export function NotificationContextProvider(props) {
  const [activeNotification, setActiveNotification] = useState(); // permet de manager l'etat des notifications

  // cacher les notifications automatiquement apres un certain temps
  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === 'success' ||
        activeNotification.status === 'error')
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  // methode pour afficher une notification
  function showNotificationHandler(notificationData) {
    setActiveNotification(notificationData);
  }

  // methode pour cacher une notification
  function hideNotificationHandler() {
    setActiveNotification(null);
  }

  // regrouper les donnees et les methodes dans un objet context (notre contexte initial) qui sera fourni aux composants via le prop value du Provider
  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;