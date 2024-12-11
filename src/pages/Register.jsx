import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ExitButton from '../components/CompAux/ExitButton';
import Field from '../components/CompAux/Field';


import '../styles/Login-Register/login-register.css'
import '../styles/z-comun/buttons.css'

import '../styles/top-bar/top-bar.css';
import '../styles/z-comun/buttons.css';


function Register() {
  const [nombre, setNombre] = useState('');
  const [Email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();

  const handleExit = () => {
    navigate('/');
  };
  const handleNombre = (e) => {
    setNombre(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleContrasena = (e) => {
    setContrasena(e.target.value);
  };

  return (
    <div className="container">
      <div className="content-container">
        <div>
          <h1 className='title'>Crear Cuenta </h1>
          <div className='fields'>
            <ExitButton 
              handleClick={handleExit}
            />
            <Field
              placeholder={"Nombre"}
              handleChange={handleNombre}
              value={nombre}
            />
            <Field
              placeholder={"Email"}
              handleChange={handleEmail}
              value={Email}
            />
            <Field
              placeholder={"Contrasena"}
              handleChange={handleContrasena}
              value={contrasena}
              visible={false}
            />
          </div>
        </div>
        <div className='button-container'>
          <button className='full-button'> Registrar </button>
          <button className='border-button line-button'> Iniciar sesion </button>

        </div>

      </div>
    </div>
  )
}



export default Register