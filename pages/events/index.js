import { Fragment } from "react";
import { useRouter } from "next/router";

import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { getAllEvents } from "../../helpers/api-util";

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

