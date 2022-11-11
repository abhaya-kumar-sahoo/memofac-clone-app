import React, { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import {
  RestoreToken,
  SignOutAction,
  saveVerifiedNumber,
  saveProgress,
} from 'redux/reducers/UserAuth.reducer';
import { STR_KEYS } from '../shared/Storage';
import { CustomHeader } from './Components/Header.Components';
import { LoginStack } from './Stacks/AuthenticationStack';
import { UserStack } from './Stacks/UserStack';
import { NetworkContext, NetWorkModal } from '../components/NetworkProvider';
import { AppColors } from '../assets/AppColors';
import { RegisterStack } from './Stacks/RegisterStack';
import {
  View,
  StatusBar,
  Text,
  Animated,
  Easing,
  DevSettings,
} from 'react-native';
import { GetRecomMemosAction } from 'redux/reducers/Memos/RecomMemos.reducer';
import { GetUserDetailsAction } from 'redux/reducers/UserProfile/userprofile.reducer';

import { VertSpace } from 'shared/Global.styles';
import { AppFonts } from 'assets/fonts/AppFonts';
import { SplashScreen } from 'Navigator/Splashscreen';
import { getTimelinePosts } from 'redux/reducers/Timeline/Timeline.reducer';
import { GetSubCategoryAction } from 'redux/reducers/Memos/Subcategory.reducer';
import { ListFetchTypes } from 'redux/constants.redux';
import { LetsGoScreen } from 'screens/Auth/ProfileUpdate/LetsGoScreen/LetsGoScreen';
import Modal from 'react-native-modal';
import { AccentButton } from 'components/Mini';
import { NointernetIcon } from 'shared/Icon.Comp';
import { addEventListener } from '@react-native-community/netinfo';
import { LetsStart } from 'screens/Auth/ProfileUpdate/LetsGoScreen/IntroVideo';
import { WalkthroughRoute } from './Stacks/WalkThroughRoute';
export const AuthContext = React.createContext();

export default function RootStack() {
  const dispatch = useDispatch();
  const Stack = createStackNavigator();
  const [net, setNet] = React.useState(netStatus);
  const { userToken, isLoading, verifiedNumber, proceedStatus } = useSelector(
    state => state.userAuth,
  );
  const { netStatus } = useContext(NetworkContext);

  const SplashScreenLoading = isLoading || !netStatus;
  // isLoading || (userToken !== null && RecommendedMemosLoading);
  React.useEffect(() => {
    addEventListener(state => {
      // console.log(state.isConnected);
      setNet(state.isConnected);
    });
  }, [net == undefined]);

  // console.log(NetStatus());
  // const SplashScreenLoading = isLoading ;

  // console.log('Post', post.length);
  // console.log('RecmmMemo', rmemos.length);

  // Unsubscribe

  const dispatchADefaultApis = usertoken => {
    dispatch(GetRecomMemosAction(usertoken, 1, ListFetchTypes.FETCH, 0));
    dispatch(
      getTimelinePosts({
        usertoken: usertoken,
        fetchType: ListFetchTypes.FETCH,
        page: 1,
      }),
    );
    dispatch(GetSubCategoryAction(usertoken, 0));
    dispatch(GetUserDetailsAction(usertoken));
  };

  // console.log('Local Storage User Data', data.length);
  /**
   * recalls data from asyncStorage and decides what to bze done next.
   */

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let AsyncData = [];
      try {
        AsyncData = await AsyncStorage.multiGet([
          STR_KEYS.USERTOKEN,
          STR_KEYS.USERDATA,
          STR_KEYS.VERIFIED_NUMBER,
          STR_KEYS.PROCEED_STATUS,
          STR_KEYS.COUNTRY_CODE,
        ]);
      } catch (e) {}

      dispatch(
        RestoreToken({
          token: AsyncData[0][1],
          userData: JSON.parse(AsyncData[1][1]),
          countrycode: AsyncData[4][1],
        }),
      );
      dispatch(
        saveVerifiedNumber({
          verifiedNumber: AsyncData[2][1],
        }),
      );

      dispatch(
        saveProgress({
          proceedStatus: AsyncData[3][1],
        }),
      );

      if (AsyncData[0][1] !== null) {
        dispatchADefaultApis(AsyncData[0][1]);
      }
    };
    bootstrapAsync();
  }, [netStatus]);

  /**
   * Context required to have common functions aviaible thorought the project for Singin and Signout
   * singIN Function  -> saves token and userData to asynchstorage.
   * singOut function -> clears our data from asyncStorage and saves to redux for save
   */

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        const { token, countryCode, userData } = { ...data };
        const USER_TOKEN = [STR_KEYS.USERTOKEN, token];
        const USER_COUNTRY_CODE = [STR_KEYS.COUNTRY_CODE, countryCode];
        const USER_DATA = [STR_KEYS.USERDATA, JSON.stringify(userData)];
        try {
          await AsyncStorage.multiSet([
            USER_TOKEN,
            USER_DATA,
            USER_COUNTRY_CODE,
          ]);
        } catch (error) {}
        dispatch(RestoreToken({ token: token, userData: userData }));
        dispatchADefaultApis(data.token);
      },
      signOut: async () => {
        const removeKeys = async () => {
          const keys = [
            STR_KEYS.USERTOKEN,
            STR_KEYS.USERDATA,
            STR_KEYS.COUNTRY_CODE,
            STR_KEYS.VERIFIED_NUMBER,
          ];
          try {
            await AsyncStorage.multiRemove(keys);
          } catch (e) {}
        };
        removeKeys();
        dispatch(SignOutAction());
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      {/* <HeaderNetworkStatus /> */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!netStatus ? (
          <Stack.Screen name="NetworkError" component={NetworkError} />
        ) : (
          <>
            {SplashScreenLoading ? (
              <Stack.Screen name="SplashScreen" component={SplashScreen} />
            ) : (
              <>
                {userToken == null ? (
                  <>
                    {verifiedNumber == null ? (
                      <Stack.Screen name="LoginStack" children={LoginStack} />
                    ) : (
                      <Stack.Screen
                        name="RegisterStack"
                        children={RegisterStack}
                      />
                    )}
                  </>
                ) : (
                  <>
                    {proceedStatus == 'Walkthrough' ? (
                      <Stack.Screen
                        name="Walkthrough"
                        children={WalkthroughRoute}
                      />
                    ) : (
                      <Stack.Screen name="UserStack" children={UserStack} />
                    )}
                  </>
                )}
              </>
            )}
            <Stack.Screen
              name="NetWorkModal"
              component={NetWorkModal}
              options={CustomHeader('', AppColors.DarkGrey, AppColors.white, 0)}
            />
          </>
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
}

export const HeaderNetworkStatus = () => {
  const { netStatus } = useContext(NetworkContext);
  const BAR_HEIGHT = 30;
  const fadeAnim = React.useRef(new Animated.Value(1)).current;

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: -BAR_HEIGHT,
      delay: 1000,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };
  const fadeIn = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    if (netStatus) {
      setTimeout(() => {
        fadeOut();
      }, 1000);
    } else {
      fadeIn();
    }
  }, [netStatus]);

  return (
    <View style={{ position: 'absolute', top: 0, zIndex: 999, width: '100%' }}>
      {netStatus && (
        <StatusBar
          setNetworkActivityIndicatorVisible
          barStyle="light-content"
          showHideTransition={'slide'}
          backgroundColor={
            netStatus ? AppColors.logoColour_2 : AppColors.LightGrey
          }
        />
      )}
      <Modal isVisible={netStatus}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: AppColors.Red, fontSize: 30 }}>Hello!</Text>

          {/* <Button title="Hide modal" onPress={toggleModal} /> */}
        </View>
      </Modal>
      {/* <Animated.View
        style={{
          ...GStyles.containView,
          height: BAR_HEIGHT,
          width: '100%',
          opacity: prevNetStatus !== undefined ? 1 : 0,
          transform: [{ translateY: fadeAnim }],
          backgroundColor: netStatus
            ? AppColors.logoColour_2
            : AppColors.LightGrey,
        }}
      >
        <Text
          style={{
            color: netStatus ? AppColors.white : AppColors.VeryDarkGrey,
            fontFamily: AppFonts.InkFree,
          }}
        >
          {netStatus ? 'Back online' : 'Your offline'}
        </Text>
      </Animated.View> */}
    </View>
  );
};

export const NetworkError = ({ title = 'No internet connection' }) => {
  //Reload App
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: AppColors.white,
      }}
    >
      <VertSpace size={130} />

      <NointernetIcon size={200} />
      <VertSpace />
      <Text
        style={{
          color: AppColors.DarkMode,
          fontFamily: AppFonts.CalibriRegular,
          fontSize: 18,
        }}
      >
        {title}
      </Text>
      <VertSpace size={25} />
      <AccentButton title="Reload" onPress={() => DevSettings.reload()} />
    </View>
  );
};
