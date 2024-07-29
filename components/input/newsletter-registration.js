import classes from "./newsletter-registration.module.css";

import { useRef } from "react";

function NewsletterRegistration() {
  // creer la reference pour l'element input
  const emailInputRef = useRef();

  function registrationHandler(event) {
    event.preventDefault();

    // recuperer l'email entre par l'utilisateur
    const enteredEmail = emailInputRef.current.value;

    // envoyer l'email a une API via une requete POST
    fetch("/api/registration", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));

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
