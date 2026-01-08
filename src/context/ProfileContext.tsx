import { createContext, useContext, useState, useEffect } from "react";
import { profileAPI } from "../utils/api";
import { useAuth } from "./AuthContext";

type Profile = {
  id?: number | string;
  _id?: string;
  name: string;
  skills: string;
  github: string;
  email?: string;
  phone?: string;
  photo?: string;
  course?: string;
  year?: string;
};

const ProfileContext = createContext<any>(null);

export const ProfileProvider = ({ children }: any) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile>({
    name: "User Name",
    skills: "Python, React, Data Science",
    github: "https://github.com",
    email: "",
    phone: "",
    photo: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.role !== "guest" && user.id) {
      void loadProfile();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const data = await profileAPI.getMe();
      setProfile(data);
    } catch (error) {
      console.error("Failed to load profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Profile) => {
    try {
      const updated = await profileAPI.update(data);
      setProfile(updated);
      return updated;
    } catch (error) {
      console.error("Failed to update profile:", error);
      throw error;
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, loadProfile, loading }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
