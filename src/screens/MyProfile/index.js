/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {FontSize, GStyles} from 'shared/Global.styles';
import {AppColors} from 'assets/AppColors';
import {DoneFillIcon, WishlistWhiteIcon} from 'shared/Icon.Comp';
import {AppButtonFlex} from 'components/AppButton';

export const SelectButtons = ({
  onPress = () => {},
  setSelectSwitch = () => {},
  SelectSwitch,
  // SelectButton,
  SwitchButtonShow = true,
  title1 = 'Memos',
  title2 = 'Gallery',
  title3 = 'Post',
  data = [
    {name: 'Memos', key: 1},
    {name: 'Gallery', key: 2},
    {name: 'Post', key: 3},
  ],
}) => {
  return (
    <SafeAreaView style={{backgroundColor: AppColors.DarkBG}}>
      <View style={GStyles.flexRowSpaceBetween}>
        <AppButtonFlex
          titleFontSize={FontSize.large}
          paddingVertical={7}
          spaceBetween={5}
          defaultSelect={1}
          data={data}
          onPress={i => onPress(i)}
        />
        <View
          style={{
            height: 40,
            width: 40,
          }}>
          {SwitchButtonShow && (
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: SelectSwitch
                  ? AppColors.green
                  : AppColors.blue,
                borderRadius: 5,
                ...GStyles.flexRowCenter,
              }}>
              {SelectSwitch ? (
                <TouchableOpacity
                  onPress={() => setSelectSwitch(!SelectSwitch)}>
                  <DoneFillIcon color="white" size={12} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setSelectSwitch(!SelectSwitch)}>
                  <WishlistWhiteIcon color="white" size={12} />
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
