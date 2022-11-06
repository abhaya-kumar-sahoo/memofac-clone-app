import React from 'react';
import { Text, View, Pressable, ActivityIndicator } from 'react-native';
import { AppColors } from '../assets/AppColors';
import { AppFonts } from '../assets/fonts/AppFonts';

export function ToastLoader({
  style = {},
  zIndex,
  bottom = true,
  heading = 'Loading',
  width = 200,
  elevation = 0,
}) {
  return (
    <View
      style={[
        {
          ...style,
          zIndex: zIndex ? zIndex : 0,
          flexDirection: 'row',
          backgroundColor: AppColors.white,
          paddingHorizontal: 10,
          paddingVertical: 8,
          borderRadius: 30,
          width: width,
          height: 45,
          alignItems: 'center',
          elevation: elevation,
          justifyContent: 'center',
        },
        bottom
          ? {
              position: 'absolute',
              bottom: 22,
            }
          : null,
      ]}
    >
      <Text
        style={{
          fontFamily: AppFonts.CalibriBold,
          fontSize: 15,
          color: AppColors.DarkGrey,
        }}
      >
        {heading}
      </Text>
      <View style={{ width: 20 }} />
      <ActivityIndicator size={20} color={AppColors.DarkGrey} />
    </View>
  );
}
