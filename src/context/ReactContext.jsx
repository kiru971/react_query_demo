import { useQuery } from "@tanstack/react-query";
import { createContext, useMemo, useState } from "react";
import { getUser } from "../service/api/user";

export const ReactContext = createContext();

const ReactContextProvider = ({ children }) => {
  const [users, setUser] = useState();
  const {
    isLoading,
    isError,
    error,
    data: user,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,

    staleTime: Infinity,
  });

  useMemo(() => {
    setUser(user);
  }, [user]);

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return `Error: ${error.message}`;

  const editUser = (user) => {
    const updateUser = users.map((item) => {
      if (item.id === user.id) return user;
      return item;
    });
    setUser(updateUser);
  };
  const addUser = (add) => {
    setUser([...users, add]);
  };

  const deleteUser = (id) => {
    setUser(users.filter((val) => val.id !== id));
  };

  console.log(users);
  return (
    <ReactContext.Provider
      value={{ users, setUser, editUser, addUser, deleteUser, user }}
    >
      {children}
    </ReactContext.Provider>
  );
};
export default ReactContextProvider;
