import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { useSelector } from 'react-redux';
import { hp } from 'shared/dimens';
import { AppColors } from '../assets/AppColors';
import { AppFonts } from '../assets/fonts/AppFonts';
import { FontSize, HoriSpace } from '../shared/Global.styles';
import { DoneFillIcon } from '../shared/Icon.Comp';

const chipButtonStyles = StyleSheet.create({
  rippleContainer: {
    backgroundColor: AppColors.Transparent,
    flexDirection: 'row',
  },
  MainContainer: {
    borderColor: AppColors.MediumGrey,
    // borderWidth: 1.5,
    // borderRadius: 50,
    height: hp(60),
    paddingHorizontal: 5,
    // paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: AppColors.Transparent,
    flexDirection: 'row',
  },
  TextStyles: {
    height: Platform.OS === 'android' ? hp(32) : hp(24),
    textAlignVertical: 'center',
    fontSize: 22,
    color: AppColors.DarkGrey,
    fontFamily: AppFonts.CalibriBold,
    marginTop: Platform.OS === 'android' ? 0 : 8,
  },
  TextStylesDark: {
    height: Platform.OS === 'android' ? hp(32) : hp(24),
    textAlignVertical: 'center',
    fontSize: 22,
    color: AppColors.white1,
    fontFamily: AppFonts.CalibriBold,
    marginTop: Platform.OS === 'android' ? 0 : 8,
  },
});

export const ChipButton = ({
  onPress = () => {},
  RightComponent = () => <DoneFillIcon size={FontSize.large} />,
  title = 'Click Me',
  description = '',
}) => {
  return (
    <Ripple onPress={() => onPress()} style={chipButtonStyles.rippleContainer}>
      <View style={chipButtonStyles.MainContainer}>
        <RightComponent />
        <HoriSpace size={10} />
        <View>
          <Text style={chipButtonStyles.TextStylesDark}>{title}</Text>
          {description != '' && (
            <Text style={{ color: AppColors.MediumGrey, fontSize: 15 }}>
              {description}
            </Text>
          )}
        </View>

        <HoriSpace size={20} />
      </View>
    </Ripple>
  );
};
