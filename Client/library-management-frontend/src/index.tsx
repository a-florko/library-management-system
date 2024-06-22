import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './components/Router';
import { GlobalStateProvider } from './context/GlobalStateContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <GlobalStateProvider>
    <React.StrictMode>
      <Router />
    </React.StrictMode>
  </GlobalStateProvider>
);
