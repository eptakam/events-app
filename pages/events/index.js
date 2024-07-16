import EventList from "../../components/events/event-list";
import { getAllEvents } from "../../dummy-data";

export default function AllEventsPage() {
  // recuperer tous les événements
  const events = getAllEvents();

  return (
    <div>
      <EventList items={events}/>
    </div>
  );
}