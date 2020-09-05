import React, { createContext, useState, useContext, useEffect } from "react";
import { database } from "../misc/firebase";
import { transformToArrWithId } from "../misc/helpers";

const RoomsContext = createContext();

const RoomsProvider = ({ children }) => {
  const [rooms, setRooms] = useState(null);

  const roomListRef = database.ref("rooms");

  useEffect(() => {
    roomListRef.on("value", (snap) => {
      const data = transformToArrWithId(snap.val());
      setRooms(data);
    });
    return () => {
      roomListRef.off();
    };
  }, [roomListRef]);

  return (
    <RoomsContext.Provider value={rooms}>{children}</RoomsContext.Provider>
  );
};

export default RoomsProvider;

export const useRooms = () => useContext(RoomsContext);
