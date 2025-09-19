import React from 'react'
import { CircularProgress } from '@mui/material';
import mainlogo from "../images/SM_Logo.png";
const electron = window.require("electron");

function Homepage() {

  React.useEffect(() => {
    const timer = setTimeout(() => {
      electron.ipcRenderer.send('Timeout', true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [])

  return (
    <div className="flex flex-col w-4/5 mx-auto text-center p-3 my-16">
      <img src={mainlogo} alt="logo" className="w-full" />
      <p
        className='title-font my-3 text-red-950 tracking-wider '
      >Showman <span className="text-black">Tailors</span></p>
      <CircularProgress className='mx-auto' sx={{
        '& .MuiCircularProgress-circle': { stroke:"#450a0a"}
      }} />
    </div>
  )
}

export default Homepage