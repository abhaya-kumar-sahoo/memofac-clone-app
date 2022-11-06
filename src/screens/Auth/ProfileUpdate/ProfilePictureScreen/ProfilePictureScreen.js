import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';
import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import React from 'react';
import { AppColors } from 'assets/AppColors';
import { AppHeader } from 'components/AppHeader';
import { AccentButton, Container } from 'components/Mini';
import { ProfilePicker } from '../Profile.screen';
import ImagePicker from 'react-native-image-crop-picker';
import { AppFonts } from 'assets/fonts/AppFonts';
import { PageDots } from '../NameScreen/UserName';
import { useNavigation } from '@react-navigation/native';
import { GStyles, VertSpace } from 'shared/Global.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_APIS } from 'ApiLogic/API_URL';
import { STR_KEYS } from 'shared/Storage';
import { useDispatch, useSelector } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import { showToast } from 'shared/Functions/ToastFunctions';
import { saveProgress } from 'redux/reducers/UserAuth.reducer';
import { addFavorites } from 'redux/sagas/UserProfile/userProfile.request';
import * as ImagePickers from 'react-native-image-picker';
import { ScreenLoader } from 'components/Loaders/ScreenLoader';
import { AuthContext } from 'Navigator/router';

export const ProfilePictureScreen = ({ route }) => {
  const { DOB, gender, name, selectedIds } = route.params;

  const { signIn } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const [imageUri, setImageUri] = React.useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { verifiedNumber, proceedStatus, userToken } = useSelector(
    state => state.userAuth,
  );

  React.useEffect(() => {
    if (route.params?.croppedImageUri) {
      setImageUri(route.params?.croppedImageUri);
    }
  }, [route.params?.croppedImageUri]);

  React.useEffect(() => {
    if (route.params?.imageList) {
      ImagePicker.openCropper({
        path: route.params.imageList[0],
        width: 400,
        height: 400,
        cropperCircleOverlay: true,
        cropperToolbarTitle: 'Crop Photo',
        cropperActiveWidgetColor: 'white',
        cropperStatusBarColor: 'black',
        cropperToolbarColor: 'black',
        cropperToolbarWidgetColor: 'white',
      }).then(image => {
        setImageUri(image.path);
      });
    }
  }, [route.params?.imageList]);

  const UpdateDetails = async () => {
    setLoading(true);
    setActive(true);
    // const fcmToken = await firebase.messaging().getToken();
    const uniqueId = DeviceInfo.getUniqueId();
    let countryCode = await AsyncStorage.getItem(STR_KEYS.COUNTRY_CODE);

    const timestamp = new Date();
    let imageEntity =
      imageUri !== null
        ? {
            uri: imageUri,
            type: 'image/jpeg',
            name: `${name}${timestamp}.jpg`,
          }
        : null;

    let formdata = new FormData();
    formdata.append('phone', verifiedNumber);
    formdata.append('username', name);
    formdata.append('image', imageEntity);
    formdata.append('dob', `${DOB}-06-30`); //  appenf data
    formdata.append('gender', gender); //capital O for others
    formdata.append('country_code', countryCode);
    formdata.append('deviceID', uniqueId);
    formdata.append('deviceToken', 'fcmToken.toString()');
    formdata.append('deviceType', Platform.OS.toString());

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch(APP_APIS.REGISTER, requestOptions)
      .then(response => response.json())
      .then(async result => {
        if (result.result === 'success') {
          const AddFav = async () => {
            await addFavorites(result.token, selectedIds).finally(() => {
              const setProceedStatus = async () => {
                try {
                  await AsyncStorage.setItem(
                    STR_KEYS.PROCEED_STATUS,
                    'Walkthrough',
                  );
                } catch (e) {}
              };
              setProceedStatus();

              dispatch(
                saveProgress({
                  proceedStatus: 'Walkthrough',
                }),
              );
              signIn({
                token: result.token,
                userData: result.user,
                countryCode,
              });
              showToast('Registration Successful');
            });
          };
          AddFav();
          // showToast('Please wait for complete the Registration Process');
        } else {
          setActive(false);
          showToast('Please try again !');
        }
      })

      .catch(error => {
        showToast('Error while registration, please try again');
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const launchImageLibrary = async () => {
    try {
      if (Platform.OS === 'android') {
        check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
          .then(result => {
            switch (result) {
              case RESULTS.UNAVAILABLE:
                // console.log(
                //   'This feature is not available (on this device / in this context)',
                // );
                Alert.alert(
                  'Permission Alert',
                  'Requested functionality is not supported by your device.',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    { text: 'OK', onPress: () => console.log('ok boss') },
                  ],
                );
                break;
              case RESULTS.DENIED:
                // console.log(
                //   'The permission has not been requested / is denied but requestable',
                // );
                request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(
                  result => {
                    // …
                    console.log('WRITE PERMISSION GRANTED.', result);
                  },
                );
                break;
              case RESULTS.LIMITED:
                // console.log(
                //   'The permission is limited: some actions are possible',
                // );
                Alert.alert(
                  'Permission Alert',
                  'Due to system limitations few features are available on your device model.',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    { text: 'OK', onPress: () => console.log('ok boss') },
                  ],
                );
                break;
              case RESULTS.GRANTED:
                // console.log('The permission is granted');
                // Process Image Picker if permission is granted.
                let options = {
                  storageOptions: {
                    skipBackup: true,
                    path: 'images',
                  },
                };
                ImagePickers.launchImageLibrary(options, response => {
                  if (response.didCancel) {
                    console.log('User cancelled image picker');
                  } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                  } else if (response.customButton) {
                    console.log(
                      'User tapped custom button: ',
                      response.customButton,
                    );
                    Alert.alert(response.customButton);
                  } else {
                    ImagePicker.openCropper({
                      path: response.assets[0].uri,
                      width: 400,
                      height: 400,
                      cropperCircleOverlay: true,
                      cropperToolbarTitle: 'Crop Photo',
                      cropperActiveWidgetColor: 'white',
                      cropperStatusBarColor: 'black',
                      cropperToolbarColor: 'black',
                      cropperToolbarWidgetColor: 'white',
                    }).then(image => {
                      setImageUri(image.path);
                    });
                  }
                });

                break;
              case RESULTS.BLOCKED:
                // console.log(
                //   'The permission is denied and not requestable anymore',
                // );
                // Request user to manually toggle on required permissions from app settings
                Alert.alert(
                  'Permission Alert',
                  'Storage Permission needed for selecting/capturing user profile photo, please grant permission from app settings.',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    { text: 'OK', onPress: () => openSettings() },
                  ],
                );
                break;
            }
          })
          .catch(error => {
            // …
            // console.log('some error while fetching permission :', error);
          });
      } else if (Platform.OS === 'ios') {
        check(PERMISSIONS.IOS.PHOTO_LIBRARY)
          .then(result => {
            switch (result) {
              case RESULTS.UNAVAILABLE:
                // console.log(
                //   'This feature is not available (on this device / in this context)',
                // );
                Alert.alert(
                  'Permission Alert',
                  'Requested functionality is not supported by your device.',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    { text: 'OK', onPress: () => console.log('ok boss') },
                  ],
                );
                break;
              case RESULTS.DENIED:
                // console.log(
                //   'The permission has not been requested / is denied but requestable',
                // );
                request(PERMISSIONS.IOS.PHOTO_LIBRARY).then(result => {
                  // …
                  // console.log('PHOTO LIBRARY PERMISSION GRANTED.', result);
                });
                break;
              case RESULTS.LIMITED:
                // console.log(
                //   'The permission is limited: some actions are possible',
                // );
                Alert.alert(
                  'Permission Alert',
                  'Due to system limitations few features are available on your device model. Please enable the photo permissions from app settings.',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    { text: 'OK', onPress: () => openSettings() },
                  ],
                );
                break;
              case RESULTS.GRANTED:
                // console.log('The permission is granted');
                // Process Image Picker if permission is granted.
                let options = {
                  storageOptions: {
                    skipBackup: true,
                    path: 'images',
                  },
                };

                ImagePicker.openPicker({
                  width: 400,
                  height: 400,
                  cropping: true,
                  cropperCircleOverlay: true,
                  cropperToolbarTitle: 'Crop Photo',
                  cropperActiveWidgetColor: 'white',
                  cropperStatusBarColor: 'wite',
                  cropperToolbarColor: 'white',
                  cropperToolbarWidgetColor: 'white',
                }).then(image => {
                  setImageUri(image?.path);
                  // console.log(image.path);
                });

                break;
              case RESULTS.BLOCKED:
                // console.log(
                //   'The permission is denied and not requestable anymore',
                // );
                // Request user to manually toggle on required permissions from app settings
                Alert.alert(
                  'Permission Alert',
                  'Storage Permission needed for selecting/capturing user profile photo, please grant permission from app settings.',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    { text: 'OK', onPress: () => openSettings() },
                  ],
                );
                break;
            }
          })
          .catch(error => {
            // …
            // console.log('some error while fetching permission :', error);
          });
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <SafeAreaView style={GStyles.Dark}>
      <View style={GStyles.Dark}>
        <AppHeader iconColor={AppColors.DarkGrey} enableBack>
          <AccentButton
            title="Done"
            disabled={active}
            onPress={() => {
              UpdateDetails();
            }}
          />
        </AppHeader>
        <ScreenLoader loading={loading} message="Loading ..." />

        <Container>
          <Text
            style={{
              fontSize: 42,
              color: AppColors.white1,
              fontFamily: AppFonts.CalibriBold,
            }}
          >
            Add Profile
          </Text>
          <Text
            style={{
              fontSize: 42,
              color: AppColors.white1,
              fontFamily: AppFonts.CalibriBold,
            }}
          >
            pic
          </Text>
          <VertSpace size={20} />
          <View
            style={{
              alignItems: 'center',

              justifyContent: 'center',
            }}
          >
            <ProfilePicker
              onPress={launchImageLibrary}
              imageUrlParmas={imageUri}
            />
          </View>
        </Container>
        <PageDots PageNum={4} />
      </View>
    </SafeAreaView>
  );
};
