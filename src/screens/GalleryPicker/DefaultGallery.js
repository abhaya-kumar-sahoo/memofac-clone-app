/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  Alert,
  Platform,
} from 'react-native';
import React from 'react';
import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import {AppColors} from 'assets/AppColors';
import * as ImagePickers from 'react-native-image-picker';
import Modals from 'react-native-modal';
import {AppDimens, GStyles, VertSpace} from 'shared/Global.styles';
import {hp} from 'shared/dimens';
import {AppFonts} from 'assets/fonts/AppFonts';
import {HorizontalLine} from 'screens/Timeline/components/PostView/Postview.comp';
import {Container} from 'components/Mini';
import {TouchableRipple} from 'react-native-paper';
import {APP_APIS} from 'ApiLogic/API_URL';
import {useDispatch, useSelector} from 'react-redux';
import {GetUserDetailsAction} from 'redux/reducers/UserProfile/userprofile.reducer';
import {updateUserData} from 'redux/reducers/UserAuth.reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showToast} from 'shared/Functions/ToastFunctions';
import {STR_KEYS} from 'shared/Storage';
import {ScreenLoader} from 'components/Loaders/ScreenLoader';
import ImagePicker from 'react-native-image-crop-picker';

export const DefaultGallery = ({
  isModalVisible = false,
  onRequestClose = () => {},
  onPressViewImage = () => {},
}) => {
  const {userToken, userData} = useSelector(state => state.userAuth);

  const dispatch = useDispatch();
  const [ImageChange, setImageChange] = React.useState('');
  const [Loading, setLoading] = React.useState(false);

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
                    {text: 'OK', onPress: () => console.log('ok boss')},
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
                    {text: 'OK', onPress: () => console.log('ok boss')},
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
                      setImageChange(image.path);
                      onRequestClose();
                      setTimeout(() => {
                        setPhotoModalOpen(!PhotoModalOpen);
                      }, 1000);
                      // console.log(image.path);
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
                    {text: 'OK', onPress: () => openSettings()},
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
                    {text: 'OK', onPress: () => console.log('ok boss')},
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
                    {text: 'OK', onPress: () => openSettings()},
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
                  setImageChange(image?.path);
                  onRequestClose();
                  setTimeout(() => {
                    setPhotoModalOpen(!PhotoModalOpen);
                  }, 1000);
                  // console.log(image?.path);
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
          .catch(error => {
            // …
            // console.log('some error while fetching permission :', error);
          });
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const UpdateData = async () => {
    // setLoading(true);
    setPhotoModalOpen(!PhotoModalOpen);

    var formData = new FormData();
    formData.append('token', userToken);
    formData.append('name', userData.name);
    formData.append('dob', `${userData.dob}`);
    formData.append('gender', userData.gender);
    formData.append('image', {
      name: 'image',
      type: 'image/jpeg',
      uri: ImageChange,
    });

    var requestOptions = {
      method: 'POST',
      body: formData,
      redirect: 'follow',
    };
    setLoading(true);
    await fetch(APP_APIS.EDIT_PROFILE, requestOptions)
      .then(response => response.json())
      .then(async result => {
        // console.log('responser from server', result);

        dispatch(GetUserDetailsAction(userToken));
        dispatch(updateUserData({payload: {...result.content}}));
        const USER_DATA = [STR_KEYS.USERDATA, JSON.stringify(result.content)];

        try {
          await AsyncStorage.multiSet([USER_DATA]);
        } catch (error) {
          showToast('error whilte Update Saving Data localstorage...');
        }
        showToast('Profile Updated');
        setLoading(false);
      })
      .catch(error => {
        // showToast('Error while saving Profile');
        console.log('Error is === > ', error);
        setLoading(false);
      });

    // setLoading(true);
    // await axios
    //   .post(APP_APIS.EDIT_PROFILE, formData)
    //   .then(async response => {
    //     console.log('responser from server', response.data.content);
    //     dispatch(GetUserDetailsAction(userToken));
    //     dispatch(updateUserData({ payload: { ...response.data.content } }));
    //     const USER_DATA = [
    //       STR_KEYS.USERDATA,
    //       JSON.stringify(response.data.content),
    //     ];

    //     try {
    //       await AsyncStorage.multiSet([USER_DATA]);
    //     } catch (error) {
    //       showToast('error whilte Update Saving Data localstorage...');
    //     }
    //     showToast('Profile Updated');
    //     setLoading(false);
    //   })
    //   .catch(error => {
    //     // showToast('Error while saving Profile');
    //     console.log('Error is === > ', error);
    //     setLoading(false);
    //   });
    // .finally(() => setLoading(false));
  };
  const [ModalOpen, setModalOpen] = React.useState(false);
  const [PhotoModalOpen, setPhotoModalOpen] = React.useState(false);
  const [PhotoModalDelete, setPhotoModalDelete] = React.useState(false);

  const RemovePhoto = async () => {
    setModalOpen(!ModalOpen);
    setPhotoModalDelete(true);
    var requestOption = {
      method: 'POST',
      body: JSON.stringify({
        token: userToken,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    await fetch(APP_APIS.DELETE_PROFILE_PIC, requestOption)
      .then(response => response.json())
      .then(async result => {
        console.log(result);
        dispatch(GetUserDetailsAction(userToken));
        dispatch(updateUserData({payload: {...result.content}}));
        const USER_DATA = [STR_KEYS.USERDATA, JSON.stringify(result.content)];

        try {
          await AsyncStorage.multiSet([USER_DATA]);
        } catch (error) {
          showToast('error whilte Update Saving Data localstorage...');
        }
        setPhotoModalDelete(false);

        showToast('Profile Pic Deleted');
      })
      .catch(error => {
        console.log('Error is === > ', error);
      });
  };
  return (
    <View style={{}}>
      <Modals isVisible={ModalOpen}>
        <View
          style={{
            flex: 1,
            ...GStyles.flexRowCenter,
          }}>
          <View
            style={{
              width: 330,
              height: 250,
              ...GStyles.ModalContainer,
              paddingHorizontal: 20,
              backgroundColor: AppColors.Skeleton,
            }}>
            <VertSpace size={30} />
            <Text style={styles.modalTitleDark}>
              Are you sure that you want to delete your profile picture ?
            </Text>
            <VertSpace size={70} />
            <View
              style={{...GStyles.flexRowSpaceBetween, paddingHorizontal: 40}}>
              <Text
                style={{
                  fontFamily: AppFonts.CalibriBold,
                  fontSize: 20,
                  color: AppColors.white1,
                }}
                onPress={RemovePhoto}>
                Yes
              </Text>
              <Text
                style={{
                  fontFamily: AppFonts.CalibriBold,
                  fontSize: 20,
                  color: AppColors.white1,
                }}
                onPress={() => setModalOpen(!ModalOpen)}>
                No
              </Text>
            </View>
          </View>
        </View>
      </Modals>
      <ScreenLoader loading={Loading} message="Updating Profile picture" />
      <ScreenLoader
        loading={PhotoModalDelete}
        message="Deleting Profile picture"
      />

      <Modals isVisible={PhotoModalOpen} animationIn={'zoomIn'}>
        <View
          style={{
            flex: 1,
            ...GStyles.flexRowCenter,
          }}>
          <View
            style={{
              width: 350,
              height: 350,
              ...GStyles.ModalContainer,
              paddingHorizontal: 20,
              backgroundColor: AppColors.Skeleton,
            }}>
            <VertSpace size={30} />
            <Text style={styles.modalTitleDark}>
              Are you sure that you want to change your profile picture ?
            </Text>
            <VertSpace size={20} />

            <View style={{...GStyles.flexRowCenter}}>
              <Image
                source={{uri: ImageChange ? ImageChange : null}}
                resizeMode="cover"
                width="100%"
                height="100%"
                style={{width: 150, height: 150, borderRadius: 100}}
              />
            </View>
            <VertSpace size={20} />
            <View
              style={{...GStyles.flexRowSpaceBetween, paddingHorizontal: 40}}>
              <Text
                style={{
                  fontFamily: AppFonts.CalibriBold,
                  fontSize: 20,
                  color: AppColors.white1,
                }}
                onPress={UpdateData}>
                Yes
              </Text>
              <Text
                style={{
                  fontFamily: AppFonts.CalibriBold,
                  fontSize: 20,
                  color: AppColors.white1,
                }}
                onPress={() => setPhotoModalOpen(!PhotoModalOpen)}>
                No
              </Text>
            </View>
          </View>
        </View>
      </Modals>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType={'slide'}
        style={{}}
        onRequestClose={onRequestClose}
        collapsable>
        <TouchableRipple
          onPress={onRequestClose}
          style={{
            flex: 1,
            ...GStyles.flexRowCenter,
            height: AppDimens.height,
            backgroundColor: '#00000999',
          }}>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              height: hp(240),
              width: AppDimens.width,
              backgroundColor: AppColors.SkeletonBone,
              borderTopEndRadius: 20,
              borderTopLeftRadius: 20,
            }}>
            <VertSpace size={50} />
            <Container padding={20}>
              <Text onPress={onPressViewImage} style={styles.modalTextDark}>
                View Profile Photo
              </Text>
              <HorizontalLine
                color={'#454545'}
                height={1}
                width={AppDimens.width * 0.87}
                VerticalSpace={30}
              />

              <Text onPress={launchImageLibrary} style={styles.modalTextDark}>
                Change Profile Photo
              </Text>

              <HorizontalLine
                color={'#454545'}
                height={1}
                width={AppDimens.width * 0.87}
                VerticalSpace={30}
              />
              <Text
                onPress={() => {
                  onRequestClose();
                  setTimeout(() => {
                    setModalOpen(!ModalOpen);
                  }, 1000);
                }}
                style={[styles.modalText, {color: AppColors.Red}]}>
                Remove Profile Photo
              </Text>
            </Container>
          </View>
        </TouchableRipple>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalText: {
    color: AppColors.LowWhite,
    fontFamily: AppFonts.CalibriRegular,
    fontSize: 21,
  },
  modalTextDark: {
    color: AppColors.white1,
    fontFamily: AppFonts.CalibriRegular,
    fontSize: 21,
  },
  modalTitle: {
    textAlign: 'center',
    color: AppColors.DarkGrey,
    fontFamily: AppFonts.CalibriRegular,
    fontSize: 20,
    lineHeight: 30,
  },
  modalTitleDark: {
    textAlign: 'center',
    color: AppColors.white,
    fontFamily: AppFonts.CalibriRegular,
    fontSize: 20,
    lineHeight: 30,
  },
});
