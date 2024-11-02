import React from 'react'

function Navbar({setId, data}) {
  return (
    <div className="dropdown fixed top-0 left-0">
      <div tabIndex={0} role="button" className="btn m-1">Menu</div>
      <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
        {data.map((obj,id) => (
          
            <p tabIndex={0} className='hover:bg-gray-700 cursor-pointer' key={id} onClick={() => {setId(id)}}>
            {obj.name}</p>
          
        ))}
      </ul>
    </div>
  )
}

export default Navbar