import MapComponent from "./pages/MapComponent";
import './App.css';
import Chatbot from "./components/Chatbot";
import ContextProvider, { TravelContext } from "./context/TravelContext";
import ChatbotImg from "./components/ChatbotImg";
 
 
function App() {

  
  return (
    
    <>
    <ContextProvider> 
      <MapComponent />
          <div className="chabot absolute bottom-10 right-0 " style={{ zIndex: 1000 }}>

            
       <Chatbot />
       <ChatbotImg/>
       </div>
        </ContextProvider>
   </>
  );
}

export default App;
