import React from 'react';
import {
  View,
  Modal,
  Alert,
  BackHandler,
  Dimensions,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { AppColors } from '../../assets/AppColors';
import ImageViewer from 'react-native-image-zoom-viewer';
import { AppHeader } from '../../components/AppHeader';
import { useNavigation } from '@react-navigation/native';
import { AppButton } from 'components/AppButton';
import { useSelector } from 'react-redux';
import { GStyles } from 'shared/Global.styles';
import { BackArrowIcon } from 'shared/Icon.Comp';

export const MultipleImageViewScreen = ({ route }) => {
  const { imagesList = [], clickedImageIndex = 0 } = route.params;
  const [visible, setvisible] = React.useState(true);
  const nav = useNavigation();
  const refImageList = React.useRef(null);

  const imagesListArray = imagesList?.map(item => ({ url: item })) || [];

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
