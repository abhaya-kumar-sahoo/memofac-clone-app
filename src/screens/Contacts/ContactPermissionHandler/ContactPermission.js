/* eslint-disable react-native/no-inline-styles */
import {AppColors} from 'assets/AppColors';
import React from 'react';
import {View} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import {ModalButtons} from 'screens/Timeline/components/MenuOption';
import {hp} from 'shared/dimens';
import {PermissionContent} from './PermissionContent';

export const ContactPermission = ({
  modalVisibility = true,
  onCancel = () => {},
  onContinue = () => {},
}) => {
  return (
    <>
      <Portal>
        <Modal
          visible={modalVisibility}
          onDismiss={() => {}}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: AppColors.DarkBG,
            marginTop: 0,
            // height: AppDimens.height,
          }}
          contentContainerStyle={{
            backgroundColor: AppColors.LightDark1,
            padding: 20,
            width: '70%',
            borderRadius: 30,
          }}>
          <PermissionContent />
          <View
            style={{
              // flexDirection: 'row',
              marginTop: hp(30),
              // justifyContent: 'space-between',
            }}>
            {/* <ModalButtons
              ButtonIcon={() => null}
              onPress={onCancel}
              title={'NOT NOW'}
            /> */}
            <ModalButtons
              width={'100%'}
              modalStyle={{
                backgroundColor: AppColors.Red,
                borderRadius: 100,
              }}
              ButtonIcon={() => null}
              onPress={onContinue}
              title={'CONTINUE'}
              color={AppColors.white}
            />
          </View>
        </Modal>
      </Portal>
    </>
  );
};
