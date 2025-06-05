// components/TravelMap.jsx
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useContext } from "react";
import { TravelContext } from "../context/TravelContext";
import L from "leaflet";

// Custom icon for better visibility
const redIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const TravelMap = () => {
  const { userLocation, currentUser } = useContext(TravelContext);

  // Example of new marked place - replace with actual value
  const markedPlace = currentUser?.markedPlace; // e.g., { lat: 25.276987, lng: 55.296249 }

  const userLatLng = userLocation
    ? [userLocation.lat, userLocation.lng]
    : null;

  const markedLatLng = markedPlace
    ? [markedPlace.lat, markedPlace.lng]
    : null;

  return (
    <div className="w-full h-[400px]">
      <MapContainer
        center={userLatLng || [0, 0]}
        zoom={5}
        scrollWheelZoom={true}
        className="w-full h-full rounded"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {userLatLng && (
          <Marker position={userLatLng}>
            <Popup>Your Location</Popup>
          </Marker>
        )}

        {markedLatLng && (
          <Marker position={markedLatLng} icon={redIcon}>
            <Popup>Marked Destination</Popup>
          </Marker>
        )}

        {userLatLng && markedLatLng && (
          <Polyline
            positions={[userLatLng, markedLatLng]}
            pathOptions={{ color: "red", weight: 4 }}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default TravelMap;
