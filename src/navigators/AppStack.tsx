import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MAIN_SCREEN } from '../constants/screens';
import MainScreen from '../screens/MainScreen';
import { Image } from 'react-native';

const Stack = createStackNavigator();

const AppStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name={MAIN_SCREEN}
            component={MainScreen}
            options={{
                title: MAIN_SCREEN,
                headerTitle: () => (
                    <Image
                        style={{ width: 40, height: 40 }}
                        source={require('../assets/easy.stocks-icon.png')}
                    />
                ),
                headerStyle: {
                    backgroundColor: '#47ac7d',
                },
            }}
        />
    </Stack.Navigator>
);

export default AppStack;
