import react from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='CLIENT_ID_GOOGLE_ENV'>
    <App />
  </GoogleOAuthProvider>
)
