import * as React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/pages/login/loginScreen';
import ChatScreen from './src/pages/chat/chatScreen';
import {getDeviceToken} from './src/domains/firebases/firebaseMessage';
import {Provider} from 'react-redux';
import {store} from './src/reducers/configureStore';
import CustomDrawer from './src/pages/drawers/customDrawer';
import WellComeScreen from './src/pages/wellCome/wellComeScreen';

const Stack = createNativeStackNavigator();

function App() {
  React.useEffect(() => {
    getDeviceToken();
    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    // });
    // // Register background handler
    // messaging().setBackgroundMessageHandler(async remoteMessage => {
    //   console.log('Message handled in the background!', remoteMessage);
    // });
    // return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: 'white',
          },
        }}>
        <Stack.Navigator
          initialRouteName="WellComeScreen"
          screenOptions={{headerShown: false}}>
          {/* <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{headerShown: false}}
            /> */}
          <Stack.Screen name="HomeScreen" component={CustomDrawer} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen name="WellComeScreen" component={WellComeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
