/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View, Image, StatusBar} from 'react-native';
import React from 'react';
import {AppColors} from 'assets/AppColors';
import {AccentButton} from 'components/Mini';
import {AppDimens, FontSize, GStyles} from 'shared/Global.styles';
import {AppFonts} from 'assets/fonts/AppFonts';
import {hp} from 'shared/dimens';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STR_KEYS} from 'shared/Storage';
import {saveProgress} from 'redux/reducers/UserAuth.reducer';
import {useDispatch} from 'react-redux';
import {ScreenLoader} from 'components/Loaders/ScreenLoader';
import LetImg from 'assets/images/CallToActionPage.png';

export const LetsGoScreen = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  const onLastPress = async () => {
    setLoading(true);
    const setProceedStatus = async () => {
      try {
        await AsyncStorage.setItem(STR_KEYS.PROCEED_STATUS, 'timeline');
      } catch (e) {}
    };
    setProceedStatus();

    dispatch(
      saveProgress({
        proceedStatus: 'timeline',
      }),
    );
    setLoading(false);
  };

  return (
    <View style={GStyles.Dark}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <ScreenLoader loading={loading} message="Loading ..." />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 50,
        }}>
        <Image
          source={LetImg}
          resizeMode="contain"
          resizeMethod="scale"
          style={{width: AppDimens.width}}
        />
      </View>
      <View
        style={{
          width: AppDimens.width * 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: hp(60),
        }}>
        <AccentButton
          disabled={false}
          title="Let's start"
          titleFontSize={FontSize.xlarge}
          titleColor={AppColors.white}
          style={{
            height: 45,
            justifyContent: 'center',
            alignItems: 'center',
            width: hp(250),
          }}
          onPress={() => {
            onLastPress();
          }}
        />
      </View>
    </View>
  );
};

// export const LetsStart = () => {
//   const dispatch = useDispatch();
//   const [loading, setLoading] = React.useState(false);

//   const onLastPress = async () => {
//     setLoading(true);
//     const setProceedStatus = async () => {
//       try {
//         await AsyncStorage.setItem(STR_KEYS.PROCEED_STATUS, 'timeline');
//       } catch (e) {}
//     };
//     setProceedStatus();

//     dispatch(
//       saveProgress({
//         proceedStatus: 'timeline',
//       }),
//     );
//     setLoading(false);
//   };
//   return (
//     <View style={GStyles.Dark}>
//       <ScreenLoader loading={loading} message="Loading ..." />
//       <View
//         style={{
//           flex: 1,
//           justifyContent: 'center',
//           flexDirection: 'row',
//           alignItems: 'center',
//           paddingTop: 50,
//         }}
//       >
//         <Image
//           source={LetImg}
//           resizeMode="contain"
//           resizeMethod="scale"
//           style={{ width: AppDimens.width }}
//         />
//       </View>
//       <View
//         style={{
//           width: AppDimens.width * 1,
//           justifyContent: 'center',
//           alignItems: 'center',
//           marginBottom: 50,
//         }}
//       >
//         <AccentButton
//           disabled={false}
//           title="Let's start"
//           style={{
//             height: 45,
//             justifyContent: 'center',
//             alignItems: 'center',
//             width: hp(230),
//           }}
//           onPress={() => {
//             onLastPress();
//           }}
//         />
//       </View>
//     </View>
//   );
// };
