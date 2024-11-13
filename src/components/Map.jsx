import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, FeatureGroup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import '../styles/map-styles.css'
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});
function Map() {
    const [position, setPosition] = useState([23.065709745023, -82.375883838068]);
    const [rightClickPosition, setRightClickPosition] = useState([23.065709745023, -82.375883838068]); 

    const [markers, setMarkers] = useState([]);

    const handleMapClick = (e) => {
      addMarker();
    };

    const handleRightClick = (e) => {
      setRightClickPosition(e.latlng);
  };

  const handleOption2 = () => {
      alert('Waos');
  };

  const addMarker = () => {
    const newMarkerPosition = rightClickPosition;
    setMarkers((prevMarkers) => [...prevMarkers, newMarkerPosition]);
  }


    return (
        <MapContainer 
            center={position} 
            zoom={13} 
            style={{ height: '100vh', width: '100%', position: 'fixed', top: 0, left: 0 }} 
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapEventsHandler 
                handleMapClick={handleMapClick}
                handleRightClick= {handleRightClick} 
            />
            <PopupMenu 
            action1={addMarker} 
            action2={handleOption2} />

            <FeatureGroup>
                        {markers.map((position, idx) => (
                            <Marker className="mark" key={`marker-${idx}`} position={position}>
                                <Popup className="mark-popup" >
                                  aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                                </Popup>
                            </Marker>
                        ))}
                    </FeatureGroup>
     
        </MapContainer>
    );
}

const MapEventsHandler = ({ handleMapClick, handleRightClick}) => {
  const map = useMapEvents({
      click: handleMapClick,
      contextmenu: handleRightClick,

  });

  return null; 
};

const PopupMenu = ({action1, action2}) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isGrabbing, setIsGrabbing] = useState(false); 

  const handleContextMenu = (event) => {
      event.preventDefault();
      setPosition({ x: event.pageX, y: event.pageY });
      setVisible(true);
  };

  const handleClick = () => {
      if (visible) {
          setVisible(false); 
      }
  };

  const handleMouseDown = () => {
      setIsGrabbing(true); 
  };

  const handleMouseUp = () => {
      setIsGrabbing(false); 
  };

  return (
      <div className='custom-popup'
          onClick={handleClick} 
          onContextMenu={handleContextMenu} 
          onMouseDown={handleMouseDown} 
          onMouseUp={handleMouseUp}
          style={{ 
              cursor: visible ?  'context-menu' : (isGrabbing ? 'grabbing' : 'grab'),
          }}
      >
          {visible && (
              <div className="popup-container" style={{  
                  top: position.y - 60, 
                  left: position.x, 
              }}>
                  <button onClick={() => {
                    action1();
                    setVisible(false);
                    }}>Añadir Lugar</button>
                  <button onClick={() => {

                    setVisible(false);
                    }}>Dibujar figura</button>
              </div>
          )}
      </div>
  );
};




export default Map;