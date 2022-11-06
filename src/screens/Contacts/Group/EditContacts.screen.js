import React, { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Linking,
  Text,
  TextInput,
  View,
  SafeAreaView,
} from 'react-native';
import {
  FontSize,
  GStyles,
  Spacing,
  VertSpace,
  WhiteFadeView,
} from 'shared/Global.styles';
import { ContactItem } from '../Contact.components';
import { AppColors } from 'assets/AppColors';
import { AppFonts } from 'assets/fonts/AppFonts';
import { AppHeader } from 'components/AppHeader';
import { Skeletons } from 'shared/Skeletons';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { useSelector } from 'react-redux';
import {
  AddmemberToGroup,
  GetContactsApiCall,
  GetGroupMembersApicall,
  RemoveMemberFromGroup,
} from 'redux/sagas/Contacts/api.request';
import { ScrollableTags } from 'components/ScrollableTags';
import { Divider } from 'react-native-paper';
import { showToast } from 'shared/Functions/ToastFunctions';
import { INVITE_MESSAGE } from 'shared/content/whatsapp.content';

function formatNumber(mobNumber, default_country_code = '+91') {
  let newNumber = mobNumber;
  if (mobNumber.charAt(0) !== '+') {
    newNumber = default_country_code + ' ' + newNumber;
  }
  return newNumber;
}

export function EditContactsScreen({ route }) {
  const [listLoader, setListloader] = useState(true);
  const [contactList, setContacts] = useState([]);
  const [groupId, setgroupId] = useState(0);
  const [GroupDataList, setGroupDataList] = useState([]);
  const [SearchResult, setSearchResult] = useState([]);
  const [isVisible, setisVisible] = React.useState(false);
  const { userData, countrycode, userToken } = useSelector(
    state => state.userAuth,
  );
  const [GroupMembers, setGroupMembers] = useState({});

  React.useEffect(() => {
    if (route.params?.groupSelected) {
      const groupSelected = route.params?.groupSelected;
      setgroupId(groupSelected.key);
    }
  }, [route.params?.groupSelected]);

  const CallTheGroups = () => {
    GetGroupMembersApicall(userToken)
      .then(response => {
        setGroupDataList([
          { id: 1, name: 'Contacts', member: [] },
          ...response.content,
        ]);
      })
      .catch(error => {
        showToast('Something went wrong while loading Groups');
      });
  };

  React.useEffect(() => {
    CallTheGroups();
    GetContactsApiCall(userToken)
      .then(response => {
        setListloader(false);
        setContacts(response.content);
        setSearchResult(response.content);
      })
      .catch(error => {
        showToast('Error while loading contacts from server');
        // console.error(error);
      });
  }, []);

  const SearchFilter = value => {
    let contactList_New = [...contactList];
    const Results = contactList_New.filter(contact => {
      return contact.name.indexOf(value) > -1;
    });
    setSearchResult(Results);
  };

  // SKELETON CONST
  var SkeletonFrames = new Array(10).fill(Skeletons.contactView);

  const addToGroup = (item, index) => {
    let memberId = [
      {
        id: item.id,
      },
    ];
    AddmemberToGroup(userToken, GroupDataList[groupId].id, memberId)
      .then(response => {
        let groupListTemp = [...GroupDataList];
        let position = groupListTemp.findIndex(
          group => group.id == GroupDataList[groupId].id,
        );
        groupListTemp[position].member.push(item);
        setGroupDataList(groupListTemp);
        saveGroupMembersMap(groupListTemp[position].member);
        showToast(`member added to group ${GroupDataList[groupId].name}`);
      })
      .catch(error => {
        showToast('Error while adding member');
      });
  };

  const removeFromGroup = item => {
    let memberId = item.id;

    RemoveMemberFromGroup(userToken, GroupDataList[groupId].id, memberId)
      .then(() => {
        let groupListTemp = [...GroupDataList];
        let GroupPosition = groupListTemp.findIndex(
          group => group.id == GroupDataList[groupId].id,
        );
        let filteredGroupMembers = groupListTemp[GroupPosition].member.filter(
          contact => contact.id !== memberId,
        );

        groupListTemp[GroupPosition].member = filteredGroupMembers;

        setGroupDataList(groupListTemp);
        saveGroupMembersMap(filteredGroupMembers);
        showToast(`member removed from group ${GroupDataList[groupId].name}`);
      })
      .catch(error => {
        showToast('Error while removing member');
      });
  };

  const saveGroupMembersMap = (GroupMembers = []) => {
    var membersObject = GroupMembers.reduce((map, obj) => {
      map[obj.id] = obj;
      return map;
    }, {});

    setGroupMembers(membersObject);
  };

  const MemberArrayViewData = Object.values({ ...GroupMembers });
  return (
    <SafeAreaView style={[GStyles.containerFlex, { backgroundColor: 'white' }]}>
      <AppHeader enableBack />
      <View>
        <ScrollableTags
          fieldName="name"
          style={{ marginLeft: Spacing.large }}
          onAddClick={() => setisVisible(true)}
          selectedKey={groupId}
          onTagPress={selectedIndex => {
            setgroupId(selectedIndex);
            saveGroupMembersMap(GroupDataList[selectedIndex].member);
          }}
          DataArray={GroupDataList}
        />
      </View>
      <KeyboardAvoidingView style={{ paddingHorizontal: 16 }}>
        {/* +SEARCH SECTION */}
        {/* <VertSpace size={10} /> */}
        <TextInput
          placeholder={'Search name'}
          style={{ fontSize: 20, color: AppColors.disableColor }}
          onChangeText={SearchFilter}
        />
        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: AppColors.MediumGrey,
          }}
        />

        <View>
          <WhiteFadeView
            reverse
            style={{ position: 'absolute', width: '100%', zIndex: 20 }}
          >
            <VertSpace size={20} />
          </WhiteFadeView>
        </View>

        {/* SKELETON */}
        <SkeletonContent
          containerStyle={{ marginTop: 20 }}
          highlightColor={AppColors.SkeletonBone}
          boneColor={AppColors.VeryLightGrey}
          isLoading={listLoader}
          layout={SkeletonFrames}
        />

        {SearchResult.length === 0 && !listLoader && (
          <View style={{ width: '100%', padding: 25, ...GStyles.containView }}>
            <Text
              style={{
                fontSize: FontSize.medium,
                fontFamily: AppFonts.CalibriBold,
                color: AppColors.LightGrey,
              }}
            >
              No contacts avialable
            </Text>
          </View>
        )}

        <FlatList
          ListFooterComponent={<VertSpace size={300} />}
          ListHeaderComponent={
            <>
              {MemberArrayViewData.length > 0 && (
                <View style={{ paddingBottom: Spacing.xxlarge }}>
                  {MemberArrayViewData.length > 1 && (
                    <Text
                      style={{
                        fontSize: FontSize.large,
                        fontFamily: AppFonts.CalibriBold,
                        color: AppColors.LightGrey,
                      }}
                    >{`${MemberArrayViewData.length} contacts`}</Text>
                  )}
                  {MemberArrayViewData.map((item, index) => {
                    return (
                      <ContactItem
                        key={index.toString()}
                        item={item}
                        index={index}
                        onDeselect={() => {
                          removeFromGroup(item);
                        }}
                        type={false}
                        action={true}
                      />
                    );
                  })}
                  <Divider
                    style={{
                      marginTop: 20,
                      height: 1,
                      width: 200,
                      alignSelf: 'center',
                      backgroundColor: AppColors.LightGrey,
                    }}
                  />
                </View>
              )}
            </>
          }
          extraData={groupId}
          keyboardShouldPersistTaps={'always'}
          showsVerticalScrollIndicator={false}
          data={SearchResult}
          renderItem={({ item, index }) => {
            if (!GroupMembers[item.id]) {
              return (
                <ContactItem
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
                      INVITE_MESSAGE +
                      `&phone=${formatNumber(item.number, countrycode)}`;
                    Linking.openURL(url)
                      .then(data => {})
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
          keyExtractor={(_, index) => index.toString()}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
