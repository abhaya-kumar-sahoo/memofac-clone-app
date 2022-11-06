import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LetsGoScreen } from 'screens/Auth/ProfileUpdate/LetsGoScreen/LetsGoScreen';
import { IntroVideo } from 'screens/Auth/ProfileUpdate/LetsGoScreen/IntroVideo';

export function WalkthroughRoute() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={'IntroVideo'}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="IntroVideo" component={IntroVideo} />

      <Stack.Screen name="LetsGoScreen" component={LetsGoScreen} />
    </Stack.Navigator>
  );
}
