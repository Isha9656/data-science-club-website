import { createContext, useContext, useState } from "react";

type Achievement = {
  id: number;
  name: string;
  user: string;
};

const AchievementContext = createContext<any>(null);

export const AchievementProvider = ({ children }: any) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

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
