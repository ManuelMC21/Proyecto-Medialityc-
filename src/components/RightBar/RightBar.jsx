import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

import ExitButton from '../CompAux/ExitButton';
import '../../styles/right-bar/right-bar.css'

function RightBar() {
  const navigate = useNavigate();
  const [optionSelect, setOptionSelect] = useState(null);
  const [options, setOptions] = useState([]);

  const handleUser = () => {
    navigate('/user');
  };
  const handleFavoritos = () => {
    console.log("lito");
    setOptionSelect(1);
  }
  const handleAnadidos = () => {
    setOptionSelect(2);
  }
  const handleExit = () => {
    setOptionSelect(null);
  }

  return (
    <div className={`right-bar ${optionSelect ? 'expanded' : ''}`}>
      <div className="user-option-container">
        <button className="user-option"
          onClick={handleFavoritos}>
          Favoritos
        </button>
        <button className="user-option"
          onClick={handleAnadidos}>
          Anadidos
        </button>
        <button className="user-option"
          onClick={handleUser}>
          Editar Perfil

        </button>
      </div>
      {optionSelect &&
        (<div className='extra-info'>
          <div className='extra-title'>
            <ExitButton
              handleClick={handleExit} />
            {optionSelect === 1 ? "Favoritos" : "Anadidos"}
          </div>
          <div className='entity-container2'>

            
          </div>

        </div>)
      }
    </div>
  );

}

export default RightBar