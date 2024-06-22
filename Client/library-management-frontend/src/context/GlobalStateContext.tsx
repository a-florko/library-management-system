import React, { createContext, useContext, useState } from "react";

interface GlobalStateContextProps {
    serverDown: boolean;
    setServerDown: React.Dispatch<React.SetStateAction<boolean>>;
}

const GlobalStateContext = createContext<GlobalStateContextProps | undefined>(undefined);

export const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [serverDown, setServerDown] = useState<boolean>(false);

    return (
        <GlobalStateContext.Provider value={{ serverDown, setServerDown }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

export const useGlobalState = () => {
    const context = useContext(GlobalStateContext);
    if (context === undefined) {
        throw new Error('useGlobalState must be used withint a GlobalStateProvider');
    }
    return context;
};