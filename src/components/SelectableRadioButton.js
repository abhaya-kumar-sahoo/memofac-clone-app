import { AppFonts } from 'assets/fonts/AppFonts';
import React, { Fragment, useState, useEffect } from 'react';
import { Text, View, Pressable } from 'react-native';
import { AppColors } from '../assets/AppColors';

import { AppDimens, FontSize, GStyles, Spacing } from '../shared/Global.styles';

export function SelectableRadioButton({
  data = [],
  initial = 0,
  onSelected,
  editable,
  horizontal = true,
  RightComponent = null,
  RightButtonOnPress = () => {},
  enableIcon = false,
  widthEnable = false,
}) {
  // data -> for passing dropdown data
  // initial -> for
  const [value, setValue] = useState('');

  React.useEffect(() => {
    if (data.length > 0) setValue(data[initial].key);
  }, [data]);

  return (
    <View
      style={[
        horizontal ? GStyles.flexRow : GStyles.flexColumn,
        { backgroundColor: AppColors.Transparent },
      ]}
    >
      {data.map(res => {
        return (
          <View
            style={[
              GStyles.flexRow,
              {
                paddingVertical: Spacing.medium,
              },
            ]}
            key={res.key}
          >
            <Pressable
              onPress={() => {
                if (editable) {
                  setValue(res.key);
                  onSelected(res);
                }
              }}
              style={[
                {
                  backgroundColor:
                    value === res.key ? AppColors.white1 : AppColors.DarkGrey2,
                  paddingHorizontal: 24,
                  paddingVertical: 10,
                  borderRadius: 30,
                  marginRight: 10,
                  width: widthEnable ? AppDimens.width * 0.8 : null,
                  alignItems: widthEnable ? null : 'center',
                },
              ]}
            >
              <Text
                style={{
                  // ...GStyles.radioText,
                  fontSize: FontSize.inputText,
                  fontFamily: AppFonts.CalibriBold,
                  color:
                    value === res.key
                      ? AppColors.DarkGrey2
                      : AppColors.MediumGrey,
                }}
              >
                {res.text}
              </Text>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}
