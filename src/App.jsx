import React, { useState} from 'react';
import SupBar from './components/SupBar.jsx'
import SearchBar from './components/SearchBar.jsx'
import Map from './components/Map.jsx'
import SideBar from './components/SideBar.jsx'
import MoreInfoWindow from './components/MoreInfoWindow.jsx'
import './styles/aux-styles.css'
import { restaurantes } from './data/data.js'

function App() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  

  return (
    <>
      <Map 
      />
      <div className="content">
        <SupBar />
        <SideBar setSelectedPlace={setSelectedPlace}>
          <SearchBar />
        </SideBar> 
        {selectedPlace && (
          <MoreInfoWindow 
          place={selectedPlace}
          setSelectedPlace={setSelectedPlace} />
        )}
      </div>
    </>
  )
}

export default App
