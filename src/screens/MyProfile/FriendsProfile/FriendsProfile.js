import React, { useRef, useState, useEffect } from 'react';
import { StatusBar, FlatList, SafeAreaView } from 'react-native';
import { AppColors } from 'assets/AppColors';
import { AppDimens, GStyles, VertSpace } from 'shared/Global.styles';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { Container } from 'components/Mini';
import { useSelector } from 'react-redux';
import { Skeletons } from 'shared/Skeletons';
import {
  getFriendsDetailsApicall,
  getFriendsPostsApiCall,
} from 'redux/sagas/FriendsProfile/request';
import { showToast } from 'shared/Functions/ToastFunctions';
import { AppHeader } from 'components/AppHeader';
import {
  HorizontalLine,
  PostSeparator,
  PostView,
} from 'screens/Timeline/components/PostView/Postview.comp';
import { RefreshControl } from 'react-native';
import { ProfilePicture, ProfilePictureSkeleton } from '../UserProfile.Nav';
import { SelectButtons } from '../index';
import { UserMemos } from 'screens/Memos/UserMemos';
import { ImageGallery } from 'screens/GalleryPicker/MyGallery/ImageGallery';
import { GetFndMemosCategoryApiCall } from 'redux/sagas/Memos/request';

export const HEADER_HEIGHT = 300 + StatusBar.currentHeight;
export const PROFILE_PICTURE_SIZE = AppDimens.width * 0.45;

export const FriendsProfile = ({ navigation, route }) => {
  // USER DATA
  const authData = useSelector(state => state.userAuth);
  const [userImage, setuserImage] = useState(null);
  const [RatedMemos, setRatedMemos] = useState([]);
  const [RatedCategoryMemos, setRatedCategoryMemos] = useState([]);
  const [RecaptureList, setRecaptureList] = useState([]);
  const [NumOfMemo, setNumOfMemo] = useState('');
  const [galleryImages, setgalleryImages] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [username, setusername] = useState('');
  const [userId, setuserId] = useState('');
  const [loading, setLoading] = useState(true);
  const isCancel = useRef(false);

  const getMyPosts = () => {
    getFriendsPostsApiCall(authData.userToken, route.params.user_id)
      .then(result => {
        if (!isCancel.current) {
          setRefreshing(false);
          setRecaptureList(result.content.data);
        }
      })
      .catch(error => {
        showToast('error');
      });
  };

  const onRefresh = () => {
    setRefreshing(true);
    getMyPosts();
  };

  const getFriendsdata = () => {
    if (route.params.user_id) {
      getFriendsDetailsApicall(authData.userToken, route.params.user_id)
        .then(response => {
          if (!isCancel.current) {
            setLoading(false);
            setuserImage(response.user.image);
            setgalleryImages(response.content.gallery);
            setRatedMemos(response.content.rated_memo);
            setusername(response.user.username);
            setuserId(response.user.id);
            setNumOfMemo(response.user.total_rated_memo);
          }
        })
        .catch(error => {
          showToast('Something went wrong');
          // console.log(error);
        })
        .finally(() => getMyPosts());
    }
  };
  useEffect(() => {
    GetFndMemosCategoryApiCall(userAuth.userToken, route.params.user_id)
      .then(res => {
        if (!isCancel.current) {
          setRatedCategoryMemos(res.content.rated_memo);
        }
      })
      .catch(e => {
        console.log(e);
      });
  }, []);
  useEffect(() => {
    getFriendsdata();

    return () => {
      isCancel.current = true;
    };
  }, []);

  const [SelectButton, setSelectButton] = React.useState(1);

  const { userAuth } = useSelector(state => state);

  return (
    <SafeAreaView style={GStyles.Dark}>
      <AppHeader enableBack />

      <SkeletonContent
        containerStyle={{ flexDirection: 'column' }}
        boneColor={AppColors.RecomBoneDark}
        highlightColor={AppColors.SkeletonBone}
        isLoading={loading}
        layout={ProfilePictureSkeleton}
      >
        <ProfilePicture
          userImage={userImage}
          name={username}
          RattedMemoNum={NumOfMemo}
        />
      </SkeletonContent>
      <VertSpace />
      <Container>
        <SelectButtons
          SwitchButtonShow={false}
          onPress={item => setSelectButton(item)}
          SelectButton={SelectButton}
        />

        <VertSpace size={30} />
        <HorizontalLine
          VerticalSpace={0}
          width={AppDimens.width * 0.9}
          color={AppColors.disableColor}
        />
      </Container>

      {SelectButton === 1 && (
        <UserMemos
          userid={userId}
          Memosuser={RatedMemos}
          mymemosLoading={loading}
          userAuth={userAuth}
          onRefresh={() => setLoading(!loading)}
          MemoCategoryList={RatedCategoryMemos}
        />
      )}
      {SelectButton === 2 && <ImageGallery userId={userId} />}

      {SelectButton === 3 && (
        <FlatList
          refreshControl={
            <RefreshControl
              colors={['#6297e7', '#40b07e']}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          initialNumToRender={8}
          ItemSeparatorComponent={() => (
            <PostSeparator
              backgroundColor={AppColors.Skeleton}
              width={AppDimens.width * 0.8}
            />
          )}
          ListHeaderComponent={() => (
            <>
              <VertSpace size={32} />
            </>
          )}
          ListFooterComponent={
            <>
              <VertSpace size={100} />
            </>
          }
          onEndReachedThreshold={0.5}
          onEndReached={() => {}}
          keyExtractor={(_, index) => index.toString()}
          data={RecaptureList}
          renderItem={({ item, index }) => (
            <SkeletonContent
              key={index}
              containerStyle={{ flexDirection: 'column' }}
              boneColor={AppColors.RecomBoneDark}
              highlightColor={AppColors.SkeletonBone}
              isLoading={refreshing}
              layout={Skeletons.timeline}
            >
              <PostView index={index} item={item} location={'F'} />
            </SkeletonContent>
          )}
        />
      )}
    </SafeAreaView>
  );
};

// export const DefaultButton
