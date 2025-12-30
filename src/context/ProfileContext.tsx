import { createContext, useContext, useState } from "react";

type Profile = {
  name: string;
  skills: string;
  github: string;
};

const ProfileContext = createContext<any>(null);

export const ProfileProvider = ({ children }: any) => {
  const [profile, setProfile] = useState<Profile>({
    name: "Anonymous",
    skills: "None",
    github: "",
  });

  const updateProfile = (data: Profile) => setProfile(data);

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
