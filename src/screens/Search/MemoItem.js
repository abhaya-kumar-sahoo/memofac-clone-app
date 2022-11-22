/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {AppColors} from '../../assets/AppColors';
import {AppFonts} from '../../assets/fonts/AppFonts';
import {
  AppDimens,
  FontSize,
  GStyles,
  HoriSpace,
} from '../../shared/Global.styles';
import {DoneFillIcon} from '../../shared/Icon.Comp';

export const MemoView = ({item, index, onPress = () => {}}) => {
  return (
    <Pressable
      onPress={() => onPress()}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View style={{...GStyles.flexRow}}>
        <Image
          resizeMode={'contain'}
          resizeMethod={'resize'}
          style={{width: 50, height: 50}}
          source={{uri: item.image}}
        />
        <HoriSpace />
        <View style={{justifyContent: 'center'}}>
          <Text
            style={{
              fontSize: 22,
              color: AppColors.white2,
              fontFamily: AppFonts.CalibriBold,
              width: AppDimens.width * 0.57,
              // paddingTop: item.description == '' ? 10 : 0,
            }}
            numberOfLines={1}>
            {item.title}
          </Text>

          {item.description == '' || item.description == undefined ? (
            <Text
              style={{
                fontSize: 15,
                color: AppColors.disableColor,
                fontFamily: AppFonts.CalibriRegular,
                textAlign: 'left',
                paddingLeft: 2,
              }}>
              - - - -
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 15,
                color: AppColors.disableColor,
                fontFamily: AppFonts.CalibriRegular,
                textAlign: 'left',
              }}>
              {item.description}
            </Text>
          )}
        </View>
      </View>
      {/* <View style={{ width: wp(240), flexDirection: 'row' }}>
        <View style={{ width: 50, height: 50 }}>
          <FastImage
            style={{ width: 50, height: 50 }}
            resizeMethod={'resize'}
            resizeMode={'contain'}
            source={{ uri: item.image }}
          />
        </View>
        <HoriSpace size={20} />
        <View style={{}}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: FontSize.inputText,
              fontFamily: AppFonts.CalibriBold,
              color: AppColors.DarkGrey,
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              fontSize: FontSize.medium,
              fontFamily: AppFonts.CalibriBold,
              color: AppColors.LightGrey,
            }}
          >
            {item.description}
          </Text>
        </View>
      </View> */}

      <View style={{height: 40}}>
        {item.totalExp !== 0 && (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {item.reveiews === '' ? null : (
              <DoneFillIcon size={FontSize.shorter} />
            )}
            <HoriSpace size={2} />
            <Text
              style={{
                fontSize: FontSize.medium,
                fontFamily: AppFonts.CalibriBold,
                color: AppColors.white,
              }}>
              {item.totalExp}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

// const MemoViewStyles = StyleSheet({});
