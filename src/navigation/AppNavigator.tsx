import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../auth/AuthContext';
import { View, ActivityIndicator } from 'react-native';

import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { CharacterListScreen } from '../screens/CharacterListScreen';
import { CharacterDetailScreen } from '../screens/CharacterDetailScreen';
import { Character, Episode } from '../types';
import Episodes from '../screens/Episodes';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  CharacterList: undefined;
  CharacterDetail: { character: Character };
  Episodes: { episodes: Episode };
};

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FFD90F" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          // App Stack
          <>
            <Stack.Screen name="CharacterList" component={CharacterListScreen} />
            <Stack.Screen name="CharacterDetail" component={CharacterDetailScreen} />
            <Stack.Screen name="Episodes" component={Episodes} />
          </>
        ) : (
          // Auth Stack
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
