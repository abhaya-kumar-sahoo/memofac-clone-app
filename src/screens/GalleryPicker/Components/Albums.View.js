import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { AppColors } from '../../../assets/AppColors';
import { AppFonts } from '../../../assets/fonts/AppFonts';
import { AppDimens, FontSize, HoriSpace } from '../../../shared/Global.styles';

export const AlbumThumbNail = ({ albumData, onPress = () => {} }) => {
  return (
    // RIPPLE CONTAINER
    <Ripple
      key={albumData.title + albumData.count}
      rippleFades
      onPress={() => onPress()}
      style={StylesData.MainView}
    >
      {/* DESIGN VIEW */}
      <View style={StylesData.NestedView}>
        <Image
          resizeMethod="resize"
          resizeMode="cover"
          source={{ uri: albumData.thumbnail }}
          style={StylesData.ImageView}
        />
        <HoriSpace size={10} />
        <View>
          <Text
            ellipsizeMode={'tail'}
            numberOfLines={1}
            style={StylesData.textHeading}
            onPress={() => {}}
          >
            {albumData.title}
            <Text style={{ fontFamily: AppFonts.CalibriBold }}>
              {albumData.count == 0 ? '' : `  (${albumData.count})`}
            </Text>
          </Text>
        </View>
      </View>
    </Ripple>
  );
};

const StylesData = StyleSheet.create({
  MainView: {
    paddingVertical: 10,
    backgroundColor: AppColors.Transparent,
    zIndex: 0,
  },
  NestedView: { flexDirection: 'row', alignItems: 'center' },
  ImageView: {
    width: 60,
    height: 60,
    backgroundColor: AppColors.VeryLightGrey,
    borderRadius: 10,
  },
  textHeading: {
    // width: 100,
    width: AppDimens.width * 0.5,
    // backgroundColor: 'wheat',
    textTransform: 'capitalize',
    fontFamily: AppFonts.CalibriRegular,
    color: AppColors.DarkGrey,
    fontSize: FontSize.xlarge,
  },
});
