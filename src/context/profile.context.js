import React, { createContext, useState, useContext, useEffect } from "react";
import { auth, database } from "../misc/firebase";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let userRef;

    const authUnsub = auth.onAuthStateChanged((authObj) => {
      if (authObj) {
        userRef = database.ref(`profiles/${authObj.uid}`);
        userRef.on("value", (snap) => {
          const { name, createdAt,avatar } = snap.val();
          const data = {
            name,
            createdAt,
            avatar,
            uid: authObj.uid,
            email: authObj.email,
          };
          setProfile(data);
          setIsLoading(false);
        });
      } else {
        setProfile(null);
        setIsLoading(false);
      }
    });

    return () => {
      authUnsub();

      if (userRef) {
        userRef.off();
      }
    };
  }, []);

  return (
    <div>
      <ProfileContext.Provider value={{ profile, isLoading }}>
        {children}
      </ProfileContext.Provider>
    </div>
  );
};

export const useProfile = () => useContext(ProfileContext);
