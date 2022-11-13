import React, {useRef} from 'react';
import {
  Alert,
  LogBox,
  StatusBar,
  BackHandler,
  Platform,
  Text,
} from 'react-native';
import 'react-native-gesture-handler';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {NavigationContainer} from '@react-navigation/native';
import {
  configureFonts,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {PersistGate} from 'redux-persist/integration/react';

import {Provider as StoreProvider} from 'react-redux';

import {persister, store} from 'redux/store/Store.redux';
import {firebase} from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NetworkProvider} from 'components/NetworkProvider';
import {AppColors} from 'assets/AppColors';
import {AppFonts} from 'assets/fonts/AppFonts';
import {STR_KEYS} from 'shared/Storage';

// import { showToast } from 'shared/Functions/ToastFunctions';
// import { NotificationWrapper } from 'Notification/NotificationWrapper';
// import {
//   setJSExceptionHandler,
//   setNativeExceptionHandler,
// } from 'react-native-exception-handler';
import {navigationRef} from 'Notification/index';
import RootStack from 'Navigator/router';

const fontConfig = {
  web: {
    regular: {
      fontFamily: AppFonts.CalibriRegular,
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: AppFonts.CalibriBold,
      fontWeight: 'bold',
    },
    light: {
      fontFamily: AppFonts.CalibriLight,
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: AppFonts.CalibriRegular,
      fontWeight: '100',
    },
  },
};

const theme = {
  ...DefaultTheme,
  // roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: AppColors.DarkGrey,
    accent: AppColors.DarkGrey,
  },

  fonts: configureFonts(fontConfig),
};

LogBox.ignoreAllLogs();
export const reporter = error => {
  // Logic for reporting to devs
  // Example : Log issues to github issues using github apis.
  // console.log(error); // sample
};
function App() {


  const isClicked = useRef(false);
  React.useEffect(() => {
    CheckPermission();

    return () => {
      isClicked.current = true;
    };
  }, []);

  const errorHandler = (e, isFatal) => {
    if (isFatal) {
      reporter(e);
      Alert.alert(
        'Oops 🥶 there is an error ',
        `Error: ${isFatal ? 'Fatal:' : ''} ${e.name} ${e.message}

         We have reported this to our team ! Please close the app and start again!`,
        [
          {
            text: 'Close',
            onPress: () => {
              BackHandler.exitApp();
            },
          },
        ],
      );
    } else {
      console.log(e); // So that we can see it in the ADB logs in case of Android if needed
    }
  };

  // setJSExceptionHandler(errorHandler, true);

  // setNativeExceptionHandler(errorString => {
  //   //You can do something like call an api to report to dev team here
  //   //example
  //   // fetch('http://<YOUR API TO REPORT TO DEV TEAM>?error='+errorString);
  //   //
  // });
  const CheckPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (!isClicked.current) {
      if (enabled) {
        getToken();
      } else {
        requestPermission();
      }
    }
  };

  const getToken = async () => {
    let fcmToken = await AsyncStorage.getItem(STR_KEYS.FCM_TOKEN);
    // console.log({ fcmToken });
    if (!fcmToken) {
      let firebaseFcmToken = await firebase.messaging().getToken();
      if (firebaseFcmToken) {
        await AsyncStorage.setItem(STR_KEYS.FCM_TOKEN, firebaseFcmToken);
      }
    }
  };

  //2
  const requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      getToken();
    } catch (error) {}
  };

  const linking = {
    prefixes: ['memofacapp://', 'https://www.memofac.com'],
    config: {
      screens: {
        UserStack: {
          screens: {
            SettingsScreen: {
              // name: 'SettingsScreen',
              path: 'user/:memoId',
              parse: {
                memoId: memoId => memoId.replace(/^@/, ''),
              },
            },
            ViewMemo: {
              path: 'memos/:memoId',
              parse: {
                memoId: memoId => memoId.replace(/^@/, ''),
              },
            },
          },
        },
        // MemoDetailsView: {
        //   path: 'memos/:memoId',
        //   parse: {
        //     memoId: memoId => memoId.replace(/^@/, ''),
        //   },
        // },
      },
    },
  };

  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persister}>
        {/* <NotificationWrapper> */}
        <PaperProvider theme={theme}>
          <NetworkProvider>
            <NavigationContainer linking={linking} ref={navigationRef}>
              <FirebasePushHandler>
                <StatusBar backgroundColor="black" barStyle="light-content" />
                <RootStack />
                {/* <Text>Abhaya</Text> */}
              </FirebasePushHandler>
            </NavigationContainer>
          </NetworkProvider>
        </PaperProvider>

        {/* </NotificationWrapper> */}
      </PersistGate>
    </StoreProvider>
  );
}

const FirebasePushHandler = ({children}) => {
  React.useEffect(() => {
    const unsubscribe = firebase.messaging().onMessage(async message => {
      console.log('From firebase Message Foreground Handler', message);
      // Alert.alert('A new FCM message arrived!', JSON.stringify(message));
      const {notification, messageId} = message;
      // console.log('From firebase Message Foreground Handler', message);
      if (Platform.OS === 'ios') {
        PushNotificationIOS.addNotificationRequest({
          id: messageId,
          title: notification.title,
          body: notification.body,
          sound: 'default',
        });
      }
    });

    // Unsuscribe Foreground Push Notifications
    return unsubscribe;
  }, []);

  // React.useEffect(() => {
  //   const unSubscribe = firebase
  //     .messaging()
  //     .setBackgroundMessageHandler(message => {
  //       // console.log('From firebase Message Background Handler', message);
  //     });
  //   return unSubscribe;
  // }, []);

  return <>{children}</>;
};
export default App;
