/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {ActivityIndicator, Modal, Portal} from 'react-native-paper';
import {AppColors} from '../../assets/AppColors';
import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import {AppHeader} from '../../components/AppHeader';
import {AddIcon, DoneFillIcon, SearchNavIcon} from '../../shared/Icon.Comp';
import Ripple from 'react-native-material-ripple';
import {
  AppDimens,
  FontSize,
  GStyles,
  HoriSpace,
  Spacing,
  VertSpace,
} from '../../shared/Global.styles';
import {AppFonts} from '../../assets/fonts/AppFonts';
import {Container} from '../../components/Mini';
import {useNavigation} from '@react-navigation/core';
import {AddNewMemoModal} from './AddNewMemo/AddNewMoemoModal';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {useDispatch, useSelector} from 'react-redux';
import {MemosListApiCall} from '../../redux/sagas/Memos/request';

import {TextNoDataView} from '../../components/NodataView/TextNodata';
import {DebugText} from 'components/debugComps';
import {PostSeparator} from 'screens/Timeline/components/PostView/Postview.comp';
import {ListLoader} from 'components/Loaders/ListLoader';
import {Skeletons} from 'shared/Skeletons';
import {showToast} from 'shared/Functions/ToastFunctions';
import {hp, wp} from 'shared/dimens';
import FastImage from 'react-native-fast-image';
import {HorizontalGalleryList} from 'screens/MyProfile/components/MiniGalleryList';
export const EmailVerifyModal = props => {
  const [visible, setVisible] = useState(true);

  // const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  useEffect(() => {
    setVisible(props.value);
  }, [props.value]);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={{
          backgroundColor: AppColors.white,
          padding: 16,
          margin: 16,
          alignItems: 'center',
          borderRadius: 10,
        }}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
          }}>
          <View style={{width: 10}} />
          <Pressable style={{padding: 10}} onPress={hideModal}>
            <Text>Hello</Text>
          </Pressable>
        </View>

        {/* <VerifyEmail width={200} /> */}
        <View style={{height: 20}} />
        <Text style={{fontSize: 20}}>Verify email</Text>
        <Text style={{fontSize: 14, textAlign: 'center'}}>
          Your email verification is pending.
        </Text>
        <View style={{height: 20}} />
      </Modal>
    </Portal>
  );
};

const MemoHeader = ({onCreate = () => {}, onSearch = () => {}}) => {
  const {navigate} = useNavigation();
  return (
    <View style={{flexDirection: 'row', marginRight: -Spacing.large}}>
      {/*  */}
      <AddNewMemoModal
        onSubmitPress={SearchValue => {
          navigate('SavetoCollection', {SearchValue});
        }}
        ButtonComponent={() => (
          <View style={{padding: Spacing.large}}>
            <AddIcon size={20} />
          </View>
        )}
      />

      {/* <HoriSpace size={20} /> */}

      <Ripple style={{padding: Spacing.large}} onPress={() => onSearch()}>
        <SearchNavIcon size={20} />
      </Ripple>
    </View>
  );
};

const ListData = [
  {key: 1, name: 'Movies'},
  {key: 2, name: 'TV Series'},
  {key: 3, name: 'Songs'},
  {key: 4, name: 'Travel'},
  {key: 5, name: 'Books'},
];

export const MemosPage = () => {
  const pageRef = React.useRef(1);
  const hasNextRef = React.useRef(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [Selected, setSelected] = useState(1);
  const [Loader, setLoader] = useState(true);
  const {userAuth, subCategoryRedux, MainCategoryRedux} = useSelector(
    state => state,
  );
  const [Secondary, setSecondary] = useState({id: 1, category_name: ''});
  const [MemosList, setMemosList] = useState([]);

  const SkeletonArray = new Array(3).fill(Skeletons.MemoStatView1);

  const getMemos = (page, subCategory, type = '') => {
    setLoader(true);
    MemosListApiCall(userAuth.userToken, subCategory, page)
      .then(response => {
        hasNextRef.current = response.content.next_page_url !== null;
        setLoader(false);
        if (pageRef.current != 1) {
          setMemosList([...MemosList, ...response.content.data]);
        } else {
          setMemosList(response.content.data);
        }
        if (type === 'refetch') {
          showToast('List refreshed');
        }
      })
      .catch(() => {
        showToast('Something went wrong while loading Memos');
      });
  };
  // console.log(MemosList);
  React.useEffect(() => {
    if (subCategoryRedux?.subcategoryList.length > 0) {
      setSecondary(subCategoryRedux?.subcategoryList[0]);
      getMemos(1, subCategoryRedux?.subcategoryList[0].id);
    }
  }, []);

  const onRefresh = () => {
    getMemos(1, Secondary.id, 'refetch');
  };

  return (
    <SafeAreaView style={GStyles.Dark}>
      <AppHeader padding={Spacing.xxlarge} enableBack />

      <Container>
        <View style={{marginVertical: 20}}>
          {subCategoryRedux?.dataLoading && (
            <ActivityIndicator color={AppColors.MediumGrey} />
          )}

          <ScrollView
            showsHorizontalScrollIndicator={false}
            style={{marginHorizontal: -Spacing.xxlarge}}
            horizontal={true}>
            <HoriSpace size={Spacing.xxlarge} />
            {subCategoryRedux &&
              subCategoryRedux?.dataLoading == false &&
              subCategoryRedux.subcategoryList.map((dataObj, index) => {
                return (
                  <View style={{flexDirection: 'row'}} key={dataObj.id}>
                    <Ripple
                      onPress={() => {
                        pageRef.current = 1;
                        setSecondary(dataObj);

                        setMemosList([]);
                        getMemos(1, dataObj.id);
                      }}
                      style={{
                        borderRadius: 30,
                        backgroundColor:
                          Secondary.id == dataObj.id
                            ? AppColors.white1
                            : AppColors.LowDark2,
                        height: 40,
                        ...GStyles.containView,
                        paddingHorizontal: 16,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <FastImage
                        style={{
                          width: hp(26),
                          height: hp(26),
                        }}
                        source={{uri: dataObj.icon}}
                        resizeMethod="scale"
                        resizeMode="contain"
                      />
                      <HoriSpace size={5} />
                      <Text
                        style={{
                          fontFamily: AppFonts.CalibriBold,
                          color:
                            Secondary.id == dataObj.id
                              ? AppColors.DarkGrey2
                              : AppColors.MediumGrey,
                          fontSize: 20,
                        }}>
                        {dataObj.category_name}
                      </Text>
                    </Ripple>
                    <HoriSpace size={10} />
                  </View>
                );
              })}
            <HoriSpace size={Spacing.xxlarge} />
          </ScrollView>
        </View>
      </Container>

      {MemosList.length == 0 && !Loader && (
        <TextNoDataView title={'No memos over here'} />
      )}

      <SkeletonContent
        containerStyle={{
          padding: Spacing.xlarge,
        }}
        boneColor={AppColors.RecomBoneDark}
        highlightColor={AppColors.SkeletonBone}
        isLoading={Loader && MemosList.length == 0}
        layout={SkeletonArray}>
        <FlatList
          ListFooterComponent={
            <>
              <ListLoader when={hasNextRef.current} />
              <VertSpace size={200} />
            </>
          }
          refreshControl={
            <RefreshControl refreshing={Loader} onRefresh={onRefresh} />
          }
          onEndReachedThreshold={0.7}
          onEndReached={() => {
            if (hasNextRef.current) {
              getMemos(pageRef.current + 1, Secondary.id);
              pageRef.current = pageRef.current + 1;
            }
          }}
          showsVerticalScrollIndicator={false}
          data={MemosList}
          keyExtractor={(_, index) => index.toString()}
          ItemSeparatorComponent={() => (
            <View style={{marginTop: -10}}>
              <PostSeparator
                backgroundColor={AppColors.Skeleton}
                width={AppDimens.width * 0.8}
              />
            </View>
          )}
          renderItem={({item}) => {
            return (
              <View>
                <VertSpace size={20} />
                <MemoDesView
                  onPress={() => {
                    navigation.navigate('MemoDetailsView', {
                      memoId: item.id,
                      memoItem: item,
                    });
                  }}
                  gapSize_Des={0}
                  gapSize_Star={20}
                  galleryShow={true}
                  item={item}
                />
              </View>
            );
          }}
        />
      </SkeletonContent>
    </SafeAreaView>
  );
};

export const SamplePage = () => {
  const pageRef = React.useRef(1);
  const hasNextRef = React.useRef(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [Selected, setSelected] = useState(1);
  const [Loader, setLoader] = useState(true);
  const {userAuth, subCategoryRedux, MainCategoryRedux} = useSelector(
    state => state,
  );
  const [Secondary, setSecondary] = useState({id: 1, category_name: ''});
  const [MemosList, setMemosList] = useState([]);

  const SkeletonArray = new Array(3).fill(Skeletons.MemoStatView1);

  const getMemos = (page, subCategory, type = '') => {
    setLoader(true);
    MemosListApiCall(userAuth.userToken, subCategory, page)
      .then(response => {
        hasNextRef.current = response.content.next_page_url !== null;
        setLoader(false);
        if (pageRef.current != 1) {
          setMemosList([...MemosList, ...response.content.data]);
        } else {
          setMemosList(response.content.data);
        }
        if (type === 'refetch') {
          showToast('List refreshed');
        }
      })
      .catch(() => {
        showToast('Something went wrong while loading Memos');
      });
  };

  React.useEffect(() => {
    if (subCategoryRedux?.subcategoryList.length > 0) {
      setSecondary(subCategoryRedux?.subcategoryList[0]);
      getMemos(1, subCategoryRedux?.subcategoryList[0].id);
    }
  }, []);

  const onRefresh = () => {
    getMemos(1, Secondary.id, 'refetch');
  };

  return (
    <SafeAreaView style={GStyles.Dark}>
      <AppHeader padding={Spacing.xxlarge} enableBack>
        {/* <MemoHeader
          onSearch={() => {
            navigation.navigate('SearchScreen', { select: 'other' });
          }}
          onCreate={() => {}}
        /> */}
      </AppHeader>

      <Container>
        <View style={{marginVertical: 20}}>
          {subCategoryRedux?.dataLoading && (
            <ActivityIndicator color={AppColors.MediumGrey} />
          )}

          <ScrollView
            showsHorizontalScrollIndicator={false}
            style={{
              marginHorizontal: -Spacing.xxlarge,
            }}
            horizontal={true}>
            <HoriSpace size={Spacing.xxlarge} />
            {subCategoryRedux &&
              subCategoryRedux?.dataLoading == false &&
              subCategoryRedux.subcategoryList.map((dataObj, index) => {
                return (
                  <View style={{flexDirection: 'row'}} key={dataObj.id}>
                    <Ripple
                      onPress={() => {
                        pageRef.current = 1;
                        setSecondary(dataObj);

                        setMemosList([]);
                        getMemos(1, dataObj.id);
                      }}
                      style={{
                        borderRadius: 30,
                        backgroundColor:
                          Secondary.id == dataObj.id
                            ? AppColors.white1
                            : AppColors.LowDark2,
                        height: 40,
                        ...GStyles.containView,
                        paddingHorizontal: 16,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <FastImage
                        style={{
                          width: hp(26),
                          height: hp(26),
                        }}
                        source={{uri: dataObj.icon}}
                        resizeMethod="scale"
                        resizeMode="contain"
                      />
                      <HoriSpace size={5} />
                      <Text
                        style={{
                          fontFamily: AppFonts.CalibriBold,
                          color:
                            Secondary.id == dataObj.id
                              ? AppColors.DarkGrey2
                              : AppColors.MediumGrey,

                          fontSize: 20,
                        }}>
                        {dataObj.category_name}
                      </Text>
                    </Ripple>
                    <HoriSpace size={10} />
                  </View>
                );
              })}

            <HoriSpace size={Spacing.xxlarge} />
          </ScrollView>
        </View>
      </Container>

      {MemosList.length == 0 && !Loader && (
        <TextNoDataView title={'No memos over here'} />
      )}

      <SkeletonContent
        containerStyle={{
          padding: Spacing.xlarge,
        }}
        boneColor={AppColors.RecomBoneDark}
        highlightColor={AppColors.SkeletonBone}
        isLoading={Loader && MemosList.length == 0}
        layout={SkeletonArray}>
        <FlatList
          ListFooterComponent={
            <>
              <ListLoader when={hasNextRef.current} />
              <VertSpace size={200} />
            </>
          }
          refreshControl={
            <RefreshControl refreshing={Loader} onRefresh={onRefresh} />
          }
          onEndReachedThreshold={0.7}
          onEndReached={() => {
            if (hasNextRef.current) {
              getMemos(pageRef.current + 1, Secondary.id);
              pageRef.current = pageRef.current + 1;
            }
          }}
          showsVerticalScrollIndicator={false}
          data={MemosList}
          keyExtractor={(_, index) => index.toString()}
          ItemSeparatorComponent={() => (
            <View style={{marginTop: -10}}>
              <PostSeparator
                backgroundColor={AppColors.Skeleton}
                width={AppDimens.width * 0.8}
              />
            </View>
          )}
          renderItem={({item}) => {
            return (
              <View>
                <VertSpace size={20} />
                <MemoDesView
                  galleryShow={true}
                  onPress={() => {
                    navigation.navigate('MemoDetailsView', {
                      memoId: item.id,
                      memoItem: item,
                    });
                  }}
                  gapSize_Des={0}
                  gapSize_Star={20}
                  item={item}
                />
              </View>
            );
          }}
        />
      </SkeletonContent>
    </SafeAreaView>
  );
};

const memoDataProps = {
  id: '34',
  category_id: '3',
  title: 'Autobiography of a Yogi',
  image: 'https://memofac.devclub.co.in/admin/public/images/icon/Books.png',
  description: '1946',
  created_at: '2021-06-23 12:03:08',
  updated_at: '2021-06-23 12:03:08',
  category_name: 'Book',
  icon: '1625671566.png',
  rating: null,
  all: 0,
  known: 0,
  close: 0,
  me: 0,
  totalExp: 0,
  gallery_data: [],
};

export const MemoStatView = ({
  item = {...memoDataProps},
  dataLoading,
  CategoryImage = null,
  gapSize_Des = 8,
  gapSize_Star = 35,
  gallery_data,
  onPress = () => {},
  galleryShow = false,
}) => {
  const navigation = useNavigation();

  let list = [];
  const changeGallery = () => {
    if (item.gallery_data !== undefined) {
      if (item.gallery_data.length !== 0) {
        item.gallery_data.map(item => {
          if (item.image !== undefined || item === undefined) {
            // setGalleryList(GalleryList => [...GalleryList, item.image]);
            list.push(item.image);
            // console.log(item.image);
          }
        });
      }
    } else {
      null;
    }
  };
  changeGallery();

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
        <TouchableOpacity onPress={onPress}>
          <View style={{width: wp(270)}}>
            <Text
              style={{
                fontFamily: AppFonts.Chaparral,
                color: AppColors.white3,
                fontSize: 30,
                lineHeight: 35,
              }}>
              {item.title}
            </Text>
          </View>
          <VertSpace size={gapSize_Des} />
          {item.description !== null && item.description !== '' && (
            <>
              <Text
                style={{
                  fontFamily: AppFonts.CalibriRegular,
                  color: AppColors.LowWhite,
                  fontSize: FontSize.medium,
                }}>
                {item.description}
              </Text>
              <VertSpace size={8} />
            </>
          )}

          {item?.category_name?.length && (
            <View
              style={{
                ...GStyles.flexRow,
                alignItems: 'center',
              }}>
              <FastImage
                style={{
                  width: hp(26),
                  height: hp(26),
                }}
                source={{uri: item.image}}
                resizeMethod="scale"
                resizeMode="contain"
              />
              <HoriSpace size={10} />
              <Text
                style={{
                  fontFamily: AppFonts.CalibriRegular,
                  color: AppColors.white1,
                  fontSize: 20,
                }}>
                {item.category_name}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        {item.totalExp !== 0 && (
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <DoneFillIcon size={10} />
              <HoriSpace size={5} />
              <Text
                style={{
                  fontFamily: AppFonts.CalibriRegular,
                  color: AppColors.white1,
                  fontSize: 16,
                  lineHeight: FontSize.inputText,
                }}>
                {item.totalExp}
              </Text>
            </View>
          </View>
        )}
      </View>
      {galleryShow && (
        <>
          {list.length > 0 && (
            <>
              <VertSpace />
              <HorizontalGalleryList
                dataList={list}
                onPress={() => navigation.navigate('ImageGallery')}
              />
              <VertSpace size={10} />
            </>
          )}
        </>
      )}

      <VertSpace size={gapSize_Star} />

      {!dataLoading && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <StatView title={'Public'} value={item.all} />
          <StatView title={'Contacts'} value={item.known} />
          <StatView title={'Mine'} value={item.me} />
        </View>
      )}
      {!dataLoading && <VertSpace size={10} />}

      <DebugText textData={item} />
    </View>
  );
};

export const MemoDesView = ({
  item = {...memoDataProps},
  dataLoading,
  CategoryImage = null,
  gapSize_Des = 8,
  gapSize_Star = 35,
  gallery_data,
  onPress = () => {},
  galleryShow = false,
}) => {
  const navigation = useNavigation();

  let list = [];
  const changeGallery = () => {
    if (item.gallery_data !== undefined) {
      if (item.gallery_data.length !== 0) {
        item.gallery_data.map(item => {
          if (item.image !== undefined || item === undefined) {
            // setGalleryList(GalleryList => [...GalleryList, item.image]);
            list.push(item.image);
            // console.log(item.image);
          }
        });
      }
    } else {
      null;
    }
  };
  changeGallery();

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
        <TouchableOpacity onPress={onPress}>
          <View
            style={{
              width: wp(270),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: AppFonts.Chaparral,
                color: AppColors.white3,
                fontSize: 30,
                // lineHeight: 35,
              }}>
              {item.title}
            </Text>
          </View>
          <VertSpace size={gapSize_Des} />
          {item.description !== null && item.description !== '' && (
            <>
              <Text
                style={{
                  fontFamily: AppFonts.CalibriRegular,
                  color: AppColors.LowWhite,
                  fontSize: FontSize.medium,
                }}>
                {item.description}
              </Text>
              <VertSpace size={8} />
            </>
          )}
        </TouchableOpacity>

        {item.totalExp !== 0 && (
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <DoneFillIcon size={10} />
              <HoriSpace size={5} />
              <Text
                style={{
                  fontFamily: AppFonts.CalibriRegular,
                  color: AppColors.white1,
                  fontSize: 16,
                  lineHeight: FontSize.inputText,
                }}>
                {item.totalExp}
              </Text>
            </View>
          </View>
        )}
      </View>
      {galleryShow && (
        <>
          {list.length > 0 && (
            <>
              <VertSpace />
              <HorizontalGalleryList
                dataList={list}
                onPress={() => navigation.navigate('ImageGallery')}
              />
              <VertSpace size={10} />
            </>
          )}
        </>
      )}

      <VertSpace size={gapSize_Star} />

      {!dataLoading && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <StatView title={'Public'} value={item.all} />
          <StatView title={'Contacts'} value={item.known} />
          <StatView title={'Mine'} value={item.me} />
        </View>
      )}
      {!dataLoading && <VertSpace size={10} />}

      <DebugText textData={item} />
    </View>
  );
};

export const StatView = ({title, value}) => {
  const valueState = parseInt(value || '0') > 0 && value != null;

  return (
    <View style={{...GStyles.containView}}>
      <View
        style={{
          ...GStyles.containView,
          borderRadius: 26,
          borderWidth: 1,
          width: hp(80),
          height: hp(40),
          borderColor: AppColors.LowDark,
        }}>
        <Text
          style={{
            fontSize: FontSize.xlarge,
            fontFamily: AppFonts.CalibriBold,
            color: AppColors.white2,
          }}>
          {valueState ? value : '--'}
        </Text>
      </View>
      <VertSpace size={5} />
      <Text
        style={{
          textAlign: 'center',
          fontSize: FontSize.medium,
          fontFamily: AppFonts.CalibriRegular,
          color: AppColors.white2,
        }}>
        {title}
      </Text>
    </View>
  );
};

const MemoNavStyles = StyleSheet.create({
  bottomFontsStyle: {
    fontSize: FontSize.short,
    color: AppColors.DarkGrey,
    fontFamily: AppFonts.CalibriBold,
  },
  blankStattText: {
    alignSelf: 'center',
    letterSpacing: 3,
    color: AppColors.LightGrey,
  },
});
