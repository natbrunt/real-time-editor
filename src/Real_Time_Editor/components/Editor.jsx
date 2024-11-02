import React from 'react'

function Editor({text, handleChange, setEdit, save}) {
  return (
    <>
    <textarea 
        rows="10"
        cols="45"
        value={text}
        onChange={handleChange}
    />
    <button onClick={() => {save(),setEdit((prevState) => !prevState)}}>Save</button>
    </>
  )
}

export default Editor