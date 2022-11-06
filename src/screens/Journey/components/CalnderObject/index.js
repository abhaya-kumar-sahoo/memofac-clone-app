import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { AppFonts } from '../../../../assets/fonts/AppFonts';
import { FontSize } from '../../../../shared/Global.styles';
import { CalenderViewIcon } from '../../../../shared/Icon.Comp';
import { styles } from '../../Journey.style';

export const CalenderObject = ({ date = 23, month = 'July', year = 21 }) => {
  return (
    <View>
      {/* CALENDER */}
      <CalenderViewIcon size={150} />
      {/* DATE */}
      <View style={styles.dateviewContainer}>
        <Text
          style={{
            fontSize: 50,
            marginTop: 35,
            fontFamily: AppFonts.CalibriRegular,
          }}
        >
          {date}
        </Text>
        <Text style={{ fontSize: FontSize.short, marginTop: 30 }}>
          {month}, {year}
        </Text>
      </View>
    </View>
  );
};
