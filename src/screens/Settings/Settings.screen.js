/* eslint-disable react-native/no-inline-styles */
import {AppColors} from 'assets/AppColors';
import {AppFonts} from 'assets/fonts/AppFonts';
import React from 'react';
import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppHeader, HeadingBar} from '../../components/AppHeader';
import {
  AppDimens,
  FontSize,
  GStyles,
  HoriSpace,
  Spacing,
  VertSpace,
} from '../../shared/Global.styles';
import {BioDarkIcon, HelpDarkIcon} from '../../shared/Icon.Comp';
import {showToast} from 'shared/Functions/ToastFunctions';
import {APP_APIS} from 'ApiLogic/API_URL';
import {Modal, Portal} from 'react-native-paper';
import {ModalButtons} from 'screens/Timeline/components/MenuOption';
import {HorizontalLine} from 'screens/Timeline/components/PostView/Postview.comp';
import {navigate} from 'Notification';
import {AuthContext} from 'Navigator/router';

const AppMenuOption = ({
  onPress = () => {},
  optionName = '',
  IconComponent = () => {
    return null;
  },
}) => {
  return (
    <Pressable
      onPress={() => onPress()}
      style={{flexDirection: 'row', alignItems: 'center'}}>
      <IconComponent />
      <HoriSpace size={Spacing.large} />
      <Text
        style={{
          fontSize: FontSize.inputText,
          fontFamily: AppFonts.CalibriRegular,
          color: AppColors.white2,
        }}>
        {optionName}
      </Text>
    </Pressable>
  );
};

export function SettingsScreen({navigation}) {
  const {signOut} = React.useContext(AuthContext);
  const userToken = useSelector(state => state.userAuth.userToken);

  const [logoutConfirmVisible, setLogoutConfirmVisible] = React.useState(false);

  const onLogout = () => {
    var rawData = JSON.stringify({
      token: userToken,
    });

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: rawData,
      redirect: 'follow',
    };

    signOut();

    // analytics().logEvent('Logout');

    fetch(APP_APIS.LOGOUT, requestOptions)
      .then(response => response.json())
      .then(responseJson => {})
      .catch(error => {
        showToast('logging out');
      });
  };

  const LogoutConfirmModal = ({}) => {
    return (
      <Portal>
        <Modal
          visible={logoutConfirmVisible}
          onDismiss={() => {}}
          style={{justifyContent: 'center', alignItems: 'center'}}
          contentContainerStyle={{
            backgroundColor: 'white',
            padding: 20,
            width: AppDimens.width * 0.7,
            borderRadius: 30,
          }}>
          <View style={{alignItems: 'flex-start'}}>
            <Text
              style={{
                fontSize: FontSize.xlarge,
                color: AppColors.DarkGrey,
                fontFamily: AppFonts.CalibriBold,
              }}>
              Are you sure, you want to logout?
            </Text>
            <VertSpace />
          </View>
          <View style={{}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <ModalButtons
                IconVisible={false}
                modalStyle={{justifyContent: 'flex-start'}}
                title={'Yes'}
                onPress={() => {
                  setLogoutConfirmVisible(false);
                  onLogout();
                }}
              />
              <ModalButtons
                IconVisible={false}
                modalStyle={{justifyContent: 'flex-end'}}
                title={'No'}
                onPress={() => {
                  setLogoutConfirmVisible(false);
                }}
              />
            </View>
          </View>
        </Modal>
      </Portal>
    );
  };

  return (
    <SafeAreaView style={GStyles.Dark}>
      <StatusBar backgroundColor="black" barStyle="light-content" />

      <AppHeader
        enableBack
        onBackPress={() =>
          navigate('BottomTabNavigation', {
            screen: 'TimelineScreen',
          })
        }
        padding={Spacing.xxlarge}
      />
      <HeadingBar
        TitleColor={AppColors.white2}
        title={'Settings'}
        paddingHorizontal={Spacing.xxlarge}
      />

      <LogoutConfirmModal />
      {/* OPTIONS */}
      {/* BIO */}
      <View style={{padding: Spacing.xxlarge}}>
        <AppMenuOption
          optionName={'Edit profile details'}
          IconComponent={() => <BioDarkIcon size={FontSize.inputText} />}
          onPress={() => {
            navigation.navigate('UpdateProfile');
          }}
        />

        <VertSpace size={15} />
        <HorizontalLine
          height={1}
          color={AppColors.DarkGrey2}
          width={AppDimens.width * 0.8}
          VerticalSpace={20}
        />
        <VertSpace size={5} />

        <AppMenuOption
          optionName={'Report a problem'}
          IconComponent={() => <HelpDarkIcon size={FontSize.inputText} />}
          onPress={() => {
            navigation.navigate('ReportProblemScreen');
          }}
        />
        <VertSpace size={10} />

        <HorizontalLine
          VerticalSpace={20}
          height={1}
          color={AppColors.DarkGrey2}
          width={AppDimens.width * 0.8}
        />

        {/* <AppMenuOption
          optionName={'Logout'}
          IconComponent={() => <LogoutIcon size={FontSize.inputText} />}
          onPress={() => setLogoutConfirmVisible(true)}
        /> */}

        <VertSpace size={30} />

        {/* <AppMenuOption
          optionName={'Trending'}
          IconComponent={() => <HelpIcon size={FontSize.inputText} />}
          onPress={() => navigation.navigate('TrendingScreen')}
        /> */}

        <VertSpace size={30} />
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text>Debug mode</Text>
          <Switch
            value={debugState}
            onChange={() => {
              dispatch(toggleDebugMode());
            }}
          />
        </View>
        <VertSpace size={30} /> */}

        {/* <CopyDeviceData
          onPress={async () => {
            const uniqueId = deviceInfoModule.getUniqueId();
            const firebaseFcmToken = await firebase.messaging().getToken();
            setFcmToken(
              `*FCM TOKEN*\n${firebaseFcmToken.toString()}\n\n*DEVICE UNIQUE ID*\n${uniqueId}`,
            );
            showToast('fcm token copied');
          }}
        /> */}
      </View>
    </SafeAreaView>
  );
}

const CopyDeviceData = ({onPress = () => {}}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={{
          flexDirection: 'row',
          width: '100%',
          backgroundColor: AppColors.VeryLightGrey,
          padding: 15,
          borderRadius: 10,
        }}>
        Copy device data
      </Text>
    </TouchableOpacity>
  );
};

const Style = StyleSheet.create({
  ModalStyleLight: {
    backgroundColor: 'white',
    padding: 20,
    // width: AppDimens.width * 0.7,
    borderRadius: 15,
  },
  ModalStyleDark: {
    backgroundColor: AppColors.DarkBG,
    padding: 20,
    // width: AppDimens.width * 0.7,
    borderRadius: 30,
  },

  ModalBacLight: {
    backgroundColor: AppColors.white,

    height: 60,
    // marginTop: -10,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  ModalBacDark: {
    backgroundColor: AppColors.DarkBG,

    height: 60,
    // marginTop: -10,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
