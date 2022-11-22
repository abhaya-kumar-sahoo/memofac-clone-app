/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {FlatList, View, SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';
import {Spacing, VertSpace} from '../../../shared/Global.styles';
import {AppHeader} from '../../../components/AppHeader';
import {SearchInput} from '../../../components/SearchComponent';
import {SearchmemoApiCall} from '../../../redux/sagas/Memos/request';
import {MemoView} from '../../Search/MemoItem';
import {Skeletons} from 'shared/Skeletons';
import {AppColors} from 'assets/AppColors';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
// SearchMemo STARTS
export function SearchMemoScreen({route}) {
  const [SearchValue, setSearchValue] = useState('');
  const [searchList, setsearchList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigation();
  const userAuth = useSelector(state => state.userAuth);

  React.useEffect(() => {
    SearchmemoApiCall(userAuth.userToken, SearchValue, 1)
      .then(response => {
        setLoading(false);
        setsearchList(response.content.data);
      })
      .catch(error => {});
  }, [SearchValue]);

  return (
    <SafeAreaView style={{backgroundColor: '#000000', flex: 1}}>
      <AppHeader
        enableBack
        onBackPress={() => navigate.goBack()}
        preventDefault
      />

      <View style={{paddingHorizontal: Spacing.large}}>
        <SearchInput
          onChangeText={value => {
            setSearchValue(value);
          }}
          onSearchClear={() => {
            setSearchValue('');
          }}
          value={SearchValue}
        />
        {/* SearchMemo */}

        <SkeletonContent
          containerStyle={{flexDirection: 'column', marginTop: 20}}
          boneColor={AppColors.RecomBoneDark}
          highlightColor={AppColors.SkeletonBone}
          isLoading={loading}
          layout={Skeletons.searchMemos}
        />

        <FlatList
          keyboardShouldPersistTaps={'always'}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<VertSpace size={Spacing.large} />}
          ListFooterComponent={<VertSpace size={200} />}
          data={searchList}
          ItemSeparatorComponent={() => <VertSpace size={Spacing.xlarge} />}
          renderItem={({item, index}) => (
            <MemoView
              item={item}
              key={index.toString()}
              onPress={() => {
                navigate.navigate('RecaptureActivity', {memoSelected: item});
              }}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
}
