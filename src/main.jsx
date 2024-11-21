import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import FrontendReal_TimeEditor from './FrontendReal_TimeEditor'
import Login from './Login'
import * as jose from 'jose'


const App = () => {

  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));


  /* token section of this code could be revised */

  let loginHandle = (token) => {
    let decodedToken = jose.decodeJwt(token);
    setData(decodedToken.admin);
    localStorage.setItem("token", JSON.stringify(token));
  }

 useEffect(() => {
  const verify_token = async () => {
    try {
      if(!token){
        console.log("No token found")
      } 
      else{ loginHandle(token)}
   }catch(error){console.log(error)}}
  verify_token();
 }, [token])
 

return (<FrontendReal_TimeEditor />)

  
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);