import React, {useState} from 'react';
import {View, TextInput, StyleSheet, SafeAreaView} from 'react-native';
import {AppHeader} from '../../components/AppHeader';
import {AccentButton, Container} from '../../components/Mini';
import {showToast} from 'shared/Functions/ToastFunctions';
import {useSelector} from 'react-redux';
import {ReportProblems} from 'redux/sagas/Contacts/api.request';
import {FontSize, GStyles, VertSpace} from 'shared/Global.styles';
import {AppFonts} from 'assets/fonts/AppFonts';
import {AppColors} from 'assets/AppColors';
import {ScreenLoader} from 'components/Loaders/ScreenLoader';

export const ReportProblem = ({navigation}) => {
  const userToken = useSelector(state => state.userAuth.userToken);
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const onSubmit = () => {
    setLoading(true);
    ReportProblems(userToken, data)
      .then(() => {
        setLoading(false);
        showToast(
          'We have got your problem and will look into it as soon as possible',
        );
        navigation.goBack();
        // console.log(response);
      })
      .catch(error => {
        showToast('Please try again');
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={GStyles.Dark}>
      <AppHeader enableBack>
        <AccentButton
          title={'Submit'}
          onPress={onSubmit}
          disabled={data.length === 0}
          style={{marginTop: 10}}
        />
      </AppHeader>
      <VertSpace />
      <ScreenLoader message="loading wait..." loading={loading} />

      <Container>
        <View style={styles.textInputContainer}>
          <TextInput
            multiline
            placeholderTextColor={AppColors.whiteop01}
            placeholder="Tell us here what problem you are facing ..."
            style={styles.textInputDark}
            onChangeText={messages => setData(messages)}
            value={data}
            autoFocus={true}
          />
        </View>
      </Container>
    </SafeAreaView>
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
});
