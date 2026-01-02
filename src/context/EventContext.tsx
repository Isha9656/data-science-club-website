import { createContext, useContext, useState, useEffect } from "react";
import { eventsAPI } from "../utils/api";

type Event = {
  id?: number | string;
  _id?: string;
  title: string;
  date: string;
  description?: string;
  location?: string;
};

const EventContext = createContext<any>(null);

export const EventProvider = ({ children }: any) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await eventsAPI.getAll();
      setEvents(data);
    } catch (error) {
      console.error("Failed to load events:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const addEvent = async (title: string, date: string, description?: string) => {
    try {
      const newEvent = await eventsAPI.create({ title, date, description });
      setEvents([...events, newEvent]);
      return newEvent;
    } catch (error) {
      console.error("Failed to add event:", error);
      throw error;
    }
  };

  const updateEvent = async (id: string, title: string, date: string, description?: string) => {
    try {
      const updated = await eventsAPI.update(id, { title, date, description });
      setEvents(events.map(e => (e._id === id || e.id === id ? updated : e)));
      return updated;
    } catch (error) {
      console.error("Failed to update event:", error);
      throw error;
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      await eventsAPI.delete(id);
      setEvents(events.filter(e => e._id !== id && e.id !== id));
    } catch (error) {
      console.error("Failed to delete event:", error);
      throw error;
    }
  };

  return (
    <EventContext.Provider value={{ events, addEvent, updateEvent, deleteEvent, loadEvents, loading }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);
