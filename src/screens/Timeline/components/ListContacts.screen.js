/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  askForSettings,
  ContactPmsContainer,
} from 'components/ContactPermissionWrapper/ContactPermissionWrapper';
import {DebugText} from 'components/debugComps';
import {TextNoDataView} from 'components/NodataView/TextNodata';
import React, {useRef, useState, useEffect} from 'react';
import {FlatList, Text, View, SafeAreaView} from 'react-native';
import {RESULTS} from 'react-native-permissions';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {useSelector} from 'react-redux';
import {UserRatingApiCall} from 'redux/sagas/Memos/request';
import {checkContactPermission} from 'shared/Permission';
import {Skeletons} from 'shared/Skeletons';
import {STR_KEYS} from 'shared/Storage';
import {AppColors} from '../../../assets/AppColors';
import {AppFonts} from '../../../assets/fonts/AppFonts';
import {AppHeader} from '../../../components/AppHeader';
import {Container} from '../../../components/Mini';
import {
  FontSize,
  GStyles,
  Spacing,
  VertSpace,
} from '../../../shared/Global.styles';
import {ContactsListView} from './ContactsWithRating';
import Contacts from 'react-native-contacts';
import {UpdateContacts} from 'redux/sagas/Contacts/api.request';
import {refactorContacts} from 'screens/Contacts/components';

export function ExperiencedContacts({route, navigation}) {
  const {userAuth} = useSelector(state => state);
  const [userList, setuserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const {MemoData} = route.params;
  const isCancel = useRef(false);
  const getUsersRating = () => {
    UserRatingApiCall(userAuth.userToken, MemoData.id)
      .then(response => {
        if (!isCancel.current) {
          setuserList(response.content);
        }
      })

      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  };
  const {userToken} = useSelector(state => state.userAuth);
  const [permissionState, setPermissionState] = useState({
    isPermissionGranted: null,
    result: null,
  });
  useEffect(() => {
    checkContactPermission().then(response => {
      // console.log('Permission', response.isPermissionGranted);
      if (!isCancel.current) {
        setPermissionState(response);
      }

      if (response.result === RESULTS.BLOCKED) {
        // setPermission()
        askForSettings();
      }
      if (response.isPermissionGranted) {
        getUsersRating();
      }
    });
  }, []);

  const viewProfile = user_id => {
    // console.log(user_id);
    if (userAuth.userData.id == user_id) {
      navigation.navigate('UserProfileNav');
    } else {
      navigation.navigate('FriendsProfile', {user_id});
    }
  };

  const syncContacts = async () => {
    let countrycode = await AsyncStorage.getItem(STR_KEYS.COUNTRY_CODE);

    Contacts.getAll().then((contactsList = []) => {
      UpdateContacts(userToken, refactorContacts(contactsList), countrycode)
        .then(() => {
          // console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
      // .finally(() => setSyncLoader(false));
    });
  };
  return (
    <SafeAreaView style={GStyles.Dark}>
      <AppHeader enableBack />

      <ContactPmsContainer
        permissionState={permissionState}
        onStateChange={({isPermissionGranted, statuses}) => {
          setPermissionState({
            isPermissionGranted,
            result: statuses[Object.keys(statuses)[0]],
          });
        }}
        onPermissionGrated={() => {
          getUsersRating();
          syncContacts();
        }}>
        <Container style={{flex: 1, marginTop: -12}}>
          <SkeletonContent
            containerStyle={{}}
            boneColor={AppColors.RecomBoneDark}
            highlightColor={AppColors.SkeletonBone}
            isLoading={loading}
            layout={Skeletons.searchMemos}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}
            />
            <VertSpace size={Spacing.xlarge} />
            <DebugText textData={{MemoData, userList}} />
            <FlatList
              showsVerticalScrollIndicator={false}
              data={userList}
              style={{paddingTop: 24}}
              ListEmptyComponent={<TextNoDataView />}
              ItemSeparatorComponent={() => <VertSpace size={20} />}
              ListFooterComponent={<VertSpace size={400} />}
              renderItem={({item, index}) => (
                <ContactsListView
                  item={item}
                  index={index}
                  onPress={viewProfile}
                />
              )}
              keyExtractor={(_, index) => index.toString()}
            />
          </SkeletonContent>
        </Container>
      </ContactPmsContainer>
    </SafeAreaView>
  );
}

export function ViewRatings({route}) {
  // const nav = useNavigation();
  const {userAuth} = useSelector(state => state);
  const [userList, setuserList] = useState([]);
  const [AverageRating, setAverageRating] = useState(0);
  const {MemoData, type} = route.params;
  React.useEffect(() => {
    // setuserList(MemoData.users);

    UserRatingApiCall(userAuth.userToken, type, MemoData.id).then(response => {
      setuserList(response.content);
    });

    setAverageRating(MemoData.average_rating);
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: '#000000', flex: 1}}>
      <AppHeader enableBack />
      <Container>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: FontSize.x4large,
              fontFamily: AppFonts.CalibriBold,
              color: AppColors.DarkGrey,
            }}>
            {type == 'known' ? 'Knownones' : 'Closed ones'}
          </Text>
          {/* <MiniRating rateNumber={parseFloat(AverageRating)} nostyle={true} /> */}
        </View>
        {userList.length == 0 && (
          <View style={{height: 200, ...GStyles.containView}}>
            <Text
              style={{
                fontFamily: AppFonts.InkFree,
                fontSize: FontSize.xxlarge,
              }}>
              No ratings yet
            </Text>
          </View>
        )}
        <VertSpace size={Spacing.size40} />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={userList}
          ItemSeparatorComponent={() => <VertSpace size={20} />}
          renderItem={({item, index}) => (
            <ContactsListView item={item} index={index} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </Container>
    </SafeAreaView>
  );
}
