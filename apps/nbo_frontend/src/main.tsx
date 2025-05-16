import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {MaterialWrapper} from './lib/materialUi.tsx'
import 'virtual:uno.css'
import {TanstackQuery} from './lib/tanstackQuery.tsx'

const root = document.getElementById('root') as HTMLElement

ReactDOM.createRoot(root).render(
  <StrictMode>
    <TanstackQuery>
      <MaterialWrapper>
        <App />
      </MaterialWrapper>
    </TanstackQuery>
  </StrictMode>
)
