// MapComponent.jsx
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

//custom icon
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

//api
import axios from "axios";

// material ui icon
import RoomIcon from "@mui/icons-material/Room";
import Star from "@mui/icons-material/Star";

//map centering
import { useMap } from "react-leaflet";
import { useContext, useEffect, useRef, useState } from "react";

//timeago
import { format } from "timeago.js";

import { useMapEvent } from "react-leaflet";
import Register from "../components/Auth/Register";
import Login from "../components/Auth/login";
import Chatbot from "../components/Chatbot/Chatbot";
import { TravelContext } from "../context/TravelContext.jsx";
import { Polyline } from "react-leaflet";
import { Tooltip } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { signOut } from "../components/Auth/auth.js";

// MapViewSetter component to set the map view
function MapViewSetter({ coords }) {
  const map = useMap();

  useEffect(() => {
    map.setView(coords, map.getZoom());
  }, [coords]);

  return null;
}
// Fix for missing marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function MapComponent() {
  const {
    currentUser,
    setCurrentUser,
    showChat,
    setShowChat,
    userLocation,
    setUserLocation,
  } = useContext(TravelContext);

  const BASE_URL = "https://travelbuddy-backend-dbve.onrender.com";

  const myStorage = window.localStorage;
  //const [currentUser, setCurrentUser] = useState(myStorage.getItem("user")); // Get current user from local storage

  const [pins, setPins] = useState([]); // State to hold pins data
  const [currentPlaceId, setCurrentPlaceId] = useState(null); // State to hold the current place ID
  const [newPlace, setNewPlace] = useState(null); // State to hold the new place data
  const [title, setTitle] = useState(null); // State to hold the current place ID
  const [desc, setDesc] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [rating, setRating] = useState(0);
  const [mapCenter, setMapCenter] = useState([48.8584, 2.2945]);

  useEffect(() => {
    setCurrentUser(myStorage.getItem("user"));
  }, []);

  //custom icon for the marker
  // Slate Blue Icon
  const slateBlueIcon = new L.DivIcon({
    html: `
      <svg width="30" height="40" viewBox="0 0 24 24" fill="slateblue" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5
                 c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 
                 2.5-2.5 2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
      </svg>
    `,
    className: "", // Remove default styling
    iconSize: [30, 40],
    iconAnchor: [15, 40],
    popupAnchor: [0, -20],
  });

  const redIcon = new L.DivIcon({
    html: `
    <svg width="30" height="40" viewBox="0 0 24 24" fill="red" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5
               c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 
               2.5-2.5 2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
    </svg>
  `,
    className: "",
    iconSize: [30, 40],
    iconAnchor: [15, 40],
    popupAnchor: [0, -5],
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/pins`);
        console.log("response from backend:", res);
        // console.log("pins:", res.data);
        setPins(res.data);
        // console.log(pins);
      } catch (error) {
        console.log(error);
      }
    };
    getPins();
  }, []); // Empty dependency array to run only once

  // useEffect(() => {
  //   console.log("Updated pins:", pins);
  // }, [pins]);

  // Function to handle marker click
  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setMapCenter([lat, long]); // Center the map here
    console.log("Marker clicked:", id, lat, long);
  };

  const handleAddCick = (e) => {
    const { lat, lng } = e.latlng;
    setNewPlace({
      lat,
      long: lng,
      username: currentUser,
    });
    setShowChat(false);
    console.log(newPlace);
  };

  function MapDoubleClickHandler({ onDoubleClick }) {
    useMapEvent("dblclick", onDoubleClick);
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const res = await axios.post(`${BASE_URL}/api/pins`, newPin);
      setPins([...pins, res.data]);
      setNewPlace(null); // Clear the new place after submission
    } catch (error) {
      console.log(error);
    }
  };

  // const handleLogout = () => {
  //   myStorage.removeItem("user");
  //   myStorage.removeItem("userId");
  //   setCurrentUser(null);
  //   setPins([]); // Clear pins on logout
  //   setCurrentPlaceId(null); // Clear current place ID on logout
  //   setNewPlace(null); // Clear new place on logout
  // };

  const [issignOut, setisSignOut] = useState(true) 
  const { setIsAuthenticated} = useContext(TravelContext);
  const navigate = useNavigate();

 

  const handleLogout = async (e) => {
     if (issignOut) {
        const { error } = await signOut();
        if (error) {
          //setError(error.message);
          console.log(error.message)
        } else {
          // setSuccess("Signup successful! Redirecting...");
          // setTimeout(() => {
          //   setIsAuthenticated(true);
          // }, 1000);
          console.log("success")
        }
      }

       setIsAuthenticated(false);
    navigate("/login");
  }

  //Set user Location
  //    useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       const coords = [position.coords.latitude, position.coords.longitude];
  //       setUserLocation(coords);
  //       console.log("User location set:", coords);
  //     },
  //     (error) => {
  //       console.error("Location error:", error);
  //     }
  //   );
  // }, []);

  const getDistance = (loc1, loc2) => {
    const point1 = L.latLng(loc1[0], loc1[1]);
    const point2 = L.latLng(loc2[0], loc2[1]);
    const distanceInMeters = point1.distanceTo(point2);
    return distanceInMeters < 1000
      ? `${Math.round(distanceInMeters)} m`
      : `${(distanceInMeters / 1000).toFixed(2)} km`;
  };

  const getMidPoint = (loc1, loc2) => {
    return [(loc1[0] + loc2[0]) / 2, (loc1[1] + loc2[1]) / 2];
  };

  return (
    <div
      style={{ position: "relative", height: "100%" }}
      className=""
      onClick={() => setShowChat(false)}
    >
      <MapContainer
        center={userLocation || [48.8584, 2.2945]} // Center on Eiffel Tower
        zoom={3}
        zoomControl={false}
        style={{ height: "100%", width: "100%" }}
      >
        <MapDoubleClickHandler
          onDoubleClick={handleAddCick}
          transitionDuration="200"
        />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {pins.map((p) =>
          p?.lat != null && p?.long != null ? (
            <Marker
              position={[p.lat, p.long]} //userLocation
              icon={p.username === currentUser ? redIcon : slateBlueIcon}
              eventHandlers={{
                click: () => handleMarkerClick(p._id, p.lat, p.long),
              }}
              key={p._id}
            >
              {p._id === currentPlaceId && (
                <Popup onClose={() => setCurrentPlaceId(null)}>
                  <div className="card popup-card">
                    <label>Place</label>
                    <h4 className="place">{p.title}</h4>
                    <label>Review</label>
                    <p className="desc">{p.desc}</p>
                    <label>Rating</label>
                    <div className="stars">
                      {[...Array(p.rating)].map((_, i) => (
                        <Star key={i} className="star" />
                      ))}
                    </div>
                    <label>Information</label>
                    <span className="username">
                      Created by <b>{p.username}</b>
                    </span>
                    <span className="date">{format(p.createdAt)}</span>
                  </div>
                </Popup>
              )}
            </Marker>
          ) : null
        )}
        {newPlace && currentUser && (
          <Marker position={[newPlace.lat, newPlace.long]} icon={redIcon}>
            <Popup onClose={() => setNewPlace(null)}>
              <div className="form">
                <form onSubmit={handleSubmit}>
                  <label htmlFor="">Title</label>
                  <input
                    type="text"
                    placeholder="Enter a title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label htmlFor="">Review</label>
                  <textarea
                    name=""
                    id=""
                    placeholder="Tell us something about this place"
                    onChange={(e) => setDesc(e.target.value)}
                  ></textarea>
                  <label htmlFor="">Rating</label>
                  <select onChange={(e) => setRating(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button className="submitButton" type="submit">
                    Add Pin
                  </button>
                </form>
              </div>
            </Popup>
          </Marker>
        )}

        {newPlace && currentUser && userLocation && (
          <>
            <Polyline
              positions={[userLocation, [newPlace.lat, newPlace.long]]}
              pathOptions={{ color: "red", weight: 3 }}
            />
            <Marker
              position={getMidPoint(userLocation, [
                newPlace.lat,
                newPlace.long,
              ])}
              icon={L.divIcon({ className: "transparent-icon" })}
            >
              <Tooltip
                permanent
                direction="top"
                offset={[0, -10]}
                className="fade-in-tooltip"
              >
                Distance:{" "}
                {getDistance(userLocation, [newPlace.lat, newPlace.long])}
              </Tooltip>
            </Marker>
          </>
        )}

        <div
          style={{
            position: "absolute",
            top: 10,
            right: 0,
            zIndex: 1000,
          }}
        >
          {currentUser ? (
            <button className="button logout" onClick={handleLogout}>
              Log out
            </button>
          ) : (
            <div className="buttons">
              <button
                className="button login zIndex: 1000"
                onClick={() => {
                  setShowLogin(true);
                  setShowRegister(false);
                }}
              >
                Login
              </button>
              <button
                className="button register zIndex: 1000"
                onClick={() => {
                  setShowRegister(true);
                  setShowLogin(false);
                }}
              >
                Register
              </button>
            </div>
          )}
        </div>

        <div className="navbar">
          <div className="Navlogo">TravelBuddy</div>

          {/* {showRegister && <Register setShowRegister={setShowRegister} />}
          {showLogin && (
            <Login
              setShowLogin={setShowLogin}
              myStorage={myStorage}
              setCurrentUser={setCurrentUser}
            />
          )} */}
        </div>

        <ZoomControl position="bottomleft" />
        <MapViewSetter coords={mapCenter} />
      </MapContainer>
    </div>
  );
}

export default MapComponent;
