import React, { useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import "./register.css";

// MapComponent.jsx
import "leaflet/dist/leaflet.css";

//custom icon
import L from "leaflet";


export default function Register({setShowRegister}) {
   

  const BASE_URL = "https://travelbuddy-backend-dbve.onrender.com";

  const [success,setSuccess] = useState(false);
  const [error,setError] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const res = await axios.post(`${BASE_URL}/api/users/register`, newUser);
      setSuccess(true);
      setError(false);
      console.log("Registration successful:", res.data);
    } catch (err) {
      setError(true);
      setSuccess(false);
      console.error("Registration failed:", err);
    }
  }

  return (
    <div className="registerContainer">
      <div className="logo">
        <svg
          width="30"
          height="40"
          viewBox="0 0 24 24"
          fill="slateblue"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5
                     c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 
                     2.5-2.5 2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"
          />
        </svg>
        <span>MapApp</span>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username"  ref={nameRef}/>
        <input type="email" placeholder="email" ref={emailRef}/>
        <input type="password" placeholder="password"  ref={passwordRef}/>
        <button className="registerBtn">Register</button>
        {success &&
        <span className="success">Successful.You can login now!</span> 
        }
        {error &&
        <span className="failure">Something went wrong!</span> 
        }
        </form>
        <CloseIcon className="registerCancel" onClick={()=> setShowRegister(false)}/>
    </div>
  );
}
