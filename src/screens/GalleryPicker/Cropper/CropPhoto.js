import { useNavigation } from '@react-navigation/core';
import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
// import AmazingCropper from 'react-native-amazing-cropper';
import { showToast } from 'shared/Functions/ToastFunctions';

export const CropPhoto = ({ route }) => {
  const navigation = useNavigation();
  const { imagedata } = { ...route.params };
  const { uri, width, height } = { ...imagedata };

  const onDone = croppedImageUri => {
    const { routeName = '' } = route.params;
    if (routeName.length > 0) {
      navigation.navigate(routeName, { croppedImageUri });
    }
  };

  const onError = err => {
    showToast('Somethings wrong: Try again');
  };

  const onCancel = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'wheat' }}>
      {/* <AmazingCropper
        onDone={onDone}
        onError={onError}
        onCancel={onCancel}
        imageUri={uri}
        imageWidth={width}
        imageHeight={height}
        NOT_SELECTED_AREA_OPACITY={0.3}
        BORDER_WIDTH={20}
      /> */}
    </SafeAreaView>
  );
};
