import React, { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'

function Login() {
  //estado para almacenar los datos de usuario
  const [newUser, setNewUser] = useState({})
  //estado de prueba para mostrar el logout lo pueden cambiar
  const [see, setSee] = useState(false)

  //funcion para hacer el login y el registro a traves de google
  const loginGoogle = async (response) => {

    //verifica que no existe un usuario logueado
    // si existe lo desloguea antes de cambiar de cuenta o registrar
    if (localStorage.key('correo') || newUser.correo) {
      google.accounts.id.revoke(
        newUser.correo || localStorage.getItem('correo'),
        (done) => done
      )
    }

    //envia las credenciales al servidor para registrarlo en la base de datos
    try {
      const credential = { id_token_google: response.credential }
      const info = await fetch(
        'https://ncback-production.up.railway.app/api/auth/google',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credential)
        }
      )
      const data = await info.json()
      
      // data contiene el token de acceso y el usuario
      const { usuario } = data
      //usuario contiene todos los datos del usuario guardados en la bd
      console.log(usuario)
      setNewUser(usuario)
      // verificar en vercel si guarda en el local storage
      localStorage.setItem('correo', usuario.correo)
      setSee(true)
    } catch (error) {
      console.log('error al obtener los datos del usuario: ', error)
    }
  }

  // funcion para desloguear al usuario
  const logout = () => {
    // evita el inicio de sesion automatico
    google.accounts.id.disableAutoSelect()
    // revoke: desloguea el usuario a traves del correo
    google.accounts.id.revoke(
      newUser.correo || localStorage.getItem('correo'),
      (done) => {
        localStorage.removeItem('correo')
        done
        location.reload()
      }
    )
  }

  return (
    <div>
      <h2>REACT GOOGLE LOGIN</h2>
      <GoogleLogin
        onSuccess={loginGoogle}
        onFailure={console.log}
        type='icon'
      />
      <GoogleLogin
        onSuccess={loginGoogle}
        onFailure={console.log}
        type='standard'
      />
      {see && <button onClick={logout}>Log out</button>}
    </div>
  )
}

export default Login
