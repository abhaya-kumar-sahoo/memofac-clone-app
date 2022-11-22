/* eslint-disable react-native/no-inline-styles */
import {ListLoader} from 'components/Loaders/ListLoader';
import React, {useRef, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ScrollView} from 'react-native-gesture-handler';
import Ripple from 'react-native-material-ripple';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {ExpGrantModal} from 'screens/Recapture/ExpGrantModal';
import {SummarizedRecapture} from 'screens/Recapture/summarizedRecapture';
import {hp, wp} from 'shared/dimens';
import {AppColors} from '../../../assets/AppColors';
import {AppFonts} from '../../../assets/fonts/AppFonts';
import {AppHeader} from '../../../components/AppHeader';
import {AccentButton, Container} from '../../../components/Mini';
import {MemosListApiCall} from '../../../redux/sagas/Memos/request';
import {
  AppDimens,
  GStyles,
  HoriSpace,
  Spacing,
  VertSpace,
} from '../../../shared/Global.styles';

// SAVE YOUR EXPERIENCES
export function SaveMemoExp({route, navigation}) {
  const pageRef = useRef(1);
  const pageEndRef = useRef(false);
  const [summarizedModal, setSummarizedModal] = useState(false);
  const [memoForRating, setMemoForRating] = useState({});
  const closeSummzModal = () => setSummarizedModal(false);
  const openSummzModal = () => setSummarizedModal(true);
  const [visible, setVisibility] = useState(false);
  const closeModal = () => setVisibility(false);
  const openModal = () => setVisibility(true);
  const [MemosList, setMemosList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [memosLoading, setMemosLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState({
    id: -1,
    category_name: 'Movie',
    type: 'year',
    icon: null,
  });
  const [Secondary, setSecondary] = useState({id: 1, category_name: ''});
  const rateGiven = useRef(-1);
  const {selectedGroupData} = {...route.params};
  const selectedGroupDataRef = useRef({
    name: 'Public',
    id: 3,
    count: 0,
  });
  const {userAuth, subCategoryRedux, SaveMemoExpReducer} = useSelector(
    state => state,
  );
  const {subcategoryList} = {...subCategoryRedux};
  const {ratedMemosList} = {...SaveMemoExpReducer};

  // console.log('====================================');
  // console.log({ subcategoryList });
  // console.log('====================================');

  const getMemos = (page, id, searchText = '', refetch = false) => {
    setMemosLoading(true);
    MemosListApiCall(userAuth.userToken, id, page)
      .then(response => {
        setMemosLoading(false);
        if (refetch) {
          pageEndRef.current =
            response.content.data.length == 0 && MemosList.length > 0;
          setMemosList([...MemosList, ...response.content.data]);
        } else {
          setMemosList(response.content.data);
        }
      })
      .catch(() => {
        setMemosLoading(false);
      });
  };

  React.useEffect(() => {
    if (subCategoryRedux?.subcategoryList.length > 0) {
      setSecondary(subCategoryRedux?.subcategoryList[0]);
      getMemos(1, subCategoryRedux?.subcategoryList[0].id);
    }
  }, []);

  React.useEffect(() => {
    // console.log('Subcategory List', subcategoryList);
    setSelectedGroup(subcategoryList[0]);
    getMemos(1, subcategoryList[0].id, searchText);
  }, [searchText]);

  const onSaveRating = index => {
    // setRatingGiven
    rateGiven.current = index;
    // console.log('saving raitng fomr recommnded memos', index);
  };

  const onExitModal = () => {
    closeSummzModal();
    onSaveRating(-1);
    selectedGroupDataRef.current = {
      name: 'Public',
      id: 3,
      count: 0,
    };
  };

  // console.log('Routes passed to Recommended Memos ---->   ', route);

  React.useEffect(() => {
    if (selectedGroupData) {
      openSummzModal();
      // console.log('recevied !! Thank you...', selectedGroupData);
      selectedGroupDataRef.current = selectedGroupData;
      // setShareWithGroup(selectedGroupData);
    }
  }, [selectedGroupData]);

  const onRatingMemo = memoDetails => {
    // console.log('memo details choosen', memoDetails);
    openSummzModal();
    setMemoForRating(memoDetails);
  };

  return (
    <SafeAreaView style={GStyles.Dark}>
      <AppHeader enableBack />
      {/* <SearchHeader
        enableBack
        searchValue={searchText}
        onSearchClear={() => {
          setSearchText('');
          getMemos(1, selectedGroup.id, '');
        }}
        onChangeText={value => {
          setSearchText(value);
          getMemos(1, selectedGroup.id, value);
        }}
        paddingRight={0}
      /> */}
      {summarizedModal && (
        <SummarizedRecapture
          userToken={userAuth.userToken}
          navigation={navigation}
          memoForRating={memoForRating}
          memoListIndex={null}
          visible={summarizedModal}
          onCloseModal={closeSummzModal}
          onExitModal={onExitModal}
          selectedGroupData={selectedGroupDataRef.current}
          ratingGiven={rateGiven.current}
          onSaveRating={onSaveRating}
          onSuccessRating={() => {
            onExitModal();
            openModal();
          }}
        />
      )}
      <ExpGrantModal visible={visible} closeModal={closeModal} />

      <Container>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={{
            marginHorizontal: -Spacing.xxlarge,
            height: 80,
          }}
          horizontal={true}>
          <HoriSpace size={Spacing.xxlarge} />
          {subCategoryRedux &&
            subCategoryRedux?.dataLoading == false &&
            subCategoryRedux.subcategoryList.map(dataObj => {
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
          <VertSpace size={Spacing.large} />
        </ScrollView>

        <FlatList
          onEndReachedThreshold={0.3}
          onEndReached={() => {
            if (!pageEndRef.current) {
              pageRef.current = pageRef.current + 1;
              setMemosLoading(true);
              getMemos(pageRef.current, Secondary.id, searchText, true);
            } else {
              pageRef.current = 1;
            }
          }}
          ListFooterComponent={() => {
            return (
              <View
                style={{
                  height: 200,
                  alignItems: 'center',
                }}>
                <ListLoader
                  message={'Loading memos'}
                  when={memosLoading && MemosList.length !== 0}
                />
                <VertSpace size={Spacing.xxlarge} />
              </View>
            );
          }}
          // style={{ height: 450 }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => {
            return (
              <View style={{alignItems: 'center'}}>
                <ListLoader
                  message={'Loading memos'}
                  when={memosLoading && MemosList.length == 0}
                />

                <VertSpace size={Spacing.large} />
              </View>
            );
          }}
          ItemSeparatorComponent={() => <VertSpace />}
          keyExtractor={(_, index) => index.toString()}
          data={MemosList}
          renderItem={({item}) => {
            return (
              <MemoAddView
                memoTitle={item.title}
                description={item.description}
                image={item.image}
                attempted={ratedMemosList[item.id]}
                onPress={() => {
                  onRatingMemo(item);
                }}
              />
            );
          }}
        />
      </Container>
    </SafeAreaView>
  );
}

//  MEMO ADDED VIEW
const MemoAddView = ({
  memoTitle = 'Memotitle',
  description = '2017',
  onPress = () => {},
}) => {
  return (
    <View
      style={{
        ...GStyles.flexRowSpaceBetween,
      }}>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 5,
          paddingBottom: 10,
          ...GStyles.containView,
        }}>
        <View style={{maxWidth: wp(240)}}>
          <Text
            style={{
              fontSize: 22,
              color: AppColors.white3,
              fontFamily: AppFonts.CalibriBold,
              width: AppDimens.width * 0.66,
            }}
            numberOfLines={1}>
            {memoTitle}
          </Text>
          {description == '' || description == undefined ? (
            <Text
              style={{
                fontSize: 15,

                color: AppColors.disableColor,

                fontFamily: AppFonts.CalibriRegular,
                textAlign: 'left',
                paddingLeft: 2,
                width: AppDimens.width * 0.6,
              }}
              numberOfLines={1}>
              - - - -
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 15,

                color: AppColors.disableColor,

                fontFamily: AppFonts.CalibriRegular,
                textAlign: 'left',
                width: AppDimens.width * 0.6,
              }}
              numberOfLines={1}>
              {description}
            </Text>
          )}
          {/* <Text
            style={{
              color: AppColors.MediumGrey,
              fontSize: FontSize.shorter,
              fontFamily: AppFonts.CalibriRegular,
            }}
          >
            {description}
          </Text> */}
        </View>
      </View>
      <AccentButton
        textStyle={{fontSize: 15}}
        style={{paddingHorizontal: 20}}
        title="Rate"
        onPress={() => onPress()}
      />
    </View>
  );
};
