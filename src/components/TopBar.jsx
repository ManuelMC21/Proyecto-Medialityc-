import { useNavigate } from 'react-router-dom'; 

import '../styles/top-bar/top-bar.css'; 
import '../styles/z-comun/buttons.css';


function TopBar({isLoggedIn, setIsLoggedIn}) {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
};
const handleRegister = () => {
  navigate('/register'); 
};

  return(
    <header className='top-bar'>
      <div className='left-part part'>
        <img className='logo-image' 
        src="https://via.placeholder.com/20" 
        alt="Web Logo"/>
        <h1 className='web-name'>
          Map Track
        </h1>
      </div>
      
      <div className='right-part part'>
        {isLoggedIn ? (
           <div className='user-box'>
            <div className='profile-container'> 
              <img
               src="https://via.placeholder.com/30" 
               alt="Profile Image"
               />
            </div>
            <p className='user-name'>Hola</p>
           </div>
        ) : (
          <div className='initial-buttons'>
            <button className='text-button'
            onClick={handleRegister}
            > Registrar </button>
            <button className='text-button'
            onClick={handleLogin}
            > iniciar sesion </button>
          </div>
        )}
      </div>

    </header>
  );
}

export default TopBar;
