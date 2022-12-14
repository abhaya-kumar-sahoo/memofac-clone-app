import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {BottomTabNavigation} from './BottomTabs';
import {SettingsScreen} from 'screens/Settings/Settings.screen';
import {SearchScreen} from 'screens/Search/Search.Nav';
import {
  ExperiencedContacts,
  ViewRatings,
} from 'screens/Timeline/components/ListContacts.screen';
import {CommentScreen} from 'screens/Comments/comments.screen';
import {ImageViewScreen} from 'screens/ImageView/ViewImage';
import {MemosPage, SamplePage} from 'screens/Memos/Memos.Nav';
import {ViewMemo} from 'screens/Memos/View_Memo';
import {SavetoCollection} from 'screens/Memos/SavetoCollection';
import {CreateNewMemo} from 'screens/Memos/CreateNewMemo';
import {SecondaryGroup} from 'screens/Memos/SecondaryGrooup';
import {ImageGallery} from 'screens/GalleryPicker/MyGallery/ImageGallery';
import {WishlistScreen} from 'screens/Wishlist/Wishlist.screen';

import {ContactsScreen} from 'screens/Contacts/Contact.screen';
import {UserMemos} from 'screens/Memos/UserMemos';
import {SearchMemoScreen} from 'screens/Memos/SearchMemo/SearchMemoScreen';
import {UpdateProfile} from 'screens/MyProfile/EditProfile/UpdateProfile';
import {ContactsWithReaction} from 'screens/Comments/Components/ListContacts.screen';
import {FriendsProfile} from 'screens/MyProfile/FriendsProfile/FriendsProfile';
import {WishlistMemos} from 'screens/Wishlist/WishlistMemos';
import {SaveMemoExp} from 'screens/Auth/SaveExperiences/SaveMemoExp';
import {WishListImageGallery} from 'screens/Wishlist/WishListImageGallery';
import {SinglePostScreen} from 'screens/Timeline/SinglePost/SinglePost.screen';
import {ReportProblem} from 'screens/ReportProblem/ReportProlemScreen';
import {ReportMemoScreen} from 'screens/Memos/ReportMemo/ReportMemo';
import {MultipleImageViewScreen} from 'screens/MultipleImageView';
import {MemoDetailsView} from 'screens/Memos/MemoDetailsView';
import {ViewPhoto} from 'screens/GalleryPicker/ViewPhoto';
import {StatusBar} from 'react-native';
import {RecaptureActivity} from 'screens/Recapture/RecaptureActivity';

export function UserStack() {
  const Stack = createStackNavigator();

  return (
    <>
      <Stack.Navigator
        initialRouteName={'BottomTabNavigation'}
        screenOptions={{headerShown: false, gestureEnabled: false}}>
        <Stack.Screen
          name={'BottomTabNavigation'}
          children={BottomTabNavigation}
        />
        <Stack.Screen name="SinglePostScreen" component={SinglePostScreen} />
        <Stack.Screen name="RecaptureActivity" component={RecaptureActivity} />

        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="MemosPage" component={MemosPage} />
        <Stack.Screen name="SamplePage" component={SamplePage} />
        <Stack.Screen name="ViewMemo" component={ViewMemo} />
        <Stack.Screen name="MemoDetailsView" component={MemoDetailsView} />
        <Stack.Screen name="SecondaryGroup" component={SecondaryGroup} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="SavetoCollection" component={SavetoCollection} />
        <Stack.Screen name="CreateNewMemo" component={CreateNewMemo} />
        <Stack.Screen name="SaveMemoExp" component={SaveMemoExp} />
        <Stack.Screen
          name="ExperiencedContacts"
          component={ExperiencedContacts}
        />
        <Stack.Screen name="ViewRatings" component={ViewRatings} />
        <Stack.Screen name="CommentScreen" component={CommentScreen} />
        <Stack.Screen
          name="ContactsWithReaction"
          component={ContactsWithReaction}
        />
        <Stack.Screen name={'ImageViewScreen'} component={ImageViewScreen} />
        <Stack.Screen
          name={'MultipleImageViewScreen'}
          component={MultipleImageViewScreen}
        />

        <Stack.Screen name={'ImageGallery'} component={ImageGallery} />
        <Stack.Screen
          name={'WishListImageGallery'}
          component={WishListImageGallery}
        />

        <Stack.Screen name={'WishlistScreen'} component={WishlistScreen} />

        <Stack.Screen name="ContactsScreen" component={ContactsScreen} />

        <Stack.Screen name="UserMemos" component={UserMemos} />
        <Stack.Screen name="WishlistMemos" component={WishlistMemos} />
        <Stack.Screen name="FriendsProfile" component={FriendsProfile} />
        <Stack.Screen name="SearchMemoScreen" component={SearchMemoScreen} />
        <Stack.Screen name="ReportProblemScreen" component={ReportProblem} />
        <Stack.Screen name="ReportMemoScreen" component={ReportMemoScreen} />
        <Stack.Screen name="ViewPhoto" component={ViewPhoto} />
      </Stack.Navigator>
      <StatusBar backgroundColor="black" barStyle="light-content" />
    </>
  );
}
