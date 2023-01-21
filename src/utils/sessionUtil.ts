import EncryptedStorage from 'react-native-encrypted-storage';

export async function storeUserSession(sessionKey: string, valueToStore: object): Promise<void> {
    try {
        return await EncryptedStorage.setItem(sessionKey, JSON.stringify(valueToStore));

        // Congrats! You've just stored your first value!
    } catch (error) {
        return error as any;
        // There was an error on the native side
    }
}

export async function retrieveUserSession(sessionKey: string): Promise<any> {
    try {
        const session = await EncryptedStorage.getItem(sessionKey);

        if (session !== undefined) {
            return session;
            // Congrats! You've just retrieved your first value!
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
        // Congrats! You've just cleared the device storage!
    } catch (error) {
        // There was an error on the native side
    }
}

export default { clearStorage, retrieveUserSession, storeUserSession}
