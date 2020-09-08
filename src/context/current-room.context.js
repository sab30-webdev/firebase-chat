import React from "react";
import { createContext, useContextSelector } from "use-context-selector";

const CurrentRoomContex = createContext();

export const CurrentRoomProvider = ({ children, data }) => {
  return (
    <CurrentRoomContex.Provider value={data}>
      {children}
    </CurrentRoomContex.Provider>
  );
};

export const useCurrentRoom = (selector) =>
  useContextSelector(CurrentRoomContex, selector);
