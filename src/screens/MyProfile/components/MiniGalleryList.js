/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {ImageGridView} from 'screens/GalleryPicker/ImageGridView';
import {AppColors} from '../../../assets/AppColors';
import {AppFonts} from '../../../assets/fonts/AppFonts';
import {SeelAllButton} from '../../../components/SeeAllButton';
import {
  AppDimens,
  FontSize,
  GStyles,
  HoriSpace,
  Spacing,
  VertSpace,
} from '../../../shared/Global.styles';

export const MiniGalleryList = ({
  onPress = () => {},
  dataList = [],
  style = {marginLeft: -20, marginRight: -Spacing.large},
  SeeAllSwo = true,
  skeletonLoading = false,
}) => {
  const {navigate} = useNavigation();
  let newJson = dataList.map(rec => {
    return {
      url: rec,
    };
  });

  return (
    <View style={{marginLeft: 5}}>
      {dataList.length !== 0 && (
        <View style={[GStyles.flexRow, {justifyContent: 'space-between'}]}>
          <Text
            style={{
              color: AppColors.white1,
              fontSize: FontSize.inputText,
              fontFamily: AppFonts.CalibriBold,
            }}>
            Gallery
          </Text>
          {SeeAllSwo ? <SeelAllButton onPress={() => onPress()} /> : <Text />}
          {/* <SeelAllButton onPress={() => onPress()} /> */}
        </View>
      )}

      <VertSpace size={10} />
      <SkeletonContent
        containerStyle={{flexDirection: 'column'}}
        boneColor={AppColors.RecomBoneDark}
        highlightColor={AppColors.SkeletonBone}
        isLoading={skeletonLoading}
        layout={[
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            children: new Array(3).fill({
              width: AppDimens.width * 0.28,
              height: AppDimens.width * 0.28,
              borderRadius: 20,
            }),
          },
        ]}>
        <ScrollView
          style={style}
          horizontal
          showsHorizontalScrollIndicator={false}>
          <HoriSpace size={Spacing.large} />
          {dataList.map((item, index) => {
            return (
              <View
                style={{alignItems: 'center', marginRight: 8}}
                key={index.toString()}>
                <ImageGridView
                  onPress={() =>
                    navigate('ImageViewScreen', {
                      imagesList: newJson,
                      clickedImageIndex: index,
                    })
                  }
                  item={item}
                  size={AppDimens.width * 0.28}
                  imageUrl={item}
                  selectable={false}
                  requiredLoader={false}
                />
              </View>
            );
          })}
          {/* <HoriSpace size={Spacing.large} /> */}
        </ScrollView>
      </SkeletonContent>
    </View>
  );
};

export const HorizontalGalleryList = ({
  onPress = () => {},
  dataList = [],
  style = {marginLeft: -20, marginRight: -Spacing.large},
}) => {
  const {navigate} = useNavigation();
  let newJson = dataList.map(rec => {
    return {
      url: rec,
    };
  });

  return (
    <View style={{marginLeft: 5}}>
      <ScrollView
        style={style}
        horizontal
        showsHorizontalScrollIndicator={false}>
        <HoriSpace size={Spacing.large} />
        {dataList.map((item, index) => {
          return (
            <View
              style={{alignItems: 'center', marginRight: 8}}
              key={index.toString()}>
              <ImageGridView
                onPress={() =>
                  navigate('ImageViewScreen', {
                    imagesList: newJson,
                    clickedImageIndex: index,
                  })
                }
                item={item}
                size={AppDimens.width * 0.28}
                imageUrl={item}
                selectable={false}
                requiredLoader={false}
              />
            </View>
          );
        })}
        {/* <HoriSpace size={Spacing.large} /> */}
      </ScrollView>
    </View>
  );
};
