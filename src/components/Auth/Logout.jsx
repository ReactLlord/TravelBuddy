import React, { useContext } from 'react'
import { TravelContext } from '../../context/TravelContext'

export default function Logout() {

  const { setIsAuthenticated} = useContext(TravelContext)

  return (
          <button onClick={()=> setIsAuthenticated(false)}>logout</button>

  )
}
