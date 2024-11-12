import '../styles/side-bar.css'
import { restaurantes } from '../data/data.js'


function SideBar({children}){
  return(
    <div className="side-bar">
      {children}
      {/*<Welcome/>*/}
      <SearchResultsWindow/>
    </div>
  
  );
}

export default SideBar;

function SearchResultsWindow(){
  return(
    <SideBarWindow title="Resultados">
      <SearchContainer/>   
    </SideBarWindow>
  );
}

function SearchContainer(){
  return(
    <div className="search-container">
      {restaurantes.map((restaurante, index) => (
        <RestaurantContainer
          key={index}
          restaurant={restaurante}
        />
      ))}
  </div>
);
  
}
function RestaurantContainer({restaurant }){
  return(
    <div className="restaurant-container">
      <div className="rest-image-container">
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

function Welcome(){
  return(
    <SideBarWindow
    title="Welcome to Open Track!"
    >
      <p>OpenStreetMap is a map of the world, created by people like you and free to use under an open license. Hosting is supported by Fastly, OSMF corporate members, and other partners. </p>
    </SideBarWindow>
  )
}

function SideBarWindow({title = "NONE", children}){
  return(
    <div className="side-bar-window">
      <div className="window-header" >
        <h1>{title}</h1>
        <button className="close-button">X</button>
      </div>
      {children}
    </div>
  );
}