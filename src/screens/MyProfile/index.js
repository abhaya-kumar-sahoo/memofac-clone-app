import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { AppDimens, FontSize, GStyles, HoriSpace } from 'shared/Global.styles';
import { AppColors } from 'assets/AppColors';
import {
  DoneFillIcon,
  WishlistIcon,
  WishlistWhiteIcon,
} from 'shared/Icon.Comp';
import Ripple from 'react-native-material-ripple';
import { AppButton, AppButtonFlex } from 'components/AppButton';
import { useSelector } from 'react-redux';

export const MemoList = () => {
  return (
    <View>
      <Text>index</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

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
    { name: 'Memos', key: 1 },
    { name: 'Gallery', key: 2 },
    { name: 'Post', key: 3 },
  ],
}) => {
  const [SelectButton, setSelectButton] = React.useState('M');
  //   const [SelectSwitch, setSelectSwitch] = React.useState(true);

  return (
    <SafeAreaView style={{ backgroundColor: AppColors.DarkBG }}>
      <View style={GStyles.flexRowSpaceBetween}>
        {/* <View style={{ flexDirection: 'row' }}>
          <AppButton
            width={AppDimens.width * 0.24}
            height={30}
            backgroundColor={
              SelectButton === 'M' ? AppColors.white1 : AppColors.DarkGrey2
            }
            titleFontSize={FontSize.large}
            title={title1}
            titleColor={
              SelectButton === 'M' ? AppColors.DarkGrey2 : AppColors.MediumGrey
            }
            onPress={() => {
              onPress('M');
            }}
          />
          <HoriSpace size={8} />
          <AppButton
            width={AppDimens.width * 0.27}
            height={30}
            titleColor={
              SelectButton === 'G' ? AppColors.DarkGrey2 : AppColors.MediumGrey
            }
            backgroundColor={
              SelectButton === 'G' ? AppColors.white1 : AppColors.DarkGrey2
            }
            titleFontSize={FontSize.large}
            title={title2}
            onPress={() => {
              onPress('G');
            }}
          />
          <HoriSpace size={8} />
          <AppButton
            width={AppDimens.width * 0.2}
            height={30}
            titleColor={
              SelectButton === 'P' ? AppColors.DarkGrey2 : AppColors.MediumGrey
            }
            backgroundColor={
              SelectButton === 'P' ? AppColors.white1 : AppColors.DarkGrey2
            }
            titleFontSize={FontSize.large}
            title={title3}
            onPress={() => {
              // navigate('WishlistScreen');
              onPress('P');
            }}
          />
        </View> */}
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
          }}
        >
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
              }}
            >
              {SelectSwitch ? (
                <TouchableOpacity
                  onPress={() => setSelectSwitch(!SelectSwitch)}
                >
                  <DoneFillIcon color="white" size={12} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setSelectSwitch(!SelectSwitch)}
                >
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
