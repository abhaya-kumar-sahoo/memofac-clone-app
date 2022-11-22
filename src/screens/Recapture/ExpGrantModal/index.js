/* eslint-disable react-native/no-inline-styles */
import LottieView from 'lottie-react-native';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Portal, Modal} from 'react-native-paper';
import {GStyles} from 'shared/Global.styles';

export const ExpGrantModal = ({visible, closeModal, time = 800}) => {
  useEffect(() => {
    // console.log('effect -->');
    if (visible) {
      setTimeout(() => {
        // console.log('insdei time');
        closeModal();
      }, time);
    }
  }, [visible]);

  return (
    <Portal>
      <Modal
        onDismiss={closeModal}
        visible={visible}
        contentContainerStyle={{
          flex: 1,
          ...GStyles.containView,
        }}>
        <View
          style={{
            // backgroundColor: AppColors.white,
            borderRadius: 30,
            width: 250,
            ...GStyles.containView,
          }}>
          <View
            style={{
              height: 150,
              width: 120,
            }}>
            <LottieView
              // ref={animation => {
              //   this.animation = animation;
              // }}
              resizeMode="cover"
              style={{
                height: 1000,
                width: 1000,
              }}
              imageAssetsFolder="lottie"
              autoPlay
              loop={false}
              source={require('../../../assets/lottie/ExpAnimation.json')}
            />
          </View>
        </View>
      </Modal>
    </Portal>
  );
};
