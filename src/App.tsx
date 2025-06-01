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
import { Route } from 'react-router-dom';
import { StatusBar, Style } from '@capacitor/status-bar';
import { useEffect } from 'react';

// Import component
import StartPage from './pages/startPage/start.page';
import LoginPage from './pages/login_page/login.page';
import RegisterPage from './pages/registerPage/register.page';
import MapPage from './pages/mapPage/map.page';

// import interface


setupIonicReact();

const App: React.FC = () => {
  // State -----------------------------------------------------------


  // Custom hooks ----------------------------------------------------


  // Redux -----------------------------------------------------------


  // Effect ----------------------------------------------------------
  
  // Startus bar layout
  useEffect(() => {
    // if (!serverState) return;

    const init = async () => {
      try {
        await StatusBar.setOverlaysWebView({ overlay: false });

        await StatusBar.setBackgroundColor({ color: '#000000' });

        await StatusBar.setStyle({ style: Style.Dark });
      } catch (err) {
        console.error('StatusBar config failed', err);
      }
    };

    init();
  }, []);


  // Handler ---------------------------------------------------------

  return (
    <IonApp>
      <IonRouterOutlet>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/map" component={MapPage} />
      </IonRouterOutlet>
    </IonApp>
  )
};

export default App;
