import { AppColors } from 'assets/AppColors';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppDimens, GStyles, Spacing, VertSpace } from 'shared/Global.styles';
import ImagePicker from 'react-native-image-crop-picker';
import { useNavigation } from '@react-navigation/native';
import { AddCirecleIcon, AddDarkIcon, GalleryIcon } from 'shared/Icon.Comp';
import { ImageCropperProps } from 'shared/photoPicker.common';
import Carousel from 'react-native-snap-carousel';
import PaginationDot from 'react-native-animated-pagination-dot';
import { CarouselRenderItem } from 'screens/GalleryPicker/PhotosList';
import { SliderBox } from 'react-native-image-slider-box';
import { wp } from 'shared/dimens';
import { useSelector } from 'react-redux';

const GALLERY_ICON_SIZE = AppDimens.width * 0.5;

export const PhotoSelection = ({ imageList = [], onAddMorePhotos }) => {
  const { navigate } = useNavigation();
  const carouselRef = React.useRef(null);
  const [ActiveState, setActiveState] = React.useState(0);

  const renderItem = ({ item, index }) => {
    return (
      <CarouselRenderItem
        item={item.cropped}
        index={index}
        onCrop={() => {
          ImagePicker.openCropper({
            ...ImageCropperProps,
            path: item.original,
          }).then(image => {
            const imageArrayList = [...imageList];
            imageArrayList[index].cropped = image.path;
            // setImageList(imageArrayList);
          });
        }}
        onRemove={() => {
          let tempDataList = [...imageList].filter(
            (_, imageIndx) => imageIndx !== index,
          );
          // setImageList(tempDataList);
        }}
      />
    );
  };

  const imagesViewList = imageList?.map(item => item);

  return (
    <View>
      {imagesViewList?.length === 0 && (
        <>
          <View style={styles.container}>
            <View style={styles.subContainer}>
              <TouchableOpacity
                style={styles.addButtonStyles}
                onPress={onAddMorePhotos}
              >
                <AddDarkIcon
                  color="white"
                  iconColor={AppColors.DarkGrey}
                  size={44}
                />
              </TouchableOpacity>
              <GalleryIcon
                color={AppColors.Skeleton}
                size={GALLERY_ICON_SIZE}
              />
            </View>
          </View>
        </>
      )}

      {imageList.length !== 0 && (
        <>
          <VertSpace />
          <View>
            <View style={styles.secondContainer}>
              <TouchableOpacity onPress={onAddMorePhotos}>
                <AddDarkIcon
                  size={40}
                  color={AppColors.white}
                  iconColor={AppColors.DarkGrey}
                />
              </TouchableOpacity>
            </View>

            <SliderBox
              paginationBoxVerticalPadding={30}
              dotColor={'transparent'}
              inactiveDotColor={'transparent'}
              sliderBoxHeight={AppDimens.width * 0.85}
              ImageComponentStyle={{
                borderRadius: 20,
                width: AppDimens.width * 0.85,
                backgroundColor: AppColors.greyLight,
              }}
              imageLoadingColor={AppColors.VeryLightGrey}
              dotStyle={{ backgroundColor: 'wheat' }}
              images={imagesViewList}
              // onCurrentImagePressed={onCurrentImagePressed}
              currentImageEmitter={index => {
                setActiveState(index);
                // console.log(`current pos is: ${index}`);
              }}
            />
          </View>

          <View style={{ paddingBottom: 16 }}>
            {imageList.length > 1 && (
              <>
                <View style={styles.paginationContainer}>
                  <PaginationDot
                    activeDotColor={AppColors.MediumGrey}
                    curPage={ActiveState}
                    maxPage={imagesViewList.length}
                    sizeRatio={1.0}
                  />
                </View>
              </>
            )}
          </View>
        </>
      )}
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',

    padding: 16,
  },
  paginationContainer: {
    width: '100%',
    height: 50,
    backgroundColor: AppColors.Transparent,
    alignItems: 'center',
    paddingTop: 10,
  },
  subContainer: {
    borderWidth: 1,
    borderColor: AppColors.MediumGrey,
    borderRadius: 30,
    width: AppDimens.width * 0.86,
    height: AppDimens.width * 0.86,
    ...GStyles.containView,
  },
  addButtonStyles: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  secondContainer: {
    position: 'absolute',
    zIndex: 20,
    left: 43,
    top: 13,
  },
});
