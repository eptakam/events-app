import classes from '../../styles/event-detail/logistics-item.module.css';

function LogisticsItem(props) {
  // extraire les données de props: c'est ce qu'on appelle la destructuration
  const { icon: Icon } = props;

  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <Icon />
      </span>
      <span className={classes.content}>{props.children}</span>
    </li>
  );
}

export default LogisticsItem;
