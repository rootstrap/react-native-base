import EncryptedStorage from 'react-native-encrypted-storage';

export async function storeUserSession(sessionKey: string, valueToStore: object): Promise<void> {
    try {
        return await EncryptedStorage.setItem(sessionKey, JSON.stringify(valueToStore));

    } catch (error) {
        return error as any;
        // There was an error on the native side
    }
}

export async function retrieveUserSession(sessionKey: string): Promise<any> {
    try {
        const session = await EncryptedStorage.getItem(sessionKey);

        if (session !== undefined) {
            const parseSessionData = JSON.parse(session as string);   
            return parseSessionData;
        }
        return session;
    } catch (error) {
        return error;
        // There was an error on the native side
    }
}

export async function clearStorage() {
    try {
        return await EncryptedStorage.clear();
    } catch (error) {
        return error;
        // There was an error on the native side
    }
}

export default { clearStorage, retrieveUserSession, storeUserSession}
