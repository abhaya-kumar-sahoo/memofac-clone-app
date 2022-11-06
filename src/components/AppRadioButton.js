import { useNavigation } from '@react-navigation/core';
import { AppFonts } from 'assets/fonts/AppFonts';
import React, { Fragment, useState } from 'react';
import { useEffect } from 'react';
import { Text, View, Pressable } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { AppColors } from '../assets/AppColors';

import { GStyles, Spacing } from '../shared/Global.styles';

export function AppRadioButton({
  data = [],
  initial = 0,
  onSelected,
  editable,
  horizontal = true,
  RightComponent = null,
  RightButtonOnPress = () => {},
  enableIcon = false,
  style = {},
  currentValue = undefined,
}) {
  const [value, setValue] = useState(initial);
  const navigation = useNavigation();

  useEffect(() => {
    // console.log('Change in currentValue', currentValue);
    if (currentValue) {
      setValue(currentValue);
    }
  }, [currentValue]);

  return (
    <View
      style={[
        horizontal ? GStyles.flexRow : GStyles.flexColumn,
        { backgroundColor: AppColors.Transparent },
      ]}
    >
      {data.map(optionItem => {
        return (
          <View
            style={[
              GStyles.flexRow,
              {
                justifyContent: 'space-between',
                paddingVertical: Spacing.large,
              },
              style,
            ]}
            key={optionItem.key}
          >
            <Pressable
              onPress={() => {
                if (editable) {
                  setValue(optionItem.key);
                  onSelected(optionItem);
                }
              }}
              style={[GStyles.radiocontainer, {}]}
            >
              <Fragment>
                <View
                  rippleColor={AppColors.DarkGrey}
                  style={GStyles.radioCircle}
                >
                  <View>
                    {value === optionItem.key && (
                      <View style={GStyles.selectedRb} />
                    )}
                  </View>
                </View>

                <Text
                  style={{
                    ...GStyles.radioText,
                    fontSize: 18,
                    fontFamily: AppFonts.CalibriBold,
                    color: AppColors.MediumGrey,
                  }}
                >
                  {optionItem.text}
                </Text>
              </Fragment>
            </Pressable>

            {optionItem.text !== 'None' &&
              optionItem.key !== 1 &&
              optionItem.key !== 3 &&
              enableIcon && (
                <Ripple
                  rippleContainerBorderRadius={10}
                  style={{ padding: 10 }}
                  onPress={() => {
                    navigation.navigate('EditContactsScreen', {
                      groupSelected: optionItem,
                    });
                  }}
                >
                  {RightComponent}
                </Ripple>
              )}
          </View>
        );
      })}
    </View>
  );
}
