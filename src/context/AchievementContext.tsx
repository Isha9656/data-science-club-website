import { createContext, useContext, useState } from "react";

type Achievement = {
  id: number;
  name: string;
  user: string;
  userId?: number;
  date?: string;
  description?: string;
};

const AchievementContext = createContext<any>(null);

export const AchievementProvider = ({ children }: any) => {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 1,
      name: "Outstanding Leadership",
      user: "Aman",
      userId: 1,
      date: new Date().toISOString(),
      description: "Led the Data Science workshop successfully",
    },
    {
      id: 2,
      name: "Best Organizer",
      user: "Riya",
      userId: 2,
      date: new Date().toISOString(),
      description: "Organized the annual club event",
    },
  ]);

  const addAchievement = (name: string, user: string) => {
    setAchievements([...achievements, { id: Date.now(), name, user }]);
  };

  return (
    <AchievementContext.Provider value={{ achievements, addAchievement }}>
      {children}
    </AchievementContext.Provider>
  );
};

export const useAchievements = () => useContext(AchievementContext);
