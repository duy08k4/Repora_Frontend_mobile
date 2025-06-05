import React from 'react';
import { createRoot } from 'react-dom/client';
import "./main.css"
import { IonReactRouter } from '@ionic/react-router';
import { store } from './redux/store';
import { Provider } from 'react-redux';

import { ToastProvider } from './hooks/toastMessage/toast';
import { SpinnerProvider } from './hooks/spinner/spinner';
import { CacheProvider } from './hooks/cache/cache';
import { SocketProvider } from './hooks/socket/socket';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <Provider store={store}>
    <SpinnerProvider>
      <ToastProvider>
        <CacheProvider>
          <IonReactRouter>
            <SocketProvider>
              <App />
            </SocketProvider>
          </IonReactRouter>
        </CacheProvider>
      </ToastProvider>
    </SpinnerProvider>
  </Provider>
);