import React,{useState} from 'react'
import axios from "axios";


function Login({onLogin}) {

  
  const [form, setValues] = useState({
    username: "",
    password: "",
  });



  let handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit")
    try {
      const response = await
      axios.post(import.meta.env.VITE_SERVER_URL + '/obsidianDb/login', {
        username: form.username,
        password: form.password,
      });
      if (response.data.ok) {
        //password match
        //navigate in 2 seconds
        setTimeout(() => {
          onLogin(
            response.data.token)
          
        }, 10);
      } else {
        setError(response.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  let handleChange= (e) =>{
		setValues({ ...form, 
			[e.target.name]: e.target.value });
	}

  return (
		<form 
		onSubmit={handleSubmit}
		onChange={handleChange}
		className="flex flex-col items-center"
		>
<label className="input input-bordered flex items-center gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
  </svg>
  <input 
    type="text" 
    className="grow" 
    placeholder="username" 
    name="username"
    />
</label>

<label className="input input-bordered flex items-center gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      fillRule="evenodd"
      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
      clipRule="evenodd" />
  </svg>
  <input 
    type="password" 
    className="grow" 
    name="password" />
</label>

    <button className="mt-1 bg-slate-300 p-3 rounded-3xl text-black hover:bg-slate-500">Submit</button>

    </form>
  )
}

export default Login
