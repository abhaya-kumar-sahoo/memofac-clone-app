import React, { useRef, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppColors } from '../../assets/AppColors';
import { AppHeader } from '../../components/AppHeader';
import { AccentButton, Container } from '../../components/Mini';
import {
  MemoDetailsApi,
  MemoRelatedPostsApi,
  setSeenMemoApiCall,
  UserRatingApiCall,
} from '../../redux/sagas/Memos/request';
import {
  AppDimens,
  FontSize,
  GStyles,
  Spacing,
  VertSpace,
} from '../../shared/Global.styles';
import { WishlistIcon, WishlistWhiteIcon } from '../../shared/Icon.Comp';
import { MemoStatView } from './Memos.Nav';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { showToast } from 'shared/Functions/ToastFunctions';
import {
  PostSeparator,
  PostView,
} from 'screens/Timeline/components/PostView/Postview.comp';

import { hp } from 'shared/dimens';
import { GetMemoDetailsAction } from 'redux/reducers/Memos/MemoDetails.reducer';
import { useNavigation } from '@react-navigation/core';
import FastImage from 'react-native-fast-image';
import { PopupActionsModal } from './ReportMemo/PopUpActionsModal';
import { AppFonts } from 'assets/fonts/AppFonts';
import { SummarizedRecapture } from 'screens/Recapture/summarizedRecapture';
import { ExpGrantModal } from 'screens/Recapture/ExpGrantModal';
import { addMemoWishlistApiCall } from 'redux/sagas/wishlist/request';
import { MiniGalleryList } from 'screens/MyProfile/components/MiniGalleryList';
import { ImageGridView } from 'screens/GalleryPicker/ImageGridView';
import { Skeletons } from 'shared/Skeletons';
import { SkeletonMemoDetails, UsersRatedList } from './MemoDetailsView';
import { GetMemoPostAction } from 'redux/reducers/Post/MemoRelatedPost.reducer';
import InAppReview from 'react-native-in-app-review';

export const MEMO_IMAGE_RES = 180;

export const ViewMemo = ({ route }) => {
  const dispatch = useDispatch();
  const [summarizedModal, setSummarizedModal] = useState(false);
  const [memoForRating, setMemoForRating] = useState({});
  const closeSummzModal = () => setSummarizedModal(false);
  const openSummzModal = () => setSummarizedModal(true);
  const [visible, setVisibility] = useState(false);
  const closeModal = () => setVisibility(false);
  const openModal = () => setVisibility(true);
  const [PostData, setPostData] = useState([]);
  const navigation = useNavigation();
  const { userAuth } = useSelector(state => state);
  const { userToken } = { ...userAuth };
  const rateGiven = useRef(-1);
  const [memoDetailss, setMemoDetails] = useState({});
  const [dataLoadingg, setDataLoading] = useState(true);
  const [Wish, setWish] = React.useState(false);
  const [MemoPostLoading, setMemoPostLoading] = React.useState(false);

  const { userProfileData } = useSelector(state => state.UserDetailsReducer);
  const { user, content } = { ...userProfileData };
  const { id, total_rated_memo } = { ...user };
  const selectedGroupDataRef = useRef({
    name: 'Public',
    id: 3,
    count: 0,
  });
  const { memoDetails, dataLoading } = useSelector(
    state => state.MemoDetailsReducer,
  );
  const { exp, wish, rating, image, title, me } = { ...memoDetails };
  const { memoId } = route.params;
  const [userList, setUserList] = React.useState([]);
  const [userListVisible, setUserListVisible] = React.useState(true);
  const [GalleryList, setGalleryList] = React.useState([]);
  const MemoRelatedPost = useSelector(state => state.MemoPostReducer);

  const getMemoPosts = () => {
    setGalleryList([]);
    MemoRelatedPostsApi(userToken, memoId)
      .then(response => {
        response.content.data.map(item => {
          item.images.map(n => {
            setGalleryList(GalleryList => [...GalleryList, n.image]);
          });
        });
      })
      .catch(error => {
        showToast('Something happened while loading memo Posts', error);
      });
  };
  const getUsersRating = () => {
    setUserListVisible(true);
    UserRatingApiCall(userToken, memoId).then(response => {
      setUserList(response.content);
      setUserListVisible(false);
    });
  };

  const getMemoDetails = () => {
    MemoDetailsApi(userToken, memoId).then(response => {
      setWish(response.content.wish);
      if (response.content.seen !== 1) {
        setSeenMemoApiCall(userToken, memoId);
      }
    });
  };

  React.useEffect(() => {
    getUsersRating();
    getMemoPosts();
    dispatch(GetMemoDetailsAction(userToken, memoId));
    dispatch(GetMemoPostAction(userToken, memoId));
    getMemoDetails();
    // return () => {
    //   dispatch(ResetMemoDetailsLoader());
    // };
  }, []);

  // React.useEffect(() => {
  //   getMemoDetails();
  // }, []);

  const onSaveRating = index => {
    rateGiven.current = index;
  };

  const onExitModal = () => {
    closeSummzModal();
    onSaveRating(-1);
  };

  const onRatingMemo = () => {
    openSummzModal();
    setMemoForRating(memoDetails);
  };

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
      .catch(error => {
        showToast('Something went wrong while adding to Wishlist');
      });
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
          <AccentButton
            onPress={onRatingMemo}
            title="Rate"
            disabled={dataLoading}
          />
          <PopupActionsModal memoId={memoId} memoDetails={memoDetails} />
        </View>
      </AppHeader>

      {summarizedModal && (
        <SummarizedRecapture
          userToken={userToken}
          navigation={navigation}
          memoForRating={memoForRating}
          visible={summarizedModal}
          onCloseModal={closeSummzModal}
          onExitModal={onExitModal}
          selectedGroupData={selectedGroupDataRef.current}
          ratingGiven={rateGiven.current}
          onSaveRating={onSaveRating}
          memoListIndex={null}
          shareWithNavProps={{
            routeToScreen: 'ViewMemo',
          }}
          onAddPhoto={() => {
            navigation.navigate('RecaptureActivity', {}), onExitModal();
          }}
          onErrorRating={onExitModal}
          onSuccessRating={() => {
            onExitModal();
            openModal();

            setTimeout(() => {
              setMemoDetails({
                ...memoDetails,
                me: rateGiven.current + 1,
                exp: true,
                wish: false,
              });
            }, 100);
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
              getMemoPosts();
              getMemoDetails();
              dispatch(GetMemoDetailsAction(userToken, memoId));
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
              <View style={{ ...GStyles.containView }}>
                <VertSpace size={35} />

                <SkeletonContent
                  containerStyle={{ paddingHorizontal: -20 }}
                  boneColor={AppColors.RecomBoneDark}
                  highlightColor={AppColors.SkeletonBone}
                  isLoading={dataLoading}
                  layout={SkeletonMemoDetails.FastImageSkeleton}
                >
                  <FastImage
                    style={{
                      width: hp(MEMO_IMAGE_RES),
                      height: hp(MEMO_IMAGE_RES),
                    }}
                    source={{
                      uri: memoDetails.image,
                    }}
                    resizeMethod="scale"
                    resizeMode="contain"
                  />
                </SkeletonContent>
              </View>
              <VertSpace size={40} />
              <SkeletonContent
                containerStyle={{ paddingHorizontal: -20 }}
                boneColor={AppColors.RecomBoneDark}
                highlightColor={AppColors.SkeletonBone}
                isLoading={dataLoading}
                layout={SkeletonMemoDetails.MemoStatView}
              >
                <MemoStatView
                  item={{ ...memoDetails }}
                  dataLoading={dataLoading}
                />
              </SkeletonContent>

              <VertSpace size={30} />
              <SkeletonContent
                containerStyle={{ paddingHorizontal: -20 }}
                boneColor={AppColors.RecomBoneDark}
                highlightColor={AppColors.SkeletonBone}
                isLoading={userListVisible}
                layout={SkeletonMemoDetails.UsersRatedList}
              >
                <UsersRatedList
                  users={userList}
                  onPress={() => {
                    navigation.navigate('ExperiencedContacts', {
                      MemoData: memoDetails,
                    });
                  }}
                />
              </SkeletonContent>

              <VertSpace size={60} />

              <SkeletonContent
                containerStyle={{ paddingHorizontal: -20 }}
                boneColor={AppColors.RecomBoneDark}
                highlightColor={AppColors.SkeletonBone}
                isLoading={dataLoading}
                layout={SkeletonMemoDetails.WishButton}
              >
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
                  }}
                >
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
                    }}
                  >
                    {Wish ? 'Added to wishlist' : 'Add to wishlist'}
                  </Text>
                </TouchableOpacity>
              </SkeletonContent>

              <VertSpace size={35} />

              <MiniGalleryList
                skeletonLoading={MemoPostLoading}
                SeeAllSwo={false}
                dataList={GalleryList}
                onPress={() =>
                  navigation.navigate('ImageGallery', {
                    userId: id,
                  })
                }
              />
              <VertSpace size={15} />

              {GalleryList.length > 0 || MemoPostLoading ? (
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
        renderItem={({ item, index }) => (
          <SkeletonContent
            key={index}
            containerStyle={{ flexDirection: 'column' }}
            boneColor={AppColors.RecomBoneDark}
            highlightColor={AppColors.SkeletonBone}
            isLoading={MemoPostLoading}
            layout={Skeletons.timeline}
          >
            <PostView item={item} index={index} location={'P'} />
          </SkeletonContent>
        )}
      />
    </SafeAreaView>
  );
};

// export const SkeletonMemoDetails = {
//   FastImageSkeleton: [
//     {
//       height: 200,
//       justifyContent: 'center',
//       alignItems: 'center',
//       children: [
//         {
//           width: 150,
//           height: 150,
//           alignItems: 'center',
//           borderRadius: 100,
//         },
//       ],
//     },
//   ],

//   MemoStatView: [
//     {
//       height: 60,
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       flexDirection: 'row',
//       children: [
//         {
//           width: AppDimens.width * 0.5,
//           height: 40,
//           borderRadius: 10,
//         },
//         {
//           width: 40,
//           height: 40,
//           borderRadius: 10,
//         },
//       ],
//     },
//     {
//       width: AppDimens.width * 0.25,
//       height: 26,
//       borderRadius: 10,
//     },
//     {
//       height: 100,
//       // backgroundColor: 'wheat',
//       marginTop: 50,
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       children: new Array(3).fill({
//         width: 60,
//         borderRadius: 30,
//         height: 40,
//       }),
//     },
//   ],

//   UsersRatedList: [
//     {
//       height: 60,
//       width: 200,

//       flexDirection: 'row',
//       paddingLeft: 20,
//       children: new Array(5).fill({
//         width: 42,
//         borderRadius: 30,
//         height: 42,
//         borderWidth: 3,
//         borderColor: 'white',
//       }),
//     },
//   ],
//   UsersRatedListDark: [
//     {
//       height: 60,
//       width: 200,

//       flexDirection: 'row',
//       paddingLeft: 20,
//       justifyContent: 'center',
//       children: new Array(6).fill({
//         width: 42,
//         borderRadius: 30,
//         height: 42,
//         borderWidth: 3,
//         borderColor: 'black',
//         marginLeft: -10,
//       }),
//     },
//   ],
// };

export const ImageGridViewMemoDetails = ({ galleryImages }) => {
  const Navigation = useNavigation();
  let newJson = galleryImages.map(rec => {
    return {
      url: rec,
    };
  });
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      numColumns={3}
      columnWrapperStyle={{
        flex: 1,
        justifyContent: 'space-around',
      }}
      data={galleryImages}
      ListFooterComponent={<VertSpace size={Spacing.xxlarge} />}
      ListHeaderComponent={
        <>
          <Text
            style={{
              color: AppColors.DarkGrey,
              fontSize: FontSize.inputText,
              fontFamily: AppFonts.CalibriBold,
            }}
          >
            Gallery
          </Text>
          <VertSpace size={Spacing.xlarge} />
        </>
      }
      ItemSeparatorComponent={() => <VertSpace size={8} />}
      renderItem={({ item, index, separators }) => {
        return (
          <ImageGridView
            onPress={() =>
              Navigation.navigate('ImageViewScreen', {
                imagesList: newJson,
                clickedImageIndex: index,
              })
            }
            requiredLoader={false}
            selectable={false}
            item={item}
            imageUrl={item}
            size={AppDimens.width * 0.26}
          />
        );
      }}
    />
  );
};
