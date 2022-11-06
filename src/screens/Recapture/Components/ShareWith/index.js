import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Text, View, SafeAreaView } from 'react-native';

import { useSelector } from 'react-redux';
import { GetGroupsList } from 'redux/sagas/Contacts/api.request';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { Skeletons } from 'shared/Skeletons';
import { AppFonts } from 'assets/fonts/AppFonts';
import {
  askForSettings,
  ContactPmsContainer,
} from 'components/ContactPermissionWrapper/ContactPermissionWrapper';
import { checkContactPermission } from 'shared/Permission';
import { RESULTS } from 'react-native-permissions';
import { AddGroupModal } from 'screens/Contacts/components/AddNewGroup';
import { Container, NextButton } from 'components/Mini';
import { AppHeader } from 'components/AppHeader';
import { FontSize, GStyles, Spacing } from 'shared/Global.styles';
import { AppColors } from 'assets/AppColors';
import { AppRadioButton } from 'components/AppRadioButton';
import { EditIcon } from 'shared/Icon.Comp';

export const DEFAULT_GROUP_KEY = 3; // currently it signifies Public group

export const ShareWithScreen = ({ route }) => {
  const navigation = useNavigation();
  const [groupsDataList, setGroupsDataList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { userToken } = useSelector(state => state.userAuth);
  const [GroupDataList, setGroupDataList] = React.useState([]);
  const [SelectedGroup, setSelectedGroup] = React.useState({
    key: DEFAULT_GROUP_KEY,
  });

  const [permissionState, setPermissionState] = React.useState({
    isPermissionGranted: null,
    result: null,
  });
  const {
    shareWithGroup,
    routeToScreen,
    subRouteScreen = undefined,
  } = {
    ...route.params,
  };

  // Api for calling all the groups available to user
  const CallTheGroups = () => {
    GetGroupsList(userToken)
      .then(response => {
        setGroupsDataList(response.content);
        // console.log(response.content);
        let newArray = [];
        newArray = response.content
          .filter(item => item.id == 3 || item.id == 1)
          .map(item => {
            return {
              key: item.id,
              text:
                item.name +
                (item.id != DEFAULT_GROUP_KEY ? ` (${item.count})` : ''),
            };
          });
        newArray.push({ key: 0, text: 'None' });

        setGroupDataList(newArray);
        setLoading(false);
      })
      .catch(error => {
        console.error('GET GROUP LIST ERROR ---> ', error);
      });
  };

  React.useEffect(() => {
    checkContactPermission().then(response => {
      setPermissionState(response);

      if (response.result === RESULTS.BLOCKED) {
        askForSettings();
      }
      if (response.isPermissionGranted) {
        CallTheGroups(userToken);
      }
    });
  }, []);

  React.useEffect(() => {
    if (shareWithGroup) {
      console.log('receved', shareWithGroup);
    }
  }, [shareWithGroup]);

  const setGroup = () => {
    const groupPositionIndex = groupsDataList.findIndex(
      item => item.id == SelectedGroup.key,
    );
    const selectedGroupData =
      groupPositionIndex != -1
        ? groupsDataList[groupPositionIndex]
        : { id: 0, name: 'None', count: 0 };

    navigation.navigate(routeToScreen, {
      screen: subRouteScreen,
      selectedGroupData,
    });

    // dispatch(
    //   setRecaptureGroup({
    //     groupSelected: selectedGroupData,
    //   }),
    // );
    // const { screenRoute } = { ...route.params };
    // if (screenRoute !== 'RecaptureActivity')
    //   dispatch(SetMemoVisibility(true, MemoVisibilityReducer.memoData));
  };

  return (
    <SafeAreaView style={GStyles.Dark}>
      <AppHeader enableBack>
        <NextButton
          disabled={false}
          title={'Done'}
          onPress={() => {
            setGroup();
            // if (
            //   subRoutename === undefined ||
            //   subRoutename === null ||
            //   subRoutename === ''
            // ) {
            //   navigation.navigate(routename, { SelectedGroup: SelectedGroup });
            // } else {
            //   navigation.navigate(routename, {
            //     screen: subRoutename,
            //     params: { SelectedGroup: SelectedGroup },
            //   });
            // }
          }}
        />
      </AppHeader>

      <ContactPmsContainer
        permissionState={permissionState}
        onStateChange={({ isPermissionGranted, statuses }) => {
          setPermissionState({
            isPermissionGranted,
            result: statuses[Object.keys(statuses)[0]],
          });
        }}
        onPermissionGrated={() => {
          CallTheGroups(userData.userToken);
        }}
      >
        <Container style={{ marginTop: Spacing.large }}>
          <SkeletonContent
            containerStyle={{}}
            highlightColor={AppColors.SkeletonBone}
            boneColor={AppColors.greyLight}
            isLoading={loading}
            layout={Array(5).fill(Skeletons.radioButton)}
          >
            <AppRadioButton
              style={{ paddingVertical: 10 }}
              horizontal={false}
              data={GroupDataList}
              currentValue={shareWithGroup?.id}
              onSelected={value => setSelectedGroup(value)}
              editable={true}
              initial={DEFAULT_GROUP_KEY}
              enableIcon
              RightComponent={<EditIcon size={20} />}
            />
          </SkeletonContent>
        </Container>

        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%',
            marginTop: 40,
          }}
        >
          <AddGroupModal
            onGroupCreated={() => CallTheGroups()}
            existingGroups={groupsDataList}
            buttonComponent={<AddGroupButtonView />}
          />
        </View> */}
      </ContactPmsContainer>
    </SafeAreaView>
  );
};

const AddGroupButtonView = () => {
  return (
    <View
      style={{
        ...GStyles.containView,
        width: 150,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: AppColors.MediumGrey,
      }}
    >
      <Text
        style={{
          fontFamily: AppFonts.CalibriBold,
          fontSize: FontSize.xlarge,
          color: AppColors.MediumGrey,
        }}
      >
        Add Group
      </Text>
    </View>
  );
};
