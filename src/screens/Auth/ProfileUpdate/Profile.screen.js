/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {
  FontSize,
  GStyles,
  Spacing,
  VertSpace,
} from '../../../shared/Global.styles';
import {useNavigation} from '@react-navigation/native';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {AppColors} from '../../../assets/AppColors';
import {AppHeader} from '../../../components/AppHeader';
import {Container, NextButton} from 'components/Mini';
import {CameraWhiteIcon} from '../../../shared/Icon.Comp';
import {AppFonts} from '../../../assets/fonts/AppFonts';
import Spinner from '../../../components/Spinner';
import {ImgSourceCheck} from 'components/BioImageView';
import {useDispatch, useSelector} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {saveProgress} from 'redux/reducers/UserAuth.reducer';
import {STR_KEYS} from 'shared/Storage';
import {firebase} from '@react-native-firebase/messaging';
import {SelectableRadioButton} from 'components/SelectableRadioButton';
import {APP_APIS} from 'ApiLogic/API_URL';
import {showToast} from 'shared/Functions/ToastFunctions';
import {wp} from 'shared/dimens';
import DefaultImage from 'assets/images/DefaultIcon.png';
import ImagePicker from 'react-native-image-crop-picker';
import {AuthContext} from 'Navigator/router';

export const CameraButtonWhite = ({size}) => {
  return (
    <View
      style={{
        ...GStyles.containView,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: AppColors.DarkGrey,
      }}>
      <CameraWhiteIcon size={parseInt(size * 0.5)} />
    </View>
  );
};

export const ProfilePicker = ({
  imageUrlParmas = null,
  style = {},
  size = wp(250),
  onSelected = () => {},
  onPress = () => {},
  show = true,
}) => {
  const navigation = useNavigation();

  // PHOTO LIST
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        // onPress={() => {
        //   navigation.navigate('PhotosList', {
        //     pickerType: 'single',
        //     routeName: 'ProfilePictureScreen',
        //   });
        // }}
        style={{
          width: size,
          height: size,
          borderRadius: size,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          resizeMode={'cover'}
          resizeMethod="resize"
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            // position: 'absolute',
          }}
          source={
            imageUrlParmas == null
              ? DefaultImage
              : {uri: ImgSourceCheck(imageUrlParmas)}
          }
          // source={{ uri: `https://picsum.photos/id/1/${size}` }}
        />
        {show && (
          <View style={{position: 'absolute', bottom: 35, right: 0}}>
            <CameraButtonWhite size={size / 4.5} />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export const GenderOptions = [
  {
    key: '1',
    text: 'Male',
  },
  {
    key: '2',
    text: 'Female',
  },
  {
    key: '3',
    text: 'Others',
  },
];
export function ProfileScreen({route}) {
  const dispatch = useDispatch();
  const {verifiedNumber} = useSelector(state => state.userAuth);
  // const [disabled, setdisabled] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [Username, setUsername] = React.useState('');
  const [BirthDate, setBirthDate] = React.useState('');
  const [imageUri, setimageUri] = React.useState(null);
  const [Gender, setGender] = React.useState({key: 1, text: 'male'});
  const {signIn} = React.useContext(AuthContext);
  const navigation = useNavigation();
  const CropPhoto = imagedata => {
    // file:///storage/emulated/0/Pictures/271df2f9-0bb4-49ee-a8b7-36141ef126bf.jpg {"height": 540, "width": 540}

    // navigate('CropPhotoRegister', {
    //   imagedata: {
    //     uri:
    //       'file:///storage/emulated/0/Pictures/271df2f9-0bb4-49ee-a8b7-36141ef126bf.jpg',
    //     width: 540,
    //     height: 540,
    //   },
    //   routeName: 'ProfileScreen',
    // });

    Image.getSize(imagedata, (width, height) => {
      navigation.navigate('CropPhotoRegister', {
        imagedata: {uri: imagedata, width, height},
        routeName: 'ProfileScreen',
      });
    }).catch(error => showToast('', error.toString()));
  };

  React.useEffect(() => {
    if (route.params?.croppedImageUri) {
      setimageUri(route.params?.croppedImageUri);
    }
  }, [route.params?.croppedImageUri]);

  // React.useEffect(() => {
  //   if (route.params?.imageList) {
  //     if (route.params?.imageList.length > 0) {
  //       CropPhoto(route.params?.imageList[0]);
  //       setimageUri(route.params?.imageList[0]);
  //     }
  //   }
  // }, [route.params?.imageList]);

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
        setimageUri(image.path);
        // console.log(image.path);
      });
    }
  }, [route.params?.imageList]);

  // CREATING PROFILE
  const UpdateDetails = async () => {
    setLoading(true);
    const fcmToken = await firebase.messaging().getToken();
    const uniqueId = DeviceInfo.getUniqueId();
    let countryCode = await AsyncStorage.getItem(STR_KEYS.COUNTRY_CODE);

    const timestamp = new Date();
    let imageEntity =
      imageUri !== null
        ? {
            uri: imageUri,
            type: 'image/jpeg',
            name: `${Username}${timestamp}.jpg`,
          }
        : null;
    let formdata = new FormData();
    formdata.append('phone', verifiedNumber);
    formdata.append('username', Username);
    formdata.append('image', imageEntity);
    formdata.append('dob', `${BirthDate}-06-30`); //  appenf data
    formdata.append('gender', 'M'); //capital O for others
    formdata.append('country_code', countryCode);
    formdata.append('deviceID', uniqueId);
    formdata.append('deviceToken', fcmToken.toString());
    formdata.append('deviceType', Platform.OS.toString());

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch(APP_APIS.REGISTER, requestOptions)
      .then(response => response.json())
      .then(result => {
        const setProceedStatus = async () => {
          try {
            await AsyncStorage.setItem(
              STR_KEYS.PROCEED_STATUS,
              'ChooseFavourites',
            );
          } catch (e) {}
        };
        setProceedStatus();

        dispatch(
          saveProgress({
            proceedStatus: 'ChooseFavourites',
          }),
        );

        signIn({
          token: result.token,
          userData: result.user,
          countryCode,
        });
        setLoading(false);
      })
      .catch(error => {
        showToast('Error while registration, please try again');
      });
  };

  return (
    <SafeAreaView
      style={[GStyles.containerFlex, {backgroundColor: AppColors.white}]}>
      <AppHeader>
        <NextButton
          disabled={Username == '' || BirthDate.length !== 4}
          onPress={() => {
            UpdateDetails();
          }}
        />
      </AppHeader>

      <ScrollView keyboardShouldPersistTaps="always">
        <Spinner visible={loading} textContent={'Loading...'} />

        <VertSpace size={50} />
        <Container padding={Spacing.xxlarge}>
          <View style={{alignItems: 'center'}}>
            {/* <AppButton title="tets" onPress={() => CropPhoto()} /> */}
            <ProfilePicker imageUrlParmas={imageUri} />
          </View>

          <VertSpace size={60} />
          <View style={{paddingLeft: 10}}>
            <Label title={'Username'} />
            <View
              style={{
                ...styles.textInputContainer,
                backgroundColor:
                  Username.length == 0
                    ? AppColors.LightGrey
                    : AppColors.MediumGrey,
              }}>
              <TextInput
                autoFocus={false}
                style={{
                  fontFamily: AppFonts.CalibriBold,
                  fontSize: FontSize.inputText,
                  width: '90%',
                  color: AppColors.white,
                }}
                maxLength={25}
                value={Username}
                onChangeText={textValue => setUsername(textValue)}
                placeholder={'Enter name'}
                placeholderTextColor={AppColors.white}
              />
            </View>
            <VertSpace size={Spacing.size40} />
          </View>

          <View style={{paddingLeft: 10}}>
            <Label title={'Year of birth'} />
            <View
              style={{
                ...styles.textInputContainer,
                width: wp(100),
                ...GStyles.containView,
                backgroundColor:
                  BirthDate.length == 0
                    ? AppColors.LightGrey
                    : AppColors.MediumGrey,
              }}>
              <TextInput
                style={{
                  fontFamily: AppFonts.CalibriBold,
                  fontSize: FontSize.inputText,
                  width: wp(80),
                  color: AppColors.white,
                }}
                keyboardType="numeric"
                maxLength={4}
                value={BirthDate}
                onChangeText={textValue => {
                  var currentYear = new Date().getFullYear();
                  var inputYear = parseInt(textValue);
                  if (textValue.length == 4) {
                    if (currentYear - inputYear >= 8) {
                      setBirthDate(textValue);
                    }
                  } else {
                    setBirthDate(textValue);
                  }
                }}
                placeholder={'YYYY'}
                placeholderTextColor={AppColors.white}
              />
            </View>
          </View>

          <VertSpace size={Spacing.size40} />
          <Label title={'Gender'} />
          <SelectableRadioButton
            data={GenderOptions}
            onSelected={value => {
              setGender(value);
            }}
            editable={true}
          />

          <VertSpace size={50} />
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}

export const Label = ({title = 'Title', required = false}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: 'wheat',
      }}>
      <Text
        style={{
          color: AppColors.MediumGrey,
          fontFamily: AppFonts.CalibriBold,
          fontSize: FontSize.large,
          lineHeight: FontSize.large,
        }}>
        {title}
      </Text>

      {required && (
        <Text
          style={{
            color: AppColors.Red,
            fontFamily: AppFonts.CalibriBold,
            fontSize: FontSize.large,
            lineHeight: FontSize.large,
          }}>
          *
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textInputContainer: {
    backgroundColor: AppColors.VeryLightGrey,
    flexDirection: 'row',
    width: '90%',
    borderRadius: 30,
    paddingHorizontal: 10,
    marginLeft: -10,
    marginTop: 10,
  },
});
