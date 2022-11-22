/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef, useContext} from 'react';
import {
  AppDimens,
  FontSize,
  GStyles,
  Spacing,
  VertSpace,
} from 'shared/Global.styles';
import {useNavigation} from '@react-navigation/native';
import {
  Image,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  Alert,
} from 'react-native';
import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import {AppColors} from 'assets/AppColors';
import {AppHeader} from 'components/AppHeader';
import {AccentButton} from 'components/Mini';
import {BioCircleIcon, CameraWhiteIcon} from 'shared/Icon.Comp';
import {AppFonts} from 'assets/fonts/AppFonts';
import {useDispatch, useSelector} from 'react-redux';
import {updateUserData} from 'redux/reducers/UserAuth.reducer';
import {STR_KEYS} from 'shared/Storage';
import {showToast} from 'shared/Functions/ToastFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'components/Spinner';
import {wp} from 'shared/dimens';
import {APP_APIS} from 'ApiLogic/API_URL';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import {GetUserDetailsAction} from 'redux/reducers/UserProfile/userprofile.reducer';
import * as ImagePickers from 'react-native-image-picker';
import Ripple from 'react-native-material-ripple';
import Modals from 'react-native-modal';
import {HorizontalLine} from 'screens/Timeline/components/PostView/Postview.comp';
import {AuthContext} from 'Navigator/router';

export const CameraButtonWhite = ({size}) => {
  return (
    <View
      style={{
        ...GStyles.containView,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: AppColors.Red,
      }}>
      <CameraWhiteIcon size={parseInt(size * 0.5)} />
    </View>
  );
};

export const ProfilePicker = ({
  imageUrlParmas = null,
  size = wp(180),
  onSelected = () => {},
}) => {
  const navigation = useNavigation();
  // PHOTO LIST

  return (
    <View style={{width: size, height: size, ...GStyles.flexRowCenter}}>
      {imageUrlParmas != null ? (
        <View style={{width: size, height: size}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ViewPhoto', {image: imageUrlParmas})
            }
            activeOpacity={0.9}
            style={{
              width: size,
              height: size,
              borderRadius: size / 2,
            }}>
            <Image
              resizeMode={'cover'}
              style={{
                width: size,
                height: size,
                borderRadius: size / 2,
              }}
              source={{uri: imageUrlParmas}}
              // source={{ uri: `https://picsum.photos/id/1/${size}` }}
            />
          </TouchableOpacity>

          <Ripple
            onPress={onSelected}
            style={{position: 'absolute', bottom: 0, right: 20}}>
            <CameraButtonWhite size={size / 4} />
          </Ripple>
        </View>
      ) : (
        <View style={{width: size, height: size}}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={{
              width: size,
              height: size,
              ...GStyles.flexRowCenter,
            }}>
            <BioCircleIcon size={size + 70} />
          </TouchableOpacity>

          <Ripple
            onPress={onSelected}
            style={{position: 'absolute', bottom: 0, right: 20}}>
            <CameraButtonWhite size={size / 4} />
          </Ripple>
        </View>
      )}
    </View>
  );
};

export function UpdateProfile() {
  const navigation = useNavigation();
  const [disabled, setdisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [Username, setUsername] = useState('');
  const [BirthDate, setBirthDate] = useState('');
  const [prevUsername, setprevUsername] = useState('');
  const [imageUri, setimageUri] = useState(null);
  const [prevImageuri, setPrevImageuri] = useState(null);
  const [Gender, setGender] = useState({key: 1, text: 'male'});
  const dispatch = useDispatch();
  const {userToken} = useSelector(state => state.userAuth);
  const {userProfileData} = useSelector(state => state.UserDetailsReducer);
  const {user} = {...userProfileData};
  const {dob, gender, image, username, phone} = {
    ...user,
  };
  const isCancel = useRef(false);
  const [LoadingAcc, setLoadingAcc] = useState(false);

  const [ModalOpen, setModalOpen] = useState(false);

  const launchImageLibrary = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          // {
          //   title: 'Memofac App Camera Permission',
          //   message:
          //     'Memofac App needs access to your camera ' +
          //     'so you can take awesome pictures.',
          //   buttonNeutral: 'Ask Me Later',
          //   buttonNegative: 'Cancel',
          //   buttonPositive: 'OK',
          // },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
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
              console.log('User tapped custom button: ', response.customButton);
              alert(response.customButton);
            } else {
              // console.log(response.assets[0].uri);
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
                setimageUri(image.path);
                // console.log(image.path);
                setdisabled(false);
              });
            }
          });
        } else {
          console.log('Camera permission denied');
        }
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
                    {text: 'OK', onPress: () => console.log('ok boss')},
                  ],
                );
                break;
              case RESULTS.DENIED:
                // console.log(
                //   'The permission has not been requested / is denied but requestable',
                // );
                request(PERMISSIONS.IOS.PHOTO_LIBRARY).then(() => {
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
                    {text: 'OK', onPress: () => openSettings()},
                  ],
                );
                break;
              case RESULTS.GRANTED:
                // Process Image Picker if permission is granted.

                ImagePicker.openPicker({
                  width: 300,
                  height: 400,
                  cropping: true,
                  cropperCircleOverlay: true,
                  cropperToolbarTitle: 'Crop Photo',
                  cropperActiveWidgetColor: 'white',
                  cropperStatusBarColor: 'wite',
                  cropperToolbarColor: 'white',
                  cropperToolbarWidgetColor: 'white',
                }).then(image => {
                  // console.log(image);
                  setimageUri(image?.path);
                  // console.log(image.path);
                  setdisabled(false);
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
                    {text: 'OK', onPress: () => openSettings()},
                  ],
                );
                break;
            }
          })
          .catch(() => {
            // …
            // console.log('some error while fetching permission :', error);
          });
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const {signOut} = useContext(AuthContext);

  useEffect(() => {
    if (Object.keys(userProfileData).length > 0 && !isCancel.current) {
      setUsername(username);
      setimageUri(image);
      setPrevImageuri(image);
      setBirthDate(dob.substring(0, 4));
      setprevUsername(username);
    }
  }, [userProfileData]);

  useEffect(() => {
    return () => {
      isCancel.current = true;
    };
  }, []);

  // update data
  const UpdateData = () => {
    setLoading(true);
    var formData = new FormData();
    formData.append('token', userToken);
    formData.append('name', Username);
    formData.append('dob', `${BirthDate}-06-30`);
    formData.append('gender', gender);
    formData.append('image', {
      name: 'image',
      type: 'image/jpeg',
      uri: imageUri,
    });

    // console.log(formData);

    axios
      .post(APP_APIS.EDIT_PROFILE, formData)
      .then(async response => {
        dispatch(GetUserDetailsAction(userToken));
        dispatch(updateUserData({payload: {...response.data.content}}));
        const USER_DATA = [
          STR_KEYS.USERDATA,
          JSON.stringify(response.data.content),
        ];

        try {
          await AsyncStorage.multiSet([USER_DATA]);
        } catch (error) {
          showToast('error whilte Update Saving Data localstorage...');
        }
        showToast('Profile Updated');
        navigation.navigate('UserProfileNav', {
          isImageUpdated: prevImageuri !== imageUri,
        });
      })
      .catch(() => {
        showToast('Error while saving Profile');
      })
      .finally(() => setLoading(false));
  };

  const DeleteAccount = () => {
    console.log(userToken);
    setLoadingAcc(true);
    setModalOpen(false);
    axios
      .post(APP_APIS.DELETE_USER_ACCOUNT, {
        phone,
        token: userToken,
      })
      .then(res => {
        console.log(res);
        signOut();
        // analytics().logEvent('Logout');
        setLoadingAcc(false);

        showToast('Account Successfully Deleted');
      })
      .catch(e => {
        console.log('Delete Account error', e);
        setLoadingAcc(false);
      })
      .finally(() => {
        setLoadingAcc(false);
      });
  };
  return (
    <SafeAreaView
      style={[GStyles.containerFlex, {backgroundColor: AppColors.DarkBG}]}>
      <AppHeader enableBack>
        <AccentButton
          title={'Update'}
          disabled={disabled}
          onPress={() => {
            UpdateData();
          }}
        />
      </AppHeader>

      <Spinner visible={loading} textContent={'Updating Profile...'} />
      <Spinner visible={LoadingAcc} textContent={'Account deleting...'} />
      <ScrollView>
        <VertSpace size={wp(50)} />

        <View
          style={{
            paddingHorizontal: Spacing.xlarge,
            height: AppDimens.height * 0.8,
          }}>
          <View style={{alignItems: 'center'}}>
            <ProfilePicker
              onSelected={() => launchImageLibrary()}
              // size={211}
              imageUrlParmas={imageUri}
            />
          </View>

          <VertSpace size={60} />

          <View style={{paddingLeft: 10}}>
            {/* <Label title={'Username'} required /> */}

            <TextInput
              style={{
                fontFamily: AppFonts.CalibriBold,
                fontSize: FontSize.inputText,
                width: '90%',
                color: AppColors.white2,
                borderBottomWidth: 1,
                borderColor: AppColors.disableColor,
              }}
              maxLength={25}
              value={Username}
              onChangeText={textValue => {
                if (textValue.length <= 25) {
                  setUsername(textValue), setdisabled(false);
                }
              }}
              placeholder={'Enter Username'}
              placeholderTextColor={AppColors.VeryLightGrey}
            />
          </View>

          <Modals
            onBackdropPress={() => setModalOpen(false)}
            onBackButtonPress={() => setModalOpen(false)}
            isVisible={ModalOpen}>
            <View style={{flex: 1, ...GStyles.flexRowCenter}}>
              <View
                style={{
                  width: 300,
                  height: 400,
                  paddingHorizontal: 20,
                  backgroundColor: AppColors.LightDark,
                  borderRadius: 10,
                }}>
                <VertSpace size={30} />

                <Text style={styles.modalTitleDark}>
                  Are you sure that you want to delete your Memofac account ?
                </Text>
                {/* <VertSpace size={hp(30)} /> */}
                <HorizontalLine
                  VerticalSpace={30}
                  width={150}
                  color={AppColors.white4}
                />
                <Text
                  style={{
                    color: AppColors.white1,
                    fontSize: 12,
                    textAlign: 'center',
                  }}>
                  If you delete your account, you will permanently lose your
                  profile , messages, posts, photos and memos ratings. if you
                  delete your account, this action cannot be undone.
                </Text>
                {/* <VertSpace size={hp(40)} /> */}
                <View
                  style={{
                    // ...GStyles.flexRowSpaceBetween,
                    // paddingHorizontal: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    bottom: 40,
                    width: 300,
                  }}>
                  <TouchableOpacity
                    style={{
                      width: AppDimens.width * 0.7,
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 40,
                      borderRadius: 5,
                      borderWidth: 0.5,
                      borderColor: AppColors.white2,
                      shadowColor: AppColors.DarkBG,
                      shadowOpacity: Platform.OS === 'android' ? 1.5 : 0,
                      elevation: 8,
                      shadowRadius: 20,
                      shadowOffset: {width: 1, height: 13},
                      backgroundColor: AppColors.white,
                    }}
                    onPress={DeleteAccount}>
                    <Text
                      style={{
                        fontFamily: AppFonts.CalibriBold,
                        fontSize: 17,
                        color: AppColors.Red,
                      }}>
                      Delete My Account
                    </Text>
                  </TouchableOpacity>
                  <VertSpace size={20} />
                  <TouchableOpacity
                    onPress={() => setModalOpen(false)}
                    style={{
                      // backgroundColor: AppColors.Red,
                      width: AppDimens.width * 0.7,
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 40,
                      borderRadius: 5,
                      borderWidth: 0.5,
                      borderColor: AppColors.white2,
                      shadowColor: AppColors.DarkBG,
                      shadowOpacity: Platform.OS === 'android' ? 1.5 : 0,
                      elevation: 8,
                      shadowRadius: 20,
                      shadowOffset: {width: 1, height: 13},
                      backgroundColor: AppColors.white,
                    }}>
                    <Text
                      style={{
                        fontFamily: AppFonts.CalibriBold,
                        fontSize: 17,
                        color: AppColors.LowWhite,
                      }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modals>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 30,
            alignItems: 'center',
            justifyContent: 'center',
            width: AppDimens.width * 1,
          }}>
          <Text
            onPress={() => setModalOpen(true)}
            style={{
              color: AppColors.blue1,
              borderBottomWidth: 1,
              borderBottomColor: AppColors.blue1,
              textAlign: 'center',
              fontStyle: 'italic',
              fontFamily: AppFonts.CalibriRegular,
            }}>
            Delete account
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalText: {
    color: AppColors.LowWhite,
    fontFamily: AppFonts.CalibriRegular,
    fontSize: 21,
  },
  textInputContainer: {
    backgroundColor: AppColors.VeryLightGrey,
    flexDirection: 'row',
    width: '90%',
    borderRadius: 30,
    paddingHorizontal: 10,
    marginLeft: -10,
    marginTop: 10,
  },
  modalTextDark: {
    color: AppColors.white1,
    fontFamily: AppFonts.CalibriRegular,
    fontSize: 21,
  },
  modalTitle: {
    textAlign: 'center',
    color: AppColors.DarkGrey,
    fontFamily: AppFonts.CalibriBold,
    fontSize: 20,
    lineHeight: 25,
  },
  modalTitleDark: {
    textAlign: 'center',
    color: AppColors.white1,
    fontFamily: AppFonts.CalibriBold,
    fontSize: 20,
    lineHeight: 30,
  },
});
