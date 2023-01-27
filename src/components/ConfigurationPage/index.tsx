import { ES_GREEN, WHITE, ES_PURPLE, ES_BLUE } from 'config/colors';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import sessionService from '../../utils/sessionUtil';
import { Button, Icon, Badge } from 'react-native-elements';
import strings from 'locale';
import { iexDocsConfigToken, sessionKey } from 'config/commonStrings';
import { Linking } from 'react-native';

type Props = {
    onConfigSaved(): unknown;
};

const ConfigurationPage = (props: Props) => {
    // Called 'once' on init
    // TODO: debug this init code
    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            sessionService.retrieveUserSession(sessionKey).then((session) => {
                if (session?.token) {
                    // temp clear storage to test scenario where token is empty
                    //sessionService.clearStorage();
                    setHasExistingToken(true);
                }
            });
        }
        return () => {
            isMounted = false;
        };
    }, []);

    const saveConfig = (skipOverrideToken: boolean = false) => {
        setIsloading(true);

        if (skipOverrideToken) {
            setIsloading(false);
            props.onConfigSaved();
        } else {
            sessionService
                .storeUserSession(sessionKey, {
                    token,
                })
                .then(() => {
                    setIsloading(false);
                    props.onConfigSaved();
                });
        }
    };
    const [token, setToken] = useState('');
    const [isLoading, setIsloading] = useState(false);
    const [hasExistingToken, setHasExistingToken] = useState(false);
    const TOKEN_LENGTH = 35;

    return (
        <View style={styles.maincontainer}>
            <Text style={styles.title} onPress={() => Linking.openURL(iexDocsConfigToken)}>
                {strings.CONFIGURATION.getTokenPrompt} &#x2601;
            </Text>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder={strings.CONFIGURATION.tokenPastePlaceholder}
                    onChangeText={(token) => setToken(token)}
                    maxLength={TOKEN_LENGTH}
                    value={token}
                    autoFocus={true}
                    secureTextEntry={true}
                />
                <Badge
                    status="warning"
                    value={<Text style={styles.tokenBadge}>API Token Provided</Text>}
                    containerStyle={{ display: 'flex', flex: 0.1, flexDirection: 'column', margin: 5 }}
                />
                <View style={styles.buttonContainer}>
                    <Button
                        icon={<Icon name="save" size={20} color="white" />}
                        title={strings.STOCKS_FEED.submit}
                        iconPosition="left"
                        loading={isLoading}
                        disabled={token.length < TOKEN_LENGTH}
                        onPress={() => {
                            saveConfig();
                        }}
                        type="solid"
                        buttonStyle={styles.submitButton}
                    />
                    {hasExistingToken ? (
                        <Button
                            icon={<Icon name="forward" size={20} color="white" />}
                            title={strings.CONFIGURATION.continue}
                            iconPosition="left"
                            loading={isLoading}
                            onPress={() => {
                                saveConfig(true);
                            }}
                            type="solid"
                            buttonStyle={styles.cotinueButton}
                        />
                    ) : undefined}
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
        marginRight: 20,
        backgroundColor: ES_PURPLE,
    },
    cotinueButton: {
        alignSelf: 'center',
        backgroundColor: ES_BLUE,
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
    tokenBadge: {
        color: WHITE,
        padding: 5,
    },
    buttonContainer: {
        alignSelf: 'center',
        flex: 0.4,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
});
