/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

// Import libraries
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { Route, useHistory, useLocation } from 'react-router-dom';
import { StatusBar, Style } from '@capacitor/status-bar';
import { useEffect, useRef, useState } from 'react';

// Import component
import StartPage from './pages/startPage/start.page';
import LoginPage from './pages/login_page/login.page';
import RegisterPage from './pages/registerPage/register.page';
import MapPage from './pages/mapPage/map.page';

// Import custom hook
import { useCache } from './hooks/cache/cache';

// import service
import user_autoLogin from './services/user/user.autoLogin.serv';
import { cacheSetUser } from './redux/reducers/user.reducer';
import staff_autoLogin from './services/staff/staff.autoLogin.serv';


setupIonicReact();

const App: React.FC = () => {
  const redirect = useHistory();
  const { cacheSetData } = useCache();

  useEffect(() => {
    const autoLogin = async () => {
      let loggedIn = false;

      const results = await Promise.allSettled([
        user_autoLogin(),
        staff_autoLogin(),
      ]);

      results.forEach((result, index) => {
        if (result.status === 'fulfilled' && result.value.status === 200) {
          const res_data = result.value.data.data;

          cacheSetData(
            cacheSetUser({
              inputGmail: res_data.gmail,
              inputRole: res_data.role,
            })
          );

          loggedIn = true;
        }
      });

      if (loggedIn) {
        redirect.push('/map');
      } else {
        redirect.push('/');
      }
    };

    autoLogin();
  }, [redirect, cacheSetData]);

  useEffect(() => {
    const initStatusBar = async () => {
      try {
        await StatusBar.setOverlaysWebView({ overlay: false });
        await StatusBar.setBackgroundColor({ color: '#000000' });
        await StatusBar.setStyle({ style: Style.Dark });
      } catch (err) {
        console.error('StatusBar config failed', err);
      }
    };

    initStatusBar();
  }, []);

  return (
    <IonApp>
      <IonRouterOutlet>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/map" component={MapPage} />
      </IonRouterOutlet>
    </IonApp>
  );
};

export default App;
