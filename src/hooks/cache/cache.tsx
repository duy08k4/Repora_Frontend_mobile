// Import libraries
import React, { createContext, useContext, useEffect, useRef, useState } from "react"

// Import interface
import {
    interface__authContext,
    interface__authProviderProps,
    interface__userInformation
} from "../../types/interface__Auth"

// Import Redux
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"

// Import firebase
import { collection, doc, getDoc, getDocs, onSnapshot } from "firebase/firestore"
import { db } from "../../config/firebaseSDK"

// Import services

const CacheContext = createContext<interface__authContext | undefined>(undefined)

export const useCache = (): interface__authContext => {
    const context = useContext(CacheContext)

    if (!context) {
        throw new Error("useToast must be used within a CacheProvider");
    }

    return context
}

export const CacheProvider: React.FC<interface__authProviderProps> = ({ children }) => {
    const dispatch = useDispatch<AppDispatch>()

    // State

    
    // Redux


    // Storage listener Event


    // Custom hook

    // Function: Set data for Redux
    const cacheSetData = (param: any) => {
        dispatch(param)
    }

    // Handler

    // Listener
    

    return (
        <CacheContext.Provider value={{
            cacheSetData,
        }}>
            {children}
        </CacheContext.Provider>
    )
}