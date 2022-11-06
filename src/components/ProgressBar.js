import { AppColors } from 'assets/AppColors';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppDimens, GStyles } from 'shared/Global.styles';

export const Progressbar = ({ done }) => {
  return (
    <View style={[GStyles.flexRowCenter, styles.progressbarMain]}>
      <View style={styles.progressbar}>
        <View style={[styles.progressbarDone, { width: 100 }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressbar: {
    position: 'absolute',
    bottom: 30,
    width: AppDimens.width * 0.8,
    height: 2,
    backgroundColor: AppColors.Red1,
    zIndex: 100,
  },
  progressbarMain: {
    position: 'absolute',
    bottom: 30,
    width: AppDimens.width,
    height: 20,
    backgroundColor: AppColors.Transparent,
    zIndex: 100,
  },
  progressbarDone: {
    width: 0,
    height: 2,
    backgroundColor: AppColors.LowDark1,
  },
});
