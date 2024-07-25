// import { useRouter } from "next/router";

import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import { Fragment } from "react";

import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
import Comments from "../../components/input/comments";

// optimisation de la page
import Head from "next/head";

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
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      {/* ceci est pour l'optimisation de la page de detail d'un evenement: configuration de l'entete de la page */}
      <Head>
        <title>{event.title}</title>
        <meta
          name="description"
          content={event.description}
        />
      </Head>
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
      <Comments eventId={event.id} />
    </Fragment>
  );
}

export async function getStaticProps(context) {
  // ici, nous avons besoin du context pour recuperer l'id de l'événement
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30
  };
}

// cette fonction dira a Next.js quelle page doit etre pre-rendue en fonction de l'id de l'événement qui dans le segment de l'url
export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths: paths,
    fallback: true,
  };
}
