import { createContext, useContext, useState } from "react";

type Profile = {
  id?: number;
  name: string;
  skills: string;
  github: string;
  email?: string;
  phone?: string;
  photo?: string;
};

const ProfileContext = createContext<any>(null);

export const ProfileProvider = ({ children }: any) => {
  const [profile, setProfile] = useState<Profile>({
    id: 1,
    name: "User Name",
    skills: "Python, React, Data Science",
    github: "https://github.com",
    email: "",
    phone: "",
    photo: "",
  });

  const updateProfile = (data: Profile) => setProfile(data);

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
