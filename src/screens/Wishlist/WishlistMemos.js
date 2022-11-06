import { useNavigation } from '@react-navigation/core';
import { TextNoDataView } from 'components/NodataView/TextNodata';
import React, { Fragment, useState, useRef } from 'react';
import { RefreshControl, ScrollView, View, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { getWishlistMemos } from 'redux/sagas/wishlist/request';

import { GStyles, Spacing, VertSpace } from '../../shared/Global.styles';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { AppColors } from 'assets/AppColors';
import { Skeletons } from 'shared/Skeletons';
import { showToast } from 'shared/Functions/ToastFunctions';
import { MemoLists } from 'screens/Memos/UserMemos';
import { Container } from 'components/Mini';

// USER MEMO SCREEN
export function WishlistMemos() {
  const { userAuth } = useSelector(state => state);
  const [loading, setLoading] = useState(true);
  const [Memosuser, setMemosuser] = useState([]);
  const isCancel = useRef(false);
  React.useEffect(() => {
    getWishlistMemos(userAuth.userToken)
      .then(response => {
        if (!isCancel.current) {
          setMemosuser(response.content);
          setLoading(false);
        }
      })
      .catch(() => showToast('Reload wishlist screen'))
      .finally(() => {
        if (!isCancel.current) {
          setLoading(false);
        }
      });

    return () => {
      isCancel.current = true;
    };
  }, [loading]);
  return (
    <SafeAreaView style={GStyles.Dark}>
      <Container>
        <ScrollView
          style={{}}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => setLoading(!loading)}
            />
          }
        >
          <VertSpace />
          {Memosuser.length ? (
            <View style={{}}>
              {Memosuser.map((memo, index) => {
                return (
                  <Fragment key={(index + index + 2).toString()}>
                    <MemoLists memo={memo} memoId={memo.memo_id} />
                    <VertSpace />
                  </Fragment>
                );
              })}
            </View>
          ) : (
            <>
              {loading ? (
                <SkeletonContent
                  containerStyle={{}}
                  boneColor={AppColors.SkeletonBone}
                  highlightColor={AppColors.SkeletonBone}
                  isLoading={loading}
                  layout={Skeletons.searchMemos}
                />
              ) : (
                <TextNoDataView title={'Nothing yet,\nStart wishlisting now'} />
              )}
            </>
          )}
          <VertSpace />
        </ScrollView>
      </Container>

      <VertSpace size={Spacing.xxlarge} />
    </SafeAreaView>
  );
}
