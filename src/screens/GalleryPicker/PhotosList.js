// import CameraRoll from '@react-native-community/cameraroll';
import React, { Component, Fragment } from 'react';
import {
  FlatList,
  Image,
  TouchableOpacity,
  Pressable,
  View,
  SafeAreaView,
} from 'react-native';
import { showToast } from 'shared/Functions/ToastFunctions';
import Carousel from 'react-native-snap-carousel';
import { AppColors } from '../../assets/AppColors';
import { AppHeader, DropdownHeader } from '../../components/AppHeader';
import { NextButton } from '../../components/Mini';
import {
  AppDimens,
  FontSize,
  GStyles,
  Spacing,
  VertSpace,
} from '../../shared/Global.styles';

import PaginationDot from 'react-native-animated-pagination-dot';
import { useNavigation } from '@react-navigation/native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { Skeletons } from '../../shared/Skeletons';
import { GetAlbumPhoto } from './Components/GalleryFunctions';
import { CancelIcon, CropIcon } from '../../shared/Icon.Comp';
import { ActivityIndicator } from 'react-native-paper';
import { ImageGridView } from './ImageGridView';

export const getPhotosFromAlbum = (groupname = '', after = '0', first = 20) => {
  return null;
 
  // return CameraRoll.getPhotos({
  //   // first,
  //   // groupName: '',
  //   // groupTypes: 'Album',
  //   // after,
  //   first: first == 0 ? 20 : first,
  //   after: after,
  //   assetType: 'Photos',
  //   groupTypes: 'Album',
  //   groupName: groupname,
  // }).then(response => {
  //   return response;
  // });
};

export function PhotosList({ route }) {
  const navigation = useNavigation();
  const { navigate } = { ...navigation };
  const [pickerType, setpickerType] = React.useState('multiple');
  const [AlbumArrayData, setAlbumArrayData] = React.useState([]);
  const [photoLoader, setphotoLoader] = React.useState(true);
  const [galleryImages, setGalleryImages] = React.useState([]);
  const [SelectedImages, setSelectedImages] = React.useState([]);
  const [ActiveState, setActiveState] = React.useState(0);
  const [AlbumName, setAlbumName] = React.useState('All');
  const carouselRef = React.useRef(null);
  const endCursorRef = React.useRef('0');
  const hasNextPage = React.useRef(false);
  const nav = useNavigation();

  React.useEffect(() => {
    const { pickerType, routeName } = route.params;
    setpickerType(pickerType);
  }, []);

  React.useEffect(() => {
    getPhotosFromAlbum(null).then(response => {
      setphotoLoader(false);
      setGalleryImages(response.edges);
      // endCursorRef.current = response.page_info.end_cursor;
    });
  }, []);

  React.useEffect(() => {
    const AllPicIndicator = Image.resolveAssetSource(
      require('../../assets/images/MemofacLogo.png'),
    );

    CameraRoll.getAlbums({ assetType: 'Photos' })
      .then(response =>
        response.map(albumData => {
          const Datatoget = GetAlbumPhoto(albumData.title);
          Datatoget.then(data => {
            albumData.thumbnail = data.node.image.uri;
            return albumData;
            // return data;
          });
          return albumData;
        }),
      )
      .then(responseData => {
        responseData.unshift({
          count: 0,
          thumbnail: AllPicIndicator.uri,
          title: 'All',
        });
        setAlbumArrayData(responseData);
      });
  }, []);

  const CollectSelectedImages = (item, index, checkedvalue) => {
    var newSelectedImages = [...SelectedImages];
    if (newSelectedImages.indexOf(item.node.image.uri) === -1) {
      if (newSelectedImages.length >= 25) {
        showToast('Cannot select more than 25');
      } else {
        newSelectedImages.unshift(item.node.image.uri);
      }
    } else {
      newSelectedImages.splice(
        newSelectedImages.indexOf(item.node.image.uri),
        1,
      );
    }
    setSelectedImages(newSelectedImages);
    // crollToItem(at: index, at: .top, animated: true)

    carouselRef?.current?.snapToItem({ index: 0, Animated: true });
  };

  // GET SELECTED ALBUM
  React.useEffect(() => {
    if (route.params?.selectedGroup) {
      setphotoLoader(true);
      setAlbumName(route.params.selectedGroup.title);

      const SelectedAlbumname =
        route.params.selectedGroup.title === 'All'
          ? null
          : route.params.selectedGroup.title;
      getPhotosFromAlbum(
        SelectedAlbumname,
        '0',
        route.params.selectedGroup.count,
      ).then(response => {
        setGalleryImages(response.edges);
        endCursorRef.current = '0';
        setphotoLoader(false);
      });
    } else {
    }
  }, [route.params?.selectedGroup]);

  const CropPhoto = imagedata => {
    navigate('CropPhoto', { imagedata });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.white }}>
      <AppHeader enableBack>
        <NextButton
          disabled={false}
          title={
            pickerType !== 'ProfilePicture' && SelectedImages.length == 0
              ? 'Skip'
              : 'Next'
          }
          onPress={() =>
            nav.navigate('RecaptureActivity', {
              selectedImages: SelectedImages,
            })
          }
        />
      </AppHeader>
      {SelectedImages.length !== 0 && pickerType !== 'ProfilePicture' && (
        <Fragment>
          <View>
            <Carousel
              firstItem={0}
              containerCustomStyle={{
                transform: [{ scaleX: -1 }],
                height: 200,
              }}
              columnWrapperStyle={{ backgroundColor: AppColors.LightGrey }}
              ref={carouselRef}
              layout={'stack'}
              style={{ backgroundColor: AppColors.blue, height: 300 }}
              // contentContainerStyle={{ backgroundColor: 'red' }}
              data={SelectedImages}
              renderItem={({ item, index }) => {
                return (
                  <CarouselRenderItem
                    item={item}
                    index={index}
                    onCrop={() => CropPhoto(item)}
                    onRemove={() => {
                      let tempImages = [...SelectedImages];
                      tempImages = tempImages.filter(
                        (_, imageIndx) => imageIndx !== index,
                      );
                      setSelectedImages(tempImages);
                    }}
                  />
                );
              }}
              itemHeight={200}
              sliderHeight={200}
              sliderWidth={AppDimens.width}
              itemWidth={200}
              onSnapToItem={index => setActiveState(index)}
              inactiveSlideOpacity={1}
              inactiveSlideShift={100}
              inactiveSlideScale={0.5}
              //behaviour
              // enableMomentum
            />
          </View>

          <VertSpace size={Spacing.xxlarge} />
          <View
            style={{
              width: '100%',
              height: 50,
              backgroundColor: AppColors.Transparent,
              alignItems: 'center',
              paddingTop: 10,
            }}
          >
            <PaginationDot
              activeDotColor={AppColors.MediumGrey}
              curPage={SelectedImages.length - ActiveState - 1}
              maxPage={SelectedImages.length}
              sizeRatio={1.0}
            />
          </View>
        </Fragment>
      )}

      <View style={{ paddingHorizontal: Spacing.xxlarge }}>
        <DropdownHeader
          onHeaderPress={() => {
            nav.navigate('Gallery', {
              albumData: AlbumArrayData,
            });
          }}
          title={`${AlbumName} ${AlbumName == 'All' ? 'Photos' : ''}`}
        />
        <SkeletonContent
          containerStyle={{ marginTop: 20 }}
          highlightColor={AppColors.SkeletonBone}
          boneColor={AppColors.VeryLightGrey}
          isLoading={photoLoader}
          layout={new Array(8).fill(Skeletons.PhotoGrid)}
        />

        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          numColumns={3}
          columnWrapperStyle={{
            flex: 1,
            justifyContent: 'space-around',
          }}
          ListFooterComponent={<VertSpace size={200} />}
          data={galleryImages}
          ItemSeparatorComponent={() => <VertSpace size={20} />}
          onEndReachedThreshold={0.8}
          onEndReached={() => {
            if (galleryImages.length !== 0) {
              getPhotosFromAlbum(
                AlbumName === 'All' ? null : AlbumName,
                endCursorRef.current,
              ).then(response => {
                hasNextPage.current = response.page_info.has_next_page;
                setGalleryImages([...galleryImages, ...response.edges]);

                endCursorRef.current = response.page_info.end_cursor;
                // setphotoLoader(false);
              });
            }
            // getPosts();
          }}
          renderItem={({ item, index, separators }) => (
            <ImageGridView
              selectable={pickerType !== 'single'}
              isSelected={SelectedImages.indexOf(item.node.image.uri) !== -1}
              item={item}
              requiredLoader={false}
              imageUrl={item.node.image.uri}
              onPress={checkedvalue => {
                const { routeName } = route.params;
                if (pickerType === 'single') {
                  nav.navigate(routeName, { imageList: [item.node.image.uri] });
                } else {
                  CollectSelectedImages(item);
                }
              }}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const ImageOptionsView = ({ onRemove = () => {}, onCrop = () => {} }) => {
  return (
    <View style={{ position: 'absolute', zIndex: 20, right: 0 }}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#00000011',
          borderRadius: 30,
          padding: 10,
        }}
      >
        <TouchableOpacity onPress={() => onRemove()} style={{ padding: 10 }}>
          <CancelIcon size={FontSize.medium} color={AppColors.white} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onCrop()} style={{ padding: 10 }}>
          <CropIcon size={FontSize.medium} color={AppColors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export const CarouselRenderItem = ({
  item,
  index,
  onRemove = () => {},
  onCrop = () => {},
}) => {
  return (
    <View
      style={{
        backgroundColor: AppColors.white,
        width: 200,
        height: 200,
        borderRadius: 30,
        transform: [{ scaleX: -1 }],
      }}
    >
      <View
        style={{
          backgroundColor: AppColors.VeryLightGrey,
          width: 200,
          height: 200,
          borderRadius: 30,
          borderWidth: 5,
          borderColor: AppColors.white,
        }}
      >
        <ImageOptionsView onCrop={onCrop} onRemove={onRemove} />
        <Image
          resizeMethod={'auto'}
          resizeMode={'cover'}
          style={{
            position: 'absolute',
            width: 190,
            height: 190,
            borderRadius: 26,
          }}
          source={{ uri: item }}
        />
      </View>
    </View>
  );
};
