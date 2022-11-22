import React, {useRef} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Platform} from 'react-native';
import {AppColors} from '../../../assets/AppColors';
import {FontSize, GStyles, HoriSpace, VertSpace} from 'shared/Global.styles';
import {useDispatch} from 'react-redux';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {AppFonts} from 'assets/fonts/AppFonts';
import {AppHeader} from 'components/AppHeader';
import {useEffect} from 'react';
import {LoginApiCall, SendOtpAPiCall} from '../../../ApiLogic/Auth.Api';
import {AccentButton, Container} from '../../../components/Mini';
import Toast from 'react-native-simple-toast';
import DeviceInfo from 'react-native-device-info';
import {saveVerifiedNumber} from 'redux/reducers/UserAuth.reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STR_KEYS} from 'shared/Storage';
import {showToast} from 'shared/Functions/ToastFunctions';
import {firebase} from '@react-native-firebase/messaging';
import {ScreenLoader} from 'components/Loaders/ScreenLoader';
import Ripple from 'react-native-material-ripple';
import {AuthContext} from 'Navigator/router';

const OTP_INPUT_SIZE = 6;

export function OtpVerification({route}) {
  const [code, setCode] = React.useState('');
  const [apiLoad, setApiLoad] = React.useState(false);
  const {signIn} = React.useContext(AuthContext);
  const [disabled, setDisabled] = React.useState(true);
  const dispatch = useDispatch();
  const isCancel = useRef(false);

  const {MobileNumber, countryCode} = route.params;

  const loginMethod = async OtpCode => {
    const {MobileNumber, countryCode} = route.params;

    // var raw = JSON.stringify({
    //   phone: MobileNumber,
    //   otp: OtpCode,
    //   deviceID: asyncDeviceInfo.deviceID,
    //   deviceToken: asyncDeviceInfo.deviceToken,
    //   deviceType: asyncDeviceInfo.deviceType,
    // });
    // LOGIN API CALL
    const uniqueId = DeviceInfo.getUniqueId();
    const fcmToken = await firebase.messaging().getToken();
    setApiLoad(true);
    // console.log({ uniqueId, fcmToken, platform: Platform.OS });
    // navigation.navigate('UserName');
    LoginApiCall({
      phone: MobileNumber,
      otp: OtpCode,
      deviceID: uniqueId,
      deviceToken: fcmToken.toString(),
      deviceType: Platform.OS.toString(),
    })
      .then(response => {
        setApiLoad(false);
        if (response.result === 'failure') {
          setCode('');
          Toast.showWithGravity(
            'Wrong otp. Please try again',
            Toast.LONG,
            Toast.CENTER,
          );
        } else {
          if (response.status === 'old') {
            // analytics().setUserProperties({
            //   name: response.user.name,
            //   phone: response.user.phone,
            // });
            // analytics().logLogin({ method: 'otp' });
            signIn({
              token: response.token,
              userData: response.user,
              countryCode,
            });
          } else {
            const setVerifiedNumber = async () => {
              try {
                await AsyncStorage.setItem(
                  STR_KEYS.VERIFIED_NUMBER,
                  MobileNumber,
                );
              } catch (e) {}
            };
            const setCountryCodeLocal = async () => {
              try {
                await AsyncStorage.setItem(STR_KEYS.COUNTRY_CODE, countryCode);
              } catch (e) {}
            };
            setVerifiedNumber();
            setCountryCodeLocal();
            dispatch(saveVerifiedNumber({verifiedNumber: MobileNumber}));
          }
        }
      })
      .catch(() => {
        setApiLoad(false);
      });
  };

  React.useEffect(() => {
    setTimeout(() => {
      if (!isCancel.current) {
        setDisabled(false);
      }
    }, 65000);
    return () => {
      isCancel.current = true;
    };
  }, []);

  const SendOtpMethod = () => {
    let formData = new FormData();
    formData.append('phone', MobileNumber);
    formData.append('country_code', countryCode);
    SendOtpAPiCall(
      formData,
      onResponse => {
        if (onResponse.statusCode == 200) {
          showToast('You will receive an OTP shortly');
        } else {
          showToast('Wrong OTP, try again');
        }
      },
      () => {
        // setLoading(false);
      },
    );
  };

  return (
    <SafeAreaView style={GStyles.Dark}>
      <ScreenLoader message="Logging in" loading={apiLoad} />

      <View style={GStyles.Dark}>
        {/* HEADER */}
        <AppHeader iconColor={AppColors.DarkGrey} enableBack>
          <AccentButton
            title={'Done'}
            disabled={code.length < OTP_INPUT_SIZE}
            onPress={() => {
              loginMethod(code);
              // navigation.navigate('UserName');
            }}
          />
        </AppHeader>

        {/* CONTENT MAIN DESING */}
        <VertSpace />

        <Container>
          <Text
            style={{
              fontSize: 32,
              // textAlign: 'center',
              fontFamily: AppFonts.GillSans,
              color: AppColors.white1,
            }}>
            OTP
          </Text>
          <VertSpace size={10} />

          <Text
            style={{
              fontSize: 32,
              fontFamily: AppFonts.GillSans,
              color: AppColors.white1,
            }}>
            Verification
          </Text>
          {/* <VertSpace size={10} />
          <Text
            style={{
              color: AppColors.MediumGrey,
              fontFamily: AppFonts.CalibriRegular,
              fontSize: FontSize.large,
              fontWeight: '600',
            }}
          >
            {formattedMobileNumber}
          </Text> */}
        </Container>

        <VertSpace size={10} />

        <View style={{alignItems: 'center'}} />

        {/* {loading ? (
          <View style={{ padding: 40 }}>
            <ActivityIndicator color={'black'} size={FontSize.x4large} />
          </View>
        ) : null} */}
        {/* <Text style={{ fontSize: 15 }}>{code}</Text> */}

        <View style={{width: '100%', alignItems: 'center'}}>
          <OTPInputView
            style={styles.otpcontainer}
            pinCount={OTP_INPUT_SIZE}
            selectionColor={AppColors.DarkGrey}
            codeInputFieldStyle={styles.codeInputFieldStyle}
            codeInputHighlightStyle={styles.codeInputHighlightStyle}
            autoFocusOnLoad
            onCodeFilled={code => {
              setCode(code);
            }}
          />

          {/* <VertSpace size={10} /> */}
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',

            paddingHorizontal: 20,
          }}>
          {/* <Text style={styles.message_1}>Didn't receive the OTP ? </Text> */}
          {/* <HoriSpace size={Spacing.medium} /> */}
          <Ripple
            disabled={disabled}
            onPress={() => {
              SendOtpMethod();
            }}
            rippleFades={true}
            rippleContainerBorderRadius={10}
            style={{}}>
            <Text
              style={{
                ...styles.message_1,
                color: disabled ? '#C1C6F3' : '#5563E0',
              }}>
              Resend OTP
            </Text>
          </Ripple>
          <HoriSpace size={disabled ? 8 : 0} />
          <Timer initialMinute={1} initialSeconds={0} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const Timer = ({initialMinute = 2, initialSeconds = 10}) => {
  const [minutes, setMinutes] = React.useState(initialMinute);
  const [seconds, setSeconds] = React.useState(initialSeconds);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <View>
      {minutes === 0 && seconds === 0 ? null : (
        <Text style={{color: '#C1C6F3', fontWeight: 'bold'}}>
          in {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  otpcontainer: {
    width: '90%',
    backgroundColor: '#00000000',
    height: 120,
  },

  codeInputFieldStyle: {
    color: AppColors.white1,
    backgroundColor: AppColors.LightDark,
    borderRadius: 15,
    fontSize: FontSize.x3large,
    fontFamily: AppFonts.CalibriBold,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    width: 45,
  },
  codeInputHighlightStyle: {
    color: AppColors.white1,
    backgroundColor: AppColors.LightDark,
    height: 70,
    borderColor: AppColors.DarkGrey,
    borderWidth: 0.5,
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  message_1: {
    fontFamily: AppFonts.CalibriBold,
    color: AppColors.Red,
    fontSize: FontSize.large,
  },
});
