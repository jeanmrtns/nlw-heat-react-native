import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthSessions from 'expo-auth-session';
import { api } from "../services/api";

const CLIENT_ID = 'bdd8321f5cbce61bf456';
const SCOPE = 'read:user';
const USER_STORAGE = '@nlwheat:user';
const TOKEN_STORAGE = '@nlwheat:token';

interface User {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
}

interface AuthContextData {
    user: User | null;
    isSigningIn: boolean;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
}

interface IAuthProvider {
    children: React.ReactNode;
}

interface AuthResponse {
    token: string;
    user: User;
}

interface AuthorizationResponse {
    params: {
        code?: string;
        error?: string;
    },
    type?: string;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children } : IAuthProvider ) {

    const [isSigningIn, setIsSigningIn] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        async function loadUserStorageData() {
            const userStorage = await AsyncStorage.getItem(USER_STORAGE);
            const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE);

            if(userStorage && tokenStorage) {
                api.defaults.headers.common['Authorization'] = `Bearer ${tokenStorage}`;
                setUser(JSON.parse(userStorage));
            }

            setIsSigningIn(false);
        }

        loadUserStorageData();
    }, []);




    async function signIn() {

        try {
            setIsSigningIn(true);
            const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`;
            const authSessionResponse = await AuthSessions.startAsync({ authUrl }) as AuthorizationResponse;

            if(authSessionResponse.type === 'success' && authSessionResponse.params.error !== 'access_denied') {
                const authResponse = await api.post('/authenticate', { code: authSessionResponse.params.code });
                const { user, token } = authResponse.data as AuthResponse;

                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
                await AsyncStorage.setItem(TOKEN_STORAGE, token);

                setUser(user);
            }
        } catch(e) {
            console.log(e);
        } finally {
            setIsSigningIn(false);
        }
    }

    async function signOut() {
        setUser(null);
        await AsyncStorage.removeItem(USER_STORAGE);
        await AsyncStorage.removeItem(TOKEN_STORAGE);
    }

    return (
        <AuthContext.Provider value={{
            signIn,
            signOut,
            user,
            isSigningIn
        }}>
            { children }
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth }