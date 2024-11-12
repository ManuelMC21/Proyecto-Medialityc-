import '../styles/side-bar.css'
import '../styles/aux-styles.css'
import { restaurantes } from '../data/data.js'


function SideBar({children, setSelectedPlace }){
  return(
    <div className="side-bar">
      {children}
      {/*<Welcome/>*/}
      <SearchResultsWindow setSelectedPlace={setSelectedPlace}/>
    </div>
  
  );
}

export default SideBar;

function SearchResultsWindow({ setSelectedPlace }){
  return(
    <SideBarWindow title="Resultados">
      <SearchContainer setSelectedPlace={setSelectedPlace}/>   
    </SideBarWindow>
  );
}

function SearchContainer({ setSelectedPlace }){
  return(
    <div className="search-container">
      {restaurantes.map((restaurante, index) => (
        <RestaurantContainer
          key={index}
          restaurant={restaurante}
          onClick={() => setSelectedPlace(restaurante)}
        />
      ))}
  </div>
);
  
}
function RestaurantContainer({restaurant, onClick  }){
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