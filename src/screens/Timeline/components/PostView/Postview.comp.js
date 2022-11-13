import React, {Fragment} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ChatFilledIcon, HeartFillIcon} from 'shared/Icon.Comp';
import {showToast} from 'shared/Functions/ToastFunctions';
import {
  AppDimens,
  FontSize,
  GStyles,
  HoriSpace,
  Spacing,
  VertSpace,
  viewportWidth,
} from 'shared/Global.styles';
import {BioImageView} from 'components/BioImageView';
import {AppColors} from 'assets/AppColors';
import {AppFonts} from 'assets/fonts/AppFonts';
import {Styles} from './Postview.styles';
import PaginationDot from 'react-native-animated-pagination-dot';
import Ripple from 'react-native-material-ripple';
import {PostMenuOption} from '../MenuOption';
import {ReactionView} from '../Reaction.comp';
import {WishListButton} from '../Wishlist.comp';
import {ChatButton} from '../ChatButton.comp';
import {SliderBox} from 'react-native-image-slider-box';
import {MemoChip} from 'screens/Memos/MemoChip';
import ReadMore from '@fawazahmed/react-native-read-more';
import {addToWishlistApiCall} from 'redux/sagas/wishlist/request';
import moment from 'moment';
import {
  removePost,
  updateReactionCount,
  updateWishListState,
} from 'redux/reducers/Timeline/Timeline.reducer';
import {wp} from 'shared/dimens';
import {CarouselRenderView} from './CarouselSlider/Carousel.view';
import {getPostReactionsComments} from 'redux/reducers/Post/PostComments.reducer';
import {DeletePostApiCall} from 'redux/sagas/post/request';
import {DebugText} from 'components/debugComps';
import {useNavigation} from '@react-navigation/native';
import {MonthNames} from 'shared/Data.shared';
import {
  removeUserPost,
  updateUserReactionCount,
  updateUserWishListState,
} from 'redux/reducers/UserProfile/UserPost_reducer';
import {
  removeMemoPost,
  updateMemoReactionCount,
  updateMemoWishListState,
} from 'redux/reducers/Post/MemoRelatedPost.reducer';

export const PostModalData = {
  id: '',
  user_id: '',
  text: '',
  exp_id: '',
  exp_on: '',
  primary_folder: '',
  secondary_folder: '',
  created_at: '',
  updated_at: '',
  user_name: '',
  user_image: null,
  total_reacts: '1',
  total_comments: '0',
  myRecation: -1,
  images: [
    {
      id: -1,
      post_id: '-1',
      image: null,
      created_at: '',
      updated_at: '',
    },
  ],
  wish: false,
  exp: true,
  memos: [],
};

export const PostView = ({index, item, location}) => {
  const dispatch = useDispatch();
  const {
    images = [],
    user_id,
    updated_at,
    memos = [],
    text = '',
    myRecation,
    created_at,
    updated_at_formatted,
    total_reacts,
  } = {
    ...item,
  };
  // React.useEffect(() => {
  // }, []);

  const DateFormatChange = data => {
    let year = data.slice(0, 4);
    let month = MonthNames[data.slice(5, 7).replace(/^0+/, '')];
    let date = data.slice(8, 10).replace(/^0+/, '');
    let time = data.slice(11, 16);
    let AMPM = data.slice(20, 22);
    function getOrdinalNum(n) {
      return (
        n +
        (n > 0
          ? ['th', 'st', 'nd', 'rd'][
              (n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10
            ]
          : '')
      );
    }
    let newTime = `${getOrdinalNum(date)} ${month} ${year}, ${time}`;
    return newTime;
  };

  const {userAuth} = useSelector(state => state);
  const navigation = useNavigation();
  const {navigate} = {...navigation};
  const {userData, userToken} = {...userAuth};
  const carouselRef = React.useRef(null);
  const [slider1ActiveSlide, setslider1ActiveSlide] = React.useState(0);

  let carouselLength = images.length;

  const viewProfile = () => {
    if (userData.id == user_id) {
      navigate('UserProfileNav');
    } else {
      navigate('FriendsProfile', {user_id});
    }
  };

  const userImageLink = item.user_image;
  // userData.id == user_id ? userData.image : item.user_image;

  let experiencedOn = moment(updated_at, 'YYYY-MM-DD HH:mm:ss', true).format(
    'Do MMM YYYY, HH:mm a',
  );

  const addToWishlist = () => {
    if (location === 'T') {
      dispatch(updateWishListState({postIndex: index, isWishlist: item.wish}));
    } else if (location === 'M') {
      dispatch(
        updateUserWishListState({postIndex: index, isWishlist: item.wish}),
      );
    } else if (location === 'P') {
      dispatch(
        updateMemoWishListState({postIndex: index, isWishlist: item.wish}),
      );
    }

    addToWishlistApiCall(userToken, item.id)
      .then(response => {
        if (response.result == 'success') {
          showToast(
            response.message === 'Remove Wishlist'
              ? 'Removed from wishlist'
              : 'Added to your wishlist',
          );
        }
      })
      .catch(error => {
        showToast('Something went wrong');
      });
  };

  const deletePost = () => {
    if (location === 'T') {
      dispatch(removePost(index));
    } else if (location === 'M') {
      dispatch(removeUserPost(index));
    } else if (location === 'P') {
      dispatch(removeMemoPost(index));
    }

    DeletePostApiCall(userToken, item.id)
      .then(() => showToast('Post deleted'))
      .catch(error => {
        showToast('Something went wrong while deleteing post');
      });
  };

  const MemoListViewSection = () => {
    return (
      <View style={{paddingLeft: 15, marginTop: memos.length == 0 ? 0 : 22}}>
        {memos?.map((memo, index) => {
          return (
            <Fragment key={(index + index + 2).toString()}>
              <MemoChip item={memo} key={index} />
              <VertSpace size={memos.length > 1 ? 16 : 0} />
            </Fragment>
          );
        })}
      </View>
    );
  };

  const imagesList = images?.map(item => item.image);

  const onCurrentImagePressed = index => {
    // const imageSelected = imagesList[index];
    navigate('MultipleImageViewScreen', {
      imagesList,
      clickedImageIndex: index,
    });
  };

  const onReactionPress = reaction => {
    if (location === 'T') {
      dispatch(updateReactionCount({postIndex: index, reaction}));
    } else if (location === 'M') {
      dispatch(updateUserReactionCount({postIndex: index, reaction}));
    } else if (location === 'P') {
      dispatch(updateMemoReactionCount({postIndex: index, reaction}));
    }
  };

  return (
    <Fragment>
      {/* POST HEADER */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingLeft: 15,
        }}>
        {/* BIO VIEW */}
        <TouchableOpacity
          onPress={viewProfile}
          style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <BioImageView imageSize={wp(60)} imageSrc={userImageLink} />
          <HoriSpace size={10} />
          <View style={{flexGrow: 1, maxWidth: wp(220)}}>
            <Text numberOfLines={1} style={Styles.nameStyleDark}>
              {item.user_name}
            </Text>
            <VertSpace size={3} />
            <Text style={Styles.dateStyleDark}>
              {experiencedOn == 'Invalid date'
                ? DateFormatChange(
                    updated_at_formatted == undefined
                      ? created_at
                      : updated_at_formatted,
                  )
                : experiencedOn}
              {/* {experiencedOn} */}
            </Text>
          </View>
        </TouchableOpacity>

        <PostMenuOption
          postData={item}
          onDelete={deletePost}
          onWishlistAdd={() => {
            addToWishlist();
          }}
        />
      </View>

      <MemoListViewSection />

      {text?.length > 0 && (
        <>
          <View
            style={{
              paddingHorizontal: 15,
              marginTop: 13,
            }}>
            {/* <InfiniteText text={item.text} /> */}
            <ReadMore
              style={{
                fontFamily: AppFonts.CalibriRegular,

                color: AppColors.white1,
                // color: AppColors.DarkGrey,

                lineHeight: FontSize.inputText,
                fontSize: FontSize.large,
              }}
              seeMoreText={'more'}
              seeLessText={'less'}
              seeMoreStyle={{
                color: AppColors.blue,
                fontFamily: AppFonts.CalibriBold,
                fontSize: 15,
              }}
              seeLessStyle={{
                color: AppColors.blue,
                fontFamily: AppFonts.CalibriBold,
              }}
              numberOfLines={3}
              expandOnly={true}>
              {item.text}
            </ReadMore>
          </View>
          {/* <VertSpace size={Spacing.large} /> */}
        </>
      )}

      {/* <VertSpace size={27} /> */}
      <SliderBox
        paginationBoxVerticalPadding={30}
        dotColor={'transparent'}
        inactiveDotColor={'transparent'}
        sliderBoxHeight={wp(340)}
        ImageComponentStyle={{
          borderRadius: 40,
          width: wp(340),
          backgroundColor: AppColors.LightDark1,
          marginTop: memos.length > 1 ? 25 : 30,
        }}
        imageLoadingColor={AppColors.LightDark1}
        dotStyle={{backgroundColor: 'wheat'}}
        images={imagesList}
        onCurrentImagePressed={onCurrentImagePressed}
        currentImageEmitter={index => {
          setslider1ActiveSlide(index);
          //console.log(`current pos is: ${index}`);
        }}
      />

      {carouselLength > 1 && (
        <>
          <View
            style={{
              width: '100%',
              height: 27,
              backgroundColor: AppColors.Transparent,
              alignItems: 'center',
              paddingTop: 10,
            }}>
            <PaginationDot
              activeDotColor={AppColors.MediumGrey}
              curPage={slider1ActiveSlide}
              maxPage={carouselLength}
              sizeRatio={1.0}
            />
            <VertSpace size={27} />
          </View>
        </>
      )}

      {/* <VertSpace /> */}

      {/* <Ripple
        style={{
          width: 100,
          height: 100,
          borderRadius: 10,
          backgroundColor: 'wheat',
        }}
        onPress={() => {

          getCommentsReactions({ usertoken: userToken, post_id: item.id });
        }}
      ></Ripple> */}

      {/* CHAT, REACT, EXP, WISHLIST */}
      <View
        style={[
          GStyles.flexRow,
          {paddingLeft: 15, paddingTop: carouselLength > 1 ? 10 : 27},
        ]}>
        <ChatButton
          post={item.id}
          onPress={() => {
            navigate('CommentScreen', {
              post_id: item.id,
              postindex: index,
              location,
            });
          }}
        />
        <ReactionView onReaction={onReactionPress} post={item} />
        {/* <ExperiencedButton expProps={!item.exp} onPress={onExperience} /> */}
        <WishListButton
          // disabled={userData.id == item.user_id}
          onAddtoWishList={addToWishlist}
          postData={item}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 15,
          alignItems: 'center',
          paddingTop: carouselLength > 1 ? 0 : 10,
        }}>
        {/* TOTAL REACTS */}
        {Number(item.total_reacts) > 0 && (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
            }}
            onPress={() => {
              navigate('ContactsWithReaction');
              dispatch(
                getPostReactionsComments({
                  usertoken: userToken,
                  post_id: item.id,
                }),
              );
            }}>
            {/* <HeartFillIcon color={AppColors.DarkGrey} size={20} /> */}
            <HoriSpace size={5} />
            <Text
              style={{
                // color: AppColors.DarkGrey,
                color: AppColors.white2,
                fontFamily: AppFonts.CalibriBold,
                fontSize: FontSize.large,
              }}>
              {item.total_reacts}
            </Text>
            <HoriSpace size={5} />
            <Text
              style={{
                // color: AppColors.DarkGrey,
                color: AppColors.white2,
                fontFamily: AppFonts.CalibriRegular,
                fontSize: FontSize.large,
                paddingTop: 2,
              }}>
              Likes
            </Text>
            <HoriSpace size={10} />
          </TouchableOpacity>
        )}

        {/* TOTAL COMENTS */}
        {}

        {Number(item.total_comments) > 0 && (
          <Ripple
            rippleContainerBorderRadius={5}
            style={{flexDirection: 'row', padding: 10}}
            onPress={() => {
              dispatch(
                getPostReactionsComments({
                  usertoken: userToken,
                  post_id: item.id,
                }),
              );
              navigate('CommentScreen', {
                post_id: item.id,
                postindex: index,
              });
            }}>
            {/* <ChatFilledIcon size={20} /> */}
            <HoriSpace size={5} />
            <Text
              style={{
                // color: AppColors.DarkGrey,
                color: AppColors.white2,

                fontFamily: AppFonts.CalibriBold,
                fontSize: FontSize.large,
              }}>
              {item.total_comments}
            </Text>
            <HoriSpace size={5} />

            <Text
              style={{
                color: AppColors.white2,
                fontFamily: AppFonts.CalibriRegular,
                fontSize: FontSize.large,
                paddingTop: 2,
              }}>
              Comments
            </Text>
          </Ripple>
        )}
      </View>

      <DebugText textData={item} />
    </Fragment>
  );
};

export const PostSeparator = ({
  width = AppDimens.width * 0.5,
  height = 44,
  backgroundColor = AppColors.white2,
}) => {
  return (
    <View>
      <View style={{height: 30}} />
      <View
        style={{
          height: 0.5,
          backgroundColor: backgroundColor,
          width: width,
          alignSelf: 'center',
        }}
      />
      <View style={{height: height}} />
    </View>
  );
};
export const HorizontalLine = ({
  height = 0.5,
  width = 100,
  VerticalSpace = 100,
  color = AppColors.LowDark,
}) => {
  return (
    <View style={{height: VerticalSpace, ...GStyles.containView}}>
      <View
        style={{
          height: height,
          backgroundColor: color,
          width: width,
          alignSelf: 'center',
        }}
      />
    </View>
  );
};

export const VerticalLine = ({
  height = 5,
  width = 1,
  backgroundColor = AppColors.LowWhite,
}) => {
  return (
    <View
      style={{height: height, backgroundColor: backgroundColor, width: width}}
    />
  );
};

export const MemoizedPostView = React.memo(PostView);
