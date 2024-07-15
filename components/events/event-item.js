import classes from '../../styles/event-item.module.css';

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
    <li className={classes.item}>
      <img src={"/" + image} alt={title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Link href="/">Explore Event</Link>
        </div>
      </div>
    </li>
  );
}
