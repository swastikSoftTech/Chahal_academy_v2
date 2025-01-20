/**
 * @format
 */

import { Alert, AppRegistry, View } from 'react-native';
// import App from './App';
import { name as appName } from './app.json';
import App from './src';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { SafeAreaView } from 'react-native-safe-area-context';

const RNRoot = () => {
  return (
    <SafeAreaView style={{ flex: 1}} >
      <Provider store={store} >
        <App />
      </Provider>
    </SafeAreaView>
  );
};

AppRegistry.registerComponent(appName, () => RNRoot);
