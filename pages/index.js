/*
    si nous voulons afficher les donnees a partir d'une API externe, une question se pose: comment obtenir ces donnees? allons-nous utliser client-side fetching ou server-side rendering?

    vue que ce n'est pas une page qui sera mis a jour frequemment, ce serait une bonne idee d'utiliser le server-side rendering 'getStaticProps' pour obtenir les donnees et les afficher sur la page d'accueil.
*/

// optimisation de la page d'acceuil
import Head from "next/head";

import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-util";
import NewsletterRegistration from "../components/input/newsletter-registration";

export default function Homepage(props) {

  return (
    <div>
      {/* ceci est pour l'optimisation de la page d'acceuil: configuration de l'entete de la page */}
      <Head> 
        <title>Events News</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents
    },
    revalidate: 1800
  };
}