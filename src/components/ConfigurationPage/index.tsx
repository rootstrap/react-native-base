import { ES_GREEN, ES_BLUE, ES_PINK } from 'config/colors';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import sessionService from '../../utils/sessionUtil';
import { Button, Icon } from 'react-native-elements';
import strings from 'locale';
import { sessionKey } from 'config/commonStrings';

type Props = {};

const ConfigurationPage = (props: Props) => {
    let storedSession;
    let retrievedSession: Promise<any> | React.SetStateAction<string>;
    // Called 'once' on init
    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            storedSession = sessionService.storeUserSession(sessionKey, {
                token: 'FAKE-TOKEN',
            });
            retrievedSession = sessionService.retrieveUserSession(sessionKey);
            console.log(storedSession);
            console.log(retrievedSession);
        }
        return () => {
            isMounted = false;
        };
    }, []);

   const setConfig = (config:any) => {
     alert(JSON.stringify(retrievedSession))
   }
    const [text, setText] = useState('');

    return (
        <View style={styles.maincontainer}>
            <Text style={styles.title}>ConfigurationPage: TODO Accept user provided token</Text>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Paste Token"
                    onChangeText={(text) => setText(text)}
                    value={text}
                />
                <Button
                    icon={<Icon name="archive" size={20} color="white" />}
                    title={strings.STOCKS_FEED.submit}
                    iconPosition="top"
                    onPress={() => {
                        setConfig({});
                    }}
                    type="solid"
                    style={styles.submitButton}
                    buttonStyle={styles.submitButtonColor}
                />
            </View>
        </View>
    );
};

export default ConfigurationPage;

const styles = StyleSheet.create({
    maincontainer: {
        marginTop: 40,
    },
    input: {
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        width: '100%',
        borderRadius: 10,
    },
    submitButton: {
        alignSelf: 'center',
        flex: 1,
    },
    submitButtonColor: {
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: ES_BLUE,
    },
    title: {
        backgroundColor: 'red',
        textAlign: 'center',
        padding: 10,
        fontSize: 20,
        color: '#FFFF',
        fontWeight: 'bold',
    },
    container: {
        marginTop: 40,
        alignItems: 'center',
    },
    gridView: {
        marginTop: 10,
        flex: 1,
    },
    buttonContainer: {
        alignSelf: 'center',
        paddingLeft: 20,
        flex: 0.2,
        height: 4,
        backgroundColor: 'grey',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonContainerMinimized: {
        paddingTop: 40,
        alignSelf: 'center',
        paddingLeft: 20,
        flex: 0.1,
        backgroundColor: 'grey',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    viewContainer: {
        backgroundColor: 'white',
        flex: 1,
    },
    listWrapper: {
        backgroundColor: ES_GREEN,
    },
    selectContainer: {
        flex: 7,
        backgroundColor: ES_GREEN,
    },
    selectDismiss: {
        flex: 1,
        backgroundColor: ES_GREEN,
    },
    space: {
        width: 20,
        height: 20,
    },
    selectList: {
        height: 600,
    },
    listContainer: {
        backgroundColor: ES_GREEN,
        padding: 0,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
    metricContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    overlayContainer: {
        flexDirection: 'column',
        flex: 1,
        alignSelf: 'stretch',
    },
    overlayDismissContainer: {
        flex: 1,
    },
    settingsButtonContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'flex-end',
        marginTop: 0,
        marginRight: 12.3,
    },
    itemContainer: {
        justifyContent: 'flex-start',
        borderRadius: 5,
        padding: 10,
        minHeight: 160,
        flex: 1,
    },
    itemContent: {
        justifyContent: 'flex-start',
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },
    dataLabel: {
        color: 'white',
        fontWeight: 'bold',
        margin: 2,
    },
    submitButton: {
        alignSelf: 'center',
    },
    submitButtonColor: {
        alignSelf: 'center',
        backgroundColor: ES_BLUE,
    },
    cancelButtonColor: {
        alignSelf: 'center',
        backgroundColor: ES_PINK,
        paddingLeft: 15,
    },
});
