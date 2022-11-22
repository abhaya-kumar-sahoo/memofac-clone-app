/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {AppColors} from '../../../assets/AppColors';
import {AppFonts} from '../../../assets/fonts/AppFonts';
import {
  AppDimens,
  FontSize,
  Spacing,
  VertSpace,
} from '../../../shared/Global.styles';

export const PrimaryGroupList = ({onPress = () => {}, ListData = []}) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{maxHeight: AppDimens.height * 0.6, padding: 10}}>
      {ListData.map((item, index) => {
        // var SecondaryList = item.secondaryList
        //   .map(function (folder) {
        //     return folder.name;
        //   })
        //   .join(',');

        return (
          <TouchableOpacity onPress={() => onPress(index)}>
            <Text style={styles.primaryNames}>{item.name}</Text>

            {/* <Text numberOfLines={1} style={styles.secondaryNames}>
              {SecondaryList}
            </Text> */}

            <VertSpace size={Spacing.xxlarge} />
          </TouchableOpacity>
        );
      })}

      <VertSpace />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  foldercontainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  primaryNames: {
    lineHeight: FontSize.inputText,
    fontSize: FontSize.inputText,
    color: AppColors.MediumGrey,
    fontFamily: AppFonts.CalibriBold,
  },
  secondaryNames: {
    // width: '60%',
    fontSize: FontSize.medium,
    color: AppColors.LightGrey,
    fontFamily: AppFonts.CalibriBold,
  },
});
