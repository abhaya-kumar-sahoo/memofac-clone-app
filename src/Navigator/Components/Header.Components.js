import React, { Component } from 'react';
import { AppFonts } from '../../assets/fonts/AppFonts';

export const HeaderNone = { headerShown: false };

export function CustomHeader(title = '', headerTintColor, headerbg, elevation) {
  return {
    headerTitle: title,
    headerStyle: {
      // backgroundColor: headerbg,
      elevation: elevation ? elevation : 0,
    },
    // headerTintColor: headerTintColor,
    headerTitleStyle: {
      fontWeight: 'bold',
      fontFamily: AppFonts.CalibriBold,
    },
  };
}
