import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Map() {
  return (
    <MapContainer 
      center={[51.505, -0.09]} 
      zoom={13} 
      style={{ height: '100vh', width: '100%', position: 'fixed', top: 0, left: 0, zIndex: 1 }} 
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
}

export default Map;