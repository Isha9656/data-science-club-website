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

  return (
    <EventContext.Provider value={{ events, addEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);
