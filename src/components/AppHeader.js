import { useNavigation } from '@react-navigation/native';
import React, { createRef } from 'react';
import { Platform, Pressable, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AppColors } from '../assets/AppColors';
import { AppFonts } from '../assets/fonts/AppFonts';

import {
  AppDimens,
  FontSize,
  GStyles,
  HoriSpace,
  Spacing,
} from '../shared/Global.styles';
import {
  AddCirecleIcon,
  BackArrowIcon,
  DownArrowIcon,
  MemofacIcon,
  CancelIcon,
} from 'shared/Icon.Comp';
import Ripple from 'react-native-material-ripple';
import { HorizontalLine } from 'screens/Timeline/components/PostView/Postview.comp';

export const AppHeader = ({
  padding = Spacing.large,

  backgroundColor = AppColors.Transparent,
  enableBack = false,
  onBackPress = () => {},
  preventDefault = false,

  children,
}) => {
  const nav = useNavigation();

  return (
    <View
      style={[
        GStyles.flexRow,
        {
          paddingRight: padding,
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 100,
          // position: 'absolute',
          // elevation: 10,
          height: Platform.OS === 'android' ? 60 : 60,
          backgroundColor: backgroundColor,
        },
      ]}
    >
      {enableBack ? (
        <Ripple
          onPress={() => {
            if (preventDefault == false) nav.goBack();
            onBackPress();
          }}
          style={{ padding: padding }}
        >
          {/* <BackArrow width={20} height={20} /> */}
          <BackArrowIcon color={AppColors.white} size={25} />
        </Ripple>
      ) : (
        <View />
      )}

      <View style={{ paddingHorizontal: 0 }}>{children}</View>
    </View>
  );
};

export const ModalHeader = ({
  disabled = true,
  backgroundColor = AppColors.Transparent,
  enableBack = false,
  onBackPress = () => {},
  children,
}) => {
  return (
    <View
      style={[
        GStyles.flexRow,
        {
          paddingRight: Spacing.large,
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 100,
          // elevation: 10,
          height: Platform.OS === 'android' ? 60 : 60,
          backgroundColor: backgroundColor,
        },
      ]}
    >
      {enableBack ? (
        <Ripple
          onPress={() => onBackPress()}
          style={{ padding: Spacing.large }}
        >
          <BackArrowIcon color="white" size={25} />

          {/* <BackArrow width={25} height={25} /> */}
        </Ripple>
      ) : null}
      <View style={{ paddingHorizontal: 0 }}>{children}</View>
    </View>
  );
};

export const SearchHeader = ({
  disabled = true,
  searchValue = '',
  backgroundColor = AppColors.Transparent,
  enableBack = false,
  paddingRight = Spacing.large,
  maxWidth = AppDimens.width * 0.7,
  children,
  onChangeText = () => {},
  onSearchClear = () => {},
}) => {
  const nav = useNavigation();
  const [searchText, setsearchText] = React.useState(searchValue);

  const inputRef = createRef();

  return (
    <View
      style={[
        GStyles.flexRow,
        {
          paddingRight: paddingRight,
          alignItems: 'center',
          // justifyContent: 'space-between',
          zIndex: 100,
          // elevation: 10,
          height: Platform.OS === 'android' ? 60 : 60,
          backgroundColor: backgroundColor,
        },
      ]}
    >
      {enableBack ? (
        <Pressable
          onPress={() => nav.goBack()}
          style={{ padding: Spacing.large }}
        >
          {/* <BackArrow width={20} height={20} /> */}
          <BackArrowIcon color={AppColors.white} size={25} />
        </Pressable>
      ) : null}
      <View
        style={{
          // backgroundColor: 'wheat',
          flexGrow: 1,
          maxWidth: maxWidth,
        }}
      >
        <TextInput
          minLength={0}
          inputRef={inputRef}
          // onChangeText={setValue}
          delayTimeout={300}
          value={searchText}
          placeholder={'Search here'}
          onChangeText={value => {
            onChangeText(value);
            setsearchText(value);
          }}
          // underlineColorAndroid={AppColors.LightGrey}
          // underlineColor={AppColors.LightGrey}
          placeholderTextColor={AppColors.MediumGrey}
          style={{
            width: AppDimens.width * 0.8,
            fontSize: FontSize.inputText,
            color: AppColors.MediumGrey,
            fontFamily: AppFonts.CalibriRegular,
            backgroundColor: AppColors.Transparent,
            height: 60,
          }}
        />
        <View style={{ paddingLeft: 35, marginTop: -10 }}>
          <HorizontalLine
            color={AppColors.LightGrey}
            VerticalSpace={0}
            width={AppDimens.width * 0.78}
          />
        </View>
      </View>

      {/* Cancel button enables when text has some inputu */}
      {searchText.length > 0 && (
        <Ripple
          onPress={() => {
            onSearchClear();
            setsearchText('');
          }}
          style={{
            width: FontSize.xlarge,
            height: FontSize.xlarge,
            marginLeft: Spacing.large,
          }}
        >
          <CancelIcon color={AppColors.white2} size={FontSize.xlarge} />
        </Ripple>
      )}
    </View>
  );
};

export const HeadingBar = ({
  title = 'Heading',
  description = '',
  paddingHorizontal = Spacing.large,
  RightComponent = () => null,
  titleFontSize = FontSize.x3large,
  TitleColor = AppColors.DarkGrey,
}) => {
  return (
    <View
      style={{
        backgroundColor: AppColors.Transparent,
        paddingHorizontal: paddingHorizontal,
        // paddingVertical: Spacing.large,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View>
        <Text
          style={{
            color: TitleColor,
            fontSize: titleFontSize,
            fontFamily: AppFonts.CalibriBold,
          }}
        >
          {title}
        </Text>
        {description.length > 0 && (
          <Text
            style={{
              color: AppColors.MediumGrey,
              fontSize: FontSize.medium,
              fontFamily: AppFonts.CalibriRegular,
            }}
          >
            {description}
          </Text>
        )}
      </View>

      <View>
        <RightComponent />
      </View>
    </View>
  );
};

export const DropdownHeader = ({
  title = 'Header',
  RightContainer = () => null,
  onHeaderPress = () => {},
  fontStyles = null,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: AppColors.green,
      }}
    >
      <Ripple
        onPress={() => onHeaderPress()}
        rippleContainerBorderRadius={20}
        rippleFades={true}
        style={{
          width: AppDimens.width * 0.6,
          flexDirection: 'row',
          alignItems: 'center',
          paddingRight: 10,
          // backgroundColor: AppColors.Red,
        }}
      >
        <Text
          ellipsizeMode={'tail'}
          numberOfLines={1}
          style={
            fontStyles !== null
              ? fontStyles
              : {
                  fontSize: FontSize.x4large,
                  color: AppColors.DarkGrey,
                  fontFamily: AppFonts.CalibriBold,
                }
          }
        >
          {title}
        </Text>
        <HoriSpace size={Spacing.large} />
        <DownArrowIcon size={13} />
      </Ripple>
      <RightContainer />
    </View>
  );
};

export const MemofacHeader = ({
  backgroundColor = AppColors.white,
  onSmileIconClick = () => {},
  onAddIconClick = () => {},
}) => {
  return (
    <View
      style={[
        GStyles.flexRow,
        {
          paddingHorizontal: Spacing.large,
          paddingBottom: 7,
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 10,
          borderBottomColor: AppColors.LightGrey,
          borderBottomWidth: 1,
          height: Platform.OS === 'android' ? 60 : 60,
          backgroundColor: backgroundColor,
        },
      ]}
    >
      {/* MEMODAAFAC LOGO */}
      <MemofacIcon size={AppDimens.width * 0.45} />

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* PLUS */}
        <TouchableOpacity
          style={{
            backgroundColor: AppColors.Transparent,
            height: 60,
            justifyContent: 'center',
          }}
          onPress={() => onAddIconClick()}
        >
          <AddCirecleIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const isIOS = Platform.OS === 'android' ? false : true;
// {/* FREINDS MOOD */}
// <TouchableOpacity onPress={() => onSmileIconClick()} style={{ flexDirection: 'row', backgroundColor: AppColors.Transparent, height: 60, alignItems: 'center' }}>
// {/* <HoriSpace size={20} /> */}
// {/* <View style={{ backgroundColor: AppColors.Red, borderRadius: 20, position: 'absolute', left: 10, top: 10, zIndex: 20, height: 20, width: 20, ...GStyles.containView }}>
//     <Text style={{ color: AppColors.white, fontFamily: AppFonts.CalibriBold }}>3</Text>
// </View> */}
// {/* <SmileOutlineIcon size={30} /> */}
// <RecentIcon size={30} />
// </TouchableOpacity>
