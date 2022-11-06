import React, { Component, Fragment, useRef } from 'react';
import {
  Alert,
  Animated,
  Easing,
  BackHandler,
  Pressable,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { AppHeader } from '../../components/AppHeader';
import {
  AppDimens,
  FontSize,
  GStyles,
  HoriSpace,
  Spacing,
  VertSpace,
} from '../../shared/Global.styles';
import { AppFonts } from '../../assets/fonts/AppFonts';
import { AppColors } from '../../assets/AppColors';
import { AccentButton, Container } from '../../components/Mini';
import { SearchBarView, SearchInput } from '../../components/SearchComponent';
import {
  AddDarkIcon,
  BronzeIcon,
  CalenderIcon,
  CancelIcon,
  DoneFillIcon,
  EditIcon,
  GalleryIcon,
  GoldIcon,
  NotesIcon,
  SearchNavIcon,
  ShareIcon,
  SilverIcon,
  StarUnFilledIcon,
} from '../../shared/Icon.Comp';
import { FormFillContainer } from 'components/FormContainer/FormFillContainer';
import { FormFillInput } from '../../components/FormContainer/FormFillInput';
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import { StackActions } from '@react-navigation/routers';
import { GroupSaveModal } from './Components/GroupModal';
import PaginationDot from 'react-native-animated-pagination-dot';
import Carousel from 'react-native-snap-carousel';
import { CarouselRenderItem } from '../GalleryPicker/PhotosList';
import { useState } from 'react';
import { Modal, Portal } from 'react-native-paper';
import { ModalButtons } from 'screens/Timeline/components/MenuOption';
import { useDispatch, useSelector } from 'react-redux';
import {
  GetMainCategoryList,
  RecomMemosApiCall,
} from '../../redux/sagas/Memos/request';
import { RecaptureApiCall } from '../../redux/sagas/post/request';
import Toast from 'react-native-simple-toast';
import { MemoRateView } from './Components/MemoRateView';
import { Gravities, showToast } from 'shared/Functions/ToastFunctions';
import {
  getResizedImage,
  getResizedImageArray,
} from 'shared/Functions/ImageResize';
import { PhotoNames } from 'shared/Data.shared';
import { addPostTimeline } from 'redux/reducers/Timeline/Timeline.reducer';
import { InputText } from 'components/FormContainer/InputText/InputText';
import Ripple from 'react-native-material-ripple';
import {
  clearList,
  copyImageList,
} from 'redux/reducers/Post/photoEdit.reducer';
import {
  setNotesRecapture,
  setRecaptureFormDefault,
  updateMemosList,
} from 'redux/reducers/Modal/SumRecaptcure';
import { APP_APIS } from 'ApiLogic/API_URL';
import ImagePicker from 'react-native-image-crop-picker';
import { ScreenLoader } from 'components/Loaders/ScreenLoader';
import moment from 'moment';
const GALLERY_ICON_SIZE = AppDimens.width * 0.3;

export function RecaptureActivity({ route }) {
  const navigation = useNavigation();
  const { memoData, ratingGiven, groupSelected, notes, MemoArray } =
    useSelector(state => state.MemoVisibilityReducer);
  const cropImageindexRef = React.useRef(0);
  const authData = useSelector(state => state.userAuth);
  const UserDetailsReducer = useSelector(state => state.UserDetailsReducer);
  const { imageList } = useSelector(state => state.photoSelectReducer);
  // const [MemoArray, setMemoArray] = useState([]);
  const [ActiveState, setActiveState] = React.useState(0);
  const [searchText, setsearchText] = React.useState('');
  const folderRef = React.useRef('');

  const [savingPosts, setSavingPosts] = useState(false);
  // const [notes, setnotes] = React.useState('');
  const carouselRef = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  const [CollectionModal, setCollectionModal] = React.useState(false);
  const [CollectionFolders, setCollectionFolders] = React.useState([]);
  const dispatch = useDispatch();

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [SelectButtonGroupId, setSelectButtonGroupId] = React.useState(3);

  // GETTING SSBAXK DAT
  React.useEffect(() => {
    if (imageList) {
      setActiveState(imageList.length - 1);
    }
  }, [imageList]);

  const hasUnsavedChanges =
    route.name === 'RecaptureActivity' &&
    ((notes !== '' && notes) ||
      (MemoArray && MemoArray.length !== 0) ||
      imageList?.length !== 0);

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        if (hasUnsavedChanges) {
          showModal();
        } else {
          navigation.dispatch(StackActions.popToTop());
        }
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', backAction);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, []),
  );

  React.useEffect(() => {
    if (route.params?.memoSelected) {
      const indexAvaialable = MemoArray.findIndex(
        element => element.id === route.params.memoSelected.id,
      );

      if (indexAvaialable == -1) {
        var sampleArray = [];
        sampleArray = [...MemoArray];
        sampleArray.push({ ...route.params?.memoSelected, rate: 0 });

        dispatch(updateMemosList({ MemoArray: sampleArray }));
      } else {
        Toast.showWithGravity('Memo already added', Toast.LONG, Toast.CENTER);
      }
    }
  }, [route.params?.memoSelected]);

  // const CropPhoto = (imagedata, index) => {
  //   cropImageindexRef.current = index;
  //   Image.getSize(imagedata, (width, height) => {
  //     navigate('CropPhoto', {
  //       imagedata: { uri: imagedata, width, height },
  //       routeName: 'RecaptureActivity',
  //     });
  //   }).catch(error => showToast('', error.toString()));
  // };

  // React.useEffect(() => {
  //   if (route.params?.croppedImageUri) {
  //     const imageArrayList = [...imageList];
  //     imageArrayList[cropImageindexRef.current].cropped =
  //       route.params?.croppedImageUri;
  //     dispatch(copyImageList({ dataList: imageArrayList }));
  //   }
  // }, [route.params?.croppedImageUri]);

  const timestamp = new Date();

  const getCollectionArray = (data = []) => {
    let newArray = [];
    newArray = data.map(primaryData => {
      let secondary_id = primaryData.secondary.map(secondary => secondary.id);
      return {
        id: primaryData.id,
        secondary_id,
      };
    });
    return newArray;
  };

  const PostValidation =
    imageList.length == 0 &&
    MemoArray.length == 0 &&
    (notes === undefined || notes.length === 0);

  const RecapturePost = async () => {
    let Folders = [];
    if (PostValidation) {
      showToast('Please share something to post');
    } else {
      setSavingPosts(true);

      const resizedImage = await getResizedImageArray(
        imageList.map(data => data.cropped),
      );

      const formdata = new FormData();
      resizedImage.map(imageData => {
        formdata.append(
          'image[]',
          {
            uri: imageData.uri,
            type: 'image/jpeg',
            name: `${imageData.name}${timestamp}${PhotoNames.RECAPTURE}.jpg`,
          },
          '[PROXY]',
        );
      });

      Folders = getCollectionArray(CollectionFolders);
      formdata.append('token', authData.userToken);
      formdata.append('memo_id', JSON.stringify(MemoArray));
      formdata.append('exp_on', 'Jan 2020');
      formdata.append('share_with', SelectButtonGroupId);
      formdata.append('text', notes ? notes : '');
      formdata.append('primary_folder', JSON.stringify(Folders));
      var requestOptions = {
        method: 'POST',
        body: formdata,
        Headers: { 'Content-Type': 'multipart/form-data' },
        redirect: 'follow',
      };
      // console.log('share with is ---> ' + groupSelected.id);
      // console.log(requestOptions);
      // console.log(formdata, { MemoArray });
      fetch(APP_APIS.RECAPTURE, requestOptions)
        .then(response => response.json())
        .then(result => {
          // console.log('response data ---> ', result);
          setSavingPosts(false);

          navigation.navigate('BottomTabNavigation', {
            screen: 'TimelineScreen',
          });
          showToast('Post created');
          const updated_at = moment().format('YYYY-MM-DD HH:mm:SS');
          dispatch(
            addPostTimeline({
              postData: {
                ...result.content,
                updated_at,
                total_reacts: 0,
                total_comments: 0,
                user_name: authData.userData.name,
                user_image: authData.userData.image,
              },
            }),
          );
        })
        .catch(error => {
          showToast();
          // console.log(error);
          setSavingPosts(false);
        })
        .finally(() => {
          dispatch(clearList());
          dispatch(setRecaptureFormDefault());
        });
    }
  };

  const defaultGroup = 'Public';
  const groupReduxSelect = `${groupSelected.name}  ${
    groupSelected.count ? `(${groupSelected.count})` : ''
  } `;

  return (
    <SafeAreaView style={{ backgroundColor: AppColors.white, flex: 1 }}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          style={{ justifyContent: 'center', alignItems: 'center' }}
          contentContainerStyle={{
            backgroundColor: 'white',
            padding: 20,
            width: AppDimens.width * 0.7,
            borderRadius: 30,
          }}
        >
          <View style={{ alignItems: 'flex-start' }}>
            <Text
              style={{
                fontSize: FontSize.xlarge,
                color: AppColors.LightGrey,
                fontFamily: AppFonts.CalibriBold,
              }}
            >
              Are you sure want to discard this post?
            </Text>
            <VertSpace />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <ModalButtons
                IconVisible={false}
                width={150}
                modalStyle={{ justifyContent: 'flex-start' }}
                title={'Yes'}
                onPress={() => {
                  hideModal();
                  navigation.dispatch(StackActions.popToTop());
                  dispatch(clearList());
                  dispatch(setRecaptureFormDefault());
                }}
              />
              <ModalButtons
                IconVisible={false}
                width={150}
                modalStyle={{}}
                title={'No '}
                ButtonIcon={() => <CancelIcon size={FontSize.large} />}
                onPress={() => {
                  hideModal();
                }}
              />
            </View>
          </View>
        </Modal>
      </Portal>

      <ScreenLoader message="Saving your posts" loading={savingPosts} />
      <AppHeader
        onBackPress={() => {
          if (hasUnsavedChanges) {
            showModal();
          } else {
            navigation.dispatch(StackActions.popToTop());
          }
        }}
        enableBack
        preventDefault={true}
      >
        <AccentButton disabled={PostValidation} onPress={RecapturePost} />
      </AppHeader>

      {/* MAIN COMPONENT */}
      <ScrollView keyboardShouldPersistTaps={'always'}>
        {imageList?.length === 0 && (
          <>
            <View
              style={{
                marginLeft: -Spacing.large,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate('RecapturePhotoList')}
              >
                <AddDarkIcon size={40} />
              </TouchableOpacity>
              <HoriSpace />
              <View
                style={{
                  borderWidth: 1,
                  borderColor: AppColors.MediumGrey,
                  borderRadius: 30,
                  width: 200,
                  height: 200,
                  ...GStyles.containView,
                }}
              >
                <GalleryIcon
                  color={AppColors.LightGrey}
                  size={GALLERY_ICON_SIZE}
                />
              </View>
            </View>
            <VertSpace />
          </>
        )}

        {/* IMAGE LIST */}
        {imageList.length !== 0 && (
          <Fragment>
            <View>
              <View
                style={{
                  position: 'absolute',
                  zIndex: 20,
                  left: 40,
                  top: 70,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('RecapturePhotoList');
                  }}
                >
                  <AddDarkIcon size={40} />
                </TouchableOpacity>
              </View>
              <Carousel
                horizontal
                firstItem={imageList.length - 1}
                containerCustomStyle={{
                  transform: [{ scaleX: -1 }],
                  height: 200,
                }}
                columnWrapperStyle={{ backgroundColor: AppColors.LightGrey }}
                ref={carouselRef}
                layout={'stack'}
                style={{ backgroundColor: AppColors.blue, height: 300 }}
                data={imageList}
                renderItem={({ item, index }) => {
                  return (
                    <CarouselRenderItem
                      item={item.cropped}
                      index={index}
                      onCrop={() => {
                        ImagePicker.openCropper({
                          path: item.original,
                          cropperToolbarTitle: 'Crop Photo',
                          cropperActiveWidgetColor: 'white',
                          cropperStatusBarColor: 'black',
                          cropperToolbarColor: 'black',
                          cropperToolbarWidgetColor: 'white',
                        }).then(image => {
                          const imageArrayList = [...imageList];
                          imageArrayList[index].cropped = image.path;
                          dispatch(copyImageList({ dataList: imageArrayList }));

                          // console.log(image);
                        });
                      }}
                      onRemove={() => {
                        let tempdDataList = [...imageList].filter(
                          (_, imageIndx) => imageIndx !== index,
                        );
                        dispatch(copyImageList({ dataList: tempdDataList }));
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

            <VertSpace size={Spacing.medium} />
            {imageList.length > 1 && (
              <>
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
                    curPage={imageList.length - ActiveState - 1}
                    maxPage={imageList.length}
                    sizeRatio={1.0}
                  />
                </View>
              </>
            )}
          </Fragment>
        )}

        <Container>
          <VertSpace size={Spacing.large} />
          <SearchBarView
            onPress={() => navigation.navigate('SearchMemoScreen')}
          />
          <VertSpace size={30} />
        </Container>

        <Container>
          {MemoArray.map((item, index) => {
            return (
              <View key={item.id.toString()}>
                {/* VERTISPACE */}
                <MemoRateView
                  onRemove={() => {
                    let tempMemoArray = [...MemoArray];
                    tempMemoArray = tempMemoArray.filter(
                      memo => memo.id !== item.id,
                    );
                    dispatch(updateMemosList({ MemoArray: tempMemoArray }));
                  }}
                  ratingGiven={item.rate - 1}
                  imageUrl={item.image || null}
                  memoName={item.title || ''}
                  RateStarSize={30}
                  onRateCallback={index => {
                    // setRating(index + 1);
                    let newMemoArray = [...MemoArray];
                    let position = newMemoArray.findIndex(
                      memoItem => memoItem.id == item.id,
                    );
                    newMemoArray[position].rate = index + 1;
                    dispatch(updateMemosList({ MemoArray: newMemoArray }));
                    // newMemoArray.filter
                  }}
                />
                <VertSpace />
              </View>
            );
          })}

          {/* <FormFillContainer
            LeftComponent={<ShareIcon size={40} />}
            title={'Share with ...'}
            placeholder={
              groupSelected.id != 3 ? groupReduxSelect : defaultGroup
            }
            onRightButtonPress={() => {
              navigation.navigate('GroupListScreen', {
                screenRoute: 'RecaptureActivity',
              });
            }}
          /> */}
          <View style={styles.formContainer}>
            {/* <FormFillContainer
                    // LeftComponent={<ShareIcon size={35} />}
                    title={'Share_with'}
                    placeholder={shareWithPlaceholder}
                    iconStyles={{ marginLeft: -50 }}
                    onPress={item => alert(item)}
                    onRightButtonPress={() => {
                      onCloseModal();
                      // navigation.navigate('ShareWithScreen', {
                      //   ...shareWithNavProps,
                      //   shareWithGroup: selectedGroupData,
                      // });
                    }}
                  /> */}

            <Text
              style={{
                fontSize: 18,
                color: AppColors.LowWhite,
                fontFamily: AppFonts.CalibriRegular,
              }}
            >
              Share with ...
            </Text>
            <VertSpace />
            <View
              style={{
                ...GStyles.flexRowCenter,

                justifyContent: 'space-between',
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <AppButton
                  width={AppDimens.width * 0.21}
                  height={28}
                  backgroundColor={
                    SelectButtonGroupId === 3
                      ? AppColors.DarkGrey
                      : AppColors.disableColor
                  }
                  titleFontSize={15}
                  title="Public"
                  titleColor="white"
                  onPress={() => {
                    setSelectButtonGroupId(3);
                  }}
                />
                <HoriSpace size={8} />
                <AppButton
                  width={AppDimens.width * 0.24}
                  height={28}
                  titleColor="white"
                  backgroundColor={
                    SelectButtonGroupId === 1
                      ? AppColors.DarkGrey
                      : AppColors.disableColor
                  }
                  titleFontSize={15}
                  title="Contacts"
                  onPress={() => {
                    // navigate('WishlistScreen');
                    setSelectButtonGroupId(1);
                  }}
                />
                <HoriSpace size={8} />

                <AppButton
                  width={AppDimens.width * 0.2}
                  height={28}
                  titleColor="white"
                  backgroundColor={
                    SelectButtonGroupId === 0
                      ? AppColors.DarkGrey
                      : AppColors.disableColor
                  }
                  titleFontSize={15}
                  title="None"
                  onPress={() => {
                    // navigate('WishlistScreen');
                    setSelectButtonGroupId(0);
                  }}
                />
              </View>
            </View>

            <VertSpace size={40} />
            <View style={{ ...GStyles.flexRow, alignItems: 'center' }}>
              <GalleryIcon size={26} />
              <HoriSpace size={10} />
              <Text style={{ color: AppColors.LowDark }}>Add photos</Text>
            </View>
            <View>
              <VertSpace />
              <TextInput
                placeholder="Share your reviews here .."
                placeholderTextColor={AppColors.disableColor}
                underlineColor={AppColors.Transparent}
                style={{
                  backgroundColor: AppColors.Transparent,
                  borderWidth: 0,
                  borderColor: AppColors.Red,
                  color: AppColors.disableColor,
                }}
              />
            </View>
          </View>

          <VertSpace size={50} />

          <InputText
            value={notes}
            multiline={true}
            title={'Notes ...'}
            inputPlaceHolder={'Add notes here'}
            onChangeText={value =>
              dispatch(setNotesRecapture({ notes: value }))
            }
            Icon={<NotesIcon size={40} />}
          />
        </Container>

        <VertSpace size={100} />
      </ScrollView>
    </SafeAreaView>
  );
}
