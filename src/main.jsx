import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import FrontendReal_TimeEditor from './FrontendReal_TimeEditor'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; 
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
        console.log(response);
        return response.data.ok ? loginHandle(token) : setAdmin(false);}
   }catch(error){console.log(error)}}
  verify_token();
 }, [token])
 


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={loginHandle} token={token}/>} />
        <Route path="/secret" element={admin ? <FrontendReal_TimeEditor /> : <div aria-label="Forbidden">Forbidden</div>} />
      </Routes>
    </Router>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
