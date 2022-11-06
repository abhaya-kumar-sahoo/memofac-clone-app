import { AppColors } from '../../../assets/AppColors';
import React, { Fragment } from 'react';
import { DoneFillIcon, DoneIcon } from '../../../shared/Icon.Comp';
import { AppDimens, FontSize, HoriSpace } from '../../../shared/Global.styles';
import Ripple from 'react-native-material-ripple';
import { AppFonts } from '../../../assets/fonts/AppFonts';
const { View, Text, Pressable, Animated, StyleSheet } = require('react-native');
const { Portal, Modal } = require('react-native-paper');

export const ExperiencedButton = ({ expProps = false, onPress = () => {} }) => {
  // const [visible, setVisible] = React.useState(false);
  // const [Experienced, setExperienced] = React.useState(expProps);
  // const showModal = () => setVisible(true);
  // const hideModal = () => setVisible(false);

  return (
    <View>
      {/* <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          style={{ justifyContent: 'center', alignItems: 'center' }}
          contentContainerStyle={{
            backgroundColor: 'white',
            padding: 20,
            width: AppDimens.width * 0.9,
            borderRadius: 30,
          }}
        ></Modal>
      </Portal> */}

      <Ripple
        rippleContainerBorderRadius={20}
        rippleFades={true}
        onPress={() => {
          // setExperienced(!Experienced);
          onPress();
        }}
        style={{
          backgroundColor: AppColors.white,
          width: 60,
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {expProps ? <DoneFillIcon size={35} /> : <DoneIcon size={32} />}
      </Ripple>
    </View>
  );
};

const PageStyles = StyleSheet.create({
  primaryItemChoice: {},
  PrimaryTextStyle: {
    fontFamily: AppFonts.CalibriBold,
    color: AppColors.DarkGrey,
    fontSize: FontSize.large,
  },
});
