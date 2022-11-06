import { StyleSheet, Text, View, TextInput, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { AppColors } from 'assets/AppColors';
import { AppHeader } from 'components/AppHeader';
import { AccentButton, Container } from 'components/Mini';
import { AppDimens, GStyles, VertSpace } from 'shared/Global.styles';
import { AppFonts } from 'assets/fonts/AppFonts';
import { useNavigation } from '@react-navigation/native';
import { showToast } from 'shared/Functions/ToastFunctions';

export const UserName = () => {
  const navigation = useNavigation();
  const [Name, setName] = useState('');
  return (
    <SafeAreaView style={GStyles.Dark}>
      <View style={GStyles.Dark}>
        <AppHeader>
          <AccentButton
            title={'Next'}
            disabled={Name === ''}
            onPress={() => {
              navigation.navigate('UserGender', { name: Name });
            }}
          />
        </AppHeader>

        <VertSpace />
        <Container>
          <Text
            style={{
              fontSize: 42,
              color: AppColors.white1,
              fontFamily: AppFonts.GillSans,
            }}
          >
            Enter your
          </Text>

          <Text
            style={{
              fontSize: 42,
              color: AppColors.white1,
              fontFamily: AppFonts.GillSans,
              marginTop: -5,
            }}
          >
            name
          </Text>
          <VertSpace size={40} />

          <TextInput
            placeholder="Type your name here"
            placeholderTextColor={AppColors.LowDark}
            maxLength={25}
            style={{
              borderBottomWidth: 1,
              borderColor: AppColors.disableColor,
              width: AppDimens.width * 0.9,
              color: AppColors.white1,
              fontFamily: AppFonts.CalibriRegular,
              fontSize: 22,
            }}
            // focusable
            //autoFocus
            value={Name}
            onChangeText={text => {
              if (text.length <= 25) {
                setName(text);
              }
            }}
          />
        </Container>
        <PageDots />
      </View>
    </SafeAreaView>
  );
};

export const PageDots = ({ PageNum = 0 }) => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        backgroundColor: AppColors.DarkBG,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 20,
        width: AppDimens.width * 1,
      }}
    >
      {[1, 2, 3, 4].map((item, key) => {
        return (
          <View
            key={key}
            style={{
              width: 11,
              height: 11,
              borderRadius: 10,
              backgroundColor:
                key === PageNum ? AppColors.disableColor : AppColors.DarkGrey,
              marginLeft: 10,
            }}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({});
