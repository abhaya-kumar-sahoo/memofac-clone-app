/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import {APP_APIS} from 'ApiLogic/API_URL';
import {AppColors} from 'assets/AppColors';
import {AppHeader} from 'components/AppHeader';
import {InputText} from 'components/FormContainer/InputText/InputText';
import {AccentButton, Container} from 'components/Mini';
import {AddMemoText} from 'components/SearchComponent';
import React, {useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  Alert,
  Text,
  PermissionsAndroid,
  ScrollView,
  Platform,
  View,
  SafeAreaView,
} from 'react-native';
import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import {useDispatch, useSelector} from 'react-redux';
import {addPostTimeline} from 'redux/reducers/Timeline/Timeline.reducer';
import {PhotoNames} from 'shared/Data.shared';
import {showToast} from 'shared/Functions/ToastFunctions';
import {GStyles, VertSpace} from 'shared/Global.styles';

import {MemoSelection} from './Components/MemoSelection';
import {PhotoSelection} from './Components/PhotoSelection';
import moment from 'moment';
import {AppButtonFlex} from 'components/AppButton';
import {AppFonts} from 'assets/fonts/AppFonts';
import ImagePicker from 'react-native-image-crop-picker';
import {askForSettingsStorage} from 'components/ContactPermissionWrapper/ContactPermissionWrapper';
import {RateMemos} from 'redux/sagas/Memos/request';
import axios from 'axios';
import {
  BeforeCompleteProgressAction,
  CompleteProgressAction,
  GetProgressAction,
  ProgressErrorAction,
} from 'redux/reducers/progress/ProgressRedux';
import {ExpGrantModal} from './ExpGrantModal';
import {UpdateUserDetailsAction} from 'redux/reducers/UserProfile/userprofile.reducer';

export const RecaptureActivity = ({route}) => {
  const {navigate} = useNavigation();
  const [imageList, setImageList] = useState([]);
  const [notes, setNotes] = useState('');
  const [memos, setMemos] = useState(new Map());
  const {userToken, userData} = useSelector(state => state.userAuth);

  const memosList = Object.fromEntries(memos);
  const [defaultMemoState, setDefaultMemoState] = useState(-1);
  const [SelectButton, setSelectButton] = useState(3);
  const [disable, setDisable] = useState(false);
  const dispatch = useDispatch();
  const [visible, setVisibility] = useState(false);
  const openModal = () => setVisibility(true);
  const {memoSelected, summarizedRecaptureProps} = {
    ...route.params,
  };
  const [List, setList] = useState([]);

  const onSearchPress = () =>
    navigate('SearchScreen', {select: 'RecaptureActivity'});

  const onRateCallback = (memoItem, rateIndex) => {
    setMemos(
      new Map(
        memos.set(memoItem.id.toString(), {...memoItem, rate: rateIndex + 1}),
      ),
    );
  };

  const onRemove = memoItem => {
    let newMemosList = {...memosList};
    delete newMemosList[memoItem.id.toString()];
    setMemos(new Map(Object.entries(newMemosList)));
  };

  useEffect(() => {
    if (summarizedRecaptureProps) {
      const {
        shareWithGroup: groupId,
        memoData: memoDataProps,
        Addedrate,
      } = {
        ...summarizedRecaptureProps,
      };

      setMemos(
        new Map(
          memos.set(memoDataProps.id.toString(), {
            ...memoDataProps,
          }),
        ),
      );

      setSelectButton(groupId);
      const memoRate = memoDataProps.me == 0 ? -1 : memoDataProps.me - 1;

      const rate = Addedrate == -1 ? memoRate : Addedrate;

      setDefaultMemoState(rate);
    }
  }, [summarizedRecaptureProps]);

  useEffect(() => {
    if (memoSelected) {
      const memoPramsData = {...memoSelected, rate: 0};
      if (memos.has(memoPramsData.id.toString())) {
        showToast('Memo already added');
      } else {
        setMemos(
          new Map(memos.set(memoPramsData.id.toString(), {...memoPramsData})),
        );
      }
    }
    // return () => {
    //   setMemos(new Map());
    // };
  }, [memoSelected]);

  const PostValidation =
    notes.replace(/^\s+|\s+$/gm, '').length == 0 &&
    Object.values(memosList).length == 0 &&
    imageList.length == 0;

  const timestamp = new Date();

  const onRecapturePost = async () => {
    setDisable(true);

    if (PostValidation) {
      showToast('Please share something to post');
    } else {
      const dataMemoList = Object.values(memosList).map(item => ({
        id: item.id,
        rate: item.rate,
      }));

      if (
        notes.replace(/^\s+|\s+$/gm, '').length === 0 &&
        imageList.length === 0
      ) {
        dataMemoList.map(async i => {
          await RateMemos(
            userToken,
            i.id,
            parseInt(i.rate),
            parseInt(SelectButton),
          )
            .then(res => {
              if (res.result === 'success') {
                dispatch(UpdateUserDetailsAction(res.content));
              }
            })
            .catch(err => {
              showToast('rate again');
              console.log('error', err);
            });
        });
        openModal();
      } else {
        const formdata = new FormData();
        imageList.map(imageData => {
          formdata.append(
            'image[]',
            {
              uri: imageData.path,
              type: 'image/jpeg',
              name: `${imageData.modificationDate}${timestamp}${PhotoNames.RECAPTURE}.webp`,
            },
            '[PROXY]',
          );
        });
        formdata.append('token', userToken);
        formdata.append('memo_id', JSON.stringify(dataMemoList));
        formdata.append('exp_on', 'Jan 2020');
        formdata.append('share_with', SelectButton);

        formdata.append('text', notes ? notes : '');
        formdata.append('primary_folder', JSON.stringify([]));

        try {
          openModal();
          dispatch(GetProgressAction(formdata));

          const config = {
            onUploadProgress: function (params) {},
          };
          axios
            .post(APP_APIS.RECAPTURE, formdata, config, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            .then(res => {
              const updated_at = moment(res.data.content.updated_at).format(
                'YYYY-MM-DD HH:mm:ss',
              );

              dispatch(
                addPostTimeline({
                  postData: {
                    ...res.data.content,
                    updated_at,
                    total_reacts: 0,
                    total_comments: 0,
                    user_name: userData.name,
                    user_image: userData.image,
                  },
                }),
              );

              dispatch(BeforeCompleteProgressAction());

              setTimeout(() => {
                dispatch(CompleteProgressAction());
              }, 5000);
              // if (postInProgress === false) {
              //   openModal();
              // }
            })
            .catch(error => {
              console.log('error', error);

              showToast('Network issue,try again');
              dispatch(ProgressErrorAction());
            });
        } catch (error) {
          console.log(error);
          showToast('Unable to Post try again');
          dispatch(ProgressErrorAction());
        }
      }
    }
  };

  const startAction = async () => {
    setVisibility(false);

    navigate('BottomTabNavigation', {
      screen: 'TimelineScreen',
    });
  };

  const launchImageLibrary = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (granted === 'never_ask_again') {
          askForSettingsStorage();
        }

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          ImagePicker.openPicker({
            mediaType: 'photo',
            multiple: true,
            compressImageQuality: 0.8,
            compressImageMaxHeight: 1000,
            compressImageMaxWidth: 1000,
          }).then(images => {
            setImageList(images);
            images.map(item => {
              setList(List => [...List, item.path]);
            });
          });
        } else {
          console.log('Storage permission denied');
        }
      } else if (Platform.OS === 'ios') {
        check(PERMISSIONS.IOS.PHOTO_LIBRARY)
          .then(result => {
            switch (result) {
              case RESULTS.UNAVAILABLE:
                Alert.alert(
                  'Permission Alert',
                  'Requested functionality is not supported by your device.',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => console.log('ok boss')},
                  ],
                );
                break;
              case RESULTS.DENIED:
                request(PERMISSIONS.IOS.PHOTO_LIBRARY).then(() => {});
                break;
              case RESULTS.LIMITED:
                Alert.alert(
                  'Permission Alert',
                  'Due to system limitations few features are available on your device model. Please enable the photo permissions from app settings.',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => openSettings()},
                  ],
                );
                break;
              case RESULTS.GRANTED:
                ImagePicker.openPicker({
                  mediaType: 'photo',
                  multiple: true,
                  compressImageQuality: 0.75,
                  compressImageMaxHeight: 1000,
                  compressImageMaxWidth: 1000,
                }).then(images => {
                  setImageList(images);
                  images.map(item => {
                    setList(List => [...List, item.path]);
                  });
                });

                break;
              case RESULTS.BLOCKED:
                Alert.alert(
                  'Permission Alert',
                  'Storage Permission needed for selecting/capturing user profile photo, please grant permission from app settings.',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => openSettings()},
                  ],
                );
                break;
            }
          })
          .catch(() => {
            // …
            // console.log('some error while fetching permission :', error);
          });
      }
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <SafeAreaView style={GStyles.Dark}>
      <AppHeader onBackPress={() => {}} enableBack>
        <AccentButton
          disabled={PostValidation || disable}
          onPress={onRecapturePost}
        />
      </AppHeader>
      <ExpGrantModal time={100} visible={visible} closeModal={startAction} />
      <ScrollView keyboardShouldPersistTaps={'always'}>
        <KeyboardAwareScrollView>
          <View
            // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}
            // keyboardVerticalOffset={-100}
            // enabled={false}
          >
            <PhotoSelection
              imageList={List}
              onAddMorePhotos={() => {
                launchImageLibrary();
              }}
            />
            <Container padding={20} style={{paddingVertical: 20}}>
              {/* <SearchBarView onPress={onSearchPress} /> */}
              <AddMemoText onPress={onSearchPress} />
            </Container>
            <VertSpace size={30} />
            <View style={{paddingHorizontal: 20, paddingBottom: 200}}>
              <MemoSelection
                onRateCallback={onRateCallback}
                onRemove={onRemove}
                memosList={memosList}
                defaultRate={defaultMemoState}
              />
              <VertSpace size={10} />
              <View style={{paddingBottom: 30}}>
                <Text
                  style={{
                    fontSize: 18,
                    color: AppColors.LowWhite,
                    fontFamily: AppFonts.CalibriRegular,
                    paddingLeft: 10,
                  }}>
                  Share_with
                </Text>
                <VertSpace />
                <AppButtonFlex onPress={i => setSelectButton(i)} />
              </View>

              <InputText
                value={notes}
                multiline={true}
                inputPlaceHolder={'Write your reviews here ...'}
                onChangeText={setNotes}
                color={AppColors.white1}
                placeholderTextColor={AppColors.LowDark}
                // Icon={<NotesIcon size={40} />}
                marginLeft={-18}
                textLineHeight={22}
              />
            </View>

            {/* FORM */}
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};
