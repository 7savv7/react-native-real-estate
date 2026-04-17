import {Account, Avatars, Client, OAuthProvider} from 'react-native-appwrite';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

const client: Client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
    .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PACKAGE_NAME!);

const avatar = new Avatars(client);
const account: Account = new Account(client);

export async function login() {
    try {
        const link = Linking.createURL("/")
        const response = await account.createOAuth2Token({provider: OAuthProvider.Google, success: link});

        if (!response) throw new Error('Could not create session');

        const result = await WebBrowser.openAuthSessionAsync(response.toString(), link);

        if (result.type !== "success" || !result.url) throw new Error("OAuth flow was cancelled or failed");
        const url = new URL(result.url);

        const secret = url.searchParams.get('secret');
        const userId = url.searchParams.get('userId');

        if (!userId || !userId || !secret) throw new Error('Could not create session 2');

        const session = await account.createSession({
            userId,
            secret
        });

        if (!session) throw new Error('Could not create session 3');

        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export async function logout() {
    try {
        const sessionId: "current" = "current";
        await account.deleteSession(sessionId);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export async function getUser() {
    try {
        const responce = await account.get();

        if (responce.$id) {
            const userAvatar = avatar.getInitials(responce.name);

            return {...responce, avatar: userAvatar.toString()};
        }
    } catch (e) {
        console.error(e);
        return null;
    }
}