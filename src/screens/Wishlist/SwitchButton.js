import { useNavigation } from '@react-navigation/core';
import { AppColors } from 'assets/AppColors';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { Modal, Portal } from 'react-native-paper';
import { AppDimens, FontSize } from '../../shared/Global.styles';
import { DoneFillIcon, WishlistFillIcon } from '../../shared/Icon.Comp';

export const SwitchButton = ({
  type = 'Wishlist',
  onTrue = () => {},
  onFalse = () => {},
}) => {
  const [visible, setVisible] = React.useState(false);
  // const nav = useNavigation();
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          style={{ justifyContent: 'center', alignItems: 'center' }}
          contentContainerStyle={{
            backgroundColor: 'white',
            padding: 20,
            width: AppDimens.width * 0.5,
            borderRadius: 100,
          }}
        >
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-around' }}
          >
            <Ripple
              rippleContainerBorderRadius={10}
              rippleFades={true}
              onPress={() => {
                hideModal();
                onTrue();
              }}
              style={{ padding: 10 }}
            >
              <DoneFillIcon size={FontSize.x4large} />
            </Ripple>

            <Ripple
              rippleContainerBorderRadius={10}
              rippleFades={true}
              onPress={() => {
                hideModal();
                onFalse();
              }}
              style={{ padding: 10 }}
            >
              <WishlistFillIcon size={FontSize.x4large} />
            </Ripple>
          </View>
        </Modal>
      </Portal>

      <Ripple
        rippleContainerBorderRadius={10}
        rippleFades={true}
        onPress={() => {
          if (type === 'Wishlist') {
            onFalse();
          } else {
            onTrue();
          }
        }}
        style={{
          padding: 10,
          backgroundColor: AppColors.greyLight,
          borderRadius: 10,
        }}
      >
        {type === 'Wishlist' ? (
          <WishlistFillIcon size={FontSize.inputText} />
        ) : (
          <DoneFillIcon size={FontSize.inputText} />
        )}
      </Ripple>
    </View>
  );
};
