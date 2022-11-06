import React, { createRef, useState } from 'react';
import {
  Pressable,
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import { Divider } from 'react-native-paper';
import { wp } from 'shared/dimens';
import { AppColors } from '../assets/AppColors';
import { AppFonts } from '../assets/fonts/AppFonts';
import Navicon from 'assets/images/Navicon.png';
import DelayInput from 'react-native-debounce-input';

import {
  FontSize,
  GStyles,
  HoriSpace,
  Spacing,
  AppDimens,
} from '../shared/Global.styles';
import {
  AddDarkIcon,
  CancelIcon,
  SearchNavIcon,
  SearchNavLineIcon,
} from '../shared/Icon.Comp';
import { useSelector } from 'react-redux';

export const SearchView = ({ onPress = () => {} }) => {
  return (
    <Pressable onPress={onPress} style={Styles.SearchDark}>
      {/* <SearchNavLineIcon
        size={FontSize.xlarge}
        color={AppColors.VeryLightGrey}
      /> */}
      <Image
        resizeMode="contain"
        source={Navicon}
        width="100%"
        height="100%"
        style={{ width: 18, height: 18 }}
      />
      <HoriSpace size={Spacing.medium} />
      <Text style={Styles.SearchDarkText}>Search Hotels, Apps, Movies etc</Text>
      {/* <Divider style={{ backgroundColor:AppColors.LightGrey, height:2}}/> */}
    </Pressable>
  );
};

export const AddMemoText = ({ onPress = () => {} }) => {
  return (
    <Pressable onPress={onPress} style={Styles.SearchDark}>
      <AddDarkIcon color={AppColors.Red} size={25} />
      <HoriSpace size={Spacing.medium} />
      <Text style={Styles.SearchDarkText}>Add hotels, cafes, movies etc</Text>
    </Pressable>
  );
};

export const SearchInput = ({
  placeholder = 'Search here',
  value = '',
  editable = true,
  autoFocus = true,
  onChangeText = () => {},
  onSearchClear = () => {},
}) => {
  const [searchText, setsearchText] = useState('');

  const inputRef = createRef();
  return (
    <View
      style={{
        borderRadius: 40,
        borderColor: AppColors.LightGrey,
        borderWidth: 1,
        paddingHorizontal: Spacing.large,
        ...GStyles.flexRowSpaceBetween,
      }}
    >
      <SearchNavIcon size={FontSize.xlarge} color={AppColors.LightGrey} />
      <HoriSpace size={Spacing.medium} />

      <TextInput
        minLength={0}
        inputRef={inputRef}
        delayTimeout={300}
        autoFocus={autoFocus}
        editable={editable}
        value={searchText}
        placeholderTextColor={AppColors.MediumGrey}
        onChangeText={value => {
          onChangeText(value);
          setsearchText(value);
        }}
        style={{
          flexGrow: 1,
          height: 45,
          marginRight: -Spacing.large,
          fontFamily: AppFonts.CalibriBold,
          fontSize: FontSize.xlarge,
          color: AppColors.MediumGrey,
        }}
        placeholder={placeholder}
      />
      {value.length > 0 ? (
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
          <CancelIcon color={AppColors.white} size={FontSize.xlarge} />
        </Ripple>
      ) : null}
    </View>
  );
};

export const SearchBarView = ({ onPress = () => {} }) => {
  return (
    <Ripple
      onPress={() => onPress()}
      style={{
        flexDirection: 'row',
        borderRadius: 40,
        borderColor: AppColors.LightGrey,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: Spacing.large,
        paddingVertical: Spacing.medium,
      }}
    >
      <SearchNavIcon size={FontSize.xlarge} color={AppColors.LightGrey} />
      <HoriSpace />
      <Text
        style={{
          color: AppColors.LightGrey,
          fontFamily: AppFonts.CalibriBold,
          fontSize: FontSize.xlarge,
        }}
      >
        Add hotels, Movies, cafes etc
      </Text>
    </Ripple>
  );
};

const Styles = StyleSheet.create({
  SearchLight: {
    width: AppDimens.width * 0.85,
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderColor: AppColors.white1,
    alignItems: 'center',
  },
  SearchDark: {
    width: AppDimens.width * 0.85,
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderColor: '#ffffff30',
    alignItems: 'center',
  },
  SearchDarkText: {
    color: AppColors.LowDark1,
    fontFamily: AppFonts.CalibriRegular,
    fontSize: 18,
  },
  SearchLightText: {
    color: AppColors.MediumGrey,
    fontFamily: AppFonts.CalibriRegular,
    fontSize: 20,
  },
});
