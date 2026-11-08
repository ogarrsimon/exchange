import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { CurrencyProvider } from './currency_context.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CurrencyProvider>
      <App />
    </CurrencyProvider>
    
  </StrictMode>,
)
