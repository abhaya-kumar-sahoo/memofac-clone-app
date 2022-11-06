import React from 'react';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { AppColors } from 'assets/AppColors';
import { AppDimens, GStyles } from 'shared/Global.styles';
import { hp, wp } from 'shared/dimens';
import { useSelector } from 'react-redux';

export const SkeletonRecommendedMemos = ({ loading }) => {
  return (
    <SkeletonContent
      duration={2000}
      animationType={'shiver'}
      containerStyle={{}}
      highlightColor={AppColors.SkeletonBone}
      boneColor={AppColors.RecomBoneDark}
      isLoading={loading}
      layout={[
        {
          flexDirection: 'row',
          children: [
            {
              marginLeft: -AppDimens.width * 0.2,
              key: 'someId1',
              width: AppDimens.width * 0.4,
              // height: 300,
              height: hp(300),
              borderRadius: 30,

              marginHorizontal: 20,
              // marginBottom: 20,
            },
            {
              key: 'someId2',
              width: AppDimens.width * 0.4,
              borderRadius: 30,
              height: hp(300),

              marginHorizontal: 20,
              // marginBottom: 20,
            },
            {
              key: 'someId3',
              width: AppDimens.width * 0.4,
              borderRadius: 30,
              height: hp(300),

              marginHorizontal: 20,
              // marginBottom: 20,
            },
          ],
        },
      ]}
    ></SkeletonContent>
  );
};

export const SeeAllSkeleton = ({ loading }) => {
  return (
    <SkeletonContent
      duration={2000}
      animationType={'shiver'}
      containerStyle={{}}
      boneColor={AppColors.RecomBoneDark}
      highlightColor={AppColors.SkeletonBone}
      isLoading={loading}
      layout={[
        {
          width: AppDimens.width * 1,

          ...GStyles.flexRowCenter,
          children: [
            {
              height: 1,
              width: AppDimens.width * 0.85,
            },
            {
              width: 57,
              height: 24,
              flexDirection: 'row',
              borderRadius: 30,
              ...GStyles.containView,
              position: 'absolute',
              right: 40,
            },
          ],
        },
      ]}
    ></SkeletonContent>
  );
};
