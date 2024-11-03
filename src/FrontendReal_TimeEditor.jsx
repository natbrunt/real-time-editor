import React, { useState, useEffect, useCallback } from 'react';
import MarkdownDisplay from './Real_Time_Editor/components/MarkdownDisplay.jsx';
import Navbar from './Real_Time_Editor/components/Navbar.jsx'
import Editor from './Real_Time_Editor/components/Editor.jsx'
import axios from 'axios'

const FrontendReal_TimeEditor = ({admin}) => {
  


  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [sessionId, setId] = useState(0)
  const [text, setText] = useState("ComponentDidMount"); // Initialize state for the textarea
  const [edit, setEdit] = useState(false)

  let save = async() => {
    try {
      const response= await axios.post(`${import.meta.env.VITE_SERVER_URL}/obsidianDb/update`,{name:data[sessionId].name, value:text})
      console.log(response)
    } catch (error) {
      console.log(error)
      setError(error)
    }
  }

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_SERVER_URL + '/obsidianDb/find');
        console.log(response)
        setData(response.data.notes)
        setText(response.data.notes[0].value)
      } catch (err) {
        console.log(err)
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // The empty array means this effect runs once when the component mounts

  








  useEffect(()=>{
    data !== null && setText(data[sessionId].value)
  },[sessionId])

  const handleChange = (e) => {
    setText(e.target.value); // Update state as you type
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  admin ?
  return (
    <>
      
      <section className='flex flex-col items-center fixed top-0 left-4 space-y-16'>
        <h1>{data[sessionId].name}</h1>
        { edit ? <Editor handleChange={handleChange} text={text} setEdit={setEdit} save={save}/> : <MarkdownDisplay content={text} setEdit={setEdit} /> }
      </section>
      <Navbar setId={setId} data={data}/>
    </>
  );

  : return (<>Forbidden</>)
};

export default FrontendReal_TimeEditor;
