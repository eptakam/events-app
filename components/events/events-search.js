/*
    useRef est un Hook de React qui permet de conserver une référence persistante à une valeur ou à un élément du DOM à travers les rendus du composant.
*/

import { useRef } from "react";

import Button from "../ui/button";
import classes from "../../styles/events/events-search.module.css";

export default function EventsSearch(props) {
// creer une reference pour les champs 'year' et 'month' du formulaire
const yearInputRef = useRef();
const monthInputRef = useRef();

// function qui sera declenchée lors de la soumission du formulaire pour rediriger l'utilisateur vers la page (element) recherchee '/events/${selectedYear}/${selectedMonth}'
function submitHandler(event) {
  // empecher le rechargement de la page (envoyer une requette http) et perdre les données lors de la soumission du formulaire
  event.preventDefault(); 

  // recuperer les valeurs des champs 'year' et 'month' du formulaire
  const selectedYear = yearInputRef.current.value;
  const selectedMonth = monthInputRef.current.value;

  // rediriger l'utilisateur vers la page '/events/${selectedYear}/${selectedMonth}'
  // c'est cette fonction qui passera les valeurs des champs 'year' et 'month' du formulaire au composant parent 'AllEventsPage' pour qu'il puisse les utiliser
  props.onSearch(selectedYear, selectedMonth);
}

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="year">Year</label>
          <select id="year" ref={yearInputRef}>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="month">Month</label>
          <select id="month" ref={monthInputRef}>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
      </div>
      <Button>Find Events</Button>
    </form>
  );
}
