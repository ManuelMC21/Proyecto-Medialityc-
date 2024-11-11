import '../styles/search-bar.css'

function SearchBar(){
  return(
    <div className='search-bar'>
      <div className='search-box'>
        <input type="text" className='search-input' />
        <button className='search-button'>-O</button>
        
      </div>
      <button className='direction-button'></button>
      
    </div>

  );
}

export default SearchBar