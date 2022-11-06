import { AppColors } from 'assets/AppColors';
import { IMAGE_GRID_SIZE } from 'screens/GalleryPicker/MyGallery/ImageGallery';
import { GStyles } from 'shared/Global.styles';
import React from 'react';
import { View } from 'react-native';

export const BlankView = () => {
  return (
    <View
      style={{
        width: IMAGE_GRID_SIZE,
        height: IMAGE_GRID_SIZE,
        borderRadius: IMAGE_GRID_SIZE / 2.9,
        backgroundColor: AppColors.Transparent,
        ...GStyles.containView,
      }}
    />
  );
};
