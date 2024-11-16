import React, { useState} from 'react';
import SupBar from './components/SupBar.jsx'
import SearchBar from './components/SearchBar.jsx'
import Map from './components/Map.jsx'
import SideBar from './components/SideBar.jsx'
import MoreInfoWindow from './components/MoreInfoWindow.jsx'
import './styles/aux-styles.css'
import { restaurantes } from './data/data.js'
import Formulary from './components/formulary.jsx';

function App() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [FormOpened, setFormOpened] = useState(false);

  return (
    <>
      <Map 
      setFormOpened={setFormOpened}
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
