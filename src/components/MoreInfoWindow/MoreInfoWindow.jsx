import '../../styles/MoreInfoWindow/more-info-window.css'

import ExitButton from '../CompAux/ExitButton.jsx';

function MoreInfoWindow({ place, setSelectedPlace }) {
  return (
    <div className="more-info-window-container">
      <div className="more-info-window">
        <ExitButton
          handleClick={() => setSelectedPlace(null)} />
        <header>
          <h1 className='place-name' >{place.name}</h1>
        </header>
        <div className='photo-container'>
          <div className='main-exp-image'>
            
          </div>
          <div className='colage'> 
          
          </div>
        </div>
        <div className='button-container-info'>
          <button className='more-info-button'>
            Llamar
          </button>
          <button className='more-info-button'>
            Compartir
          </button>
          <button className='more-info-button'>
            Guardar
          </button>
          <button className='more-info-button'>
            Como llegar
          </button>
        </div>

      </div>

    </div>
  );
}

export default MoreInfoWindow