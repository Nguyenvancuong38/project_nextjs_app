'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
    name: string | null;
}

interface UserContextType {
    user: User;
    setUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User>({ name: null });
    console.log("user: ", user);
    

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        return { user: { name: null }, setUser: () => {} };
    }
    return context;
};
