/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { store } from "./src/store";
import { Provider } from "react-redux";



const ProvidedApp = () => (
    <Provider store={store}>
      <App />
      </Provider>
  );
  
  AppRegistry.registerComponent(appName, () => ProvidedApp);
