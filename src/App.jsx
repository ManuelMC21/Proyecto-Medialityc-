import React, { useEffect, useState } from 'react';
import SupBar from './components/SupBar.jsx'
import Map from './components/Map.jsx'
import SideBar from './components/SideBar.jsx'
import MoreInfoWindow from './components/MoreInfoWindow.jsx'
import './styles/aux-styles.css'
import { restaurantes } from './data/data.js'
import Formulary from './components/formulary.jsx';
import { Overlay } from './components/MiniComponents.jsx';
import axios from 'axios'



function App() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [formOpened, setFormOpened] = useState(false);
  const [restaurantes, setRestaurantes] = useState([]);



  const addRestaurant = async (newRestaurant) => {
    try {
      console.log("intento")
      const jsonData = JSON.stringify(newRestaurant);
      console.log(jsonData);
      const response = await axios.post('http://localhost:5000/Restaurants', jsonData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setRestaurantes(prevRestaurantes => [...prevRestaurantes, response.data]);
    } catch (error) {
      console.error('Error al agregar el restaurante:', error);
    }
  };


  return (
    <>
      <Map
        setFormOpened={setFormOpened}
      />
      <div className="content">
        <SupBar />
        <SideBar setSelectedPlace={setSelectedPlace}>
        </SideBar>

        {selectedPlace && (
          <MoreInfoWindow
            place={selectedPlace} />
        )}

        {formOpened && (<Overlay><Formulary
          addRestaurant={addRestaurant}
          setFormOpened={setFormOpened} /></Overlay>)}

      </div>
    </>
  )
}

export default App
