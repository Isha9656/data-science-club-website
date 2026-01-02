import { createContext, useContext, useState, useEffect } from "react";
import { achievementsAPI } from "../utils/api";

type Achievement = {
  id?: number | string;
  _id?: string;
  name: string;
  user: string | any;
  userId?: number | string;
  date?: string;
  description?: string;
};

const AchievementContext = createContext<any>(null);

export const AchievementProvider = ({ children }: any) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = async () => {
    try {
      setLoading(true);
      const data = await achievementsAPI.getAll();
      setAchievements(data);
    } catch (error) {
      console.error("Failed to load achievements:", error);
      setAchievements([]);
    } finally {
      setLoading(false);
    }
  };

  const addAchievement = async (name: string, user: string, description?: string) => {
    try {
      const newAchievement = await achievementsAPI.create({ name, user, description });
      setAchievements([...achievements, newAchievement]);
      return newAchievement;
    } catch (error) {
      console.error("Failed to add achievement:", error);
      throw error;
    }
  };

  const updateAchievement = async (id: string, achievement: Partial<Achievement>) => {
    try {
      const updated = await achievementsAPI.update(id, achievement);
      setAchievements(achievements.map(a => (a._id === id || a.id === id ? updated : a)));
      return updated;
    } catch (error) {
      console.error("Failed to update achievement:", error);
      throw error;
    }
  };

  const deleteAchievement = async (id: string) => {
    try {
      await achievementsAPI.delete(id);
      setAchievements(achievements.filter(a => a._id !== id && a.id !== id));
    } catch (error) {
      console.error("Failed to delete achievement:", error);
      throw error;
    }
  };

  return (
    <AchievementContext.Provider value={{ achievements, addAchievement, updateAchievement, deleteAchievement, loadAchievements, loading }}>
      {children}
    </AchievementContext.Provider>
  );
};

export const useAchievements = () => useContext(AchievementContext);
