// import { useRouter } from "next/router";

import { getEventById, getAllEvents } from "../../helpers/api-util";
import { Fragment } from "react";

import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";

export default function EventsDetailPage(props) {
  // const router = useRouter();

  // recuperer le parametre eventId de l'url
  // eventId dans 'router.query.eventId' est le nom entre [] du fichier dans le dossier 'events'
  // const eventId = router.query.eventId;

  // appeler la fonction getEventById() du fichier 'dummy-data.js' pour recuperer les données de l'événement en lui passant l'id (eventId) de l'événement
  const event = props.selectedEvent;

  // si l'événement n'existe pas, afficher un message d'erreur
  // le composant ErrorAlert permet de styliser l'affichage du message d'erreur
  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
  };
}

// cette fonction dira a Next.js quelle page doit etre pre-rendue en fonction de l'id de l'événement
export async function getStaticPaths() {
  const events = await getAllEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths: paths,
    fallback: false,
  };
}
