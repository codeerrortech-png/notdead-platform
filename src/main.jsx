import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import ScrollToTop from './components/ScrollToTop'
import SkullNavigator from './components/SkullNavigator'
import HackerRain from './components/HackerRain'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <HackerRain />
      <ScrollToTop />
      <App />
      <SkullNavigator />
    </BrowserRouter>
  </React.StrictMode>,
)
