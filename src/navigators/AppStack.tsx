import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MAIN_SCREEN } from '../constants/screens';
import MainScreen from '../screens/MainScreen';
import { Button, Icon } from 'react-native-elements';
import { ES_GREEN } from 'constants/colors';
import { Image } from 'react-native';

const Stack = createStackNavigator();

 const toggleStockPicker = () => {
    console.log(`clicked header toggle settings..`)
     
 };

const AppStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name={MAIN_SCREEN}
            component={MainScreen}
            options={({ navigation, route }) => ({
                title: MAIN_SCREEN,
                headerTitle: () => (
                    <Image
                        style={{ width: 40, height: 40 }}
                        source={require('../assets/easy.stocks-icon.png')}
                    />
                ),
                // headerRight: () => (
                //     // todo: pass click props to component
                //     <Button
                //         onPress={() => toggleStockPicker()}
                //         type="outline"
                //         icon={<Icon name="wrench" type="font-awesome" color="white" size={30} />}
                //     />
                // ),
                headerStyle: {
                    backgroundColor: ES_GREEN,
                },
            })}
        />
    </Stack.Navigator>
);

export default AppStack;
