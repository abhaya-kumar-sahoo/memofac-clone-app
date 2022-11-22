/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';

import {showToast} from 'shared/Functions/ToastFunctions';
import {useSelector} from 'react-redux';
import {ReportMemoProblems} from 'redux/sagas/Contacts/api.request';
import {AccentButton, Container} from 'components/Mini';
import {AppHeader} from 'components/AppHeader';
import {FontSize, GStyles} from 'shared/Global.styles';
import {AppFonts} from 'assets/fonts/AppFonts';
import {AppColors} from 'assets/AppColors';
import {ScreenLoader} from 'components/Loaders/ScreenLoader';

export const ReportMemoScreen = ({navigation, route}) => {
  const userToken = useSelector(state => state.userAuth.userToken);
  const [data, setData] = useState('');
  const {memoId} = route.params;
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    setLoading(true);
    ReportMemoProblems(userToken, data, memoId)
      .then(response => {
        setLoading(false);
        showToast(
          'We have got your problem and will look into it as soon as possible',
        );
        navigation.goBack();
        // console.log(response);
        // console.log(memoId);
      })
      .catch(error => {
        showToast('Please try again');
        console.log(error);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={GStyles.Dark}>
      <AppHeader enableBack>
        <AccentButton
          title="Submit"
          onPress={onSubmit}
          disabled={data.length === 0}
          style={{marginTop: 10}}
        />
      </AppHeader>
      <ScreenLoader message="loading wait..." loading={loading} />

      <Container>
        <Text style={styles.headerDarkStyles}>Report a problem</Text>

        <TextInput
          multiline
          placeholderTextColor={AppColors.whiteop01}
          placeholder="Tell us here what problem you are facing ..."
          style={styles.textInputDark}
          onChangeText={messages => setData(messages)}
          value={data}
          autoFocus={true}
        />
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    fontFamily: AppFonts.CalibriRegular,
    fontSize: FontSize.large,
    color: AppColors.DarkGrey,
  },
  textInputDark: {
    fontFamily: AppFonts.CalibriRegular,
    fontSize: FontSize.large,
    color: AppColors.white2,
  },
  headerStyles: {
    fontFamily: AppFonts.CalibriBold,
    color: AppColors.DarkGrey,
    fontSize: FontSize.xxlarge,
    lineHeight: FontSize.xxlarge,
  },
  headerDarkStyles: {
    fontFamily: AppFonts.CalibriBold,
    color: AppColors.white1,
    fontSize: FontSize.xxlarge,
    lineHeight: FontSize.xxlarge,
  },
});
