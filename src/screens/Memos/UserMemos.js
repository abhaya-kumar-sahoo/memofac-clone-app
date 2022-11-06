import { useNavigation } from '@react-navigation/core';
import React, { Fragment, useState, useEffect } from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { SwitchButton } from 'screens/Wishlist/SwitchButton';
import { AppColors } from '../../assets/AppColors';
import { AppHeader, HeadingBar } from '../../components/AppHeader';
import { ChipButton } from '../../components/ChipButton';
import { Container } from '../../components/Mini';
import { GetMemosfromCategoryApiCall } from '../../redux/sagas/Memos/request';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {
  AppDimens,
  FontSize,
  GStyles,
  HoriSpace,
  Spacing,
  VertSpace,
} from '../../shared/Global.styles';
import { AddDarkIcon, AddIcon } from '../../shared/Icon.Comp';
import { MemoSection } from 'screens/Journey/Journey.screen';
import { Skeletons } from 'shared/Skeletons';
import { TextNoDataView } from 'components/NodataView/TextNodata';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MiniRating } from './MemoChip';
import { AppFonts } from 'assets/fonts/AppFonts';
import Ripple from 'react-native-material-ripple';

export const MemoLists = ({ memo, memoId }) => {
  const navigation = useNavigation();

  return (
    <Ripple
      style={{
        ...GStyles.flexRow,
        // alignItems: 'center',
        justifyContent: 'space-between',
      }}
      onPress={() => navigation.navigate('ViewMemo', { memoId })}
    >
      <View style={{ ...GStyles.flexRow }}>
        <Image
          resizeMode={'contain'}
          resizeMethod={'resize'}
          style={{ width: 50, height: 50 }}
          source={{ uri: memo.image }}
        />
        <HoriSpace />
        <View style={{ justifyContent: 'center' }}>
          <Text
            style={{
              fontSize: 22,
              color: AppColors.white,
              fontFamily: AppFonts.CalibriBold,
              width: AppDimens.width * 0.57,
              // paddingTop: memo.description == '' ? 10 : 0,
            }}
            numberOfLines={1}
          >
            {memo.title}
          </Text>

          {memo.description == '' || memo.description == undefined ? (
            <Text
              style={{
                fontSize: 15,
                color: AppColors.MediumGrey,
                fontFamily: AppFonts.CalibriRegular,
                textAlign: 'left',
                paddingLeft: 2,
                width: AppDimens.width * 0.57,
              }}
              numberOfLines={1}
            >
              - - - -
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 15,
                color: AppColors.MediumGrey,
                fontFamily: AppFonts.CalibriRegular,
                textAlign: 'left',
                width: AppDimens.width * 0.57,
              }}
              numberOfLines={1}
            >
              {memo.description}
            </Text>
          )}
        </View>
      </View>
      <View>
        <MiniRating
          RATESIZE={20}
          color={AppColors.white1}
          rateNumber={memo.me}
        />
      </View>
    </Ripple>
  );
};
// USER MEMO SCREEN
export function UserMemos({
  route,
  // navigation,
  userid,
  userAuth,
  Memosuser,
  mymemosLoading,
  onRefresh = () => null,
  MemoCategoryList,
}) {
  const navigation = useNavigation();
  const { userToken, userData } = useSelector(state => state.userAuth);
  const isCancel = React.useRef(false);

  const [FilterMemos, setFilterMemos] = React.useState(Memosuser);
  const [selectId, setSelectId] = useState(-1);
  const [MemoCategory, setMemoCategory] = useState([]);
  React.useEffect(() => {
    if (!isCancel.current) {
      setFilterMemos(Memosuser);
    }
  }, [Memosuser.length]);
  useEffect(() => {
    return () => {
      isCancel.current = true;
    };
  }, []);

  const FilterMemo = id => {
    if (!isCancel.current) {
      setFilterMemos(
        Memosuser.filter(i => i.category[0].id == id.replace(',', '')),
      );
    }
    setFilterMemos(
      Memosuser?.filter(i => i?.category[0]?.id == id?.replace(',', '')),
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        {Memosuser.length == 0 && mymemosLoading == false ? (
          <>
            <View>
              <VertSpace size={20} />
              {userData.id === userid || userData.id == undefined ? (
                <ChipButton
                  onPress={() => navigation.navigate('SaveMemoExp')}
                  title={'Rate more'}
                  description="- - - -"
                  RightComponent={() => (
                    <View
                      style={{
                        height: 35,
                        width: 35,
                        borderRadius: 25,
                        backgroundColor: AppColors.Red,
                        ...GStyles.flexRowCenter,
                        marginRight: 11,
                      }}
                    >
                      <AddIcon color="white" size={15} />
                    </View>
                  )}
                />
              ) : null}
            </View>
            <TextNoDataView title={'No memos available'} />
          </>
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={mymemosLoading}
                onRefresh={onRefresh}
              />
            }
            showsVerticalScrollIndicator={false}
            style={{
              paddingTop: 30,
            }}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            <View>
              {userData.id === userid || userData.id == undefined ? (
                <ChipButton
                  onPress={() => navigation.navigate('SaveMemoExp')}
                  title={'Rate more'}
                  description="- - - -"
                  RightComponent={() => (
                    <View
                      style={{
                        height: 35,
                        width: 35,
                        borderRadius: 25,
                        backgroundColor: AppColors.Red,
                        ...GStyles.flexRowCenter,
                        marginRight: 11,
                      }}
                    >
                      <AddIcon color="white" size={15} />
                    </View>
                  )}
                />
              ) : null}
            </View>
            <VertSpace />

            <SkeletonContent
              containerStyle={{}}
              boneColor={AppColors.RecomBoneDark}
              highlightColor={AppColors.SkeletonBone}
              isLoading={mymemosLoading}
              layout={Skeletons.searchMemos}
            />

            {FilterMemos.map((memo, index) => {
              return (
                <Fragment key={(index + index + 2).toString()}>
                  <MemoLists memo={memo} memoId={memo.id} />

                  <VertSpace />
                </Fragment>
              );
            })}
            <VertSpace size={50} />
          </ScrollView>
        )}
      </Container>
      {Memosuser.length == 0 ? null : (
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            position: 'absolute',
            bottom: 0,
            backgroundColor: AppColors.DarkBG,
            height: 50,
            paddingTop: 15,
            width: AppDimens.width,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setFilterMemos(Memosuser), setSelectId(-1);
            }}
          >
            <Text
              style={{
                color: selectId == -1 ? AppColors.white : '#666666',
                paddingRight: 10,
                fontSize: 16,
                fontWeight: '900',
              }}
            >
              All
            </Text>
          </TouchableOpacity>

          {MemoCategoryList.map((i, k) => {
            return (
              <TouchableOpacity
                key={k}
                onPress={() => {
                  FilterMemo(i.category_id);
                  setSelectId(k);
                }}
                style={{ paddingRight: 10 }}
              >
                <Text
                  style={{
                    color: k == selectId ? AppColors.white : '#666666',
                    paddingLeft: 10,
                    fontSize: 16,
                    fontWeight: '900',
                  }}
                >
                  {i.category_name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
