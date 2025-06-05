import { createContext, useEffect, useState } from "react";

export const TravelContext = createContext();

function ContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [showChat, setShowChat] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
   const [isAuthenticated, setIsAuthenticated] = useState(false);
     const [isSignUp, setIsSignUp] = useState(false);
   

 useEffect(() => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const coords = [position.coords.latitude, position.coords.longitude];
      setUserLocation(coords);
      console.log("User location set:", coords);
    },
    (error) => {
      console.error("Location error:", error);
    }
  );
}, []);


  const TravelValue = {
    currentUser,
    setCurrentUser,
    showChat,
    setShowChat,
    userLocation,
    setUserLocation,
    isAuthenticated,
    setIsAuthenticated,
    isSignUp,
    setIsSignUp  
  };

  return (
    <TravelContext.Provider value={TravelValue}>
      {children}
    </TravelContext.Provider>
  );
}

export default ContextProvider;
