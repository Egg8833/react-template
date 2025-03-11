import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MaterialWrapper } from "./lib/materialUi.tsx";
// import 'virtual:uno.css'




createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MaterialWrapper>
      <App />
    </MaterialWrapper>
  </StrictMode>,
)
