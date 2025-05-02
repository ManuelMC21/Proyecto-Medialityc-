import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/map-styles.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import axios from 'axios';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

function Map({ setFormOpened, formOpened, setMarkers, markers }) {

    const [position] = useState([23.065709745023, -82.375883838068]);
    const [rightClickPosition, setRightClickPosition] = useState(null);
    const [menuVisible, setMenuVisible] = useState(false);
    const menuRef = useRef(null);

    const loadEntities = async () => {
        try {
            const response = await axios.get('http://localhost:5009/api/entities');
            const entities = response.data;
    
            const newMarkers = entities.map((entity, index) => ({
                id: index + 1,
                typeId: entity.entityTypeId,
                position: [entity.latitude, entity.longitude],
            }));
    
            setMarkers(newMarkers);
            
        } catch (error) {
            console.error("Error al cargar entidades:", error);
        }
    };
    

    useEffect(() => {
        loadEntities();
    }, []);

    

    const handleRightClick = (e) => {
        if (!formOpened) {
            const map = e.target;
            const containerPoint = map.latLngToContainerPoint(e.latlng);
            setRightClickPosition({
                containerPoint,
                latLng: e.latlng
            });
            setMenuVisible(true);
        }

    };

    const closeMenu = () => {
        setMenuVisible(false);
    };

    const handleOption1 = () => {
        if (rightClickPosition) {
            console.log("Añadido marcador");
            const newMarkerPosition = {
                id: null,
                typeId: null,
                position: [rightClickPosition.latLng.lat, rightClickPosition.latLng.lng],
            };
            setMarkers((prevMarkers) => [...prevMarkers, newMarkerPosition]);
        }

        setFormOpened(true);
        closeMenu();
    };

    const handleClickOutsideMenu = (event) => {
        if (menuVisible && menuRef.current && !menuRef.current.contains(event.target)) {
            closeMenu();
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutsideMenu);
        return () => {
            document.removeEventListener('click', handleClickOutsideMenu);
        };
    }, [menuVisible]);

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
            <MapEventsHandler handleRightClick={handleRightClick} />

            <FeatureGroup>
    {markers.map((marker, idx) => {
        return (
            <Marker key={`marker-${idx}`} position={marker.position}>
                <Popup>
                    {marker.id ? "Contenido del Popup" : "popup vacío"}
                </Popup>
            </Marker>
        );
    })}
</FeatureGroup>



            {menuVisible && rightClickPosition && (
                <ContextMenu position={rightClickPosition.containerPoint} onClose={closeMenu} ref={menuRef}
                    handleOption1={handleOption1} />
            )}
        </MapContainer>
    );
}

const MapEventsHandler = ({ handleRightClick }) => {
    useMapEvents({
        contextmenu: handleRightClick,
    });

    return null;
};

const ContextMenu = React.forwardRef(({ position, onClose, handleOption1 }, ref) => {
    const handleMenuClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="context-menu" style={{ left: position.x, top: position.y }} ref={ref} onClick={handleMenuClick}>
            <ul>
                <li onClick={handleOption1}>Añadir entidad</li>
            </ul>
        </div>
    );
});

export default Map;
