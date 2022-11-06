import { AppColors } from 'assets/AppColors';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { CarouselRenderItem } from 'screens/GalleryPicker/PhotosList';
import { AppDimens, Spacing } from 'shared/Global.styles';
import PaginationDot from 'react-native-animated-pagination-dot';

export const PictureSelection = ({
  imageList = [],
  onRemove = () => {},
  carouselRef = null,
  onCrop = () => {},
}) => {
  const [ActiveState, setActiveState] = React.useState(0);
  const InnerCarouselRef = React.useRef(null);

  React.useImperativeHandle(carouselRef, () => ({
    snapToLast: () => {
      InnerCarouselRef?.current?.snapToItem({ index: 0, Animated: true });
    },
  }));

  const renderItem = ({ item, index }) => {
    return (
      <CarouselRenderItem
        item={item.cropped}
        index={index}
        onCrop={onCrop}
        onRemove={() => onRemove(item)}
      />
    );
  };

  return (
    <View>
      {imageList.length !== 0 && (
        <>
          <View>
            <Carousel
              firstItem={0}
              containerCustomStyle={{
                transform: [{ scaleX: -1 }],
                height: 200,
              }}
              columnWrapperStyle={{ backgroundColor: AppColors.LightGrey }}
              ref={InnerCarouselRef}
              layout={'stack'}
              style={{ backgroundColor: AppColors.blue, height: 300 }}
              data={imageList}
              renderItem={renderItem}
              itemHeight={200}
              sliderHeight={200}
              sliderWidth={AppDimens.width}
              itemWidth={200}
              onSnapToItem={setActiveState}
              inactiveSlideOpacity={1}
              inactiveSlideShift={100}
              inactiveSlideScale={0.5}
              enableMomentum
            />
          </View>

          <View style={styles.paginationContainer}>
            <PaginationDot
              activeDotColor={AppColors.MediumGrey}
              curPage={imageList.length - ActiveState - 1}
              maxPage={imageList.length}
              sizeRatio={1.0}
            />
          </View>
        </>
      )}
    </View>
  );
};

export const styles = StyleSheet.create({
  paginationContainer: {
    width: '100%',
    height: 50,
    backgroundColor: AppColors.Transparent,
    alignItems: 'center',
    paddingTop: 10,
    marginTop: 16,
  },
});
