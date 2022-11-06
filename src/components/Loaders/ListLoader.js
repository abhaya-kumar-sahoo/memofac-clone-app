import React from 'react';
import { AppColors } from 'assets/AppColors';
import { ActivityIndicator, Text, View } from 'react-native';
import { HoriSpace } from 'shared/Global.styles';

export const ListLoader = ({
  message = 'Loading posts',
  when = false,
  style = {},
}) => {
  if (when)
    return (
      <View style={{ padding: 20, flexDirection: 'row', ...style }}>
        <ActivityIndicator color={AppColors.LightGrey} />
        <HoriSpace />
        <Text style={{ color: AppColors.LightGrey }}>{message}</Text>
      </View>
    );
  else return null;
};
