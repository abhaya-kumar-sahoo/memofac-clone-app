import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderNone } from '../Components/Header.Components';
import { ChooseFavourites } from 'screens/chooseFavourites/chooseFav';
import { Walkthrough } from 'screens/Walkthrough';

export function MediatorStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName={'ChooseFavourites'}>
      {/* PROFILE DETAILS */}
      <Stack.Screen
        name="ChooseFavourites"
        component={ChooseFavourites}
        options={HeaderNone}
      />

      <Stack.Screen
        name="Walkthrough"
        component={Walkthrough}
        options={HeaderNone}
      />
    </Stack.Navigator>
  );
}
