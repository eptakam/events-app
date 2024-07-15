import Link from "next/link";

export default function EventItem(props) {
  // destructuring the props: extraire les proprietes title, image, date, location, id de l'objet props (fichier dummy-data.js)
  const { title, image, date, location, id } = props;

  // formater la date
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // remplacer la virgule puis l'espace apres par un saut de ligne
  const formattedAddress = location.replace(", ", "\n");

  // construire le lien pour chaque événement
  const exploreLink = `/events/${id}`;

  return (
    <li>
      <img src={"/" + image} alt={title} />
      <div>
        <div>
          <h2>{title}</h2>
          <div>
            <time>{humanReadableDate}</time>
          </div>
          <div>
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div>
          <Link href="/">Explore Event</Link>
        </div>
      </div>
    </li>
  );
}
