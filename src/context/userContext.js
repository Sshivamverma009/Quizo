import { createContext, useContext } from "react";

const UserContext = createContext({
  teacherId: null,
  setTeacher_Id: () => {},
});

export const UserContextProvider = UserContext.Provider;

export default function getId() {
  return useContext(UserContext);
}
