import { createContext, useContext, useState } from "react";

type Event = {
  id: number;
  title: string;
  date: string;
};

const EventContext = createContext<any>(null);

export const EventProvider = ({ children }: any) => {
  const [events, setEvents] = useState<Event[]>([]);

  const addEvent = (title: string, date: string) => {
    setEvents([...events, { id: Date.now(), title, date }]);
  };

  const updateEvent = (id: number, title: string, date: string) => {
    setEvents(events.map(e => e.id === id ? { id, title, date } : e));
  };

  const deleteEvent = (id: number) => {
    setEvents(events.filter(e => e.id !== id));
  };

  return (
    <EventContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);
