import classes from '../../styles/event-detail/event-summary.module.css';

function EventSummary(props) {
  // extraire les données de props: c'est ce qu'on appelle la destructuration
  const { title } = props;

  return (
    <section className={classes.summary}>
      <h1>{title}</h1>
    </section>
  );
}

export default EventSummary;