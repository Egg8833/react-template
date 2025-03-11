// import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button, Typography } from "@mui/material";
import { useCounterStore } from "./store/counterStore.ts";

function App() {
 const { count, increment, decrement } = useCounterStore();

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" className=''>
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className='text-3xl font-bold text-red underline'>Vite + React</h1>
       <Typography variant="h5">Count: {count}</Typography>
      <Button variant="contained" color="primary" onClick={increment} style={{ margin: "10px" }}>
        Increment
      </Button>
      <Button variant="contained" color="secondary" onClick={decrement}>
        Decrement
      </Button>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
