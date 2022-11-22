/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dimensions, SafeAreaView} from 'react-native';
import {AppColors} from '../../assets/AppColors';
import ImageViewer from 'react-native-image-zoom-viewer';
import {AppHeader} from '../../components/AppHeader';
import {GStyles} from 'shared/Global.styles';

export const MultipleImageViewScreen = ({route}) => {
  const {imagesList = [], clickedImageIndex = 0} = route.params;
  const refImageList = React.useRef(null);

  const imagesListArray = imagesList?.map(item => ({url: item})) || [];

  return (
    <SafeAreaView style={GStyles.Dark}>
      <AppHeader enableBack />

      <ImageViewer
        ref={refImageList}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
          backgroundColor: AppColors.DarkBG,
          marginTop: -100,
        }}
        renderIndicator={() => null}
        index={clickedImageIndex}
        backgroundColor={AppColors.DarkBG}
        imageUrls={imagesListArray}
      />
    </SafeAreaView>
  );
};
