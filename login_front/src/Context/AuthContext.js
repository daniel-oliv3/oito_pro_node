import React, { createContext } from 'react';

const Context = createContext();

function AuthProvider({children}){
    return (
        <Context.Provider value={{authenticated: false}}>
            {children}
        </Context.Provider>
    )
}

export { Context, AuthProvider };