/* eslint-disable react-native/no-inline-styles */
import {AppColors} from '../../../assets/AppColors';
import React from 'react';
import {ChatIconDark} from '../../../shared/Icon.Comp';
import Ripple from 'react-native-material-ripple';
const {View} = require('react-native');

export const ChatButton = ({onPress = () => []}) => {
  // const [visible, setVisible] = React.useState(false);
  // const showModal = () => setVisible(true);
  // const hideModal = () => setVisible(false);
  // const navigation = useNavigation();

  return (
    <View>
      <Ripple
        rippleContainerBorderRadius={20}
        rippleFades={true}
        onPress={onPress}
        style={{
          // backgroundColor: AppColors.white,
          backgroundColor: AppColors.DarkBG,

          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ChatIconDark size={30} />
      </Ripple>
    </View>
  );
};
