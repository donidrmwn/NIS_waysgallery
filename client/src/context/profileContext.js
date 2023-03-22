import { createContext, useReducer } from "react";

export const ProfileContext =createContext();

const initialState = {
    profile: {},
}

const reducer = (payload) =>{
    return {
        profile: payload
    }
}


export const ProfileContextProvider = ({ children }) => {
    const[state, dispatch] = useReducer(reducer,initialState)
    return (
        <ProfileContext.Provider value={[state,dispatch]}>
            {children}
        </ProfileContext.Provider>
    )
}