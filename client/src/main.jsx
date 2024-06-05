import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/Auth.jsx';
import { SearchProvider } from './context/Search.jsx';
import { CartProvider } from './context/Cart.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      
      <SearchProvider>
        <CartProvider>
        <App />
        </CartProvider>
      </SearchProvider>
      
    </AuthProvider>
  </React.StrictMode>
)
