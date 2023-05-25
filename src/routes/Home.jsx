import React from 'react'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
function Home() {
  return (
    <div>
      <GoogleLogin onSuccess={loginGoogle} onFailure={console.log} />
      {see && <button onClick={logout}>Log out</button>}
    </div>
  )
}

export default Home
