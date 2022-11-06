import { AppColors } from 'assets/AppColors';
import { AppFonts } from 'assets/fonts/AppFonts';
import React from 'react';
import { StyleSheet, View, Text, TextInput, Keyboard } from 'react-native';

import { FontSize } from 'shared/Global.styles';

export const InputText = ({
  Icon = null,
  RightComponent = null,
  value = '',
  onChangeText = () => {},
  title = '',
  inputPlaceHolder = 'Enter here',
  autoFocus = false,
  multiline = false,
  editable = true,
  titleFontSize = FontSize.medium,
  textFieldSize = FontSize.large,
  placeholderTextColor = AppColors.LightGrey,
  marginLeft = null,
  textLineHeight = 18,
  color = AppColors.DarkGrey,
}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
      }}
    >
      <View
        style={{
          marginTop: 5,
        }}
      >
        {/* Left Icon placement: no actions on it */}
        <View style={{ paddingRight: 15 }}>{Icon}</View>
      </View>
      <View
        style={{
          flex: 1,
          flexBasis: 1,
          flexGrow: 1,
        }}
      >
        <Text style={[styles.titleComp, { fontSize: titleFontSize }]}>
          {title}
        </Text>
        <TextInput
          value={value}
          editable={editable}
          autoFocus={autoFocus}
          multiline={multiline}
          style={[
            styles.textInput,
            {
              color: color,
              marginTop: -5,
              fontSize: textFieldSize,
              lineHeight: textLineHeight,
              marginLeft: marginLeft,
            },
          ]}
          onChangeText={value => onChangeText(value)}
          placeholder={inputPlaceHolder}
          placeholderTextColor={placeholderTextColor}
        />
      </View>
      <View
        style={
          {
            // backgroundColor: 'pink',
          }
        }
      >
        <View>{RightComponent}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  TextInputMainComp: {
    backgroundColor: AppColors.Transparent,
  },
  titleComp: {
    fontSize: 16,
    color: AppColors.MediumGrey,
    fontFamily: AppFonts.CalibriBold,
  },
  textInput: {
    textAlignVertical: 'top',
    fontSize: FontSize.large,
    fontFamily: AppFonts.CalibriRegular,
  },
});
