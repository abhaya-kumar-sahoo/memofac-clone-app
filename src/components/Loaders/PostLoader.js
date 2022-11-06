import React, { Component } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { FontSize, GStyles, HoriSpace } from '../../shared/Global.styles';
import { AppColors } from '../../assets/AppColors';
import { AppFonts } from '../../assets/fonts/AppFonts';
import { ActivityIndicator } from 'react-native-paper';

export const PostLoader = ({ message = 'Loading posts', when = false }) => {
  if (when)
    return (
      <View
        style={{
          // backgroundColor: AppColors.white,
          marginHorizontal: -50,
          padding: 50,
          ...GStyles.containView,
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <ActivityIndicator color={AppColors.DarkGrey} />
          <HoriSpace />
          <Text
            style={{
              fontSize: FontSize.large,
              fontFamily: AppFonts.CalibriBold,
              color: AppColors.DarkGrey,
            }}
          >
            {message}
          </Text>
        </View>
      </View>
    );
  else return null;
};
