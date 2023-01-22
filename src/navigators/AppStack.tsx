import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MAIN_SCREEN, STOCK_PICKER_SCREEN } from '../config/screens';
import MainScreen from '../screens/MainScreen';
import { Button, Icon } from 'react-native-elements';
import { ES_GREEN } from '../config/colors';
import { Image } from 'react-native';
import SettingsScreen from 'screens/SettingsScreen';
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {
    navigation: StackNavigationProp<any>;
};

const Stack = createStackNavigator();



const AppStack = ({ navigation }: Props) => (
    <Stack.Navigator>
        <Stack.Screen
            name={MAIN_SCREEN}
            component={MainScreen}
            options={{
                title: MAIN_SCREEN,
                headerStyle: {
                    backgroundColor: ES_GREEN,
                },
                headerTitle: () => (
                    <Image
                        style={{ width: 40, height: 40 }}
                        source={require('../assets/easy.stocks-icon.png')}
                    />
                ),
                headerRight: () => (
                    <Button
                        onPress={() => {
                            navigation.navigate(STOCK_PICKER_SCREEN, {
                                data: { navigation: 'navigated:STOCK_PICKER_SCREEN' },
                            });
                        }}
                        style={{ marginRight: 10 }}
                        type="outline"
                        icon={<Icon name="wrench" type="font-awesome" color="white" size={30} />}
                    />
                ),
            }}
        />
        <Stack.Screen
            name={STOCK_PICKER_SCREEN}
            component={SettingsScreen}
            options={({ navigation }) => ({
                title: STOCK_PICKER_SCREEN,
                headerTitle: () => (
                    <Image
                        style={{ width: 40, height: 40 }}
                        source={require('../assets/easy.stocks-icon.png')}
                    />
                ),
                headerRight: () => (
                    <Button
                        onPress={() => {
                            navigation.navigate(MAIN_SCREEN, {
                                data: { navigation: 'navigated:MAIN_SCREEN' },
                            });
                        }}
                        type="outline"
                        style={{ marginRight: 10 }}
                        icon={<Icon name="wrench" type="font-awesome" color="white" size={30} />}
                    />
                ),
                headerLeft: () => null,
                headerStyle: {
                    backgroundColor: ES_GREEN,
                },
            })}
        />
    </Stack.Navigator>
);

export default AppStack;
