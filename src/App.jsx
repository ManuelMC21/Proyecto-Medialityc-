import React, { useState } from 'react';
import SupBar from './components/SupBar.jsx'

import Map from './components/Map.jsx'
import SideBar from './components/SideBar.jsx'
import MoreInfoWindow from './components/MoreInfoWindow.jsx'
import './styles/aux-styles.css'
import { restaurantes } from './data/data.js'
import Formulary from './components/formulary.jsx';
import { Overlay } from './components/MiniComponents.jsx';



function App() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [formOpened, setFormOpened] = useState(true);


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
            place={selectedPlace}
            setSelectedPlace={setSelectedPlace} />
        )}

        {formOpened && (<Overlay><Formulary setFormOpened={setFormOpened}/></Overlay>)}

      </div>
    </>
  )
}

export default App
