import { useNavigation } from '@react-navigation/core';
import React, { Fragment, useState, createRef } from 'react';
import {
  FlatList,
  RefreshControl,
  Text,
  TextInput,
  View,
  SafeAreaView,
} from 'react-native';

import Ripple from 'react-native-material-ripple';
import { useSelector } from 'react-redux';
import { AppColors } from '../../assets/AppColors';
import { AppFonts } from '../../assets/fonts/AppFonts';
import { AppHeader, SearchHeader } from 'components/AppHeader';

import {
  AppDimens,
  FontSize,
  GStyles,
  HoriSpace,
  Spacing,
  VertSpace,
} from '../../shared/Global.styles';
import { AddCirecleIcon, AddDarkIcon, AddIcon } from 'shared/Icon.Comp';
import { MemoView } from './MemoItem';
import { SearchmemoApiCall } from 'redux/sagas/Memos/request';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { Skeletons } from 'shared/Skeletons';
import { ActivityIndicator } from 'react-native-paper';
import { hp } from 'shared/dimens';
import { SearchInput } from 'components/SearchComponent';
// import Toast from 'react-native-simple-toast';
// import { SearchmemoApiCall } from '../../redux/sagas/Memos/request';
import DelayInput from 'react-native-debounce-input';
export function SearchScreen({ route }) {
  const { select } = route.params;

  const [SearchValue, setSearchValue] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [pageLoader, setPageLoader] = useState(false);
  const [listLoader, setListLoader] = useState(false);
  const PageRef = React.useRef(1);
  const lastPageRef = React.useRef(false);
  const navigate = useNavigation();
  const userAuth = useSelector(state => state.userAuth);
  const [value, setValue] = useState('Have');
  const inputRef = createRef();
  const [searchList, setsearchList] = useState([]);

  React.useEffect(() => {
    const unsubscribe = navigate.addListener('focus', () => {
      setSearchValue('');
    });

    return unsubscribe;
  }, [navigate]);

  // SUGGESTION BUTTON
  const SuggestionButton = React.memo(() => {
    return (
      <Fragment>
        {SearchValue.length > 0 ? (
          <Ripple
            rippleContainerBorderRadius={40}
            onPress={() => {
              navigate.navigate('SavetoCollection', { SearchValue });
            }}
            style={{ flexDirection: 'row', marginVertical: Spacing.large }}
          >
            <AddDarkIcon />

            <HoriSpace size={Spacing.xxlarge} />
            <Text
              style={{
                fontSize: FontSize.inputText,
                fontFamily: AppFonts.CalibriBold,
                color: AppColors.LightGrey,
              }}
            >{`Add "${SearchValue}"`}</Text>
          </Ripple>
        ) : null}
      </Fragment>
    );
  }, [SearchValue]);

  React.useEffect(() => {
    if (SearchValue.length > 0) {
      setsearchList([]);
      PageRef.current = 0;
      getSearchResults();
    }
  }, [SearchValue]);

  const getSearchResults = (type = 'refetch') => {
    // console.log('Inside');
    if (PageRef.current > 1) {
      setPageLoader(true);
    } else {
      setListLoader(true);
    }

    if (lastPageRef.current === false) {
      SearchmemoApiCall(userAuth.userToken, SearchValue, PageRef.current)
        .then(response => {
          if (response.content.data === []) {
            lastPageRef.current = true;
          }
          setPageLoader(false);
          setListLoader(false);
          setRefreshing(false);
          PageRef.current = response.content.current_page + 1;
          if (type == 'refetch') {
            setsearchList(response.content.data);
          } else {
            setsearchList(prevstate => {
              return [...prevstate, ...response.content.data];
            });
          }
        })
        .catch(error => {});
    }
  };

  const onRefresh = () => {
    PageRef.current = 1;
    lastPageRef.current = false;
    setRefreshing(true);
    getSearchResults('refetch');
  };
  return (
    <SafeAreaView style={GStyles.Dark}>
      {select === 'RecaptureActivity' ? (
        <View style={{}}>
          <AppHeader enableBack />
          <View style={{ paddingHorizontal: Spacing.large }}>
            <SearchInput
              onChangeText={value => {
                setSearchValue(value);
              }}
              onSearchClear={() => {
                setSearchValue('');
              }}
              value={SearchValue}
              style={{ height: 45, backgroundColor: 'pink' }}
            />
          </View>
        </View>
      ) : (
        <SearchHeader
          enableBack
          onChangeText={value => {
            setSearchValue(value);
          }}
          onSearchClear={() => {
            setSearchValue('');
          }}
          value={SearchValue}
        />
      )}

      <View style={{ paddingHorizontal: Spacing.large }}>
        <SuggestionButton />

        <SkeletonContent
          containerStyle={{ flexDirection: 'column', marginTop: 20 }}
          boneColor={AppColors.RecomBoneDark}
          highlightColor={AppColors.SkeletonBone}
          isLoading={listLoader}
          layout={Skeletons.searchMemos}
        />

        <FlatList
          // refreshControl={
          //   <RefreshControl
          //     colors={['#6297e7', '#40b07e']}
          //     refreshing={refreshing}
          //     onRefresh={onRefresh}
          //   />
          // }
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<VertSpace size={Spacing.large} />}
          ListFooterComponent={
            <>
              {pageLoader && (
                <View
                  style={{
                    width: '100%',
                    padding: 20,
                  }}
                >
                  <ActivityIndicator color={AppColors.DarkGrey} />
                  <VertSpace size={150} />
                </View>
              )}
            </>
          }
          data={searchList}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            getSearchResults('paginate');
          }}
          ItemSeparatorComponent={() => <VertSpace size={Spacing.xlarge} />}
          renderItem={({ item, index }) => (
            <MemoView
              item={item}
              key={index.toString()}
              onPress={() => {
                select === 'RecaptureActivity'
                  ? navigate.navigate('RecaptureActivity', {
                      memoSelected: item,
                    })
                  : navigate.navigate('ViewMemo', { memoId: item.id });
              }}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
}
