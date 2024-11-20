import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMapEvents, FeatureGroup, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import '../styles/map-styles.css'
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});
function Map({ setFormOpened }) {
    const [position, setPosition] = useState([23.065709745023, -82.375883838068]);
    const [rightClickPosition, setRightClickPosition] = useState([23.065709745023, -82.375883838068]);

    const [visible, setVisible] = useState(false);
    const [markers, setMarkers] = useState([]);
    const [figures, setFigures] = useState([]);
    const [currentPoints, setCurrentPoints] = useState([]);
    const [constructorMode, setConstructorMode] = useState(false);

    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

    const handleRightClick = (e) => {
        setRightClickPosition(e.latlng);
    };

    const handleClick = (e) => {
        if (constructorMode && !visible) {
            alert(`Latitud: ${e.latlng.lat}, Longitud: ${e.latlng.lng}`);
            const newPoint = [e.latlng.lat, e.latlng.lng];
            setCurrentPoints((prevPoints) => [...prevPoints, newPoint]);
        }
    }

    const handleOption2 = () => {
        setConstructorMode(!constructorMode);
        constructorMode ? alert('Constructor mode off') : alert("Constructor mode on");
        if (!constructorMode) {
            if (currentPoints.length > 0) {
                setFigures((prev) => [...prev, currentPoints]);
                setCurrentPoints([]);
            }
        }
    };

    const handleOption1 = (e) => {
        setFormOpened(true);
        addMarker();
    };

    const addMarker = () => {
        const newMarkerPosition = rightClickPosition;
        setMarkers((prevMarkers) => [...prevMarkers, newMarkerPosition]);
    }

    const handleCircleMarkerDragEnd = (index) => (e) => {
        e.target.closePopup(); // Cierra el popup si está abierto
        const newPosition = [e.target.getLatLng().lat, e.target.getLatLng().lng];
        const updatedPoints = [...currentPoints];
        updatedPoints[index] = newPosition; // Actualizar la posición del punto arrastrado
        setCurrentPoints(updatedPoints);
    };

    const handleCircleMarkerDragStart = (e) => {
        e.target.on('drag', () => {
            e.target.closePopup(); // Cierra el popup durante el arrastre
        });
    };

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
                handleRightClick={handleRightClick}
                handleClick={handleClick}
            />
            <PopupMenu
                action1={handleOption1}
                action2={handleOption2}
                setVisible={setVisible}
                visible={visible} />

            {figures.map((figure, index) => (
                <Polygon key={`figure-${index}`} positions={figure} color="blue" />
            ))}

            {currentPoints.length > 0 && (
                <>
                    <Polygon positions={currentPoints} color="red" />
                    {currentPoints.map((point, index) => (
                        <CircleMarker
                            key={`circle-marker-${index}`}
                            center={point}
                            radius={5}
                            color="blue"
                            className="leaflet-circle-marker"
                            fillColor="blue"
                            fillOpacity={0.5}
                            draggable={true}
                            eventHandlers={{
                                dragend: handleCircleMarkerDragEnd(index),
                                dragstart: handleCircleMarkerDragStart,
                            }}
                        >
                            <Popup>
                                Coordenadas: {point[0]}, {point[1]}
                            </Popup>
                        </CircleMarker>
                    ))}
                </>
            )}

            <FeatureGroup>
                {markers.map((position, idx) => (
                    <Marker className="mark" key={`marker-${idx}`} position={position}>
                        <Popup className="mark-popup" >
                        </Popup>
                    </Marker>
                ))}
            </FeatureGroup>

        </MapContainer>
    );
}

const MapEventsHandler = ({ handleClick, handleRightClick }) => {
    const map = useMapEvents({
        contextmenu: handleRightClick,
        click: handleClick,
    });

    return null;
};

const PopupMenu = ({ action1, action2, setVisible, visible }) => {
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
                cursor: visible ? 'context-menu' : (isGrabbing ? 'grabbing' : 'grab'),
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
                        action2();
                        setVisible(false);
                    }}>Dibujar figura</button>
                </div>
            )}
        </div>
    );
};




export default Map;