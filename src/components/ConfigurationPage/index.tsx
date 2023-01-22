import { ES_GREEN, WHITE, ES_PURPLE } from 'config/colors';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, Text, Modal, Alert } from 'react-native';
import sessionService, { retrieveUserSession } from '../../utils/sessionUtil';
import { Button, Icon } from 'react-native-elements';
import strings from 'locale';
import { iexDocsConfigToken, sessionKey } from 'config/commonStrings';
import { Linking } from 'react-native';
import session from 'redux-persist/es/storage/session';

type Props = {
    onConfigSaved(): unknown;
};

const ConfigurationPage = (props: Props) => {
    // let retrievedSession: Promise<any> | React.SetStateAction<string>;

    // Called 'once' on init
    // TODO: debug this init code
    // useEffect(() => {
    //     let isMounted = true;
    //     if (isMounted) {
    //         retrievedSession = sessionService.retrieveUserSession(sessionKey);
    //         retrievedSession.then((session) => {
    //             if (session?.token) {
    //                 setHasExistingToken(true);
    //                 setModalVisible(true);
    //             }
    //         });
    //     }
    //     return () => {
    //         isMounted = false;
    //     };
    // }, []);

    const saveConfig = () => {
        setIsloading(true);
        sessionService
            .storeUserSession(sessionKey, {
                token,
            })
            .then(() => {
                setIsloading(false);
                props.onConfigSaved();
            });
    };
    const [token, setToken] = useState('');
    const [isLoading, setIsloading] = useState(false);
    const [hasExistingToken, setHasExistingToken] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const TOKEN_LENGTH = 35;

    return (
        <View style={styles.maincontainer}>
            {/* // TODO: Debug modal code for existing token scenario. */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible && Boolean(token.length)}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}></Modal>
            <Text style={styles.title} onPress={() => Linking.openURL(iexDocsConfigToken)}>
                Access the IEX Cloud console to generate an API token &#x2601;
            </Text>
            {hasExistingToken ? <Text>has token</Text> : <></>}
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Paste IEX Cloud Token here.."
                    onChangeText={(token) => setToken(token)}
                    maxLength={TOKEN_LENGTH}
                    value={token}
                />
                <View style={styles.buttonContainer}>
                    <Button
                        icon={<Icon name="save" size={20} color="white" />}
                        title={strings.STOCKS_FEED.submit}
                        iconPosition="left"
                        raised={true}
                        loading={isLoading}
                        disabled={token.length < TOKEN_LENGTH}
                        onPress={() => {
                            saveConfig();
                        }}
                        type="solid"
                        buttonStyle={styles.submitButton}
                    />
                </View>
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
        backgroundColor: ES_PURPLE,
    },
    title: {
        backgroundColor: ES_GREEN,
        textAlign: 'center',
        padding: 10,
        fontSize: 20,
        color: WHITE,
        fontWeight: 'bold',
    },
    container: {
        marginTop: 40,
        padding: 10,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    buttonContainer: {
        alignSelf: 'center',
        flex: 0.4,
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
