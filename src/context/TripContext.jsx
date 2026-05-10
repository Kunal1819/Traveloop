import { createContext, useContext, useState } from "react";

const TripContext = createContext();

// Mock Initial Data
const initialTrips = [
  {
    id: "trip-1",
    name: "European Summer Explorer",
    startDate: "2026-07-01",
    endDate: "2026-07-15",
    description: "A two-week adventure across France, Italy, and Spain.",
    destinations: ["Paris", "Rome", "Barcelona"],
    budget: 5000,
    stops: [
      {
        id: "stop-1",
        city: "Paris",
        country: "France",
        startDate: "2026-07-01",
        endDate: "2026-07-05",
        activities: [
          { id: "act-1", name: "Eiffel Tower Tour", cost: 35, type: "Sightseeing" },
          { id: "act-2", name: "Louvre Museum", cost: 20, type: "Culture" },
        ],
      },
    ],
    packingList: [
      { id: "item-1", name: "Passport", packed: false, category: "Documents" },
      { id: "item-2", name: "Camera", packed: true, category: "Electronics" },
    ],
    notes: [
      { id: "note-1", text: "Flight lands at CDG terminal 2. Take train to city center.", date: "2026-05-01T12:00:00Z" }
    ]
  },
];

export function TripProvider({ children }) {
  const [trips, setTrips] = useState(initialTrips);
  
  const addTrip = (newTrip) => {
    setTrips([...trips, { ...newTrip, id: `trip-${Date.now()}`, stops: [], packingList: [], notes: [] }]);
  };

  const updateTrip = (id, updatedFields) => {
    setTrips(trips.map((t) => (t.id === id ? { ...t, ...updatedFields } : t)));
  };

  const deleteTrip = (id) => {
    setTrips(trips.filter((t) => t.id !== id));
  };

  const addStop = (tripId, stop) => {
    setTrips(trips.map(t => {
      if (t.id === tripId) {
        return { ...t, stops: [...t.stops, { ...stop, id: `stop-${Date.now()}`, activities: [] }] };
      }
      return t;
    }));
  };

  const addActivity = (tripId, stopId, activity) => {
    setTrips(trips.map(t => {
      if (t.id === tripId) {
        return {
          ...t,
          stops: t.stops.map(s => {
            if (s.id === stopId) {
              return { ...s, activities: [...s.activities, { ...activity, id: `act-${Date.now()}` }] };
            }
            return s;
          })
        };
      }
      return t;
    }));
  };

  return (
    <TripContext.Provider value={{ trips, addTrip, updateTrip, deleteTrip, addStop, addActivity }}>
      {children}
    </TripContext.Provider>
  );
}

export function useTrips() {
  return useContext(TripContext);
}
