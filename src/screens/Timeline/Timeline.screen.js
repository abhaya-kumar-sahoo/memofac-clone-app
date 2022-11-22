/* eslint-disable react-native/no-inline-styles */
import React, {Fragment, useCallback, useRef, useState, useEffect} from 'react';
import {
  FlatList,
  RefreshControl,
  View,
  Text,
  SafeAreaView,
  Platform,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {AppDimens, GStyles, VertSpace} from 'shared/Global.styles';
import {AppColors} from 'assets/AppColors';
import {useNavigation, useScrollToTop} from '@react-navigation/native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {RefreshRecomMemosAction} from 'redux/reducers/Memos/RecomMemos.reducer';
import {Skeletons} from 'shared/Skeletons';

import {
  addPostTimeline,
  getTimelinePosts,
  refreshTimelinePosts,
} from 'redux/reducers/Timeline/Timeline.reducer';
import {
  HorizontalLine,
  MemoizedPostView,
  PostSeparator,
} from './components/PostView/Postview.comp';
import {hp, wp} from 'shared/dimens';
import {PostLoader} from 'components/Loaders/PostLoader';
import {ListFetchTypes} from 'redux/constants.redux';
import {checkContactPermission} from 'shared/Permission';
import {AccentButton} from 'components/Mini';
import {RecommendedMemos} from './RecommendedMemos/RMemos.container';
import Ripple from 'react-native-material-ripple';
import {AppFonts} from 'assets/fonts/AppFonts';
import {syncContacts} from 'redux/reducers/Contact/contacts.reducer';
import {GetMemofacUserApiCall} from 'redux/sagas/Contacts/api.request';
import {Styles} from './Timeline.styles';
// import { startUpdateFlow } from '@gurukumparan/react-native-android-inapp-updates';
import {showToast} from 'shared/Functions/ToastFunctions';
import {
  CloseContactList,
  SeeAllLineComp,
  TimelineHeader,
} from './components/TimelineComp';
import * as Progress from 'react-native-progress';
import {
  BeforeCompleteProgressAction,
  CompleteProgressAction,
  GetProgressAction,
  ProgressErrorAction,
} from 'redux/reducers/progress/ProgressRedux';

import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {APP_APIS} from 'ApiLogic/API_URL';
import axios from 'axios';
import moment from 'moment';
import Modals from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProfilePicker} from 'screens/Auth/ProfileUpdate/Profile.screen';
import {isIOS} from 'components/AppHeader';
import {launchImageLibrary} from 'react-native-image-picker';
import {STR_KEYS} from 'shared/Storage';
import {updateUserData} from 'redux/reducers/UserAuth.reducer';
import {GetUserDetailsAction} from 'redux/reducers/UserProfile/userprofile.reducer';
import ImagePicker from 'react-native-image-crop-picker';

const ProfilePicSuggetion = ({
  PhotoModalOpen = false,
  onPressSkip,
  onUpload,
  imageUrlParmas = null,
  upload = false,
  AddPhoto,
  loading = false,
}) => {
  return (
    <Modals
      isVisible={PhotoModalOpen}
      // onBackdropPress={onPressSkip}
      animationIn={'zoomIn'}>
      <View
        style={{
          flex: 1,
          ...GStyles.flexRowCenter,
        }}>
        <View
          style={{
            width: 280,
            height: 400,
            paddingHorizontal: 30,
            backgroundColor: AppColors.white,
            borderRadius: 40,
          }}>
          <Text
            style={{
              color: AppColors.DarkGrey,
              textAlign: 'right',
              paddingTop: 15,
            }}
            onPress={onPressSkip}>
            Later
          </Text>
          <VertSpace size={20} />
          <Text
            style={{
              textAlign: 'left',
              color: AppColors.DarkGrey,
              fontFamily: AppFonts.GillSans,
              fontSize: 30,
              // lineHeight: 30,
            }}>
            Add profile pic
          </Text>
          <VertSpace size={10} />

          <View style={{...GStyles.containView}}>
            <ProfilePicker
              size={170}
              show={false}
              imageUrlParmas={imageUrlParmas}
              // onPress={onUpload}
            />
            {loading && (
              <ActivityIndicator
                color={AppColors.green}
                size={30}
                style={{position: 'absolute', top: 50}}
              />
            )}

            <VertSpace />
            {upload ? (
              <AccentButton
                title={'Add Photo'}
                onPress={AddPhoto}
                style={{
                  backgroundColor: AppColors.green2,
                  width: 180,
                  height: 35,
                  marginTop: 10,
                }}
              />
            ) : (
              <AccentButton
                title={'Upload'}
                onPress={onUpload}
                style={{
                  backgroundColor: AppColors.green2,
                  width: 180,
                  height: 35,
                  marginTop: 10,
                }}
              />
            )}
          </View>
          <VertSpace size={20} />
        </View>
      </View>
    </Modals>
  );
};

export function TimelineScreen({route, bottomTabRoute}) {
  const {userAuth, TimelinePostsReducer} = useSelector(state => state);
  const [isUserFirstTime, setIsUserFirstTime] = useState(false);
  const {post, dataLoading, isListEnd, page} = useSelector(
    state => state.TimelinePostsReducer,
  );
  const isCancelled = React.useRef(false);
  const isContactPermission = React.useRef(true);

  const PostLoading = useSelector(state => state.ProgressReducer);

  const {userData} = {...userAuth};
  const {image} = {...userData};

  const nav = useNavigation();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const timelineRef = useRef(null);
  const [Contacts, setContacts] = useState([]);
  const {userToken} = useSelector(state => state.userAuth);
  const {userProfileData} = useSelector(state => state.UserDetailsReducer);

  const [loading, setLoading] = useState(false);
  const [Username, setUsername] = useState('');
  const [BirthDate, setBirthDate] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [DummyimageUri, setDummyImageUri] = useState(null);
  const {user} = {...userProfileData};
  const {dob, gender, username, phone} = {
    ...user,
  };
  const isCancel = useRef(false);

  const syncContactsFirst = async () => {
    const {isPermissionGranted} = await checkContactPermission();
    if (isPermissionGranted) {
      dispatch(syncContacts());
    }
  };

  const getAllContacts = async () => {
    setRefreshing(true);
    GetMemofacUserApiCall(userToken)
      .then(async response => {
        if (!isCancelled.current) {
          setRefreshing(false);
        }

        let pp = await response.content.filter(
          (ele, ind) =>
            ind ===
            response.content.findIndex(
              elem => elem.number === ele.number && elem.uid === ele.uid,
            ),
        );
        if (!isCancelled.current) {
          setContacts(pp);
        }
      })
      .catch(error => {
        showToast('Loading contacts error');
        console.error(error);
        setRefreshing(false);
      })
      .finally(() => {
        setRefreshing(false);
      });
  };

  useEffect(() => {
    if (Object.keys(userProfileData).length > 0 && !isCancel.current) {
      setUsername(username);
      setImageUri(image);
      setBirthDate(dob.substring(0, 4));
    }
  }, [userProfileData]);

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
        await AsyncStorage.removeItem('isFirstTime');
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
        showToast('Profile pic added');
        setIsUserFirstTime(false);
        setLoading(false);
      })
      .catch(() => {
        showToast('Error while saving Profile');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    Linking.getInitialURL()
      .then(e => {
        if (e !== null) {
          let l = e.split('/');
          nav.navigate('ViewMemo', {memoId: l[l.length - 1]});
        }
      })
      .catch(e => {
        console.log('deep link error', e);
      });

    getAllContacts();
    setTimeout(() => {
      AsyncStorage.getItem('isFirstTime').then(res => {
        if (res === 'true' && image == null) {
          setIsUserFirstTime(true);
        } else {
          syncContactsFirst();
        }
      });
    }, 15000);

    const updateModes = 'flexible';
    async function fetchData() {
      try {
        const {isPermissionGranted} = await checkContactPermission();
        isContactPermission.current = isPermissionGranted;
        // await startUpdateFlow(updateModes);
      } catch (e) {}
      // await onCompleteUpdate(i => {
      //   console.log('Complete', i);
      // });
    }

    fetchData();
    return () => {
      isCancelled.current = false;
    };
  }, []);

  React.useEffect(() => {
    if (DummyimageUri) {
      ImagePicker.openCropper({
        path: DummyimageUri,
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
        console.log(image.path);
      });
    }
  }, [DummyimageUri]);

  const timeLineLoading = dataLoading;
  useScrollToTop(timelineRef);

  const renderItem = useCallback(
    ({item, index}) => (
      <MemoizedPostView index={index} item={item} location={'T'} />
    ),
    [post],
  );
  // console.log(isListEnd);
  const CreatePostAgain = formdata => {
    dispatch(GetProgressAction(formdata));

    const config = {
      onUploadProgress: function (params) {
        // const total = (params.loaded / params.total) * 100;
      },
    };
    axios
      .post(APP_APIS.RECAPTURE, formdata, config, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        const updated_at = moment(res.data.content.updated_at).format(
          'YYYY-MM-DD HH:mm:ss',
        );

        dispatch(
          addPostTimeline({
            postData: {
              ...res.data.content,
              updated_at,
              total_reacts: 0,
              total_comments: 0,
              user_name: userData.name,
              user_image: userData.image,
            },
          }),
        );
        dispatch(BeforeCompleteProgressAction());

        setTimeout(() => {
          dispatch(CompleteProgressAction());
        }, 5000);
      })
      .catch(error => {
        showToast('Unable to Post try again');
        dispatch(ProgressErrorAction());
        console.log(error);
      });
  };
  return (
    <SafeAreaView style={Styles.timelineDarkStyle}>
      <FlatList
        ref={timelineRef}
        refreshControl={
          <RefreshControl
            refreshing={timeLineLoading}
            onRefresh={async () => {
              setContacts([]);
              getAllContacts();
              syncContactsFirst();
              setRefreshing(true);

              dispatch(
                refreshTimelinePosts({
                  usertoken: userAuth.userToken,
                  fetchType: ListFetchTypes.FETCH,
                }),
              );
              dispatch(
                RefreshRecomMemosAction(
                  userAuth.userToken,
                  0,
                  ListFetchTypes.FETCH,
                ),
              );
              const {isPermissionGranted} = await checkContactPermission();
              isContactPermission.current = isPermissionGranted;
            }}
          />
        }
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={
          <Fragment>
            <TimelineHeader />
            <View style={{height: hp(56)}} />
            <ProfilePicSuggetion
              imageUrlParmas={imageUri}
              upload={imageUri === null ? true : false}
              AddPhoto={() =>
                launchImageLibrary().then(res => {
                  setDummyImageUri(res.assets[0].uri);
                })
              }
              onPressSkip={async () => {
                await AsyncStorage.removeItem('isFirstTime').then(e => {});
                setIsUserFirstTime(false);
              }}
              onUpload={async () => {
                UpdateData();
              }}
              PhotoModalOpen={isUserFirstTime}
              loading={loading}
            />
            <RecommendedMemos
              route={route}
              bottomTabRoute={bottomTabRoute}
              navigation={nav}
            />

            <View
              style={{height: Platform.OS === 'android' ? hp(40) : hp(20)}}
            />
            <SeeAllLineComp timeLineLoading={timeLineLoading} />

            {isContactPermission.current && (
              <CloseContactList
                refreshing={refreshing}
                ContactsList={Contacts}
              />
            )}

            {/* {Contacts.length || timeLineLoading || refreshing ? (
              <VertSpace size={0} />
            ) : (
              <VertSpace size={wp(15)} />
            )} */}
            {/* PostLoading.visible || PostLoading.error */}
            {PostLoading.visible || PostLoading.error ? (
              <View
                style={{
                  alignSelf: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 20,
                }}>
                <View style={{paddingTop: 10, paddingLeft: 10}}>
                  {PostLoading.completetInit ? (
                    <Progress.Bar
                      color={AppColors.green}
                      borderWidth={2}
                      borderRadius={5}
                      width={250}
                      progress={1}
                    />
                  ) : PostLoading.error ? (
                    <Progress.Bar
                      color={AppColors.hotPink}
                      borderWidth={2}
                      borderRadius={5}
                      width={250}
                      progress={0.3}
                    />
                  ) : (
                    <Progress.Bar
                      color={AppColors.green}
                      indeterminate={true}
                      indeterminateAnimationDuration={3000}
                      borderWidth={2}
                      borderRadius={5}
                      width={250}
                    />
                  )}
                  <VertSpace />
                  <View style={GStyles.flexRowCenter}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        color: PostLoading.error
                          ? AppColors.hotPink
                          : AppColors.green,
                        fontFamily: AppFonts.ComicSansBold,
                      }}>
                      {PostLoading.completetInit
                        ? 'Post Successfully created'
                        : PostLoading.error
                        ? 'Try again ...'
                        : 'Creating post ...'}
                    </Text>
                    {PostLoading.error && (
                      <Ripple
                        onPress={() => {
                          CreatePostAgain(PostLoading.PostData);
                        }}>
                        <Icon
                          name="refresh"
                          size={20}
                          color={AppColors.green}
                        />
                      </Ripple>
                    )}
                  </View>
                </View>
              </View>
            ) : (
              <></>
            )}
            {Contacts.length > 0 ? (
              <HorizontalLine
                VerticalSpace={isIOS ? wp(55) : wp(80)}
                width={AppDimens.width * 0.85}
                color={AppColors.Blackop1}
              />
            ) : (
              <VertSpace size={wp(50)} />
            )}

            <SkeletonContent
              containerStyle={{flexDirection: 'column'}}
              boneColor={AppColors.RecomBoneDark}
              highlightColor={AppColors.SkeletonBone}
              isLoading={timeLineLoading}
              layout={Skeletons.timeline}
            />
          </Fragment>
        }
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (!isListEnd && !timeLineLoading) {
            dispatch(
              getTimelinePosts({
                usertoken: userAuth.userToken,
                fetchType: ListFetchTypes.FETCH_MORE,
                page: page + 1,
              }),
            );
          }
        }}
        ItemSeparatorComponent={() => (
          <PostSeparator
            backgroundColor={AppColors.Skeleton}
            width={AppDimens.width * 0.8}
          />
        )}
        initialNumToRender={20}
        ListFooterComponent={
          <>
            <PostLoader when={!isListEnd} />
            <VertSpace size={50} />
          </>
        }
        keyExtractor={(_, index) => index.toString()}
        data={post}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}
