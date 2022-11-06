//react-native-vector-icons
//react-native-svg
//react-native-svg-transformer
//react-native-push-notification
//@react-native-community/netinfo
//@react-native-community/push-notification-ios
//@react-native-picker/picker
//@gurukumparan/react-native-android-inapp-updates
//react-native-in-app-review
//@twotalltotems/react-native-otp-input
//"@react-native-community/image-editor
//react-native-keyboard-aware-scroll-view
//react-native-skeleton-content-nonexpo
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import React from 'react';
import Video from 'react-native-video';
import {PERMISSIONS, request, check, RESULTS} from 'react-native-permissions';
import Icon from 'react-native-vector-icons/AntDesign';
import {AppColors} from 'assets/AppColors';
import {CalenderIcon} from 'shared/Icon.Comp';
// import {AppColors} from 'assets/AppColors';
const App = () => {
  const Action = async () => {};
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: AppColors.DarkBG,
      }}>
      <Text
        style={{color: 'red', fontSize: 40, fontWeight: '900'}}
        onPress={() => {
          Action();
        }}>
        LUNCH
      </Text>
      <CalenderIcon />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    zIndex: 0,
  },
});
