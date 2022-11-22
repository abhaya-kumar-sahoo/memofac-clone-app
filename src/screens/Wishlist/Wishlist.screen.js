import React, {useEffect, useState, useRef} from 'react';
import {FlatList, SafeAreaView, RefreshControl} from 'react-native';
import {useSelector} from 'react-redux';
import {AppDimens, GStyles, VertSpace} from '../../shared/Global.styles';

import {AppColors} from '../../assets/AppColors';
import {myWishlistApiCall} from 'redux/sagas/wishlist/request';
import {showToast} from 'shared/Functions/ToastFunctions';
import {
  PostSeparator,
  PostView,
} from 'screens/Timeline/components/PostView/Postview.comp';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {Skeletons} from 'shared/Skeletons';

export function WishlistScreen() {
  const [RecaptureList, setRecaptureList] = useState([]);
  const [LoadingMore, setLoadingMore] = useState(true);
  const userToken = useSelector(state => state.userAuth.userToken);
  const PageRef = useRef(1);
  const isCancel = useRef(false);
  useEffect(() => {
    getPosts();
    return () => {
      isCancel.current = true;
    };
  }, []);

  const getPosts = () => {
    myWishlistApiCall(userToken, PageRef.current, 0, 0)
      .then(response => {
        if (!isCancel.current) {
          setLoadingMore(false);

          PageRef.current = response.content.current_page + 1;
          setRecaptureList(prevstate => {
            return [...prevstate, ...response.content.data];
          });
        }
      })
      .catch(error => {
        showToast();
      });
  };
  return (
    <SafeAreaView style={GStyles.Dark}>
      <FlatList
        refreshControl={
          <RefreshControl
            colors={['#6297e7', '#40b07e']}
            refreshing={LoadingMore}
            onRefresh={() => {
              setLoadingMore(true);

              getPosts();
            }}
          />
        }
        ListFooterComponent={
          <>
            <VertSpace size={100} />
          </>
        }
        // ListHeaderComponent={<VertSpace size={20} />}
        ItemSeparatorComponent={() => (
          <PostSeparator
            backgroundColor={AppColors.Skeleton}
            width={AppDimens.width * 0.8}
          />
        )}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        style={{paddingTop: 30}}
        onEndReached={() => {
          getPosts();
        }}
        keyExtractor={(_, index) => index.toString()}
        data={RecaptureList}
        extraData={RecaptureList}
        renderItem={({item, index}) => (
          <SkeletonContent
            key={index}
            containerStyle={{flexDirection: 'column'}}
            boneColor={AppColors.RecomBoneDark}
            highlightColor={AppColors.SkeletonBone}
            isLoading={LoadingMore}
            layout={Skeletons.timeline}>
            <PostView item={item} index={index} location={'M'} />
          </SkeletonContent>
        )}
      />
    </SafeAreaView>
  );
}
