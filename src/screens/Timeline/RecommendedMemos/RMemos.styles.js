import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { FontSize, GStyles } from '../../../shared/Global.styles';
import { hp, wp } from 'shared/dimens';
import { AppColors } from 'assets/AppColors';
import { AppFonts } from 'assets/fonts/AppFonts';

export const styles = StyleSheet.create({
  footerContainer: {
    marginLeft: 40,
    width: wp(150),
    height: hp(300),
    backgroundColor: AppColors.white,
    ...GStyles.containView,

    borderRadius: 30,
    borderWidth: 1,
    borderColor: AppColors.LightGrey,
    marginBottom: 40,
    marginRight: 30,
  },
  footerDarkContainer: {
    marginLeft: 40,
    width: wp(160),
    height: Platform.OS === 'android' ? hp(285) : hp(260),
    backgroundColor: AppColors.DarkBG,
    ...GStyles.containView,

    borderRadius: 30,
    borderWidth: 1,
    borderColor: AppColors.whiteop01,
    marginBottom: 40,
    marginRight: 30,
  },
  footerLoadingTextStyle: {
    fontSize: FontSize.large,
    textAlign: 'center',
    fontFamily: AppFonts.InkFree,
    color: AppColors.disableColor,
  },
  RecomMemoLight: {
    width: wp(160),
    height: hp(285),
    backgroundColor: AppColors.white,
    justifyContent: 'space-between',
    borderRadius: wp(30),
    borderWidth: 1,
    borderColor: AppColors.white1,
  },
  RecomMemoDark: {
    width: wp(160),
    height: hp(285),
    justifyContent: 'space-around',
    borderRadius: wp(30),
    // padding: wp(20),
    // borderWidth: 1,
    marginHorizontal: 20,
    alignItems: 'center',
    paddingTop: hp(20),
    paddingBottom: hp(10),
  },
  RecomMemoTitleLight: {
    width: wp(120),
    fontSize: FontSize.large,
    fontFamily: AppFonts.CalibriBold,
    color: AppColors.DarkGrey1,
    textAlign: 'center',
  },
  RecomMemoTitleDark: {
    width: wp(120),
    fontSize: FontSize.large,
    fontFamily: AppFonts.CalibriBold,
    color: AppColors.white1,
    textAlign: 'center',
  },
  RecomMemoDescriptionDark: {
    fontSize: 15,
    color: AppColors.MediumGrey,
    fontFamily: AppFonts.CalibriRegular,
  },
  knowMoreLight: {
    borderWidth: 2,
    borderColor: AppColors.white,
    borderRadius: 23,
    // left: 8 * index,
    marginRight: -10,

    // left: -8 * index,
  },
  knowMoreDark: {
    borderWidth: 2,
    borderColor: AppColors.DarkBG,
    borderRadius: 23,
    // left: 8 * index,
    marginRight: -10,

    // left: -8 * index,
  },
  dashDark: { color: AppColors.white3 },
  dashLight: { color: AppColors.LowDark },
  totalExpLight: {
    // backgroundColor: 'wheat',
    color: AppColors.DarkGrey,
    fontSize: FontSize.large,
    marginLeft: 5,
    fontFamily: AppFonts.CalibriRegular,
  },
  totalExpDark: {
    // backgroundColor: 'wheat',
    color: AppColors.greyLight,
    fontSize: FontSize.large,
    marginLeft: 5,
    fontFamily: AppFonts.CalibriRegular,
  },
});
