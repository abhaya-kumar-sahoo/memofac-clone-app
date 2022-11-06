import React from 'react';
import {
  View,
  Modal,
  Alert,
  BackHandler,
  Dimensions,
  Image,
  SafeAreaView,
} from 'react-native';
import { AppColors } from '../../assets/AppColors';
import ImageViewer from 'react-native-image-zoom-viewer';
import { AppHeader } from '../../components/AppHeader';
import { useNavigation } from '@react-navigation/native';
import { AppButton } from 'components/AppButton';
import { useSelector } from 'react-redux';
import { GStyles } from 'shared/Global.styles';
export const ImageViewScreen = ({ route }) => {
  const {
    imageUrl = null,
    imagesList = [],
    clickedImageIndex = 0,
  } = route.params;
  const [visible, setvisible] = React.useState(true);
  const nav = useNavigation();
  const refImageList = React.useRef(null);
  // goNext

  return (
    <SafeAreaView style={{ backgroundColor: '#000000', flex: 1 }}>
      <View style={GStyles.Dark}>
        {/* refImageList.current.goNext(); */}
        <AppHeader enableBack />
        {/* <AppButton onPress={() => refImageList.current.goNext()} /> */}
        <View style={GStyles.Dark}>
          <ImageViewer
            ref={refImageList}
            style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
              backgroundColor: AppColors.DarkBG,
            }}
            renderIndicator={() => null}
            index={clickedImageIndex}
            backgroundColor={AppColors.DarkBG}
            imageUrls={imagesList.length > 0 ? imagesList : [{ url: imageUrl }]}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
