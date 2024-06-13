'use client';

import { localAuthenticate } from '@/helpers/localAuth';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
    name: string | null;
}

interface UserContextType {
    userStore: User;
    setUserStore: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [userStore, setUserStore] = useState<User>({ name: null });
    const {isAuthenticated, user} = localAuthenticate();

    useEffect(() => {
        if(isAuthenticated) {
            setUserStore(user);
        }
    }, [isAuthenticated])

    return (
        <UserContext.Provider value={{ userStore, setUserStore }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        return { userStore: { name: null }, setUserStore: () => {} };
    }
    return context;
};
