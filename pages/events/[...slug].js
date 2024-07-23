import { useRouter } from "next/router";
import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import { Fragment, useEffect, useState } from "react";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { notFound } from "next/navigation";
import useSWR from "swr";

export default function FilteredEventsPage(props) {
  const [loadedEvents, setLoadedEvents] = useState([]);
  const router = useRouter();
  const filterData = router.query.slug;

  // SWR est une librairie qui permet de fetcher des donnees cote client. elle est tres utile pour les donnees qui changent frequemment. elle permet de mettre en cache les donnees et de les mettre a jour automatiquement. pour qu'elle fonctionne, il faut lui passer comme segond argument une fonction fetcher qui prend en parametre l'url a fetcher et qui retourne une promesse.
  // une fonction fetcher qui prend en parametre l'url a fetcher et qui retourne une promesse.
  // SWR est utilise uniquement dans les composants React et pas dans les fonctions getServerSideProps ou getStaticProps

  const fetcher = (...args) => fetch(...args).then(res => res.json())
  // const fetcher = (url) => fetch(url).then((response) => response.json());
  const { data, error } = useSWR(
    "https://nextjs-course-7cc9a-default-rtdb.firebaseio.com/events.json",
    fetcher
  );

  // useEffect() sera execute a chaque fois que les valeurs de data ou error changent
  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }

      setLoadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents) {
    return <p className="center">Loading...</p>;
  }

  // extraire l'année et le mois du slug
  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  // le + permet de convertir une chaine de caractères en nombre
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  // verifier si l'année et le mois sont valides
  if (
    // props.hasError
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
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

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  // const date = new Date(numYear, numMonth - 1);

  // const filteredEvents = props.events;

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

  // const date = new Date(props.date.year, props.date.month - 1);
  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

// nous allons faire en sorte que les pages soient pre-rendues pour chaque nouvelle requête entrante. pour cela, nous allons utiliser la fonction getServerSideProps
// export async function getServerSideProps(context) {
//   const { params } = context;
//   const filterData = params.slug;

//   // extraire l'année et le mois du slug
//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];

//   // le + permet de convertir une chaine de caractères en nombre
//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   // verifier si l'année et le mois sont valides
//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: { hasError: true },
//       // notFound: true,
//       // redirect: {
//       //   destination: "/error",
//       // },
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// }
