import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { AppColors } from '../../assets/AppColors';
import { TimelineScreen } from 'screens/Timeline/Timeline.screen';
import {
  ListMemoNavDarkIcon,
  ListMemoNavIcon,
  ProfileNavFillDarkIcon,
  ProfileNavFillIcon,
  ProfileNavLineDark,
  ProfileNavLineIcon,
  SearchNavIcon,
  SearchNavLineDarkIcon,
  SearchNavLineIcon,
  TimelineNavDarkFillIcon,
  TimelineNavFillIcon,
  TimelineNavLineDarkIcon,
  TimelineNavLineIcon,
} from 'shared/Icon.Comp';
import { UserProfile } from 'screens/MyProfile/UserProfile.Nav';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
const MaterialTabs = createMaterialBottomTabNavigator();

const NAVICONSIZE = 26;
export const BottomTabNavigation = ({ route }) => {
  const nav = useNavigation();

  const [tabSwitch, setTabSwitch] = React.useState(false);

  return (
    <MaterialTabs.Navigator
      activeColor={AppColors.DarkGrey}
      inactiveColor={AppColors.LightGrey}
      labeled={false}
      barStyle={{
        // backgroundColor: AppColors.white,
        backgroundColor: AppColors.DarkBG,

        borderTopColor: '#494949',
        borderTopWidth: 1,
      }}
      initialRouteName={'TimelineScreenNav'}
    >
      <MaterialTabs.Screen
        name="UserProfileNav"
        listeners={{
          focus: e => {
            setTabSwitch(!tabSwitch);
          },
        }}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            return (
              // <MenuNavIcon size={size} color={color} />
              <View>
                {focused ? (
                  // <ProfileNavFillIcon size={NAVICONSIZE} />
                  <ProfileNavFillDarkIcon size={NAVICONSIZE} />
                ) : (
                  <ProfileNavLineDark size={NAVICONSIZE} />
                )}
              </View>
            );
          },
        }}
        component={UserProfile}
      />

      <MaterialTabs.Screen
        component={''}
        name="SearchNav"
        listeners={{
          tabPress: e => {
            e.preventDefault();
            nav.navigate('SearchScreen', { select: 'other' });
          },
        }}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <>
                <SearchNavIcon size={NAVICONSIZE} color={color} />
              </>
            );
          },
        }}
      />

      <MaterialTabs.Screen
        name="TimelineScreenNav"
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            return (
              // <MenuNavIcon size={size} color={color} />
              <View>
                {focused ? (
                  <TimelineNavDarkFillIcon size={NAVICONSIZE} color={'red'} />
                ) : (
                  <TimelineNavLineDarkIcon size={NAVICONSIZE} color={color} />
                )}
              </View>
            );
          },
        }}
      >
        {props => <TimelineScreen {...props} bottomTabRoute={route} />}
      </MaterialTabs.Screen>

      <MaterialTabs.Screen
        name="MemosPage"
        listeners={{
          tabPress: e => {
            e.preventDefault();
            nav.navigate('MemosPage');
          },
        }}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <>
                <ListMemoNavDarkIcon
                  size={NAVICONSIZE}
                  color={AppColors.DarkGrey}
                />
              </>
              //
            );
          },
        }}
        component={''}
      />
    </MaterialTabs.Navigator>
  );
};
