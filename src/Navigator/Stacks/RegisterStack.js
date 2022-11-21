import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HeaderNone} from '../Components/Header.Components';
import {ProfileScreen} from '../../screens/Auth/ProfileUpdate/Profile.screen';
import {Gallery} from '../../screens/GalleryPicker/Gallery';
import {CropPhoto} from 'screens/GalleryPicker/Cropper/CropPhoto';
import {UserYearOfBirth} from 'screens/Auth/ProfileUpdate/YearOfBirthScreen/UserYearOfBirth';
import {UserName} from 'screens/Auth/ProfileUpdate/NameScreen/UserName';
import {UserGender} from 'screens/Auth/ProfileUpdate/GenderScreen/UserGender';
import {SelectMemos} from 'screens/Auth/ProfileUpdate/SelectMemos/SelectMemos';
import {ProfilePictureScreen} from 'screens/Auth/ProfileUpdate/ProfilePictureScreen/ProfilePictureScreen';
import {LetsGoScreen} from 'screens/Auth/ProfileUpdate/LetsGoScreen/LetsGoScreen';
import {RecaptureActivity} from 'screens/Recapture/index';

/**
 *
 * @returns Register screen returns only the Profile Details screen
 */
export function RegisterStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={'UserName'}
      screenOptions={{headerShown: false}}>
      {/* PROFILE DETAILS */}
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={HeaderNone}
      />
      <Stack.Screen
        name="CropPhotoRegister"
        component={CropPhoto}
        options={HeaderNone}
      />
      <Stack.Screen name="Gallery" component={Gallery} options={HeaderNone} />

      <Stack.Screen name="UserYearOfBirth" component={UserYearOfBirth} />
      <Stack.Screen name="UserName" component={UserName} />
      <Stack.Screen name="UserGender" component={UserGender} />
      <Stack.Screen name="SelectMemos" component={SelectMemos} />

      <Stack.Screen
        name="ProfilePictureScreen"
        component={ProfilePictureScreen}
      />
      <Stack.Screen name="LetsGoScreen" component={LetsGoScreen} />

      <Stack.Screen name="RecaptureActivity" component={RecaptureActivity} />
    </Stack.Navigator>
  );
}
