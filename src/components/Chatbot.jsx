import { useContext, useState } from "react";
import axios from "axios";
import { TravelContext } from "../context/TravelContext";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

    const { showChat,currentUser, userLocation} = useContext(TravelContext)
  

  const defaultPrompts = [
    "Plan a 5-day trip to Dubai",
    "Top 10 things to do in Paris",
    "Suggest a family-friendly beach destination",
    "What to pack for Thailand?",
  ];

  const BASE_URL = "https://travelbuddy-backend-dbve.onrender.com";


  const sendMessage = async (text) => {
    const userMessage = { role: "user", content: text || input };
    const updatedMessages = [
      {
        role: "system",
        content:
          "You are a helpful travel assistant that helps users plan trips, recommend local activities, suggest packing lists, and give local travel tips based on preferences and destinations.",
      },
      ...messages,
      userMessage, 
    ];

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await axios.post(`${BASE_URL}/api/chat`, {
        messages: updatedMessages, location:userLocation
      });

      setMessages((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Chat error:", err);
    }
  };

  return ( 
<>
    {showChat && currentUser &&
    <div className="chatbot-container w-full max-w-md mx-auto p-4 bg-white rounded shadow-lg flex flex-col gap-2">
      {/* Default Prompts */}
      <div className="flex flex-wrap gap-2 mb-2">
        {defaultPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => sendMessage(prompt)}
            className="bg-gray-200 text-black hover:bg-gray-300 text-sm px-3 py-1 rounded-full"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Window */}
      <div className="chat-window flex-1 overflow-y-auto max-h-96 p-3 border border-gray-300 rounded bg-gray-100 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded max-w-xs ${
              msg.role === "user"
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-300 text-black self-start mr-auto"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      {/* Input & Button */}
      <div className="flex gap-2 mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Ask your travel assistant..."
        />
        <button
          onClick={() => sendMessage()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
}

    </>
  );
};

export default Chatbot;
