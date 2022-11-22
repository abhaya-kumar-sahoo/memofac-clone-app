/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Linking,
  RefreshControl,
  Text,
  TextInput,
  View,
  SafeAreaView,
} from 'react-native';
import {FontSize, GStyles, VertSpace} from '../../shared/Global.styles';
import {ContactItem} from './Contact.components';
import {AppColors} from '../../assets/AppColors';
import {AppFonts} from '../../assets/fonts/AppFonts';
import {AppHeader} from '../../components/AppHeader';
import {Skeletons} from '../../shared/Skeletons';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {useDispatch, useSelector} from 'react-redux';
import {INVITING_MESSAGE} from 'shared/content/whatsapp.content';
import {PermissionContent} from './ContactPermissionHandler/PermissionContent';
import {hp} from 'shared/dimens';
import {RESULTS} from 'react-native-permissions';
import {checkContactPermission} from 'shared/Permission';
import {
  askForSettings,
  ContactPmsContainer,
} from 'components/ContactPermissionWrapper/ContactPermissionWrapper';
import {ContactsSync} from 'redux/reducers/Contact/contacts.reducer';

function formatNumber(mobNumber, default_country_code = '+91') {
  let newNumber = mobNumber;
  if (mobNumber.charAt(0) !== '+') {
    newNumber = default_country_code + ' ' + newNumber;
  }
  return newNumber;
}

var format = /[!@#$%^&*_\=\[\]{};':"\\|,.<>\/?]+/;

// export const refactorContacts = (contactsList = [], countryCode = '+91+') => {
//   return contactsList
//     .filter(item => item.phoneNumbers.length !== 0)
//     .filter(contact => !format.test(contact.phoneNumbers[0].number))
//     .filter(item => !item.phoneNumbers[0].number.includes(countryCode));
// };

export function ContactsScreen({navigation}) {
  const [permissionState, setPermissionState] = useState({
    isPermissionGranted: null,
    result: null,
  });

  const [listLoader, setListloader] = useState(true);
  const [contactStatus, setContactStatus] = useState(false);
  const [groupId, setgroupId] = useState(0);
  const [GroupDataList, setGroupDataList] = useState([]);
  const [SearchResult, setSearchResult] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const {countrycode} = useSelector(state => state.userAuth);
  const isCancel = useRef(false);
  const [GroupMembers, setGroupMembers] = useState({});

  const {contacts, dataLoading} = useSelector(state => state.contactReducer);
  const dispatch = useDispatch();
  const hideModal = () => setModalVisibility(false);

  // const getAllContacts = () => {
  //   GetContactsApiCall(userToken)
  //     .then(response => {
  //       setListloader(false);

  //       setContacts(response.content);
  //       setSearchResult(response.content);
  //     })
  //     .catch(error => {
  //       showToast('Error while loading contacts from server');
  //       // console.error(error);
  //     });
  // };

  // const syncContact = async () => {
  //   setSyncLoader(true);
  //   setListloader(true);
  //   let countrycode = await AsyncStorage.getItem(STR_KEYS.COUNTRY_CODE);
  //   showToast('Contacts will be updated in a while');
  //   Contacts.getAll().then((contactsList = []) => {
  //     // CallTheGroups();

  //     UpdateContacts(userToken, refactorContacts(contactsList), countrycode)
  //       .then(response => {
  //         showToast('Contacts updated!');
  //         getAllContacts();
  //       })
  //       .catch(error => {
  //         console.log(error);
  //         showToast('Error while syncing contacts');
  //       })
  //       .finally(() => {
  //         setSyncLoader(false), setListloader(false);
  //       });
  //   });
  // };
  const syncContact = async () => {
    const {isPermissionGranted} = await checkContactPermission();
    if (isPermissionGranted) {
      dispatch(ContactsSync());
    }
  };
  const SearchFilter = value => {
    let contactList_New = [...contacts];
    const Results = contactList_New.filter(contact => {
      return contact.name.indexOf(value) > -1;
    });
    setSearchResult(Results);
  };

  // SKELETON CONST
  var SkeletonFrames = new Array(12).fill(Skeletons.contactView);

  React.useEffect(() => {
    setSearchResult(contacts);
  }, [contacts.length]);

  React.useEffect(() => {
    checkContactPermission().then(response => {
      setPermissionState(response);

      if (response.result === RESULTS.BLOCKED) {
        askForSettings();
      }
      if (response.isPermissionGranted) {
        setListloader(true);
        // getAllContacts();
        // CallTheGroups();
      }
    });

    return () => {
      isCancel.current = true;
    };
  }, []);

  // React.useEffect(() => {
  //   syncContactsFirst();
  // }, []);
  return (
    <SafeAreaView style={[GStyles.containerFlex, GStyles.Dark]}>
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
          setListloader(true);
          // getAllContacts();
          // CallTheGroups();
          syncContact();
        }}>
        <KeyboardAvoidingView style={{paddingHorizontal: 16}}>
          {!dataLoading && (
            <>
              <TextInput
                placeholder={'Search name'}
                style={{
                  fontSize: 20,
                  color: AppColors.disableColor,
                }}
                onChangeText={SearchFilter}
                placeholderTextColor={AppColors.disableColor}
              />
              <View
                style={{
                  height: 1,
                  width: '100%',
                  backgroundColor: AppColors.MediumGrey,
                }}
              />
            </>
          )}

          {/* SKELETON */}
          <SkeletonContent
            containerStyle={{marginTop: 20}}
            boneColor={AppColors.RecomBoneDark}
            highlightColor={AppColors.SkeletonBone}
            isLoading={dataLoading}
            layout={SkeletonFrames}
          />

          {contactStatus && (
            <View style={{marginTop: hp(100)}}>
              <PermissionContent />
            </View>
          )}

          {SearchResult.length === 0 && !dataLoading && (
            <View style={{width: '100%', padding: 25, ...GStyles.containView}}>
              <Text
                style={{
                  fontSize: FontSize.medium,
                  fontFamily: AppFonts.CalibriBold,
                  color: AppColors.LightGrey,
                }}>
                No contacts avialable
              </Text>
            </View>
          )}

          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={SearchResult.length > 0 && dataLoading}
                onRefresh={syncContact}
              />
            }
            ListFooterComponent={<VertSpace size={300} />}
            extraData={groupId}
            keyboardShouldPersistTaps={'always'}
            showsVerticalScrollIndicator={false}
            data={SearchResult}
            renderItem={({item, index}) => {
              if (!GroupMembers[item.id]) {
                return (
                  <ContactItem
                    navigation={navigation}
                    item={item}
                    index={index}
                    onSelect={() => {
                      addToGroup(item, index);
                    }}
                    action={groupId != 0}
                    type
                    onInvitePress={() => {
                      let url =
                        'whatsapp://send?text=' +
                        //INVITE_MESSAGE +
                        INVITING_MESSAGE +
                        `&phone=${formatNumber(item.number, countrycode)}`;
                      Linking.openURL(url)
                        .then(() => {})
                        .catch(() => {
                          alert('Make sure WhatsApp installed on your device');
                        });
                    }}
                  />
                );
              } else {
                return null;
              }
            }}
            keyExtractor={item => item.id.toString()}
          />
        </KeyboardAvoidingView>
      </ContactPmsContainer>
    </SafeAreaView>
  );
}
