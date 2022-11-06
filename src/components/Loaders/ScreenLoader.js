import { AppColors } from 'assets/AppColors';
import { AppFonts } from 'assets/fonts/AppFonts';
import React from 'react';
import { Text, View } from 'react-native';
import { ActivityIndicator, Modal, Portal } from 'react-native-paper';
import { AppDimens, FontSize, HoriSpace } from 'shared/Global.styles';

export const ScreenLoader = ({
  message = 'Loading please wait',
  loading = false,
}) => {
  return (
    <Portal>
      <Modal
        visible={loading}
        dismissable={false}
        style={{ justifyContent: 'center', alignItems: 'center' }}
        contentContainerStyle={{
          backgroundColor: 'white',
          padding: 13,
          width: AppDimens.width * 0.7,
          borderRadius: 30,
        }}
      >
        <View
          style={{
            marginLeft: -10,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}
        >
          <ActivityIndicator
            size={FontSize.large}
            color={AppColors.MediumGrey}
          />
          <HoriSpace />
          <Text
            style={{
              fontSize: FontSize.large,
              color: AppColors.MediumGrey,
              fontFamily: AppFonts.CalibriBold,
            }}
          >
            {message}
          </Text>
        </View>
      </Modal>
    </Portal>
  );
};
