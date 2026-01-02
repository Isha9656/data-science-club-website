import { createContext, useContext, useState } from "react";

type Member = {
  id: number;
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
  const [members, setMembers] = useState<Member[]>([
    {
      id: 1,
      name: "Aman",
      skills: "Python, ML",
      github: "https://github.com/aman",
      email: "aman@marwadiuniversity.ac.in",
      phone: "+91 98765 43210",
      course: "B.Tech Data Science",
      year: "3rd Year",
    },
    {
      id: 2,
      name: "Riya",
      skills: "Power BI, SQL",
      github: "https://github.com/riya",
      email: "riya@marwadiuniversity.ac.in",
      phone: "+91 98765 43211",
      course: "B.Tech Data Science",
      year: "2nd Year",
    },
  ]);

  const addMember = (member: Member) => {
    setMembers([...members, { ...member, id: Date.now() }]);
  };

  return (
    <MembersContext.Provider value={{ members, addMember }}>
      {children}
    </MembersContext.Provider>
  );
};

export const useMembers = () => useContext(MembersContext);
