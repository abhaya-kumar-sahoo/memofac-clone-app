//react-native-push-notification
import {StyleSheet, Text, SafeAreaView} from 'react-native';
import React from 'react';

import {AppColors} from 'assets/AppColors';

const App = () => {
  const Action = async () => {
    console.log('Start');
  };
  return (
    <SafeAreaView
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: AppColors.DarkBG,
      }}>
      <Text
        // eslint-disable-next-line react-native/no-inline-styles
        style={{color: 'red', fontSize: 40, fontWeight: '900'}}
        onPress={() => {
          Action();
        }}>
        I LOVE BARSA
      </Text>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    zIndex: 0,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  normalText: {
    color: '#03DAC6',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});
