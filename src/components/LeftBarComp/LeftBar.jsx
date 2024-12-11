import React, { useState } from 'react';
import EntityContainer from './EntityContainer';
import { restaurantes } from "../../data/data"
import '../../styles/left-bar/left-bar.css'
import SearchBox from "./SearchBox"

function LeftBar({selectedPlace, setSelectedPlace}) {
  const [searchInput, setSearchInput] = useState('');
  const [results, setResults] = useState("");
  const [places, setPlaces] = useState(restaurantes);


  const onClick = (restaurant) => setSelectedPlace(restaurant);

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };
  const handleResults = (prop) => {
    setResults(prop);
    //search
  }

  return (
    <div className="left-bar-container">
      
      <SearchBox
      
        handleChange={handleChange}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setResults={handleResults}
        results={results}

      />
      <div className='options-container'>
        
        {places.map((restaurant, index) => (
          <EntityContainer
            key={restaurant.id}
            restaurant={restaurant}
            onClick={() => onClick(restaurant)}
          />
        ))}

      </div>
    </div>

  )
}

export default LeftBar