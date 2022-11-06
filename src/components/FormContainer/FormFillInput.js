import React, { Fragment } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { useSelector } from 'react-redux';
import { AppColors } from '../../assets/AppColors';
import { AppFonts } from '../../assets/fonts/AppFonts';
import {
  AppDimens,
  FontSize,
  HoriSpace,
  Spacing,
} from '../../shared/Global.styles';
import { AvatarIcon, EditDarkIcon, EditIcon } from '../../shared/Icon.Comp';

export const FormFillInput = ({
  RightComponent = null,
  LeftComponent = null,
  onRightButtonPress = () => {},
  onChangeText = () => {},
  title = 'Set title',
  placeholder = 'placeholder',
  // OTHERS
  titleFontSize = FontSize.medium,
  textFieldSize = FontSize.large,
  autoFocus = false,
  multiline = false,
  editable = true,
  value = '',
  FontFamily = AppFonts.CalibriBold,
  placeholderTextColor = AppColors.white1,
}) => {
  return (
    <View style={FormStyles.mainContainer}>
      {/* LEFT COMPONENT */}
      {LeftComponent !== null && (
        <Fragment>
          <View style={FormStyles.leftMainComp}>
            {LeftComponent ? LeftComponent : <AvatarIcon />}
          </View>
          <HoriSpace size={Spacing.xxlarge} />
        </Fragment>
      )}

      {/* CENTER COMPONENT */}
      <View style={FormStyles.centerComp}>
        <Text
          style={[
            FormStyles.titleComp,
            {
              fontSize: titleFontSize,
              color: AppColors.disableColor,
            },
          ]}
        >
          {title}
        </Text>
        <View style={FormStyles.TextInputMainComp}>
          <TextInput
            value={value}
            editable={editable}
            autoFocus={autoFocus}
            multiline={multiline}
            style={[
              FormStyles.textInput,
              {
                fontSize: textFieldSize,
                lineHeight: textFieldSize,
                color: AppColors.white1,
                fontFamily: FontFamily,
                maxHeight: 180,
              },
            ]}
            onChangeText={value => onChangeText(value)}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
          />
        </View>
        {/* <Text style={{ fontSize:FontSize.large }}>{placeholder}</Text> */}
      </View>

      <Ripple
        rippleContainerBorderRadius={20}
        style={FormStyles.rightMainComp}
        onPress={() => onRightButtonPress()}
      >
        {RightComponent ? RightComponent : <EditDarkIcon size={20} />}
      </Ripple>
    </View>
  );
};

const FormStyles = StyleSheet.create({
  TextInputMainComp: {
    backgroundColor: AppColors.Transparent,
    width: AppDimens.width * 0.7,
  },
  textInput: {
    color: AppColors.DarkGrey,
    textAlignVertical: 'top',
    fontSize: FontSize.large,
  },
  titleComp: {
    fontSize: 16,
    color: AppColors.MediumGrey,
    fontFamily: AppFonts.CalibriRegular,
  },
  mainContainer: {
    // width: 300,
    flexDirection: 'row',
    backgroundColor: AppColors.Transparent,
  },
  centerComp: { flexGrow: 1, backgroundColor: AppColors.Transparent },
  leftMainComp: { width: 30, backgroundColor: AppColors.Transparent },
  rightMainComp: {
    backgroundColor: AppColors.Transparent,
    padding: 20,
  },
});
