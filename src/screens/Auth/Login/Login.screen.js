import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import {
  AppDimens,
  FontSize,
  GStyles,
  HoriSpace,
  Spacing,
  VertSpace,
} from '../../../shared/Global.styles';
import {AppColors} from '../../../assets/AppColors';
import {AppHeader, ModalHeader} from '../../../components/AppHeader';
import {AccentButton, Container, NextButton} from '../../../components/Mini';
import {AppFonts} from '../../../assets/fonts/AppFonts';
import Country1 from '../../../assets/svg/Flags/Country1.svg';
import Country2 from '../../../assets/svg/Flags/Country2.svg';
import {DownArrowIcon} from '../../../shared/Icon.Comp';
import Ripple from 'react-native-material-ripple';
import {Modal, Portal} from 'react-native-paper';
import {ContactPermission} from 'screens/Contacts/ContactPermissionHandler/ContactPermission';
import {
  checkContactPermission,
  getAllPermissions,
  getContactPermission,
} from 'shared/Permission';
import {ScreenLoader} from 'components/Loaders/ScreenLoader';
import {showToast} from 'shared/Functions/ToastFunctions';
import {SendOtpAPiCall} from 'ApiLogic/Auth.Api';
import {wp} from 'shared/dimens';
import {styles} from './index.styles';
import {VerticalLine} from 'screens/Timeline/components/PostView/Postview.comp';

let CountryData = {
  india: {
    key: 'India',
    value: 'India (IN)',
    dropdownData: '+91',
    countrCode: '+91',
    limit: 10,
  },

  uae: {
    key: 'UAE',
    value: 'United Arab Emirates (UAE)',
    dropdownData: '+971',
    countrCode: '+971',
    limit: 9,
  },
};

export function LoginScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const [contactPermVisible, setContactPermVisible] = React.useState(false);
  const [MobileNumber, setMobileNumber] = React.useState('');
  const [countryOptionsVisible, setcountryOptionsVisible] =
    React.useState(false);
  const [Country, setCountry] = React.useState('india');

  let countryCode = CountryData[Country].countrCode;
  let formattedMobileNumber = `${countryCode} ${MobileNumber.substring(
    0,
    3,
  )}-${MobileNumber.substring(3, 6)}-${MobileNumber.substring(6, 10)}`;

  const SendOtpMethod = (MobileNumber, countryCode) => {
    let formData = new FormData();
    formData.append('phone', MobileNumber);
    formData.append('country_code', countryCode);

    SendOtpAPiCall(
      formData,
      onResponse => {
        if (onResponse.statusCode == 200) {
          showToast('You will receive an OTP shortly');
          setLoading(false);
          navigation.navigate('OtpVerification', {
            countryCode,
            MobileNumber,
            formattedMobileNumber,
          });
        } else {
          showToast('Wrong OTP, try again');
        }
      },
      onError => {
        setLoading(false);
      },
    );
  };

  return (
    <SafeAreaView style={GStyles.Dark}>
      <ScreenLoader message="loading wait..." loading={loading} />
      <View style={GStyles.Dark}>
        {/* APP HEADER */}
        <AppHeader iconColor={AppColors.DarkGrey} enableBack>
          <AccentButton
            disabled={
              MobileNumber.length < CountryData[Country].limit ? true : false
            }
            title="Next"
            onPress={() => {
              setLoading(true);
              SendOtpMethod(MobileNumber, countryCode);
            }}
          />
        </AppHeader>

        {/* <CountrySelect
          onSubmit={country => {
            setCountry(country);
          }}
          isVisible={countryOptionsVisible}
          onclose={() => setcountryOptionsVisible(false)}
        /> */}

        <VertSpace />
        <View
          style={{
            alignItems: 'flex-start',
            paddingHorizontal: Spacing.xlarge,
          }}>
          <Text
            style={{
              color: AppColors.white1,
              fontFamily: AppFonts.GillSans,
              fontSize: 32,
              alignItems: 'flex-start',
            }}>
            Enter phone
          </Text>
          <VertSpace size={10} />
          <Text
            style={{
              fontSize: 32,
              textAlign: 'center',
              fontFamily: AppFonts.GillSans,
              color: AppColors.white1,
              alignItems: 'flex-start',
            }}>
            number
          </Text>
          {/* <VertSpace size={5} />
          <Text
            style={{
              color: AppColors.MediumGrey,
              fontSize: FontSize.xlarge,
              alignItems: 'flex-start',
              fontFamily: AppFonts.CalibriRegular,
            }}
          >
            will send you an OTP
          </Text> */}
          <VertSpace size={40} />

          <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
            <TouchableOpacity>
              <View>
                <Ripple
                  rippleContainerBorderRadius={30}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => setcountryOptionsVisible(true)}>
                  <View
                    style={{
                      height: 50,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      backgroundColor: AppColors.LightDark,
                      borderTopLeftRadius: 15,
                      borderBottomLeftRadius: 15,
                      width: 100,
                    }}>
                    <Text style={styles.selectionStyles}>
                      {CountryData[Country].dropdownData}
                    </Text>
                    {/* <DownArrowIcon size={FontSize.short} /> */}
                    <VerticalLine
                      height={20}
                      backgroundColor={AppColors.LowDark}
                    />
                  </View>
                </Ripple>
              </View>
            </TouchableOpacity>

            <TextInput
              placeholderTextColor={AppColors.white}
              autoFocus
              style={{
                width: '70%',
                height: 50,
                color: AppColors.white1,
                fontFamily: AppFonts.CalibriBold,
                fontSize: FontSize.inputText,
                backgroundColor: AppColors.LightDark,
                borderTopRightRadius: 15,
                borderBottomRightRadius: 15,
              }}
              maxLength={10}
              keyboardType="number-pad"
              value={MobileNumber}
              onChangeText={MobileNumber => setMobileNumber(MobileNumber)}
            />
          </View>

          <VertSpace size={Spacing.xlarge} />
        </View>
      </View>
    </SafeAreaView>
  );
}

export const CountrySelect = ({
  isVisible,
  onclose = () => {},
  onSubmit = () => {},
}) => {
  // const [groupName, setGroupName] = React.useState('')

  const [Country, setCountry] = React.useState('india');

  const onPress = () => {
    onSubmit(Country);
    onclose();
  };
  return (
    <View>
      <Portal>
        <Modal
          visible={isVisible}
          onDismiss={onclose}
          style={GStyles.containView}
          contentContainerStyle={styles.countrySelectContainer}>
          <View style={{backgroundColor: 'white', ...GStyles.ModalContainer}}>
            <View style={GStyles.ModalContainer}>
              <VertSpace size={10} />
              <Container>
                <ModalHeader enableBack onBackPress={() => onclose()}>
                  <NextButton disabled={false} title="Done" onPress={onPress} />
                </ModalHeader>
              </Container>

              <VertSpace size={10} />
              <Container padding={30}>
                <Text
                  style={{
                    ...GStyles.headerStyles,
                    fontSize: FontSize.inputText,
                  }}>
                  Select a Country
                </Text>

                <VertSpace size={20} />
                <TouchableOpacity
                  onPress={() => setCountry('india')}
                  style={GStyles.flexRow}>
                  <View
                    rippleColor={AppColors.DarkGrey}
                    style={GStyles.radioCircle}>
                    <View>
                      {Country === 'india' ? (
                        <View style={GStyles.selectedRb} />
                      ) : null}
                    </View>
                  </View>

                  <HoriSpace size={10} />
                  <Country1 width={25} height={25} />
                  <HoriSpace size={10} />
                  <Text
                    style={{
                      fontFamily: AppFonts.CalibriRegular,
                      color: AppColors.DarkGrey,
                      fontSize: FontSize.large,
                    }}>
                    India (IN)
                  </Text>
                </TouchableOpacity>

                <VertSpace size={20} />
                <TouchableOpacity
                  onPress={() => setCountry('uae')}
                  style={GStyles.flexRow}>
                  <View
                    rippleColor={AppColors.DarkGrey}
                    style={GStyles.radioCircle}>
                    <View>
                      {Country === 'uae' ? (
                        <View style={GStyles.selectedRb} />
                      ) : null}
                    </View>
                  </View>
                  <HoriSpace size={10} />
                  <Country2 width={25} height={25} />
                  <HoriSpace size={10} />
                  <Text style={styles.countrySelectText}>
                    United Arab Emirates (UAE)
                  </Text>
                </TouchableOpacity>
              </Container>
            </View>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};
