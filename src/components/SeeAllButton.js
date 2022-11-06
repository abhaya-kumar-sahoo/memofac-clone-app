import React, { Component } from 'react';
import { Alert, Text } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { AppColors } from '../assets/AppColors';
import { AppFonts } from '../assets/fonts/AppFonts';
import { FontSize, GStyles, Spacing } from '../shared/Global.styles';

export function SeelAllButton({ onPress = () => {} }) {
  return (
    <Ripple
      onPress={() => onPress()}
      style={{
        // backgroundColor: AppColors.VeryLightGrey,
        // paddingHorizontal: 12,
        // paddingVertical: 3,
        width: 57,
        height: 24,
        borderColor: AppColors.DarkGrey,
        borderWidth: 1,
        flexDirection: 'row',
        borderRadius: 30,
        ...GStyles.containView,
      }}
    >
      <Text
        style={{
          fontSize: 12,
          lineHeight: 12,
          color: AppColors.DarkGrey,
          fontFamily: AppFonts.CalibriBold,
        }}
      >
        See all
      </Text>
    </Ripple>
  );
}
