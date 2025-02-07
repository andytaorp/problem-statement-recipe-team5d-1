import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { RecipesContext } from './context/RecipesContext'
import { AuthContextProvider } from './context/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RecipesContext>
        <App />
      </RecipesContext>
    </AuthContextProvider>
  </React.StrictMode>
);