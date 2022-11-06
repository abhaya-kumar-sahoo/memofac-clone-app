import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../../screens/Auth/Login/Login.screen';
import { OtpVerification } from '../../screens/Auth/OtpVerification/OtpVerification';
import { TermsPage } from '../../screens/Auth/TermsConditions/TermsPage';
import { ProfileScreen } from 'screens/Auth/ProfileUpdate/Profile.screen';
import { HeaderNone } from 'Navigator/Components/Header.Components';
import { CropPhoto } from 'screens/GalleryPicker/Cropper/CropPhoto';
import { Gallery } from 'screens/GalleryPicker/Gallery';
import { PhotosList } from 'screens/GalleryPicker/PhotosList';
import { UserYearOfBirth } from 'screens/Auth/ProfileUpdate/YearOfBirthScreen/UserYearOfBirth';
import { UserName } from 'screens/Auth/ProfileUpdate/NameScreen/UserName';
import { UserGender } from 'screens/Auth/ProfileUpdate/GenderScreen/UserGender';
import { SelectMemos } from 'screens/Auth/ProfileUpdate/SelectMemos/SelectMemos';
import { ProfilePictureScreen } from 'screens/Auth/ProfileUpdate/ProfilePictureScreen/ProfilePictureScreen';
import { LetsGoScreen } from 'screens/Auth/ProfileUpdate/LetsGoScreen/LetsGoScreen';
import { RecaptureActivity } from 'screens/Recapture/RecaptureActivity';
import { WalkthroughRoute } from './WalkThroughRoute';

export function LoginStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={'TermsPage'}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="TermsPage" component={TermsPage} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="OtpVerification" component={OtpVerification} />

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
      <Stack.Screen
        name="PhotosList"
        component={PhotosList}
        options={HeaderNone}
      />

      <Stack.Screen name="UserYearOfBirth" component={UserYearOfBirth} />
      <Stack.Screen name="UserName" component={UserName} />
      <Stack.Screen name="UserGender" component={UserGender} />
      <Stack.Screen name="SelectMemos" component={SelectMemos} />

      <Stack.Screen
        name="ProfilePictureScreen"
        component={ProfilePictureScreen}
      />
      <Stack.Screen name="LetsGoScreen" children={WalkthroughRoute} />

      <Stack.Screen name="RecaptureActivity" component={RecaptureActivity} />
    </Stack.Navigator>
  );
}
