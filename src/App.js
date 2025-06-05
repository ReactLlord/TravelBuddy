import MapComponent from "./pages/MapComponent";
import "./App.css";
import Chatbot from "./components/Chatbot/Chatbot";
import ContextProvider, { TravelContext } from "./context/TravelContext";
import ChatbotImg from "./components/Chatbot/ChatbotImg";
import { HeroSectionOne } from "./pages/LandingPage";
import { ThemeProvider } from "./themeprovider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Auth/Form";
import LoginSignupForm from "./components/Auth/login";

import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ContextProvider>  
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HeroSectionOne />} />
            <Route path="/login" element={<LoginSignupForm />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/*  <MapComponent />
          <div className="chabot absolute bottom-10 right-0 " style={{ zIndex: 1000 }}>

            
       <Chatbot />
       <ChatbotImg/>
       </div> */}
          </Routes>
        </BrowserRouter>
         </ContextProvider> 
      </ThemeProvider>
    </>
  );
}

export default App;
