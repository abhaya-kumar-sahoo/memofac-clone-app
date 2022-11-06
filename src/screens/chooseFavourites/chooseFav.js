import React from 'react';
import { SafeAreaView } from 'react-native';
import { AppColors } from '../../assets/AppColors';
import { Spacing } from '../../shared/Global.styles';
import { AppHeader, HeadingBar } from '../../components/AppHeader';
import { NextButton, Container } from 'components/Mini';
import { useDispatch, useSelector } from 'react-redux';
import { GetSubCategoryAction } from 'redux/reducers/Memos/Subcategory.reducer';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { Skeletons } from 'shared/Skeletons';
import { SecondaryGroupList } from 'screens/Memos/SavetoCollection';
import { BottomView } from '../Memos/SavetoCollection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveProgress } from 'redux/reducers/UserAuth.reducer';
import { STR_KEYS } from 'shared/Storage';
import { addFavorites } from 'redux/sagas/UserProfile/userProfile.request';
import { ScreenLoader } from 'components/Loaders/ScreenLoader';
import { syncContacts } from 'redux/reducers/Contact/contacts.reducer';
import { checkContactPermission } from 'shared/Permission';
import { GetSubCategoryList } from 'redux/sagas/Memos/request';
import { showToast } from 'shared/Functions/ToastFunctions';

export const ChooseFavourites = () => {
  const [addFavoritesLoading, setAddFavoritesLoading] = React.useState(false);
  const [Category, setCategory] = React.useState({ id: 0, name: 'All' });
  const { userToken } = useSelector(state => state.userAuth);
  const [listoffolders, setlistoffolders] = React.useState([]);
  const [secondaryList, setsecondaryList] = React.useState({});
  const [dataLoading, setDataLoading] = React.useState(true);
  const userAuth = useSelector(state => state.userAuth);
  const dispatch = useDispatch();

  const syncContactsFirst = async () => {
    const { isPermissionGranted } = await checkContactPermission();
    if (isPermissionGranted) {
      dispatch(syncContacts());
    }
  };

  React.useEffect(() => {
    GetSubCategoryList(userToken, 0, 'all')
      .then(response => {
        setlistoffolders(response.content);
      })
      .catch(error => showToast(error))
      .finally(() => setDataLoading(false));
    syncContactsFirst();
  }, []);

  const onNextPress = () => {
    setAddFavoritesLoading(true);
    const selectedIds = Object.keys(secondaryList).join(',');
    addFavorites(userToken, selectedIds).finally(() => {
      setAddFavoritesLoading(false);
      const setProceedStatus = async () => {
        try {
          await AsyncStorage.setItem(STR_KEYS.PROCEED_STATUS, 'Walkthrough');
        } catch (e) {}
      };
      setProceedStatus();

      dispatch(
        saveProgress({
          proceedStatus: 'Walkthrough',
        }),
      );
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: AppColors.white,
        paddingHorizontal: Spacing.large,
      }}
    >
      {/* This will depend if its coming form login or splashscreen */}
      <AppHeader enableBack>
        <NextButton
          disabled={Object.values(secondaryList).length <= 3}
          onPress={onNextPress}
        />
      </AppHeader>
      <HeadingBar title={'Add favorites'} />
      <ScreenLoader message="Adding favorites" loading={addFavoritesLoading} />
      <Container>
        <SkeletonContent
          containerStyle={{ flexDirection: 'column', marginTop: 20 }}
          boneColor={AppColors.RecomBoneDark}
          highlightColor={AppColors.SkeletonBone}
          isLoading={dataLoading}
          layout={Skeletons.searchMemos}
        />

        <SecondaryGroupList
          dataSet={listoffolders}
          secondaryList={secondaryList}
          onSelect={selectedSecondary => {
            setsecondaryList(selectedSecondary);
          }}
        />
      </Container>
      <BottomView title={'*Choose 4 or more groups'} />
    </SafeAreaView>
  );
};
