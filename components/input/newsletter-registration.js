/*
    nous desirons afficher 'pending' si l'enregistrement est en cours, 'success' si l'enregistrement a reussi, et 'error' si l'enregistrement a echoue.
    pour cela, nous avons besoin du hook useContext de 'react' pour acceder au contexte de notification en lui passant le composant NotificationContext.
*/

import classes from "./newsletter-registration.module.css";

import { useRef, useContext } from "react";
import NotificationContext from "../../store/notification-context";

function NewsletterRegistration() {
  // creer la reference pour l'element input
  const emailInputRef = useRef();

  // consommer le contexte des notifications
  const notificationCtx = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();

    // recuperer l'email entre par l'utilisateur
    const enteredEmail = emailInputRef.current.value;

    // afficher une notification
    notificationCtx.showNotification({
      title: "Signing up...",
      message: "Registering for newsletter.",
      status: "pending",
    });

    // envoyer l'email a une API via une requete POST
    // Attention: fetch n'a pas une promesse pour les erreurs. d'ou il n'entrera jamais dans le bloc catch meme s'il y a une erreur. c'eat pour cela que nous utilisons tres souvent le status 500 et autre pour afficher les erreurs. Ici nous allons le forcer a entrer dans le bloc catch en utilisant un if pour verifier si la reponse est ok ou non.
    fetch("/api/registration", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Success!",
          message: "Successfully registered for newsletter!",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      });

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
