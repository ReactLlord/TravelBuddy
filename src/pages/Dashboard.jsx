import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "../components/Auth/auth";
import { TravelContext } from "../context/TravelContext";
import MapComponent from "./MapComponent";
import Chatbot from "../components/Chatbot/Chatbot";
import ChatbotImg from "../components/Chatbot/ChatbotImg";

const Dashboard = () => {


  
 

  return (
    <>
    <MapComponent />
          <div className="chabot absolute bottom-10 right-0 " style={{ zIndex: 1000 }}>

            
       <Chatbot />
       <ChatbotImg/>
       </div>
       </>
  );
};

export default Dashboard;
