/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TextInput} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {showToast} from 'shared/Functions/ToastFunctions';
import {AppColors} from '../../../assets/AppColors';
import {HeadingBar} from '../../../components/AppHeader';
import {
  AppDimens,
  FontSize,
  Spacing,
  VertSpace,
} from '../../../shared/Global.styles';
import {ModalButtons} from 'screens/Timeline/components/MenuOption';
const {Portal, Modal} = require('react-native-paper');

export const AddNewMemoModal = ({
  onSubmitPress = () => {},
  ButtonComponent = () => {
    return null;
  },
}) => {
  const [visible, setVisible] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          style={{justifyContent: 'center', alignItems: 'center'}}
          contentContainerStyle={{
            backgroundColor: 'white',
            padding: 20,
            width: AppDimens.width * 0.7,
            borderRadius: 30,
          }}>
          <View style={{alignItems: 'center'}}>
            <View style={{paddingVertical: 10}}>
              <HeadingBar title={'New memo'} titleFontSize={FontSize.xxlarge} />
            </View>

            <VertSpace size={Spacing.large} />
            <TextInput
              value={inputValue}
              onChangeText={setInputValue}
              style={{
                paddingHorizontal: Spacing.large,
                borderRadius: 20,
                height: 40,
                borderColor: AppColors.LightGrey,
                borderWidth: 1,
                width: '100%',
                color: AppColors.disableColor,
              }}
            />

            <VertSpace />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '100%',
              }}>
              <ModalButtons
                onPress={hideModal}
                IconVisible={false}
                title="Cancel"
              />
              <ModalButtons
                onPress={() => {
                  if (inputValue.length > 0) {
                    hideModal();
                    onSubmitPress(inputValue);
                  } else {
                    showToast('Please give a memo Name');
                  }
                }}
                IconVisible={false}
                title="OK"
              />
            </View>
          </View>
        </Modal>
      </Portal>

      <Ripple
        onPress={showModal}
        rippleContainerBorderRadius={20}
        style={{
          backgroundColor: AppColors.white,
          // width: 60,
          // height: 60,
          // marginTop: -10,
          // justifyContent: 'center',
          // alignItems: 'center',
        }}>
        <ButtonComponent />
      </Ripple>
    </View>
  );
};
