import React from "react";
import { createContext, useState } from "react";

const stateContext = createContext();

function MyState({ children }) {
  const [user, setUser] = useState({});
  return (
    <stateContext.Provider value={{ user, setUser }}>
      {children}
    </stateContext.Provider>
  );
}

export { stateContext };
export default MyState;
