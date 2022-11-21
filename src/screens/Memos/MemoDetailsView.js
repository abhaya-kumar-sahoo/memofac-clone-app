/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppColors} from '../../assets/AppColors';
import {AppHeader} from '../../components/AppHeader';
import {AccentButton, Container} from '../../components/Mini';
import {
  MemoDetailsApi,
  setSeenMemoApiCall,
  UserRatingApiCall,
} from '../../redux/sagas/Memos/request';
import {AppDimens, GStyles, VertSpace} from '../../shared/Global.styles';
import {WishlistIcon, WishlistWhiteIcon} from '../../shared/Icon.Comp';
import {MemoStatView} from './Memos.Nav';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {showToast} from 'shared/Functions/ToastFunctions';

import {
  PostSeparator,
  PostView,
} from 'screens/Timeline/components/PostView/Postview.comp';

import {hp, wp} from 'shared/dimens';
import {useNavigation} from '@react-navigation/core';
import FastImage from 'react-native-fast-image';
import {PopupActionsModal} from './ReportMemo/PopUpActionsModal';
import {AppFonts} from 'assets/fonts/AppFonts';
import {SummarizedRecapture} from 'screens/Recapture/summarizedRecapture';
import {ExpGrantModal} from 'screens/Recapture/ExpGrantModal';
import {addMemoWishlistApiCall} from 'redux/sagas/wishlist/request';
import {MiniGalleryList} from 'screens/MyProfile/components/MiniGalleryList';
import {GetMemoPostAction} from 'redux/reducers/Post/MemoRelatedPost.reducer';
import {Skeletons} from 'shared/Skeletons';

import DefaultImage from 'assets/images/DefaultIcon.png';
export const MEMO_IMAGE_RES = 180;
import InAppReview from 'react-native-in-app-review';

export const UsersRatedList = ({users, onPress = () => {}}) => {
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
          marginLeft: -5,
        }}>
        {/* <View
          style={{
            justifyContent: 'flex-end',
            marginBottom: 5,
          }}
        >
          {users.length > 0 && <DoneFillIcon size={13} />}
        </View> */}

        <Text
          style={{
            fontFamily: AppFonts.ComicSans,
            color: AppColors.white1,
            fontSize: 16,
            paddingLeft: 10,
          }}
          numberOfLines={1}>
          {users.length > 0 && 'People who experienced this'}
        </Text>
        <VertSpace />
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              flexDirection: 'row',
              // width: wp(60 * users.length),
            }}>
            {users.slice(0, 5).map((item, index) => {
              return (
                <View key={index.toString()} style={{paddingLeft: 5}}>
                  <View
                    style={{
                      borderWidth: 2,
                      borderColor: AppColors.DarkBG,
                      borderRadius: 23,

                      // zIndex: 10 - index,
                      // left: -8 * index,
                    }}>
                    <Image
                      style={{
                        height: wp(50),
                        width: wp(50),
                        borderRadius: 30,
                      }}
                      source={
                        item.image != null ? {uri: item.image} : DefaultImage
                      }
                    />
                  </View>
                </View>
              );
            })}
          </View>
          {users?.length > 5 && (
            <View
              style={{
                justifyContent: 'flex-end',
              }}>
              <Text
                style={{
                  color: AppColors.blue1,
                  fontWeight: '700',
                  fontSize: 11,
                }}>
                more ...
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </>
  );
};

export const MemoDetailsView = ({route}) => {
  const {memoId, memoItem} = route.params;
  const dispatch = useDispatch();
  const isCancel = useRef(false);
  const [summarizedModal, setSummarizedModal] = useState(false);
  const [memoForRating, setMemoForRating] = useState({});
  const closeSummzModal = () => setSummarizedModal(false);
  const openSummzModal = () => setSummarizedModal(true);
  const [visible, setVisibility] = useState(false);
  const [userListVisible, setUserListVisible] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);
  const closeModal = () => setVisibility(false);
  const openModal = () => setVisibility(true);
  const navigation = useNavigation();
  const {userAuth} = useSelector(state => state);
  const {userToken} = {...userAuth};
  const rateGiven = useRef(-1);

  // Gallery Data
  const {userProfileData} = useSelector(state => state.UserDetailsReducer);
  const {user, content} = {...userProfileData};
  const {gallery, rated_memo} = {...content};
  const {id, total_rated_memo} = {...user};

  const selectedGroupDataRef = useRef({
    name: 'Public',
    id: 3,
    count: 0,
  });
  const {image} = memoItem;

  const [userList, setUserList] = React.useState([]);

  const [GalleryList, setGalleryList] = React.useState([]);
  const MemoRelatedPost = useSelector(state => state.MemoPostReducer);
  const [Wish, setWish] = React.useState(false);

  const getUsersRating = () => {
    setUserListVisible(true);

    UserRatingApiCall(userToken, memoId).then(response => {
      setUserList(response.content);
      setUserListVisible(false);
    });
  };

  const getMemoDetails = () => {
    setDataLoading(true);
    MemoDetailsApi(userToken, memoId).then(response => {
      setWish(response.content.wish);
      setDataLoading(false);
      if (response.content.seen !== 1) {
        setSeenMemoApiCall(userToken, memoId);
      }
    });
  };

  React.useEffect(() => {
    getUsersRating();
    // getMemoPosts();
    getMemoDetails();
    // dispatch(GetMemoDetailsAction(userToken, memoId));
    dispatch(GetMemoPostAction(userToken, memoId));

    memoItem.gallery_data.map(n => {
      setGalleryList(GalleryList => [...GalleryList, n.image]);
    });
    return () => {
      isCancel.current = true;
      setGalleryList([]);
    };
  }, []);

  const addToWishlist = () => {
    addMemoWishlistApiCall(userToken, memoId)
      .then(response => {
        if (response.result == 'success') {
          if (response.message === 'Added Wishlist') {
            setWish(true);
            showToast('Added to your wishlist');
          } else if (response.message === 'Remove Wishlist') {
            setWish(false);
            showToast('Removed from wishlist');
          } else {
            null;
          }
        }
      })
      .catch(() => {
        showToast('Something went wrong while adding to Wishlist');
      });
  };

  // Design code

  const onSaveRating = index => {
    // setRatingGiven
    rateGiven.current = index;
    // console.log('saving raitng fomr recommnded memos', index);
  };
  const onExitModal = () => {
    closeSummzModal();
    onSaveRating(-1);
    selectedGroupDataRef.current = {
      name: 'Public',
      id: 3,
      count: 0,
    };
  };

  const onRatingMemo = () => {
    openSummzModal();

    setMemoForRating(memoItem);
  };

  const AppRating = () => {
    if (total_rated_memo >= 2) {
      InAppReview.RequestInAppReview()
        .then(hasFlowFinishedSuccessfully => {
          if (hasFlowFinishedSuccessfully) {
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  return (
    <SafeAreaView style={GStyles.Dark}>
      <AppHeader enableBack iconColor={AppColors.white}>
        <View style={GStyles.flexRowCenter}>
          <AccentButton onPress={onRatingMemo} title="Rate" disabled={false} />
          <PopupActionsModal memoId={memoId} memoDetails={memoItem} />
        </View>
      </AppHeader>

      {summarizedModal && (
        <SummarizedRecapture
          userToken={userToken}
          navigation={navigation}
          memoListIndex={null}
          memoForRating={memoForRating}
          visible={summarizedModal}
          onCloseModal={closeSummzModal}
          onExitModal={onExitModal}
          ratingGiven={rateGiven.current}
          onSaveRating={onSaveRating}
          onSuccessRating={() => {
            onExitModal();
            openModal();
            setTimeout(() => {
              AppRating();
            }, 2000);
          }}
        />
      )}

      <ExpGrantModal visible={visible} closeModal={closeModal} />

      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={MemoRelatedPost.dataLoading}
            onRefresh={() => {
              getUsersRating();
              getMemoDetails();

              // getMemoPosts();
              // dispatch(GetMemoDetailsAction(userToken, memoId));
              dispatch(GetMemoPostAction(userToken, memoId));
            }}
          />
        }
        ListFooterComponent={
          <>
            <VertSpace size={100} />
          </>
        }
        ListHeaderComponent={
          <>
            <Container padding={18}>
              <View style={{...GStyles.containView}}>
                <VertSpace size={35} />

                <SkeletonContent
                  containerStyle={{paddingHorizontal: -20}}
                  boneColor={AppColors.RecomBoneDark}
                  highlightColor={AppColors.SkeletonBone}
                  isLoading={false}
                  layout={SkeletonMemoDetails.FastImageSkeleton}>
                  <FastImage
                    style={{
                      width: hp(MEMO_IMAGE_RES),
                      height: hp(MEMO_IMAGE_RES),
                    }}
                    source={{
                      uri: image,
                    }}
                    resizeMethod="scale"
                    resizeMode="contain"
                  />
                </SkeletonContent>
              </View>
              <VertSpace size={40} />
              <SkeletonContent
                containerStyle={{paddingHorizontal: -20}}
                boneColor={AppColors.RecomBoneDark}
                highlightColor={AppColors.SkeletonBone}
                isLoading={false}
                layout={SkeletonMemoDetails.MemoStatView}>
                <MemoStatView item={{...memoItem}} dataLoading={false} />
              </SkeletonContent>

              <VertSpace size={30} />
              <SkeletonContent
                containerStyle={{paddingHorizontal: -20}}
                boneColor={AppColors.RecomBoneDark}
                highlightColor={AppColors.SkeletonBone}
                isLoading={userListVisible}
                layout={SkeletonMemoDetails.UsersRatedList}>
                {userList.length > 0 && (
                  <UsersRatedList
                    users={userList}
                    onPress={() => {
                      navigation.navigate('ExperiencedContacts', {
                        MemoData: memoItem,
                      });
                    }}
                  />
                )}
              </SkeletonContent>

              <VertSpace size={50} />

              <SkeletonContent
                containerStyle={{paddingHorizontal: -20}}
                boneColor={AppColors.RecomBoneDark}
                highlightColor={AppColors.SkeletonBone}
                isLoading={dataLoading}
                layout={SkeletonMemoDetails.WishButton}>
                <TouchableOpacity
                  onPress={addToWishlist}
                  style={{
                    // borderWidth: Wish ? 0 : 1,
                    borderColor: AppColors.LightGrey1,
                    borderRadius: 30,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 10,
                    backgroundColor: Wish
                      ? AppColors.blue1
                      : AppColors.DarkGrey2,
                  }}>
                  <Text>
                    {Wish ? (
                      <WishlistWhiteIcon color={AppColors.white} size={20} />
                    ) : (
                      <WishlistIcon color={AppColors.white} size={20} />
                    )}
                  </Text>
                  <Text
                    style={{
                      color: Wish ? AppColors.white : AppColors.LightGrey1,
                      fontFamily: Wish
                        ? AppFonts.CalibriBold
                        : AppFonts.CalibriRegular,
                      paddingLeft: 20,
                      fontSize: 20,
                    }}>
                    {Wish ? 'Added to wishlist' : 'Add to wishlist'}
                  </Text>
                </TouchableOpacity>
              </SkeletonContent>

              <VertSpace size={35} />

              <MiniGalleryList
                skeletonLoading={false}
                SeeAllSwo={false}
                dataList={GalleryList}
                onPress={() =>
                  navigation.navigate('ImageGallery', {
                    userId: id,
                  })
                }
              />
              <VertSpace size={15} />

              {GalleryList.length > 0 ? (
                <PostSeparator
                  backgroundColor={AppColors.DarkGrey}
                  width={AppDimens.width * 0.85}
                />
              ) : null}
            </Container>
          </>
        }
        ItemSeparatorComponent={() => (
          <PostSeparator
            backgroundColor={AppColors.DarkGrey}
            width={AppDimens.width * 0.85}
          />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        data={MemoRelatedPost.data}
        renderItem={({item, index}) => (
          <SkeletonContent
            key={index}
            containerStyle={{flexDirection: 'column'}}
            boneColor={AppColors.RecomBoneDark}
            highlightColor={AppColors.SkeletonBone}
            isLoading={MemoRelatedPost.dataLoading}
            layout={Skeletons.timeline}>
            <PostView item={item} index={index} location={'P'} />
          </SkeletonContent>
        )}
      />
    </SafeAreaView>
  );
};

export const SkeletonMemoDetails = {
  FastImageSkeleton: [
    {
      justifyContent: 'center',
      alignItems: 'center',
      children: [
        {
          width: 150,
          height: 150,
          alignItems: 'center',
          borderRadius: 100,
        },
      ],
    },
  ],

  MemoStatView: [
    {
      height: 60,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      children: [
        {
          width: AppDimens.width * 0.5,
          height: 40,
          borderRadius: 10,
        },
        {
          width: 40,
          height: 40,
          borderRadius: 10,
        },
      ],
    },
    {
      width: AppDimens.width * 0.25,
      height: 26,
      borderRadius: 10,
    },
    {
      height: 100,
      // backgroundColor: 'wheat',
      marginTop: 50,
      flexDirection: 'row',
      justifyContent: 'space-between',
      children: new Array(3).fill({
        width: 60,
        borderRadius: 30,
        height: 40,
      }),
    },
  ],

  UsersRatedList: [
    {
      height: 60,
      width: AppDimens.width,

      flexDirection: 'row',
      marginLeft: -10,
      children: new Array(5).fill({
        width: 55,
        borderRadius: 30,
        height: 55,
        borderWidth: 3,
        borderColor: AppColors.LightDark1,
        marginLeft: 10,
      }),
    },
  ],
  WishButton: [
    {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      children: [
        {
          borderRadius: 30,
          paddingHorizontal: 20,
          width: AppDimens.width * 0.85,
          height: 40,
        },
      ],
    },
  ],
};
