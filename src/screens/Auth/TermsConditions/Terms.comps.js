/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, Platform} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Ripple from 'react-native-material-ripple';
import {Modal, Portal} from 'react-native-paper';
import {AppColors} from '../../../assets/AppColors';
import {AppFonts} from '../../../assets/fonts/AppFonts';
import {AppDimens, Spacing, VertSpace} from '../../../shared/Global.styles';
import {PrivacyPolicyContent} from './privacyPolicy.content';
import {TermsContentView} from './terms.content';

export const TermsConditionsModal = () => {
  const [visible, setVisible] = React.useState(false);

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
            width: AppDimens.width * 0.8,
            borderRadius: 30,
            height: AppDimens.height * 0.7,
          }}>
          <VertSpace size={Spacing.xlarge} />
          <ScrollView
            showsHorizontalScrollIndicator={false}
            style={{padding: 20}}>
            <Text
              style={{
                fontFamily: AppFonts.CalibriBold,
                fontSize: 20,
                color: AppColors.DarkGrey,
                alignSelf: 'flex-start',
              }}>
              Terms and Conditions
            </Text>
            <VertSpace size={Spacing.large} />
            {/* <Text
              style={{
                fontFamily: AppFonts.CalibriRegular,
                color: AppColors.MediumGrey,
              }}
            >
              {termsContent}
            </Text> */}
            <TermsContentView />
            <VertSpace size={70} />
            <Text
              style={{
                fontFamily: AppFonts.CalibriBold,
                fontSize: 20,
                color: AppColors.DarkGrey,
                alignSelf: 'flex-start',
              }}>
              Privacy policy
            </Text>
            <VertSpace size={Spacing.large} />
            {/* <Text
              style={{
                fontFamily: AppFonts.CalibriRegular,
                color: AppColors.MediumGrey,
              }}
            >
              {privacyContent}
            </Text> */}
            <PrivacyPolicyContent />
            <VertSpace size={100} />
          </ScrollView>
          <VertSpace size={Spacing.xlarge} />
        </Modal>
      </Portal>

      <View
        style={{
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: AppColors.disableColor,
            fontFamily: AppFonts.CalibriBold,
            // fontSize: 18,
          }}>
          Click on button above to accept our
        </Text>

        <Ripple
          onPress={showModal}
          rippleContainerBorderRadius={10}
          style={{
            // backgroundColor: AppColors.white,
            // width: 60,
            // height: 60,
            marginTop: -3,
            // justifyContent: 'center',
            // alignItems: 'center',
          }}>
          <Text
            style={{
              paddingBottom: 5,
              fontSize: 14,
              color: AppColors.LowWhite,
              fontFamily: AppFonts.CalibriBold,
              marginTop: Platform.OS === 'ios' ? 8 : 4,
            }}>
            Terms & Privacy Policy
          </Text>
        </Ripple>
      </View>
    </View>
  );
};
