import { useContext, createContext, useState, useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";


export const UserContext = createContext({
  user: null,
  setUser: () => {}
});



export const UserProvider = ({ children }) => {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState(null);

  const auth = getAuth()

  const authChange = user => {
    setUser(user)
    if (initializing) setInitializing(false)
  }
  useEffect(() => {
    const newUser = onAuthStateChanged(auth, authChange)
    return () => newUser()
  }, [])
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
