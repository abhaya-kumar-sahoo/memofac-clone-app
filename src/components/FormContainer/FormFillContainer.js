import { AppButton } from 'components/AppButton';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { AppColors } from '../../assets/AppColors';
import { AppFonts } from '../../assets/fonts/AppFonts';
import {
  AppDimens,
  FontSize,
  GStyles,
  HoriSpace,
  Spacing,
  VertSpace,
} from '../../shared/Global.styles';
import { AvatarIcon, EditIcon, WhiteEditIcon } from '../../shared/Icon.Comp';

// INPUT COMPONENT BUT WITH REACT VIEW  -> NOT TEXT INPUT
export const FormFillContainer = ({
  RightComponent = () => null,
  showRightIcon = true,
  RightIcon = null,
  LeftComponent = null,
  iconStyles = {},
  onRightButtonPress = () => {},
  title = 'Set title',
  placeholder = '',
  children,
  onPress = () => {},
}) => {
  let item = 3;
  return (
    <View
      style={{
        ...GStyles.flexRowSpaceBetween,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        {/* <View style={{ marginTop: 5 }}>
          {LeftComponent ? LeftComponent : <AvatarIcon />}
        </View> */}

        {/* <HoriSpace size={Spacing.large} /> */}
        <View>
          <Text
            style={{
              fontSize: 18,
              color: AppColors.LowWhite,
              fontFamily: AppFonts.CalibriRegular,
            }}
          >
            {title}
          </Text>
          <VertSpace />
          <View style={{ ...GStyles.flexRowCenter }}>
            <AppButton
              backgroundColor={AppColors.DarkGrey}
              title="Public"
              titleColor={AppColors.white}
              width={75}
              height={30}
              titleFontSize={15}
              onPress={onPress(3)}
            />
            <HoriSpace size={10} />
            <AppButton
              backgroundColor={AppColors.disableColor}
              title="Contacts"
              titleColor={AppColors.white}
              width={85}
              height={30}
              titleFontSize={15}
              onPress={onPress(1)}
            />
            <HoriSpace size={10} />

            <AppButton
              backgroundColor={AppColors.disableColor}
              title="None"
              titleColor={AppColors.white}
              width={70}
              height={30}
              titleFontSize={15}
              onPress={onPress(2)}
            />
          </View>

          {/* <Text
            numberOfLines={2}
            style={{
              width: AppDimens.width * 0.6,
              fontSize: FontSize.large,
              color: AppColors.LowWhite,
              fontFamily: AppFonts.CalibriBold,
            }}
          >
            {placeholder}
          </Text> */}
        </View>
      </View>

      {/* <RightComponent />

      {showRightIcon && (
        <Ripple
          rippleContainerBorderRadius={20}
          style={{
            backgroundColor: AppColors.Transparent,
            padding: 20,
            ...iconStyles,
          }}
          onPress={() => onRightButtonPress()}
        >
          {RightIcon ? RightIcon : <WhiteEditIcon size={20} />}
        </Ripple>
      )} */}
    </View>
  );
};
