import React, { Component } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { AppColors } from '../assets/AppColors';
import { AppFonts } from '../assets/fonts/AppFonts';
import LinearGradient from 'react-native-linear-gradient';
export const FontSize = {
  shorter: 10,
  short: 13,
  medium: 15,
  large: 18,
  xlarge: 20,
  inputText: 22,
  xxlarge: 25,
  x3large: 30,
  x4large: 35,
  x45Large: 45,
  x6Large: 60,
};

export const Spacing = {
  short: 8,
  medium: 10,
  large: 16,
  xlarge: 20,
  xxlarge: 32,
  size40: 40,
};

export const HoriSpace = ({ size = Spacing.large }) => {
  return <View style={{ width: size }} />;
};

export const WhiteFadeView = ({ reverse, style, children }) => {
  return (
    <LinearGradient
      colors={
        reverse === true
          ? [AppColors.white, AppColors.white, AppColors.whiteop00]
          : [AppColors.whiteop00, AppColors.white, AppColors.white]
      }
      style={style ? { ...style } : { flex: 1 }}
    >
      {children}
    </LinearGradient>
  );
};

export const VertSpace = ({ size = Spacing.large }) => {
  return <View style={{ height: size }} />;
};

export const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window',
);

export const AppDimens = {
  width: Dimensions.get('screen').width,
  height: Dimensions.get('screen').height,
};

export const GStyles = StyleSheet.create({
  While: {
    backgroundColor: AppColors.white,
    flex: 1,
    marginTop: 35,
  },
  Dark: {
    backgroundColor: AppColors.DarkBG,
    flex: 1,
  },
  headerStyles: {
    fontFamily: AppFonts.CalibriBold,
    fontSize: FontSize.large,
    color: AppColors.MediumGrey,
  },
  flexRowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerStyles_1: {
    fontFamily: AppFonts.CalibriBold,
    fontSize: FontSize.x3large,
    color: AppColors.DarkGrey,
  },
  buttonStyle1: {
    fontFamily: AppFonts.CalibriBold,
    fontSize: FontSize.xlarge,
    color: AppColors.MediumGrey,
  },
  flexRow: {
    flexDirection: 'row',
  },
  containView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  // MODAL STYELS
  ModalContainer: {
    backgroundColor: AppColors.white,
    borderRadius: 30,
    paddingBottom: 30,
  },
  flexColumn: { flexDirection: 'column' },

  wallpaperBackground: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: 'white',
  },
  containerFlex: {
    flex: 1,
  },

  paddH32: {
    paddingHorizontal: 32,
  },
  paddH16: {
    paddingHorizontal: 16,
  },
  paddH8: {
    paddingHorizontal: 8,
  },
  paddH4: {
    paddingHorizontal: 4,
  },

  selectedRb: {
    width: 7,
    height: 7,
    borderRadius: 50,
    backgroundColor: AppColors.MediumGrey,
  },
  radioText: {
    marginLeft: 10,
    fontSize: 15,
    color: AppColors.MediumGrey,
  },

  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: AppColors.MediumGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radiocontainer: {
    // marginBottom: 35,
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 30,
  },
});
