import React, { useState } from 'react';
import ExitButton from '../CompAux/ExitButton';

import '../../styles/left-bar/search-box.css'
import '../../styles/z-comun/buttons.css'

function SearchBox({ handleChange, searchInput, setSearchInput, results, setResults }) {
  
  const handleCancelation = (e) => {
    setResults(null);
  }
  const handleSearch = (e) => {
    if (searchInput.trim() !== "") {
      setResults(searchInput);
      setSearchInput("");
    }
  }

  return (
    <div className='search-box'>
      <SearchBar
        handleChange={handleChange}
        searchInput={searchInput}
        handleClick={handleSearch}
      />
      {results && (
        <div className='extra-box'>
          <div className='search-container'>
            <p>
              Resultados para <b>"{results}"</b>
            </p>
            <ExitButton handleClick={handleCancelation} />
          </div>
        </div>
      )}
    </div>


  )
}

function SearchBar({ handleChange, searchInput, handleClick }) {
  return (
    <div className='search-block'>
      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          placeholder="Buscar..."
          value={searchInput}
          onChange={handleChange}
        />
        <button className='search-button'
          onClick={handleClick}>
        </button>
      </div>
      <button className='filter-button border-button'>

      </button>
    </div>


  );
}

export default SearchBox