import React from 'react';
import { createRoot } from 'react-dom/client';
import "./main.css"
import { IonReactRouter } from '@ionic/react-router';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <IonReactRouter>
    <App />
  </IonReactRouter>
);