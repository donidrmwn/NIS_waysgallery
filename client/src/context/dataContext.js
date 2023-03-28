import { createContext } from "react";

export const DataContext = createContext();

const initialState = {
    refetchData: null,
    data: null,
}

const reducer = (action) => {
    const { type, refetchData, payload } = action;
    switch (type) {
        case "SUCCESS":
            return {
                refetchData: refetchData,
                payload: payload
            };
        case "FAILED":
            return {
                refetchData: null,
                payload: null,
            };
        default:
            throw new Error();
    }
};

export const DataContextProvider = ({ children })