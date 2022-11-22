/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {
  StatusBar,
  Text,
  FlatList,
  View,
  Image,
  RefreshControl,
  SafeAreaView,
  Platform,
} from 'react-native';
import {AppColors} from 'assets/AppColors';
import {
  AppDimens,
  FontSize,
  GStyles,
  HoriSpace,
  VertSpace,
} from 'shared/Global.styles';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {
  ContactsDarkIcon,
  DoneFillIcon,
  SettingsDarkIcon,
} from 'shared/Icon.Comp';
import {useNavigation} from '@react-navigation/native';
import {styles} from './UserProfile.style';
import {AppFonts} from 'assets/fonts/AppFonts';
import Ripple from 'react-native-material-ripple';
import {Container} from 'components/Mini';
import {useSelector, useDispatch} from 'react-redux';

import {GetUserDetailsAction} from 'redux/reducers/UserProfile/userprofile.reducer';
import {
  HorizontalLine,
  PostSeparator,
  PostView,
} from 'screens/Timeline/components/PostView/Postview.comp';
import {wp} from 'shared/dimens';
import {UserMemos} from 'screens/Memos/UserMemos';
import {SelectButtons} from './index';
import {WishlistScreen} from 'screens/Wishlist/Wishlist.screen';
import {WishlistMemos} from 'screens/Wishlist/WishlistMemos';
import {ImageGallery} from 'screens/GalleryPicker/MyGallery/ImageGallery';
import {WishListImageGallery} from 'screens/Wishlist/WishListImageGallery';
import {Skeletons} from 'shared/Skeletons';
import {DefaultGallery} from 'screens/GalleryPicker/DefaultGallery';
export const HEADER_HEIGHT = 300 + StatusBar.currentHeight;
const PROFILE_PICTURE_SIZE = 90;
import DefaultImage from 'assets/images/DefaultIcon.png';
import {TextNoDataView} from 'components/NodataView/TextNodata';
import {GetUserPostAction} from 'redux/reducers/UserProfile/UserPost_reducer';
import {isIOS} from 'components/AppHeader';

export const UserProfile = ({navigation, route}) => {
  const {userProfileData, dataLoading, categoryMemoList} = useSelector(
    state => state.UserDetailsReducer,
  );
  const [SelectButton, setSelectButton] = React.useState(1);
  const [SelectSwitch, setSelectSwitch] = React.useState(true);
  const {user, content} = {...userProfileData};
  const {gallery, rated_memo} = {...content};
  const {image, id, name, total_rated_memo} = {...user};
  const dispatch = useDispatch();

  const {navigate} = useNavigation();

  const {userAuth} = useSelector(state => state);
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <SafeAreaView style={GStyles.Dark}>
      <SettingsContactButton
        onPressSetting={() => navigate('SettingsScreen')}
        onPressContact={() => navigation.navigate('ContactsScreen')}
      />
      <DefaultGallery
        isModalVisible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
        onPressViewImage={() => {
          navigation.navigate('ViewPhoto', {image: image}),
            setModalVisible(!modalVisible);
        }}
      />
      <VertSpace size={55} />

      <SkeletonContent
        containerStyle={{flexDirection: 'column'}}
        boneColor={AppColors.RecomBoneDark}
        highlightColor={AppColors.SkeletonBone}
        isLoading={dataLoading}
        layout={ProfilePictureSkeleton}>
        <ProfilePicture
          userImage={image == undefined ? null : image}
          name={name == undefined ? '' : name}
          RattedMemoNum={total_rated_memo == undefined ? 0 : total_rated_memo}
          onLongPress={() => setModalVisible(!modalVisible)}
        />
      </SkeletonContent>
      {/* <VertSpace /> */}
      <Container>
        <SelectButtons
          onPress={item => setSelectButton(item)}
          SelectSwitch={SelectSwitch}
          setSelectSwitch={item => setSelectSwitch(!SelectSwitch)}
          SelectButton={SelectButton}
        />

        <VertSpace size={30} />
        <HorizontalLine
          VerticalSpace={0}
          width={AppDimens.width * 0.9}
          color={AppColors.disableColor}
        />
      </Container>

      {SelectButton === 1 && SelectSwitch && (
        <UserMemos
          userid={id}
          Memosuser={rated_memo == undefined ? [] : rated_memo}
          mymemosLoading={dataLoading}
          userAuth={userAuth}
          // onRefresh={() => setLoading(!loading)}
          onRefresh={() => dispatch(GetUserDetailsAction(userAuth.userToken))}
          MemoCategoryList={categoryMemoList}
        />
      )}
      {SelectButton === 1 && !SelectSwitch && <WishlistMemos />}
      {SelectButton === 2 && SelectSwitch && <ImageGallery userId={id} />}
      {SelectButton === 2 && !SelectSwitch && (
        <WishListImageGallery userId={id} />
      )}
      {SelectButton === 3 && SelectSwitch && <MyPostView />}
      {SelectButton === 3 && !SelectSwitch && <WishlistScreen />}
    </SafeAreaView>
  );
};

export const MyPostView = () => {
  const isCancel = useRef(false);
  const dispatch = useDispatch();
  const authData = useSelector(state => state.userAuth);

  const userPostData = useSelector(state => state.UserPostReducer);

  React.useEffect(() => {
    if (!isCancel.current) {
      dispatch(GetUserPostAction(authData.userToken, 1));
    }

    return () => {
      isCancel.current = true;
    };
  }, []);

  const onRefresh = () => {
    dispatch(GetUserPostAction(authData.userToken, 1));
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          colors={['#6297e7', '#40b07e']}
          refreshing={userPostData.dataLoading}
          onRefresh={onRefresh}
        />
      }
      style={{paddingTop: 30}}
      ItemSeparatorComponent={() => (
        <PostSeparator
          backgroundColor={AppColors.Skeleton}
          width={AppDimens.width * 0.8}
        />
      )}
      ListHeaderComponent={<>{/* SETTINGS PAGE ICONS */}</>}
      // onEndReachedThreshold={0.5}
      onEndReached={() => {
        if (!userPostData.isListEnd) {
          dispatch(
            GetUserPostAction(
              authData.userToken,
              userPostData.current_page + 1,
            ),
          );
        }
      }}
      ListFooterComponent={
        <>
          <VertSpace size={20} />

          {userPostData.data.length == 0 && (
            <TextNoDataView title={'No post available'} />
          )}
          <VertSpace size={150} />
        </>
      }
      keyExtractor={(_, index) => index.toString()}
      //data={RecaptureList}
      data={userPostData.data}
      renderItem={({item, index}) => (
        <SkeletonContent
          key={index}
          containerStyle={{flexDirection: 'column'}}
          boneColor={AppColors.RecomBoneDark}
          highlightColor={AppColors.SkeletonBone}
          isLoading={userPostData.dataLoading}
          layout={Skeletons.timeline}>
          <PostView item={item} index={index} location={'M'} />
        </SkeletonContent>
      )}
    />
  );
};

// export const DefaultButton

export const ProfilePicture = ({
  userImage = null,
  name,
  RattedMemoNum = 123,
  onLongPress = () => {},
}) => {
  return (
    <View
      style={{
        marginVertical: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 10,
        flexDirection: 'row',
        marginBottom: Platform.OS === 'android' ? 30 : 40,
      }}>
      {userImage === null ? (
        <Ripple onLongPress={onLongPress}>
          <Image
            style={{
              width: wp(PROFILE_PICTURE_SIZE),
              height: wp(PROFILE_PICTURE_SIZE),
              borderRadius: 100,
              marginLeft: 10,
            }}
            source={DefaultImage}
          />
        </Ripple>
      ) : (
        <Ripple onLongPress={onLongPress}>
          <Image
            style={{
              width: wp(PROFILE_PICTURE_SIZE),
              height: wp(PROFILE_PICTURE_SIZE),
              borderRadius: 100,
              marginLeft: 10,
            }}
            source={{uri: userImage}}
          />
        </Ripple>
      )}
      <HoriSpace />
      <View style={{width: AppDimens.width * 0.68}}>
        <Text
          style={{
            fontSize: 22,
            fontFamily: AppFonts.CalibriBold,
            color: AppColors.white3,
          }}
          numberOfLines={2}
          ellipsizeMode="clip">
          {name}
        </Text>
        <VertSpace size={5} />
        <View style={{...GStyles.flexRow, alignItems: 'center'}}>
          <DoneFillIcon size={10} />
          <Text
            style={{
              fontSize: 13,
              color: AppColors.LowDark1,
              paddingLeft: 5,
            }}>
            {RattedMemoNum}
          </Text>
        </View>
      </View>
    </View>
  );
};
const SettingsContactButton = ({
  onPressSetting = () => {},
  onPressContact = () => {},
}) => {
  return (
    <View style={[styles.settingsView, {top: isIOS ? 40 : 10}]}>
      <View style={{...GStyles.flexRow}}>
        <Ripple onPress={onPressContact}>
          <ContactsDarkIcon size={30} />
        </Ripple>
        <HoriSpace size={18} />
        <Ripple onPress={onPressSetting}>
          <SettingsDarkIcon size={25} />
        </Ripple>
      </View>
    </View>
  );
};

export const NoMemoryView = ({show = false}) => {
  if (show) {
    return (
      <View style={{height: 200, ...GStyles.containView}}>
        <Text
          style={{
            fontFamily: AppFonts.InkFree,
            fontSize: FontSize.xxlarge,
          }}>
          No memories yet
        </Text>
      </View>
    );
  } else {
    return null;
  }
};

export const ProfilePictureSkeleton = [
  {
    marginVertical: 20,
    justifyContent: 'flex-start',
    paddingLeft: 10,
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
    children: [
      {
        width: 90,
        height: 90,
        borderRadius: 50,
      },
      {
        marginLeft: 20,
        children: [
          {
            width: 150,
            height: 35,
            borderRadius: 40,
          },
          {
            width: 100,
            height: 25,
            marginTop: 10,
            borderRadius: 40,
          },
        ],
      },
    ],
  },
];
