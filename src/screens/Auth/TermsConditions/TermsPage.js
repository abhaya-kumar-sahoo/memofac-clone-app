/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Image,
  View,
  Text,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Term_Styles} from './Terms.styles';
import {
  AppDimens,
  FontSize,
  GStyles,
  VertSpace,
} from '../../../shared/Global.styles';
import {AppButton} from '../../../components/AppButton';
import {AppColors} from '../../../assets/AppColors';
import {useNavigation} from '@react-navigation/native';
import {TermsConditionsModal} from './Terms.comps';
import {hp, wp} from 'shared/dimens';
import {AppFonts} from 'assets/fonts/AppFonts';

const img1 = require('assets/images/boarding/a.png');
const img2 = require('assets/images/boarding/b.png');
const img3 = require('assets/images/boarding/c.png');
const img4 = require('assets/images/boarding/d.png');
const img5 = require('assets/images/boarding/e.png');
const img6 = require('assets/images/boarding/f.png');
const img7 = require('assets/images/boarding/g.png');
const img8 = require('assets/images/boarding/h.png');
const img9 = require('assets/images/boarding/i.png');
const img10 = require('assets/images/boarding/j.png');

const ladderNum = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

import {ContactPermission} from 'screens/Contacts/ContactPermissionHandler/ContactPermission';
import {
  checkContactPermission,
  getAllPermissions,
  getContactPermission,
} from 'shared/Permission';

export function TermsPage() {
  const navigation = useNavigation();
  const [contactPermVisible, setContactPermVisible] = React.useState(false);

  const onMount = async () => {
    const {isPermissionGranted, result} = await checkContactPermission();

    if (!isPermissionGranted) {
      setContactPermVisible(true);
    } else {
      setContactPermVisible(false);
      navigation.navigate('LoginScreen');
    }
  };

  return (
    <SafeAreaView style={GStyles.Dark}>
      <VertSpace size={30} />
      <View style={{...GStyles.containView, flex: 2}}>
        <Text
          style={{
            fontFamily: AppFonts.Chaparral,
            fontSize: Platform.OS === 'android' ? 38 : 42,
            color: AppColors.white1,
          }}>
          Find reviews
        </Text>
        <Text
          style={{
            fontFamily: AppFonts.Chaparral,
            fontSize: Platform.OS === 'android' ? 17 : 19,
            color: AppColors.LowDark,
            marginTop: Platform.OS === 'ios' ? 4 : 0,
          }}>
          of anything like ...
        </Text>
      </View>

      <View
        style={{
          marginTop: AppDimens.height * 0.06,
          flex: 8,
          // paddingTop: 20,
        }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {ladderNum.map((i, k) => {
            return (
              <Image
                key={k}
                source={i}
                resizeMode="contain"
                width="100%"
                height="100%"
                style={{width: hp(240), height: hp(280)}}
              />
            );
          })}
        </ScrollView>
      </View>

      <ContactPermission
        modalVisibility={contactPermVisible}
        onCancel={() => {
          setContactPermVisible(false);
          setTimeout(async () => {
            const {isPermissionGranted, statuses} = await getAllPermissions();
          }, 200);
          navigation.navigate('LoginScreen');
        }}
        onContinue={() => {
          setTimeout(async () => {
            const ContactStatus = await getContactPermission();

            const {statuses} = await getAllPermissions();

            setContactPermVisible(false);
            navigation.navigate('LoginScreen');
          }, 200);
        }}
      />
      {/* BOTTOM VIEW */}
      <View style={Term_Styles.bottomView}>
        <AppButton
          width={wp(250)}
          backgroundColor={AppColors.Red}
          titleFontSize={FontSize.xlarge}
          titleColor={AppColors.white}
          style={{
            elevation: Platform.OS === 'android' ? 10 : 0,
            shadowOffset: {
              width: Platform.OS === 'android' ? 4 : 0,
              height: Platform.OS === 'android' ? 10 : 0,
            },
            shadowColor: Platform.OS === 'android' ? 'gray' : 'transparent',
            shadowOpacity: Platform.OS === 'android' ? 0.3 : 0,
            // background color must be set
            // backgroundColor: '#0000', // invisible color
          }}
          title="Agree and Continue"
          onPress={onMount}
        />

        <VertSpace size={25} />
        <TermsConditionsModal />
      </View>
    </SafeAreaView>
  );
}
