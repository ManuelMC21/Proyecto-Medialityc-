import React, { useEffect, useState } from 'react';
import axios from 'axios'

import '../styles/z-comun/aux-styles.css';

import Map from '../components/Map.jsx';
import TopBar from '../components/TopBar.jsx';
import MoreInfoWindow from '../components/MoreInfoWindow/MoreInfoWindow.jsx';
import LeftBar from '../components/LeftBarComp/LeftBar.jsx';
import { restaurantes } from '../data/data.js'
import RightBar from '../components/RightBar/RightBar.jsx';

function MainApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const [searchInput, setSearchInput] = useState('');

  const [formOpened, setFormOpened] = useState(false);
  const [restaurantes, setRestaurantes] = useState([]);

  return (
    <>
      <Map
        setFormOpened={setFormOpened}
      />
      <div className="content">
        <TopBar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
        <LeftBar
          selectedPlace={selectedPlace}
          setSelectedPlace={setSelectedPlace}
        />
        <RightBar/>

        {selectedPlace && (
          <MoreInfoWindow
            place={selectedPlace} 
            setSelectedPlace={setSelectedPlace}/>
        )}

      </div>
    </>
  )
}

export default MainApp

/*
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

*/