import { useRouter } from "next/router";
import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import { Fragment } from "react";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { notFound } from "next/navigation";

export default function FilteredEventsPage(props) {
  const router = useRouter();
  // const filterData = router.query.slug;

  // if (!filterData) {
  //   return <p className="center">Loading...</p>;
  // }

  // extraire l'année et le mois du slug
  // const filteredYear = filterData[0];
  // const filteredMonth = filterData[1];

  // le + permet de convertir une chaine de caractères en nombre
  // const numYear = +filteredYear;
  // const numMonth = +filteredMonth;

  // verifier si l'année et le mois sont valides
  if (
    props.hasError
    // isNaN(numYear) ||
    // isNaN(numMonth) ||
    // numYear > 2030 ||
    // numYear < 2021 ||
    // numMonth < 1 ||
    // numMonth > 12
  ) {
    return (
      <Fragment>
        {/* le composant ErrorAlert permet de styliser l'affichage du message d'erreur */}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = props.events;

  // si aucun événement n'est trouvé pour l'année et le mois donnés, afficher un message d'erreur
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(props.date.year, props.date.month - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

// nous allons faire en sorte que les pages soient pre-rendues pour chaque nouvelle requête entrante. pour cela, nous allons utiliser la fonction getServerSideProps
export async function getServerSideProps(context) {
  const { params } = context;
  const filterData = params.slug;

  // extraire l'année et le mois du slug
  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  // le + permet de convertir une chaine de caractères en nombre
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  // verifier si l'année et le mois sont valides
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: { hasError: true },
      // notFound: true,
      // redirect: {
      //   destination: "/error",
      // },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}
