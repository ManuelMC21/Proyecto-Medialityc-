import '../styles/more-info-window.css'
import '../styles/side-bar.css'
import '../styles/aux-styles.css'

function MoreInfoWindow({place}){
  return(
    //Mejorar el codigo de las imagenes
    <div className="more-info-window-container">
      <div className="more-info-window">
        <div className="basic-info-container">
          <h1>{place.name}</h1>
          <div className="image-carousel">
            <div className="basic-image-container main-image">
            <img src={place.image} className="rest-image"/>
            </div>
            <div className="basic-image-container example-image">
            <img src={place.exampleImages[0]} className="rest-image"/>
            </div>
            <div className="basic-image-container example-image">
              <img src={place.exampleImages[1]} className="rest-image"/>
            </div>
          </div>
          
        </div>
        <div className="button-container">
          <button className="basic-button" >
            Como llegar
          </button>
          <button className="basic-button" >
            compartir
          </button>
          <button className="basic-button" > Guardar</button>
          <button className="basic-button" >llamar</button>

        </div>
        <div className="more-info-container">
          <p><strong>Address: </strong> {place.address}</p>
          {place.phone && (
            <p><strong>Phone:</strong> {place.phone}</p>
            )}
            
          {place.services && place.services.length > 0 && (
            <p>
            <strong>Services:</strong> {place.services.join(', ')}
            </p>
            )}
        </div>

      </div>

    </div>
  );
}

export default MoreInfoWindow