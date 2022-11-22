/* eslint-disable react-native/no-inline-styles */
import {AppColors} from 'assets/AppColors';
import React, {Fragment} from 'react';
import {
  DeleteIcon,
  EditIcon,
  MenuIconsDark,
  WishlistIcon,
} from 'shared/Icon.Comp';
import {AppDimens, FontSize, HoriSpace} from 'shared/Global.styles';
import Ripple from 'react-native-material-ripple';
import {useSelector} from 'react-redux';
import {AppFonts} from 'assets/fonts/AppFonts';
const {View, StyleSheet, Text} = require('react-native');
const {Portal, Modal} = require('react-native-paper');

// "id": "24",
// "user_id": "1",

export const ModalButtons = ({
  title = 'Button',
  ButtonIcon = () => {
    return <EditIcon size={FontSize.large} />;
  },
  IconVisible = false,
  height = 50,
  width = 100,
  modalStyle = {},
  textStyle = {},
  onPress = () => {},
  color = AppColors.DarkGrey,
}) => {
  return (
    <View>
      <Ripple
        rippleContainerBorderRadius={10}
        onPress={() => onPress()}
        style={{
          flexDirection: 'row',
          height: height,
          width: width,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          ...modalStyle,
        }}>
        {IconVisible && (
          <Fragment>
            <ButtonIcon />
            <HoriSpace />
          </Fragment>
        )}
        <Text
          style={{
            fontSize: 20,
            color: color,
            fontFamily: AppFonts.CalibriBold,
            ...textStyle,
          }}>
          {title}
        </Text>
      </Ripple>
    </View>
  );
};

export const PostMenuOption = ({
  postData = {id: null, user_id: null},
  onDelete = () => {},
  onWishlistAdd = () => {},
}) => {
  const [visible, setVisible] = React.useState(false);
  const {userData} = useSelector(state => state.userAuth);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  // console.log(userData);
  // console.log(postData.user_id);

  return (
    <View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          style={{justifyContent: 'center', alignItems: 'center'}}
          contentContainerStyle={Style.ModalStyleLight}>
          <View style={{alignItems: 'flex-start'}}>
            {postData.user_id == userData.id ? (
              <ModalButtons
                width={'100%'}
                title={'Delete '}
                IconVisible={true}
                onPress={() => {
                  hideModal();
                  onDelete();
                }}
                modalStyle={{
                  // backgroundColor: 'wheat',
                  justifyContent: 'flex-start',
                  width: AppDimens.width * 0.7,
                  height: 30,
                  borderRadius: 0,
                }}
                // IconVisible
                ButtonIcon={() => <DeleteIcon size={25} />}
              />
            ) : (
              <ModalButtons
                width={'100%'}
                IconVisible={true}
                modalStyle={{
                  // backgroundColor: 'wheat',
                  justifyContent: 'flex-start',

                  width: AppDimens.width * 0.7,
                  height: 30,
                  borderRadius: 0,
                }}
                title={` ${postData.wish ? 'Remove from ' : 'Add to'} Wishlist`}
                onPress={() => {
                  hideModal();
                  onWishlistAdd();
                }}
                ButtonIcon={() => <WishlistIcon size={25} />}
              />
            )}
          </View>
        </Modal>
      </Portal>

      <Ripple
        onPress={showModal}
        rippleContainerBorderRadius={20}
        style={Style.ModalBacDark}>
        <MenuIconsDark size={20} />
      </Ripple>
    </View>
  );
};

const Style = StyleSheet.create({
  ModalStyleLight: {
    backgroundColor: 'white',
    padding: 20,
    // width: AppDimens.width * 0.7,
    borderRadius: 15,
  },
  ModalStyleDark: {
    backgroundColor: AppColors.DarkBG,
    padding: 20,
    // width: AppDimens.width * 0.7,
    borderRadius: 30,
  },

  ModalBacLight: {
    backgroundColor: AppColors.white,
    width: 60,
    height: 60,
    marginTop: -10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ModalBacDark: {
    backgroundColor: AppColors.DarkBG,
    width: 60,
    height: 60,
    marginTop: -10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
