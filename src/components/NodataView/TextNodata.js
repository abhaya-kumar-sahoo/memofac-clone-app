import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { GStyles } from 'shared/Global.styles';
import { AppFonts } from 'assets/fonts/AppFonts';
import { FontSize } from 'shared/Global.styles';
import { AppColors } from 'assets/AppColors';
export const TextNoDataView = ({ title = 'No data available' }) => {
  return (
    <View style={{ height: 200, ...GStyles.containView }}>
      <Text
        style={{
          textAlign: 'center',
          fontFamily: AppFonts.InkFree,
          fontSize: FontSize.xxlarge,
          color: AppColors.disableColor,
        }}
      >
        {title}
      </Text>
    </View>
  );
};
