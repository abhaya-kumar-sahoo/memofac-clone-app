import React, { Component } from 'react';
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import { useSelector } from 'react-redux';
import { AppColors } from '../../assets/AppColors';
import { AppFonts } from '../../assets/fonts/AppFonts';
import { FontSize, HoriSpace, Spacing } from '../../shared/Global.styles';
import { AvatarIcon, EditIcon } from '../../shared/Icon.Comp';

export const NextButton = ({
  onPress = () => {},
  disabled = true,
  title = 'Next',
}) => {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 10,
        paddingHorizontal: 10,
        right: -10,
      }}
      disabled={disabled}
      onPress={() => {
        if (disabled) {
        } else onPress();
      }}
    >
      <Text
        style={{
          fontFamily: AppFonts.CalibriBold,
          color: disabled ? AppColors.LightGrey : AppColors.DarkGrey,

          fontSize: FontSize.xlarge,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export const AccentButton = ({
  onPress = () => {},
  title = 'Post',
  style = {},
  disabled = false,
  textStyle = {},
}) => {
  return (
    <Ripple
      disabled={disabled}
      onPress={() => onPress()}
      style={{
        backgroundColor: disabled ? AppColors.disablePink : AppColors.Red,
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 30,
        ...style,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Text
        style={{
          fontSize: FontSize.large,
          fontFamily: AppFonts.CalibriBold,
          color: AppColors.white,
          ...textStyle,
        }}
      >
        {title}
      </Text>
    </Ripple>
  );
};

export const Container = ({
  padding = Spacing.large,
  children,
  style = {},
}) => {
  return (
    <View style={{ ...style, paddingHorizontal: padding }}>{children}</View>
  );
};
