/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect} from 'react';
import {FlatList, View, SafeAreaView} from 'react-native';
import {AppDimens, GStyles, Spacing, VertSpace} from 'shared/Global.styles';
import {Container} from 'components/Mini';
import {AppColors} from 'assets/AppColors';
import {useNavigation} from '@react-navigation/core';
import {useSelector} from 'react-redux';
import {getWishlistGallery} from 'redux/sagas/wishlist/request';
import {ImageGridView} from 'screens/GalleryPicker/ImageGridView';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

const IMAGE_GRID_SIZE = AppDimens.width * 0.3;

export const WishListImageGallery = ({userId}) => {
  const userAuth = useSelector(state => state.userAuth);
  const navigation = useNavigation();
  const [galleryImages, setgalleryImages] = useState([]);
  const [loading, setPageLoading] = useState(true);
  const isCancel = useRef(false);
  const getGalleryImages = () => {
    getWishlistGallery(userAuth.userToken)
      .then(response => {
        if (!isCancel.current) {
          let slicedImages = [...response.content];

          let dummyArray = new Array(3 - (slicedImages.length % 3)).fill({
            image: null,
          });

          slicedImages.push(...dummyArray);
          setgalleryImages(slicedImages);
          setPageLoading(false);
        }
      })
      .catch(error => {});
  };

  useEffect(() => {
    getGalleryImages();
    return () => {
      isCancel.current = true;
    };
  }, []);

  var newJson = galleryImages.map(rec => {
    return {
      url: rec.image,
    };
  });

  return (
    <SafeAreaView style={GStyles.Dark}>
      <Container padding={5}>
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          columnWrapperStyle={{
            flex: 1,
            justifyContent: 'space-around',
          }}
          data={galleryImages}
          ListFooterComponent={
            <>
              <SkeletonContent
                containerStyle={{}}
                boneColor={AppColors.RecomBoneDark}
                highlightColor={AppColors.SkeletonBone}
                isLoading={loading}
                layout={GridImage}
              />
              <VertSpace size={Spacing.xxlarge} />
            </>
          }
          ListHeaderComponent={<VertSpace size={Spacing.xxlarge} />}
          ItemSeparatorComponent={() => <VertSpace size={8} />}
          renderItem={({item, index, separators}) => {
            if (item.image === null) {
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
            } else {
              return (
                <ImageGridView
                  onPress={() =>
                    navigation.navigate('ImageViewScreen', {
                      imagesList: newJson,
                      clickedImageIndex: index,
                    })
                  }
                  requiredLoader={false}
                  selectable={false}
                  item={item}
                  imageUrl={item.image}
                />
              );
            }
          }}
        />
      </Container>
    </SafeAreaView>
  );
};

export const GridImage = [
  {
    marginBottom: 20,

    children: Array(4).fill({
      flexDirection: 'row',
      marginBottom: 20,
      justifyContent: 'space-between',
      children: [
        {
          width: IMAGE_GRID_SIZE,
          height: IMAGE_GRID_SIZE,
          borderRadius: IMAGE_GRID_SIZE / 4,
          marginHorizontal: 2,
        },
        {
          width: IMAGE_GRID_SIZE,
          height: IMAGE_GRID_SIZE,
          borderRadius: IMAGE_GRID_SIZE / 4,
          marginHorizontal: 2,
        },
        {
          width: IMAGE_GRID_SIZE,
          height: IMAGE_GRID_SIZE,
          borderRadius: IMAGE_GRID_SIZE / 4,
          marginHorizontal: 2,
        },
      ],
    }),
  },
];
