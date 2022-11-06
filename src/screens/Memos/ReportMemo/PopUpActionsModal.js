import { useNavigation } from '@react-navigation/native';
import { AppColors } from 'assets/AppColors';
import { AppFonts } from 'assets/fonts/AppFonts';
import React, { useState } from 'react';
import { Linking, Platform, StyleSheet, Text, View } from 'react-native';
import { Portal, TouchableRipple, Modal } from 'react-native-paper';
import { HorizontalLine } from 'screens/Timeline/components/PostView/Postview.comp';
import { INVITING_MESSAGE1 } from 'shared/content/whatsapp.content';
import { AppDimens, FontSize, GStyles } from 'shared/Global.styles';
import { MenuIconsDark } from 'shared/Icon.Comp';
import Shares from 'react-native-share';

export const PopupActionsModal = ({ memoId, memoDetails }) => {
  const navigation = useNavigation();
  const [isVisible, setVisible] = useState(false);
  const toggleModal = () => setVisible(!isVisible);
  const onShare = async () => {
    toggleModal();

    if (Platform.OS === 'ios') {
      try {
        const category = memoDetails.category_name
          ? ` (${memoDetails.category_name})*`
          : '*';

        const shareObject = {
          message:
            'Hey, can you please rate our page\n' +
            `*${memoDetails.title}` +
            `${category} \n\n` +
            INVITING_MESSAGE1 +
            `${memoId}`,
          url: INVITING_MESSAGE1 + `${memoId}`,
          social: Shares.Social.WHATSAPP,
        };

        await Shares.shareSingle(shareObject);
      } catch (error) {
        console.log('Error =>', error);
      }
    } else {
      try {
        const category = memoDetails.category_name
          ? ` (${memoDetails.category_name})*`
          : '*';
        await Shares.shareSingle({
          message:
            'Hey, can you please rate our page\n' +
            `*${memoDetails.title}` +
            `${category} \n\n` +
            INVITING_MESSAGE1 +
            `${memoId}`,
          social: Shares.Social.WHATSAPP,
        })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      } catch (error) {
        alert(error.message);
      }
    }
  };

  // const onShare = async customOptions => {
  //   toggleModal();

  //   Shares.isPackageInstalled('com.whatsapp.android')
  //     .then(response => {
  //       console.log(response);
  //       // { isInstalled: true/false, message: 'Package is Installed' }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       // { error }
  //     });
  //   const category = memoDetails.category_name
  //     ? ` (${memoDetails.category_name})*`
  //     : '*';
  //   // try {
  //   //   // await Shares.shareSingle(customOptions);
  //   //   const url =
  //   //     'whatsapp://send?text=' +
  //   //     INVITING_MESSAGE1 +
  //   //     `${memoId} \n\n` +
  //   //     'Hey, can you please rate our page\n' +
  //   //     `*${memoDetails.title.replace('&', 'and')}` +
  //   //     category.replace('&', 'and');
  //   //   await Linking.openURL(url)
  //   //     .then(r => {
  //   //       console.log(r);
  //   //     })
  //   //     .catch(e => {
  //   //       console.log(e);
  //   //     });
  //   // } catch (err) {
  //   //   console.log(err);
  //   // }
  // };

  return (
    <View>
      <TouchableRipple onPress={toggleModal} style={styles.menuButtonStyle}>
        <MenuIconsDark size={20} />
      </TouchableRipple>
      <Portal>
        <Modal
          visible={isVisible}
          onDismiss={toggleModal}
          style={{ justifyContent: 'center', alignItems: 'center' }}
          contentContainerStyle={{
            width: AppDimens.width * 0.7,
            backgroundColor: AppColors.Skeleton,
            borderRadius: 10,
          }}
        >
          <View
            style={{
              ...GStyles.containView,
            }}
          >
            <Text onPress={onShare} style={styles.textStyleDark}>
              Share
            </Text>
            <HorizontalLine
              height={1}
              VerticalSpace={1}
              width={AppDimens.width * 0.5}
            />
            <Text
              onPress={() => {
                toggleModal();
                navigation.navigate('ReportMemoScreen', { memoId });
              }}
              style={styles.textStyleDark}
            >
              Report
            </Text>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  menuButtonStyle: {
    paddingLeft: 15,
    // marginTop: 10,
    // backgroundColor: 'red',
  },
  textStyle: {
    padding: 20,
    fontSize: FontSize.xlarge,
    fontFamily: AppFonts.CalibriBold,
    color: AppColors.DarkGrey,
  },
  textStyleDark: {
    padding: 20,
    fontSize: FontSize.xlarge,
    fontFamily: AppFonts.CalibriBold,
    color: AppColors.white1,
  },
  modalView: {
    alignItems: 'center',
  },
});
