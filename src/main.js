import { createRoot } from 'react-dom/client';
import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx';
import './index.css';

const root = createRoot(document.getElementById('app'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>);