/*
    si nous voulons afficher les donnees a partir d'une API externe, une questio se pose: comment obtenir ces donnees? allons-nous utliser client-side fetching ou server-side rendering?

    vue que ce n'est pas une page qui sera mis a jour frequemment, ce serait une bonne idee d'utiliser le server-side rendering 'getStaticProps' pour obtenir les donnees et les afficher sur la page d'accueil.
*/

import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-util";

export default function Homepage(props) {

  return (
    <div>
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