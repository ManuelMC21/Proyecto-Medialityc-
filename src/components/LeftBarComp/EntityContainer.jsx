import '../../styles/left-bar/entity-container.css'
function EntityContainer({restaurant, onClick}){
  return(
    
    <div className='entity-container' onClick={onClick}>
      <div className="main-image">
        <img className='img-main-image' src={restaurant.image} />
      </div>
      <div className="entity-info">
        <h2 className="entity-name">{restaurant.name}</h2>
        <p><strong>Address:</strong> {restaurant.address}</p>
        <p><strong>Stars:</strong> {restaurant.stars}</p>
      </div>
      
    </div>
  );
}

export default EntityContainer