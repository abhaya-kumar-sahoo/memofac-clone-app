// import CameraRoll from '@react-native-community/cameraroll';
import React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import { showToast } from 'shared/Functions/ToastFunctions';
import { AppColors } from 'assets/AppColors';
import { AppHeader, DropdownHeader, ModalHeader } from 'components/AppHeader';
import { NextButton } from 'components/Mini';
import { AppDimens, Spacing, VertSpace } from 'shared/Global.styles';
import { useNavigation } from '@react-navigation/native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { Skeletons } from 'shared/Skeletons';
import { getPhotosFromAlbum } from 'screens/GalleryPicker/PhotosList';
import { GetAlbumPhoto } from 'screens/GalleryPicker/Components/GalleryFunctions';
import { copyImageList } from 'redux/reducers/Post/photoEdit.reducer';
import { useDispatch, useSelector } from 'react-redux';
import {
  askForStorageSettings,
  StoragePermissionContainer,
} from 'components/ExternalStoragePermission';
import { checkStoragePermission } from 'shared/Permission';
import { RESULTS } from 'react-native-permissions';
import { hp } from 'shared/dimens';
import { IMAGE_GRID_SIZE } from 'screens/GalleryPicker/MyGallery/ImageGallery';
import { Portal, Modal } from 'react-native-paper';
import { AppFonts } from 'assets/fonts/AppFonts';
import { AlbumThumbNail } from 'screens/GalleryPicker/Components/Albums.View';
import { BlankView } from './BlankView';
import { PictureSelection } from './PictureSelection';
import { ImageGridView } from 'screens/GalleryPicker/ImageGridView';

const AlbumSelectModal = ({
  AlbumArrayData,
  AlbumName,
  onSelectGroup = () => {},
}) => {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          contentContainerStyle={{
            backgroundColor: 'white',
            width: AppDimens.width * 0.9,
            borderRadius: 30,
          }}
        >
          <View
            style={{
              height: hp(600),
              borderRadius: 30,
              backgroundColor: AppColors.white,
              paddingHorizontal: Spacing.large,
            }}
          >
            <ModalHeader enableBack onBackPress={hideModal}>
              {/* <AccentButton
                    disabled={false}
                    title="Done"
                    onPress={() => {
                      onSubmit(Country);
                      onclose();
                    }}
                  /> */}
            </ModalHeader>

            <View>
              {/* <WhiteFadeView reverse style={Styles.headerView}> */}
              {/* <VertSpace size={30} /> */}
              <Text
                style={{
                  fontFamily: AppFonts.CalibriBold,
                  color: AppColors.DarkGrey,
                  fontSize: Spacing.xxlarge,
                }}
              >
                Select Folder
              </Text>
              {/* </WhiteFadeView> */}
            </View>

            {/* LIST OF ALBUMS */}
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* SPACE ADDITION */}
              <VertSpace size={60} />
              {/* LOOPING THROUGH THE ALBUMS RESPONSES */}
              {AlbumArrayData.map((item, index) => (
                <AlbumThumbNail
                  key={index.toString()}
                  albumData={item}
                  onPress={() => {
                    hideModal();
                    onSelectGroup(item);
                  }}
                />
              ))}

              <VertSpace size={50} />
            </ScrollView>
          </View>
        </Modal>
      </Portal>

      <DropdownHeader
        onHeaderPress={showModal}
        title={`${AlbumName} ${AlbumName == 'All' ? 'Photos' : ''}`}
      />
    </>
  );
};

export function RecapturePhotoList({ route }) {
  const [permissionState, setPermissionState] = React.useState({
    isPermissionGranted: null,
    result: null,
  });
  const [imagesList, setImagesList] = React.useState(new Map());
  const [AlbumArrayData, setAlbumArrayData] = React.useState([]);
  const [photoLoader, setphotoLoader] = React.useState(true);
  const [galleryImages, setGalleryImages] = React.useState([]);
  const [SelectedImages, setSelectedImages] = React.useState([]);
  const [AlbumName, setAlbumName] = React.useState('All');
  const carouselRef = React.useRef(null);
  const endCursorRef = React.useRef('0');
  const cropImageindexRef = React.useRef(0);
  const hasNextPage = React.useRef(false);
  const renderNumberRef = React.useRef(0);
  const photosListRef = React.useRef([]);
  const entryNumberRef = React.useRef(0);
  const nav = useNavigation();
  const { memoListParams, notesParam } = { ...route.params };

  const getAllAlbumData = () => {
    const AllPicIndicator = Image.resolveAssetSource(
      require('../../../../assets/images/MemofacLogo.png'),
    );

    // CameraRoll.getAlbums({ assetType: 'Photos' })
    //   .then(response =>
    //     response.map(albumData => {
    //       const Datatoget = GetAlbumPhoto(albumData.title);
    //       Datatoget.then(data => {
    //         albumData.thumbnail = data.node.image.uri;
    //         return albumData;
    //         // return data;
    //       });
    //       return albumData;
    //     }),
    //   )
    //   .then(responseData => {
    //     responseData.unshift({
    //       count: 0,
    //       thumbnail: AllPicIndicator.uri,
    //       title: 'All',
    //     });
    //     setAlbumArrayData(responseData);
    //   });
  };

  const setImageListdata = (data = []) => {
    const newListdata = [...photosListRef.current, ...data];
    photosListRef.current = newListdata;
    const dummyArray = new Array(3 - (newListdata.length % 3)).fill({
      node: { image: null },
    });

    setGalleryImages([...newListdata, ...dummyArray]);
  };
  const getAllPhotos = () => {
    renderNumberRef.current = renderNumberRef.current + 1;
    getPhotosFromAlbum(null).then(response => {
      hasNextPage.current = response.page_info.has_next_page;
      endCursorRef.current = response.page_info.end_cursor;
      setphotoLoader(false);
      setImageListdata(response.edges);
    });
  };

  React.useEffect(() => {
    checkStoragePermission().then(response => {
      setPermissionState(response);

      if (response.result === RESULTS.BLOCKED) {
        askForStorageSettings();
      }
      if (response.isPermissionGranted) {
        getAllAlbumData();
        getAllPhotos();
      }
    });
  }, []);

  const selectedImagesList = Object.fromEntries(imagesList);

  const displayImageList = Object.values(selectedImagesList)
    .map(item => item)
    .sort((a, b) => a.entry > b.entry);

  // console.log({ displayImageList, selectedImagesList });
  const CollectSelectedImages = (item, index) => {
    const { uri } = { ...item.node.image };
    const indexValue = index.toString();

    if (imagesList.has(indexValue)) {
      let newImageList = { ...selectedImagesList };
      delete newImageList[indexValue];
      setImagesList(new Map(Object.entries(newImageList)));
    } else {
      entryNumberRef.current = entryNumberRef.current + 1;
      const entry = entryNumberRef.current;
      setImagesList(
        new Map(
          imagesList.set(indexValue, {
            uri,
            cropped: uri,
            entry,
          }),
        ),
      );
    }

    // carouselRef.current.snapToLast();
  };

  const onRemove = item => {
    // console.log(item);

    let newImageList = { ...selectedImagesList };
    delete newImageList[item.entry];
    setImagesList(new Map(Object.entries(newImageList)));
  };

  const CropPhoto = (imagedata, index) => {
    cropImageindexRef.current = index;
    Image.getSize(imagedata, (width, height) => {
      nav.navigate('CropPhoto', {
        imagedata: { uri: imagedata, width, height },
        routeName: 'RecapturePhotoList',
      });
    });
  };

  React.useEffect(() => {
    if (route.params?.croppedImageUri) {
      const imageArrayList = [...imageList];
      imageArrayList[cropImageindexRef.current].cropped =
        route.params?.croppedImageUri;
      // dispatch(copyImageList({ dataList: imageArrayList }));
    }
  }, [route.params?.croppedImageUri]);

  // console.log('imageList--> ', imagesList);

  const renderItem = ({ item, index, separators }) => {
    // console.log('is select --> ', imagesList.has(index.toString()));
    if (item.node.image == null) {
      return <BlankView key={index} />;
    } else {
      return (
        <ImageGridView
          key={index}
          index={index}
          selectable={true}
          item={item}
          isSelected={imagesList.has(index.toString())}
          requiredLoader={false}
          onPress={CollectSelectedImages}
        />
      );
    }
  };

  const onEndReached = () => {
    setTimeout(() => {
      if (photosListRef.length !== 0 && renderNumberRef.current !== 0) {
        getPhotosFromAlbum(
          AlbumName === 'All' ? '' : AlbumName,
          endCursorRef.current,
        ).then(response => {
          setImageListdata(response.edges);
          //  setGalleryImages([...galleryImages, ...response.edges]);
          hasNextPage.current = response.page_info.has_next_page;
          endCursorRef.current = response.page_info.end_cursor;
        });
      }
    }, 100);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.white }}>
      <AppHeader enableBack>
        <NextButton
          disabled={false}
          title={displayImageList.length == 0 ? 'Skip' : 'Next'}
          onPress={() =>
            nav.navigate('RecaptureActivity', {
              imageSelectedList: displayImageList,
              notesParam,
              memoListParams,
            })
          }
        />
      </AppHeader>

      <StoragePermissionContainer
        permissionState={permissionState}
        onStateChange={({ isPermissionGranted, statuses }) => {
          setPermissionState({
            isPermissionGranted,
            result: statuses[Object.keys(statuses)[0]],
          });
        }}
        onPermissionGrated={() => {
          getAllAlbumData();
          getAllPhotos();
        }}
      >
        {/* <PictureSelection
          imageList={displayImageList}
          carouselRef={carouselRef}
          onRemove={onRemove}
          onCrop={() => {
            // CropPhoto(imageList[index], index);
          }}
        /> */}

        <View style={{ paddingHorizontal: 10 }}>
          <AlbumSelectModal
            AlbumArrayData={AlbumArrayData}
            AlbumName={AlbumName}
            onSelectGroup={selectedGroupItem => {
              renderNumberRef.current = 0;
              photosListRef.current = [];
              setGalleryImages([]);
              setphotoLoader(true);
              setAlbumName(selectedGroupItem.title);
              const SelectedAlbumname =
                selectedGroupItem.title === 'All'
                  ? null
                  : selectedGroupItem.title;

              getPhotosFromAlbum(
                SelectedAlbumname,
                '0',
                selectedGroupItem.count,
              ).then(response => {
                setImageListdata(response.edges);
                endCursorRef.current = '0';
                setphotoLoader(false);
              });
            }}
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
              justifyContent: 'space-around',
            }}
            style={{ height: hp(760) }}
            ListFooterComponent={
              <VertSpace size={SelectedImages.length > 0 ? 500 : 200} />
            }
            data={galleryImages}
            ItemSeparatorComponent={() => <VertSpace size={5} />}
            onEndReachedThreshold={0.8}
            onEndReached={onEndReached}
            renderItem={renderItem}
          />
        </View>
      </StoragePermissionContainer>
    </SafeAreaView>
  );
}
