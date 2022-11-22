/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Text, View} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {hp, wp} from 'shared/dimens';
import {AppColors} from '../../assets/AppColors';
import {AppFonts} from '../../assets/fonts/AppFonts';
import {FontSize, GStyles, HoriSpace} from '../../shared/Global.styles';
import {BronzeIcon, GoldIcon, SilverIcon} from '../../shared/Icon.Comp';

export const MiniRating = ({
  rateNumber = 0,
  color = AppColors.MediumGrey,
  fontFamily = AppFonts.CalibriRegular,
  RATESIZE = 13,
}) => {
  const rating = parseFloat(rateNumber.toString()).toFixed(0);
  return (
    <>
      {rating != '0' && rating != '-1' && rating != null && (
        <View style={[GStyles.flexRow, GStyles.containView]}>
          {rateNumber < 4.0 ? (
            <BronzeIcon size={RATESIZE} />
          ) : rateNumber >= 4.0 && rateNumber < 8 ? (
            <SilverIcon size={RATESIZE} />
          ) : (
            <GoldIcon size={RATESIZE} />
          )}

          <HoriSpace size={5} />
          <Text
            style={{
              fontSize: RATESIZE,
              fontFamily: fontFamily,
              color: color,
              marginTop: 2.5,
            }}>
            {rating % 1 == 0 ? parseInt(rating) : rating}
          </Text>
        </View>
      )}
    </>
  );
};

export const StarComp = ({rateNumber = 6, size = 16}) => {
  return (
    <View>
      {rateNumber >= 8 ? (
        <GoldIcon size={size} />
      ) : rateNumber >= 4 ? (
        <BronzeIcon size={size} />
      ) : (
        <SilverIcon size={size} />
      )}
    </View>
  );
};

export const MemoChip = ({
  size = 23,
  item = {title: '', image: null},
  fieldName = 'rating',
  ratingVisible = true,
  memo_id = null,
}) => {
  const navigation = useNavigation();
  // console.log('RATE', item);

  const memoId = memo_id !== null ? memo_id : item.id;

  return (
    <Ripple
      onPress={() => navigation.navigate('ViewMemo', {memoId})}
      style={{
        // backgroundColor: AppColors.LightGrey,
        flexDirection: 'row',
      }}>
      <View
        style={{
          borderColor: AppColors.MediumGrey,
          // borderWidth: 1.5,
          borderRadius: 10,
          paddingRight: 10,
          height: hp(35),
          paddingLeft: 7,
          paddingVertical: 3,
          alignItems: 'center',
          // backgroundColor: AppColors.white3,
          backgroundColor: '#1D1D1D',

          flexDirection: 'row',
        }}>
        <Image
          resizeMode={'contain'}
          resizeMethod={'resize'}
          style={{width: size, height: size}}
          source={{uri: item.image}}
        />
        <HoriSpace size={10} />
        <Text
          numberOfLines={1}
          style={{
            // height: hp(32),
            maxWidth: wp(220),
            textAlignVertical: 'center',
            fontSize: FontSize.large,
            //color: AppColors.LowWhite,
            color: AppColors.disableColor,
            // backgroundColor: 'wheat',
            fontFamily: AppFonts.CalibriRegular,
          }}>
          {item.title}
        </Text>
        <HoriSpace size={20} />

        {ratingVisible && (
          <>
            {item[fieldName] != 0 && (
              <MiniRating
                RATESIZE={FontSize.large}
                // color={AppColors.LowWhite}
                color={AppColors.disableColor}
                rateNumber={item[fieldName]}
              />
            )}
          </>
        )}
      </View>
    </Ripple>
  );
};

export const MemoChipSection = ({
  size = 23,
  item = {title: '', image: null},
  fieldName = 'rating',
  ratingVisible = true,
  memo_id = null,
}) => {
  const navigation = useNavigation();
  console.log('RATE', item);

  const memoId = memo_id !== null ? memo_id : item.id;

  return (
    <Ripple
      onPress={() => navigation.navigate('ViewMemo', {memoId})}
      style={{
        // backgroundColor: AppColors.LightGrey,
        flexDirection: 'row',
      }}>
      <View
        style={{
          borderColor: AppColors.MediumGrey,
          // borderWidth: 1.5,
          borderRadius: 10,
          paddingRight: 10,
          height: hp(35),
          paddingLeft: 7,
          paddingVertical: 3,
          alignItems: 'center',
          backgroundColor: AppColors.white3,
          flexDirection: 'row',
        }}>
        <Image
          resizeMode={'contain'}
          resizeMethod={'resize'}
          style={{width: size, height: size}}
          source={{uri: item.image}}
        />
        <HoriSpace size={10} />
        <Text
          numberOfLines={1}
          style={{
            height: hp(32),
            maxWidth: wp(220),
            textAlignVertical: 'center',
            fontSize: FontSize.large,
            color: AppColors.LowWhite,
            // backgroundColor: 'wheat',
            fontFamily: AppFonts.CalibriRegular,
          }}>
          {item.title}
        </Text>
        <HoriSpace size={20} />

        {ratingVisible && (
          <>
            {item[fieldName] != 0 && (
              <MiniRating rateNumber={item[fieldName]} />
            )}
          </>
        )}
      </View>
    </Ripple>
  );
};
