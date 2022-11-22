/* eslint-disable react-native/no-inline-styles */
import {AppColors} from 'assets/AppColors';
import {AppFonts} from 'assets/fonts/AppFonts';
import ImgSrc from 'assets/images/ImageIndex';
import React from 'react';
import {Text, View, Image} from 'react-native';
import {FontSize} from 'shared/Global.styles';

export const PermissionContent = ({style = {}}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: AppColors.LightDark1,
        padding: 20,
        borderRadius: 15,
      }}>
      <View
        style={{
          ...style,
          marginTop: 20,
        }}>
        <Image
          resizeMode="contain"
          resizeMethod="resize"
          style={{height: 50, width: 150}}
          source={ImgSrc.contactSamplesHeader}
        />
      </View>
      <View
        style={{
          width: 50,
          height: 1,
          backgroundColor: AppColors.DarkBG,
          marginVertical: 30,
        }}
      />
      <Text
        style={{
          width: 200,
          lineHeight: FontSize.xlarge,
          fontSize: FontSize.large,
          color: AppColors.white1,
          fontFamily: AppFonts.CalibriRegular,
        }}>
        Memofac would like to access your contacts to let you see what your
        friends have experienced and rated it.
      </Text>
    </View>
  );
};
