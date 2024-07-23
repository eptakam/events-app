import { Fragment } from "react";
import { useRouter } from "next/router";

import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { getAllEvents } from "../../helpers/api-util";

// optimisation de la page
import Head from "next/head";

export default function AllEventsPage(props) {
  const router = useRouter();
  
  // recuperer tous les événements
  // const events = getAllEvents();

  // function qui sera declenchée lors de la soumission du formulaire lorsque la fonction 'submitHandler' du composant 'EventsSearch' sera declenchée. precisement par la fonction 'props.onSearch(selectedYear, selectedMonth);'
  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    // rediriger l'utilisateur vers la page '/events/${year}/${month}'
    router.push(fullPath);
  }

  return (
    <Fragment>
      {/* ceci est pour l'optimisation de la page de tous les evenements: configuration de l'entete de la page */}
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <EventsSearch onSearch={findEventsHandler}/>
      <EventList items={props.events}/>
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}

