import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ExitButton from '../components/CompAux/ExitButton';
import Field from '../components/CompAux/Field';

import { login } from '../data/functions';


import '../styles/Login-Register/login-register.css'
import '../styles/z-comun/buttons.css'


function Login() {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();

  const handleExit = () => {
    navigate('/');
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleContrasena = (e) => {
    setContrasena(e.target.value);
  };

  const loginFunction = () => {
     login({
         "email": email,
         "password": contrasena
     })
     
   }

   const handleRegister = () => {
    navigate('/register');
   }
  return (
    <div className="container">
      <div className="content-container">
        <div>
          <h1 className='title'>Iniciar Sesion </h1>
          <div className='fields'>
            <ExitButton
            handleClick={handleExit}
            />
            <Field
              placeholder={"Email"}
              handleChange={handleEmail}
              value={email}
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
          <button className='full-button'
          onClick={loginFunction}> Iniciar sesion </button>
          <button className='border-button line-button' onClick={handleRegister}> Registrar </button>

        </div>
        
      </div>
    </div>
  )
}



export default Login