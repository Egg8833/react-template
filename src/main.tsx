/* eslint-disable @typescript-eslint/no-unused-vars */
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {MaterialWrapper} from './lib/materialUi.tsx'
// import 'virtual:uno.css'
// import {BrowserRouter} from 'react-router'
import ReactDOM from "react-dom/client";

const root = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(root).render(
  <StrictMode>

      <MaterialWrapper>
        <App />
      </MaterialWrapper>

  </StrictMode>
)
