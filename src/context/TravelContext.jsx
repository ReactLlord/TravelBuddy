import { createContext, useEffect, useState } from "react";

export const TravelContext = createContext();

function ContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [showChat, setShowChat]= useState(true)
   const [userLocation, setUserLocation] = useState(null);
  

   


  const TravelValue = {
    currentUser,
    setCurrentUser,
    showChat,
    setShowChat,
    userLocation,
     setUserLocation, // ✅ Add this line
  };

  return (
    <TravelContext.Provider value={TravelValue}>
      {children}
    </TravelContext.Provider>
  );
}

export default ContextProvider;
