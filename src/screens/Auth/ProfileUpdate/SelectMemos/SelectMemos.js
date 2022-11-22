/* eslint-disable react-native/no-inline-styles */
import {Text, View, SafeAreaView, Platform} from 'react-native';
import React, {useRef} from 'react';
import {AppDimens, GStyles, VertSpace} from 'shared/Global.styles';
import {PageDots} from '../NameScreen/UserName';
import {AccentButton, Container} from 'components/Mini';
import {AppHeader} from 'components/AppHeader';
import {AppColors} from 'assets/AppColors';
import {AppFonts} from 'assets/fonts/AppFonts';
import {SecondaryGroupList} from 'screens/Memos/SavetoCollection';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {Skeletons} from 'shared/Skeletons';
import {useDispatch, useSelector} from 'react-redux';
import {addFavorites} from 'redux/sagas/UserProfile/userProfile.request';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {saveProgress} from 'redux/reducers/UserAuth.reducer';
import {GetCategoryListOfMemos} from 'redux/sagas/Memos/request';
import {firebase} from '@react-native-firebase/messaging';
import {AuthContext} from 'Navigator/router';
import DeviceInfo from 'react-native-device-info';
import {showToast} from 'shared/Functions/ToastFunctions';
import {STR_KEYS} from 'shared/Storage';
import {APP_APIS} from 'ApiLogic/API_URL';
import {ScreenLoader} from 'components/Loaders/ScreenLoader';

export const SelectMemos = ({route}) => {
  const {DOB, gender, name} = route.params;
  const isCancel = useRef(false);
  const [imageUri, setImageUri] = React.useState(null);

  const [listoffolders, setlistoffolders] = React.useState([]);
  const [secondaryList, setsecondaryList] = React.useState({});
  const [dataLoading, setDataLoading] = React.useState(true);
  // const userAuth = useSelector(state => state.userAuth);
  const dispatch = useDispatch();
  const {signIn} = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const {verifiedNumber} = useSelector(state => state.userAuth);

  React.useEffect(() => {
    GetCategoryListOfMemos(0)
      .then(response => {
        if (!isCancel.current) {
          setlistoffolders(response.content);
        }
      })
      .catch(error => showToast(error))
      .finally(() => setDataLoading(false));

    return () => {
      isCancel.current = true;
    };
  }, []);

  // const onNextPress = () => {
  //   setAddFavoritesLoading(true);
  //   const selectedIds = Object.keys(secondaryList).join(',');
  //   navigation.navigate('ProfilePictureScreen', {
  //     DOB,
  //     gender,
  //     name,
  //     selectedIds,
  //   });
  // };

  const onNextPress = async () => {
    setLoading(true);
    setActive(true);
    const fcmToken = await firebase.messaging().getToken();
    const uniqueId = DeviceInfo.getUniqueId();
    let countryCode = await AsyncStorage.getItem(STR_KEYS.COUNTRY_CODE);
    const selectedIds = Object.keys(secondaryList).join(',');

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
    formdata.append('deviceToken', fcmToken.toString());
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

      .catch(() => {
        showToast('Error while registration, please try again');
        setLoading(false);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
  };

  return (
    <SafeAreaView style={GStyles.Dark}>
      <View style={GStyles.Dark}>
        <AppHeader iconColor={AppColors.DarkGrey} enableBack>
          <AccentButton
            title={'Next'}
            disabled={Object.values(secondaryList).length <= 3}
            onPress={onNextPress}
          />
        </AppHeader>
        <ScreenLoader loading={loading} message="Adding your account ..." />

        <VertSpace />

        <Container>
          <Text
            style={{
              fontSize: 38,
              color: AppColors.white1,
              fontFamily: AppFonts.GillSans,
            }}>
            Choose your
          </Text>
          <Text
            style={{
              fontSize: 38,
              color: AppColors.white1,
              fontFamily: AppFonts.GillSans,
            }}>
            interest
          </Text>
          <VertSpace />

          <Text
            style={{
              color: AppColors.MediumGrey,
              fontSize: 18,
              fontFamily: AppFonts.CalibriRegular,
            }}>
            Select minimum of 4 categories
          </Text>
          <VertSpace size={Platform.OS === 'android' ? 10 : 8} />

          <SkeletonContent
            containerStyle={{flexDirection: 'column', marginTop: 20}}
            boneColor={AppColors.RecomBoneDark}
            highlightColor={AppColors.SkeletonBone}
            isLoading={dataLoading}
            layout={Skeletons.searchMemos}>
            <SecondaryGroupList
              dataSet={listoffolders}
              height={AppDimens.height * 0.6}
              footerHeight={150}
              secondaryList={secondaryList}
              onSelect={selectedSecondary => {
                setsecondaryList(selectedSecondary);
              }}
            />
          </SkeletonContent>
        </Container>
        <PageDots PageNum={3} />
      </View>
    </SafeAreaView>
  );
};
