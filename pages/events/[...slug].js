import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";

export default function FilteredEventsPage() {
  const router = useRouter();
  const filterData = router.query.slug;

  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  // extraire l'année et le mois du slug
  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  // le + permet de convertir une chaine de caractères en nombre
  const numYear = +filterData[0];
  const numMonth = +filterData[1];

  // verifier si l'année et le mois sont valides
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return <p>Invalid filter. Please adjust your values!</p>;
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  // si aucun événement n'est trouvé pour l'année et le mois donnés, afficher un message d'erreur
  if (!filteredEvents || filteredEvents.length === 0) {
    return <p>No events found for the chosen filter!</p>;
  }
  

  return (
    <div>
      <h1>Filtered Events Page</h1>
    </div>
  );
}
