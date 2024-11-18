import '../styles/side-bar.css'
import '../styles/aux-styles.css'
import SearchBar from './SearchBar.jsx'
import React, { useState} from 'react';
import { restaurantes } from '../data/data.js'


function SideBar({children, setSelectedPlace }){
  const [welcomeVisible, setWelcomeVisible] = useState(true);
  const [searchVisible, setSearchVisible] = useState(true);

  return(
    <div className="side-bar">
      {children}
      <SearchBar />
      {welcomeVisible && (<Welcome
      setWelcomeVisible={setWelcomeVisible}/>)}
      {!welcomeVisible && searchVisible && (
         <SideBarWindow title="Resultados"
         onClick={()=> setSearchVisible(false)}>
         <SearchContainer 
         setSelectedPlace={setSelectedPlace}
         lugares={restaurantes}
         /> 
         </SideBarWindow>
      )}
     
    </div>
  
  );
}

function SearchContainer({ setSelectedPlace, lugares}){
  const onClick = (restaurant) => setSelectedPlace(restaurant);

  return(
    <div className="search-container">
      {lugares.map((restaurant) => (
        <RestaurantContainer
          key={restaurant.id}
          restaurant={restaurant}
          onClick={() => onClick(restaurant)} 
        />
      ))}
  </div>
);
  
}
function RestaurantContainer({restaurant, onClick}){
  return(
    
    <div className="restaurant-container" onClick={onClick}>
      
      <div className="rest-image-container basic-image-container">
        <img className="rest-image" src={restaurant.image} />
      </div>
      <div className="rest-info">
        <h2>{restaurant.name}</h2>
        <p><strong>Address:</strong> {restaurant.address}</p>
        <p><strong>Stars:</strong> {restaurant.stars}</p>
      </div>
      
    </div>
  );
}

function Welcome({setWelcomeVisible}){
  const onClick = () => setWelcomeVisible(false);

  return(
    <SideBarWindow
    title="Welcome to Open Track!"
    onClick={onClick}
    >
      <p>OpenStreetMap is a map of the world, created by people like you and free to use under an open license. Hosting is supported by Fastly, OSMF corporate members, and other partners. </p>
    </SideBarWindow>
  )
}

function SideBarWindow({title = "NONE", onClick, children}){
  return(
    <div className="side-bar-window">
      <div className="window-header" >
        <h1>{title}</h1>
        <button className="close-button" onClick={onClick
        }>X</button>
      </div>
      {children}
    </div>
  );
  
}

export default SideBar;