import { useRouter } from "next/router";

import { getEventById } from "../../dummy-data";
import { Fragment } from "react";

import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";

export default function EventsDetailPage() {
  const router = useRouter();

  // recuperer le parametre eventId de l'url
  const eventId = router.query.eventId

  // appeler la fonction getEventById() du fichier 'dummy-data.js' pour recuperer les données de l'événement
  const event = getEventById(eventId);

  // si l'événement n'existe pas, afficher un message d'erreur
  if (!event) {
    return <p>No event found!</p>;
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}
