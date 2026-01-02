import { createContext, useContext, useState, useEffect } from "react";
import { membersAPI } from "../utils/api";

type Member = {
  id?: number | string;
  _id?: string;
  name: string;
  skills: string;
  github: string;
  email?: string;
  phone?: string;
  course?: string;
  year?: string;
};

const MembersContext = createContext<any>(null);

export const MembersProvider = ({ children }: any) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      setLoading(true);
      const data = await membersAPI.getAll();
      setMembers(data);
    } catch (error) {
      console.error("Failed to load members:", error);
      // Fallback to empty array on error
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  const addMember = async (member: Member) => {
    try {
      const newMember = await membersAPI.create(member);
      setMembers([...members, newMember]);
      return newMember;
    } catch (error) {
      console.error("Failed to add member:", error);
      throw error;
    }
  };

  const updateMember = async (id: string, member: Member) => {
    try {
      const updated = await membersAPI.update(id, member);
      setMembers(members.map(m => (m._id === id || m.id === id ? updated : m)));
      return updated;
    } catch (error) {
      console.error("Failed to update member:", error);
      throw error;
    }
  };

  const deleteMember = async (id: string) => {
    try {
      await membersAPI.delete(id);
      setMembers(members.filter(m => m._id !== id && m.id !== id));
    } catch (error) {
      console.error("Failed to delete member:", error);
      throw error;
    }
  };

  return (
    <MembersContext.Provider value={{ members, addMember, updateMember, deleteMember, loadMembers, loading }}>
      {children}
    </MembersContext.Provider>
  );
};

export const useMembers = () => useContext(MembersContext);
