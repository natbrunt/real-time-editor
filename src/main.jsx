import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import FrontendReal_TimeEditor from './FrontendReal_TimeEditor'
import Login from './Login'
import * as jose from 'jose'
import axios from 'axios'

const App = () => {
  const [admin, setAdmin] = useState(false);
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));


  /* token section of this code could be revised */

  let loginHandle = (token) => {
    let decodedToken = jose.decodeJwt(token);
    setAdmin(decodedToken.admin);
    localStorage.setItem("token", JSON.stringify(token));
  }

 useEffect(() => {
  const verify_token = async () => {
    try {
      if(!token){
        setAdmin(false);
      } else {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Ensure 'Bearer' is included
        const response = await axios.get(import.meta.env.VITE_SERVER_URL+'/obsidianDb/verify-token');
        return response.data.ok ? (loginHandle(token), console.log('admin')) : (setAdmin(false), console.log('not an admin'));}
   }catch(error){console.log(error)}}
  verify_token();
 }, [token])
 

 if(admin == true) return (<FrontendReal_TimeEditor />)
 if(admin == false) return(<Login onLogin={loginHandle} token={token} />)
  else return(<div>mounting</div>)
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);