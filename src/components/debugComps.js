import React from 'react';
import { AppColors } from 'assets/AppColors';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';

export const DebugText = ({ textData }) => {
  const { debugState } = useSelector((state) => state.DebugModeReducer);
  if (debugState)
    return (
      <Text style={{ color: AppColors.LightGrey }}>
        {JSON.stringify(textData)}
      </Text>
    );
  else return null;
};
