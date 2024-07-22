export async function getAllEvents() {
  const response = await fetch(
    "https://nextjs-course-7cc9a-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();

  const events = [];

  // Transform the data into an array of objects
  for (const key in data) {
    events.push({
      id: key,
      ...data[key], // Spread operator (operateur de decomposition) to add all key-value pairs from the object
    });
  }

  return events;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}