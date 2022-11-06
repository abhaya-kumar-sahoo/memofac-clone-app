import React, { Component, useRef } from 'react';
import { FlatList, View, SafeAreaView } from 'react-native';
import {
  AppDimens,
  GStyles,
  Spacing,
  VertSpace,
} from '../../../shared/Global.styles';
import { AddIcon, DoneFillIcon } from '../../../shared/Icon.Comp';
import { Container } from '../../../components/Mini';
import { AppColors } from '../../../assets/AppColors';
import Ripple from 'react-native-material-ripple';
import { useNavigation } from '@react-navigation/core';
import { GetGalleryImageseApiCall } from '../../../redux/sagas/UserProfile/userProfile.request';
import { useSelector } from 'react-redux';
import { ImageGridView } from '../ImageGridView';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { GridImage } from 'screens/Wishlist/WishListImageGallery';

export const IMAGE_GRID_SIZE = AppDimens.width * 0.3;

export const ImageGallery = ({ userId }) => {
  const userAuth = useSelector(state => state.userAuth);
  const Navigation = useNavigation();
  const [galleryImages, setgalleryImages] = React.useState([]);
  const [pageLoading, setPageLoading] = React.useState(true);
  const isCancel = useRef(false);
  const getGalleryImages = () => {
    GetGalleryImageseApiCall(userAuth.userToken, userId)
      .then(response => {
        if (!isCancel.current) {
          let slicedImages = [...response.content];
          if (userId == userAuth.userData.id) {
            slicedImages.unshift({ image: '' });
          }

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

  React.useEffect(() => {
    getGalleryImages();

    return () => {
      isCancel.current = true;
    };
  }, []);

  let newJson = galleryImages.map(rec => {
    return {
      url: rec.image,
    };
  });

  return (
    <SafeAreaView style={GStyles.Dark}>
      <Container padding={5}>
        {pageLoading ? (
          <>
            <VertSpace size={Spacing.xxlarge} />
            <SkeletonContent
              containerStyle={{}}
              boneColor={AppColors.RecomBoneDark}
              highlightColor={AppColors.SkeletonBone}
              isLoading={pageLoading}
              layout={GridImage}
            />
          </>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            columnWrapperStyle={{
              flex: 1,
              justifyContent: 'space-around',
            }}
            data={galleryImages}
            ListFooterComponent={<VertSpace size={Spacing.xxlarge} />}
            ListHeaderComponent={<VertSpace size={Spacing.xxlarge} />}
            ItemSeparatorComponent={() => <VertSpace size={8} />}
            renderItem={({ item, index, separators }) => {
              if (item.image === '') {
                return (
                  <Ripple
                    onPress={() => {
                      Navigation.navigate('RecaptureActivity');
                    }}
                    style={{
                      width: IMAGE_GRID_SIZE,
                      height: IMAGE_GRID_SIZE,
                      borderRadius: IMAGE_GRID_SIZE / 4,
                      backgroundColor: AppColors.RecomBoneDark,
                      ...GStyles.containView,
                    }}
                  >
                    <AddIcon color={AppColors.disableColor} />
                  </Ripple>
                );
              } else if (item.image === null) {
                return (
                  <View
                    style={{
                      width: IMAGE_GRID_SIZE,
                      height: IMAGE_GRID_SIZE,
                      borderRadius: IMAGE_GRID_SIZE / 4,
                      backgroundColor: AppColors.Transparent,
                      ...GStyles.containView,
                    }}
                  />
                );
              } else {
                return (
                  <ImageGridView
                    onPress={() =>
                      Navigation.navigate('ImageViewScreen', {
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
        )}
      </Container>
    </SafeAreaView>
  );
};
