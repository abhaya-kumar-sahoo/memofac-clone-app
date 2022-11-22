/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {AppHeader} from 'components/AppHeader';
import {AccentButton, Container} from 'components/Mini';
import {AppColors} from 'assets/AppColors';
import {useNavigation} from '@react-navigation/native';
import {GStyles, VertSpace} from 'shared/Global.styles';
import {PageDots} from '../NameScreen/UserName';
import {SelectableRadioButton} from 'components/SelectableRadioButton';
import {GenderOptions} from '../Profile.screen';
import {AppFonts} from 'assets/fonts/AppFonts';

export const UserGender = ({route}) => {
  const {name} = route.params;
  const navigation = useNavigation();
  const [Gender, setGender] = useState('Male');
  return (
    <SafeAreaView style={GStyles.Dark}>
      <View style={GStyles.Dark}>
        <AppHeader iconColor={AppColors.DarkGrey} enableBack>
          <AccentButton
            title={'Next'}
            // disabled={code.length < OTP_INPUT_SIZE}
            onPress={() =>
              navigation.navigate('UserYearOfBirth', {gender: Gender, name})
            }
          />
        </AppHeader>

        <VertSpace />
        <Container>
          <Text
            style={{
              fontSize: 38,
              color: AppColors.white1,
              fontFamily: AppFonts.GillSans,
            }}>
            Choose your
          </Text>
          <Text
            style={{
              fontSize: 38,
              color: AppColors.white1,
              fontFamily: AppFonts.GillSans,
              marginTop: -5,
            }}>
            gender
          </Text>
          <VertSpace />

          <Text style={{color: AppColors.MediumGrey, fontSize: 18}}>
            To personalize the contents for you
          </Text>
          <VertSpace size={45} />

          <SelectableRadioButton
            widthEnable={true}
            data={GenderOptions}
            horizontal={false}
            onSelected={value => {
              setGender(value.text);
            }}
            editable={true}
          />
        </Container>
        <PageDots PageNum={1} />
      </View>
    </SafeAreaView>
  );
};
