import React from 'react';
import { useLayoutEffect } from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { AppColors } from '../assets/AppColors';
import { AppFonts } from '../assets/fonts/AppFonts';
import { FontSize, GStyles } from '../shared/Global.styles';

export function AppButton({
  loading,
  disabled,
  style,
  borderWidth,
  borderRadius,
  borderColor,
  width = '100%',
  height = 50,
  outlined = false,
  onPress = () => {},
  backgroundColor,
  titleFontSize = FontSize.medium,
  fontFamily = AppFonts.CalibriBold,
  titleColor = AppColors.DarkGrey,
  title = 'Click',
  children,
}) {
  const [isDisabled, setDisabled] = React.useState(false);

  return (
    <Ripple
      disabled={loading || disabled}
      style={{
        ...style,
        flexDirection: 'row',
        // paddingHorizontal: 10,
        // paddingVertical: 10,
        borderRadius: borderRadius ? borderRadius : 25,
        borderWidth: outlined ? (borderWidth ? borderWidth : 2) : 0,
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        // alignItems: 'center',
        borderColor: borderColor ? borderColor : AppColors.DarkGrey,
        backgroundColor:
          disabled || (loading && isDisabled)
            ? AppColors.DarkGrey
            : outlined
            ? '#00000000'
            : backgroundColor
            ? backgroundColor
            : 'white',
      }}
      onPress={() => {
        onPress(true);
        setDisabled(true);
      }}
    >
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        {loading && isDisabled ? (
          <ActivityIndicator
            color={
              outlined
                ? borderColor
                  ? borderColor
                  : AppColors.AccentOrange
                : AppColors.white
            }
            size="small"
          />
        ) : (
          <Text
            style={{
              fontSize: titleFontSize,
              fontFamily: fontFamily,
              color: titleColor,
            }}
          >
            {title}
          </Text>
        )}
        {children}
      </View>
    </Ripple>
  );
}

export function AppButtonFlex({
  onPress = () => {},
  defaultSelect = 3,
  titleFontSize = 20,
  paddingHorizontal = 22,
  paddingVertical = 10,
  data = [
    { name: 'Public', key: 3 },
    { name: 'Contacts', key: 1 },
    { name: 'None', key: 0 },
  ],
  selectedBackGroundColor = AppColors.white1,
  unSelectedBackgroundColor = AppColors.DarkGrey2,
  unSelectedTextColor = AppColors.MediumGrey,
  selectedTextColor = AppColors.DarkGrey2,
  spaceBetween = null,
  style,
}) {
  const [SelectButton, setSelectButton] = React.useState(defaultSelect);
  useLayoutEffect(() => {
    setSelectButton(defaultSelect);
  }, []);
  return (
    <View style={{ ...GStyles.flexRowSpaceBetween, ...style }}>
      {data.map((i, k) => {
        return (
          <Ripple
            key={k}
            style={[
              GStyles.flexRowCenter,
              {
                backgroundColor:
                  SelectButton === i.key
                    ? selectedBackGroundColor
                    : unSelectedBackgroundColor,
                borderRadius: 30,
                marginHorizontal: spaceBetween,
              },
            ]}
            onPress={() => {
              onPress(i.key), setSelectButton(i.key);
            }}
          >
            <View
              style={{
                ...GStyles.flexRowSpaceBetween,
                paddingHorizontal: paddingHorizontal,
                paddingVertical: paddingVertical,
              }}
            >
              <Text
                style={{
                  fontSize: titleFontSize,
                  fontFamily: AppFonts.CalibriBold,
                  color:
                    SelectButton === i.key
                      ? selectedTextColor
                      : unSelectedTextColor,
                }}
              >
                {i.name}
              </Text>
            </View>
          </Ripple>
        );
      })}
    </View>
  );
}
