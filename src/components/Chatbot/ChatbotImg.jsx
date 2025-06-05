import React, { useContext } from 'react'
import { TravelContext } from '../../context/TravelContext'

export default function ChatbotImg() {

      const { showChat,setShowChat} = useContext(TravelContext)
    
  return (
    <div onClick={()=>setShowChat(!showChat) }   >
       <img src="/chatbot.png" width={80}  />
    </div>
  )
}
