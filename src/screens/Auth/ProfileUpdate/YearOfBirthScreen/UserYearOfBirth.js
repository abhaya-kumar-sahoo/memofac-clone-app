/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, SafeAreaView, Platform} from 'react-native';
import React, {useState} from 'react';
import {AppColors} from 'assets/AppColors';
import {AppHeader} from 'components/AppHeader';
import {AccentButton, Container} from 'components/Mini';
import {useNavigation} from '@react-navigation/native';
import {GStyles, VertSpace} from 'shared/Global.styles';
import {PageDots} from '../NameScreen/UserName';
import {WheelPicker} from 'react-native-wheel-picker-android';
import {Picker} from '@react-native-picker/picker';
import {AppFonts} from 'assets/fonts/AppFonts';

const currentYear = new Date().getFullYear();
const range = (start, stop, step) =>
  Array.from({length: (stop - start) / step + 1}, (_, i) => start + i * step);
const yearsRange = range(currentYear, currentYear - 80, -1);

export const UserYearOfBirth = ({route}) => {
  const {gender, name} = route.params;
  const navigation = useNavigation();
  const [Year, setYear] = useState('');

  const Years = [];
  yearsRange.forEach(element => {
    Years.push('' + element + '');
  });

  return (
    <SafeAreaView style={GStyles.Dark}>
      <View style={GStyles.Dark}>
        <AppHeader iconColor={AppColors.DarkGrey} enableBack>
          <AccentButton
            title={'Next'}
            // disabled={code.length < OTP_INPUT_SIZE}
            onPress={() =>
              navigation.navigate('SelectMemos', {DOB: Year, gender, name})
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
            Choose year
          </Text>
          <Text
            style={{
              fontSize: 38,
              color: AppColors.white1,
              fontFamily: AppFonts.GillSans,
              // marginTop: -10,
            }}>
            of birth
          </Text>
          <VertSpace />

          <Text
            style={{
              color: AppColors.MediumGrey,
              fontSize: 18,
              fontFamily: AppFonts.CalibriRegular,
            }}>
            To personalize the content for you{' '}
          </Text>
          <VertSpace size={50} />
          <View style={{...GStyles.containView}}>
            {Platform.OS === 'android' ? (
              <WheelPicker
                selectedItem={32}
                data={Years}
                onItemSelected={item => setYear(currentYear - item)}
                itemTextColor={AppColors.LowDark2}
                hideIndicator={true}
                selectedItemTextColor={AppColors.white1}
                itemTextSize={38}
                selectedItemTextSize={38}
                itemTextFontFamily={AppFonts.CalibriBold}
                selectedItemTextFontFamily={AppFonts.CalibriBold}
                style={{
                  width: 80,
                  height: 250,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            ) : (
              <Picker
                selectedValue={Year}
                onValueChange={(itemValue, itemIndex) => setYear(itemValue)}
                style={{height: 200, width: 340}}
                itemStyle={{color: '#FFFFFF', fontSize: 45}}>
                {Years.map(item => (
                  <Picker.Item
                    label={item}
                    value={item}
                    style={{fontSize: 20}}
                  />
                ))}
              </Picker>
            )}
          </View>
        </Container>
        <PageDots PageNum={2} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
