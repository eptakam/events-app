import classes from "../../styles/ui/button.module.css";

import Link from "next/link";

export default function Button(props) {
  return (
    <Link href={props.link} className={classes.btn}>
      {props.children}
    </Link>
  );
}