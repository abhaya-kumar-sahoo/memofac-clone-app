import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  PermissionsAndroid,
  Platform,
  View,
} from 'react-native';
import BioCircle from '../assets/svg/Icons/BioIcon.svg';
import DefaultImage from 'assets/images/DefaultIcon.png';
export const ImgSourceCheck = imageSrc => {
  return imageSrc == '' ? null : imageSrc;
};
import * as ImagePickers from 'react-native-image-picker';
import { openSettings, PERMISSIONS, RESULTS } from 'react-native-permissions';

export const BioImageView = ({
  imageSize = 50,
  imageSrc = null,
  loadingRequired = true,
}) => {
  const [imageLoading, setImageLoading] = React.useState(true);
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      {/* <BioCircle width={parseInt(imageSize)} height={parseInt(imageSize)} /> */}
      <Image
        onError={() => setImageLoading(false)}
        onLoad={() => setImageLoading(false)}
        style={{
          width: imageSize,
          height: imageSize,
          borderRadius: imageSize / 2,
          // position: 'absolute',
        }}
        source={DefaultImage}
      />
      {imageLoading && loadingRequired ? (
        <ActivityIndicator color={'black'} style={{ position: 'absolute' }} />
      ) : null}
      <Image
        onError={() => setImageLoading(false)}
        onLoad={() => setImageLoading(false)}
        style={{
          width: imageSize,
          height: imageSize,
          borderRadius: imageSize / 2,
          position: 'absolute',
        }}
        source={{ uri: ImgSourceCheck(imageSrc) }}
      />
    </View>
  );
};

export const launchImageLibrary = async () => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
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
              // setimageUri(image.path);
              // console.log(image.path);
              // setdisabled(false);
              return image.path;
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
                  { text: 'OK', onPress: () => console.log('ok boss') },
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
                  { text: 'OK', onPress: () => openSettings() },
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
                // setimageUri(image?.path);
                // // console.log(image.path);
                // setdisabled(false);
                return image.path;
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
        .catch(() => {
          // …
          // console.log('some error while fetching permission :', error);
        });
    }
  } catch (err) {
    console.warn(err);
  }
};
