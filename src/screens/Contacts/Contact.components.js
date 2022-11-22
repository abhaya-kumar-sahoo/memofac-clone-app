/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Ripple from 'react-native-material-ripple';
import {FontSize, GStyles, HoriSpace} from '../../shared/Global.styles';
import {AppColors} from '../../assets/AppColors';
import {AppFonts} from '../../assets/fonts/AppFonts';
import {View, Text} from 'react-native';
import {AddCirecleIcon, MinusCircleIcon} from 'shared/Icon.Comp';
import {PublicIndicator} from 'screens/Timeline/components/ContactsWithRating';
const contactProps = {
  id: 0,
  name: '',
  number: '',
  memo_user: false,
};

export const ContactItem = ({
  item = {...contactProps},
  index,
  onInvitePress = () => {},
  onSelect = () => {},
  onDeselect = () => {},
  type = true,
  action = true,
  navigation,
  image = null,
}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: GStyles.Dark,
        height: 75,
        alignItems: 'center',
      }}>
      <Ripple
        onPress={() => {
          navigation.navigate('FriendsProfile', {user_id: item.uid});
        }}
        style={{
          flex: 1,
          flexDirection: 'row',
          height: 75,
          alignItems: 'center',
        }}>
        {item.image === null ? (
          <PublicIndicator image={item.image} type={'2'} />
        ) : (
          <View style={{width: 50}}>
            <PublicIndicator image={item.image} type={'2'} />
          </View>
        )}
        <View
          style={{
            flex: 1,
            // backgroundColor: 'wheat',
            flexGrow: 1,
            paddingHorizontal: 10,
            flexDirection: 'row',
          }}>
          <View>
            <Text
              ellipsizeMode={'tail'}
              numberOfLines={1}
              style={{
                fontFamily: AppFonts.CalibriBold,
                fontSize: FontSize.xlarge,
                color: AppColors.white2,
              }}>
              {item.name}
            </Text>
            <Text
              ellipsizeMode={'tail'}
              numberOfLines={1}
              style={{
                fontFamily: AppFonts.CalibriRegular,
                fontSize: FontSize.medium,
                color: AppColors.disableColor,
              }}>
              {item.number}
            </Text>
          </View>
        </View>
      </Ripple>
      {/* Side Button */}
      <View
        style={{
          // position: 'absolute',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {item.memo_user == false && (
          <Ripple onPress={() => onInvitePress()}>
            <View
              style={{
                backgroundColor: AppColors.Red,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 20,
              }}>
              <Text
                style={{
                  fontFamily: AppFonts.CalibriRegular,
                  color: AppColors.white,
                  fontSize: 16,
                }}>
                Invite
              </Text>
            </View>
          </Ripple>
        )}

        {action && (
          <>
            <HoriSpace size={10} />
            {type === true ? (
              <Ripple
                rippleContainerBorderRadius={15}
                onPress={() => onSelect()}>
                <AddCirecleIcon size={35} />
              </Ripple>
            ) : (
              <Ripple
                rippleContainerBorderRadius={15}
                onPress={() => onDeselect()}>
                <MinusCircleIcon size={35} />
              </Ripple>
            )}
          </>
        )}
      </View>
    </View>
  );
};
