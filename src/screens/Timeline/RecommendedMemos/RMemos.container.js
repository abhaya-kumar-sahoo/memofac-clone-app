import React, { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from 'shared/Functions/ToastFunctions';
import { HoriSpace, VertSpace } from 'shared/Global.styles';
import { AppColors } from 'assets/AppColors';
import { MemosPostMemo } from './RMemo.comp';
import {
  GetRecomMemosAction,
  updateExperience,
  updateWish,
} from 'redux/reducers/Memos/RecomMemos.reducer';
import { addMemoWishlistApiCall } from 'redux/sagas/wishlist/request';
import { hp, wp } from 'shared/dimens';
import { SkeletonRecommendedMemos } from '../components/Recommended.skeleton';
import { setSeenMemoApiCall } from 'redux/sagas/Memos/request';
import { styles } from './RMemos.styles';
import { ListFetchTypes } from 'redux/constants.redux';
import { SummarizedRecapture } from 'screens/Recapture/summarizedRecapture';
import { ExpGrantModal } from 'screens/Recapture/ExpGrantModal';

export const RecommendedMemos = ({
  route,
  bottomTabRoute,
  navigation,
  onExperience = () => {},
  onShareExperience = () => {},
}) => {
  const [summarizedModal, setSummarizedModal] = useState(false);
  const [memoForRating, setMemoForRating] = useState({});
  const closeSummzModal = () => setSummarizedModal(false);
  const openSummzModal = () => setSummarizedModal(true);
  const [visible, setVisibility] = useState(false);
  const closeModal = () => setVisibility(false);
  const openModal = () => setVisibility(true);
  const refContainer = useRef(null);
  const { RecomMemosRedux } = useSelector(state => state);
  const { rmemos, dataLoading } = useSelector(state => state.RecomMemosRedux);
  const userAuth = useSelector(state => state.userAuth);
  const dispatch = useDispatch();
  const PageRef = useRef(1);

  const memoIndex = useRef(null);
  const selectedGroupDataRef = useRef({
    name: 'Public',
    id: 3,
    count: 0,
  });
  const rateGiven = useRef(-1);
  const { selectedGroupData } = { ...bottomTabRoute.params };

  const getRecomndedMemos = () => {
    PageRef.current = PageRef.current + 1;
    dispatch(
      GetRecomMemosAction(
        userAuth.userToken,
        PageRef.current,
        ListFetchTypes.FETCH_MORE,
        rmemos.length,
      ),
    );
  };
  const onWishlist = item => {
    addMemoWishlistApiCall(userAuth.userToken, item.id).then(response => {
      showToast(
        response.message == 'Added Wishlist'
          ? 'Memo added to wishlist'
          : 'Memo removed from wishlist',
      );
      dispatch(updateWish({ memo: item }));

      if (item.seen == 0) {
        setSeenMemoApiCall(userAuth.userToken, item.id);
      }
    });
  };

  const onRatingMemo = (memoData, index) => {
    memoIndex.current = index;
    openSummzModal();
    setMemoForRating(memoData);
  };
  const renderItem = useCallback(
    ({ item, index }) => (
      <MemosPostMemo
        userData={userAuth}
        item={item}
        index={index}
        onWishlist={onWishlist}
        onExperience={onRatingMemo}
      />
    ),
    [rmemos],
  );

  // const renderItem = ({ item, index }) => (
  //   <MemosPostMemo
  //     userData={userAuth}
  //     item={item}
  //     index={index}
  //     onWishlist={onWishlist}
  //     onExperience={onRatingMemo}
  //   />
  // );

  const ListFooterComponent = () => (
    <>{RecomMemosRedux.rmemos.length > 0 && <RMemosFooterComponent />}</>
  );

  const skeletonLoading =
    // RecomMemosRedux.dataLoading ||
    // RecomMemosRedux.rmemos.length === 0 ||
    rmemos.length === 0;

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

  // console.log('Routes passed to Recommended Memos ---->   ', rmemos);

  React.useEffect(() => {
    if (selectedGroupData) {
      openSummzModal();
      //console.log('recevied !! Thank you...', selectedGroupData);
      selectedGroupDataRef.current = selectedGroupData;
      // setShareWithGroup(selectedGroupData);
    }
  }, [selectedGroupData]);

  return (
    <>
      {summarizedModal && (
        <SummarizedRecapture
          userToken={userAuth.userToken}
          navigation={navigation}
          memoForRating={memoForRating}
          visible={summarizedModal}
          onCloseModal={closeSummzModal}
          onExitModal={onExitModal}
          selectedGroupData={selectedGroupDataRef.current}
          ratingGiven={rateGiven.current}
          onSaveRating={onSaveRating}
          memoListIndex={memoIndex.current}
          onSuccessRating={() => {
            onExitModal();
            openModal();
          }}
        />
      )}

      <ExpGrantModal visible={visible} closeModal={closeModal} />

      <View
        style={{
          backgroundColor: AppColors.Transparent,
          height: hp(310),
        }}
      >
        {/* {!RecomMemosRedux.dataLoading && ( */}
        {rmemos.length > 1 && (
          <FlatList
            horizontal
            contentOffset={{ x: wp(120), y: 0 }}
            ref={refContainer}
            removeClippedSubviews={true}
            maxToRenderPerBatch={30}
            initialNumToRender={20}
            windowSize={30}
            showsHorizontalScrollIndicator={false}
            // ItemSeparatorComponent={() => <HoriSpace size={40} />}
            ListHeaderComponent={<HoriSpace size={16} />}
            ListFooterComponent={ListFooterComponent}
            keyExtractor={(item, index) =>
              item.id.toString() + index.toString()
            }
            data={rmemos}
            onEndReached={getRecomndedMemos}
            renderItem={renderItem}
          />
        )}

        <SkeletonRecommendedMemos loading={skeletonLoading} />

        {/* {!skeletonLoading && (
          <>
            <View style={{ height: hp(40) }} />
            <View
              style={{
                ...GStyles.containView,
              }}
            >
              <AppButton
                backgroundColor={AppColors.hotPink}
                width={wp(270)}
                height={hp(45)}
                titleFontSize={FontSize.xlarge}
                titleColor={AppColors.white}
                title="Share your experiences"
                onPress={onShareExperience}
              />
            </View>
          </>
        )} */}

        {/* <AppButton
        backgroundColor={AppColors.hotPink}
        width={wp(270)}
        height={hp(45)}
        titleFontSize={FontSize.xlarge}
        titleColor={AppColors.white}
        title="Share your experiences"
        onPress={onShareExperience}
      /> */}
      </View>
    </>
  );
};

const RMemosFooterComponent = () => {
  return (
    <View style={styles.footerDarkContainer}>
      <ActivityIndicator color={AppColors.MediumGrey} />
      <VertSpace />
      <Text style={styles.footerLoadingTextStyle}>Loading more</Text>
      <Text style={styles.footerLoadingTextStyle}>memos ...</Text>
    </View>
  );
};
