import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ExitButton from '../components/CompAux/ExitButton';
import Field from '../components/CompAux/Field';
import { register } from '../data/functions';

import '../styles/Login-Register/login-register.css'
import '../styles/z-comun/buttons.css'

import '../styles/top-bar/top-bar.css';
import '../styles/z-comun/buttons.css';


function Register() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
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

  const registerFunction = () => {
    register({
        "fullName": nombre,
        "email": email,
        "password": contrasena
    })
  }

  const handleLogin = () => {
    navigate('/login');
  }

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
          <button className='full-button' onClick={registerFunction}> Registrar </button>
          <button className='border-button line-button' onClick={handleLogin}> Iniciar sesion </button>

        </div>

      </div>
    </div>
  )
}



export default Register