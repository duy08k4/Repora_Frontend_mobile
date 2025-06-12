// Import libraries
import React, { createContext, useContext, useEffect, useRef, useState } from "react"
import { sha256 } from "js-sha256"

// Import interface
import {
    interface__authContext,
    interface__authProviderProps,
    interface__report__reducer,
    interface__userInformation
} from "../../types/interface__Auth"

// Import Redux
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import { cacheSetDefaultStaffInformation, cacheSetFullStaffInformation } from "../../redux/reducers/staffInformation.reducer"
import { cacheSetFullUserInformation } from "../../redux/reducers/userInformation.reducer"
import { cacheSetStaffStatus } from "../../redux/reducers/staffLocation.reducer"

// Import firebase
import { collection, doc, getDoc, getDocs, onSnapshot } from "firebase/firestore"
import { db } from "../../config/firebaseSDK"
import { cacheAddListReport } from "../../redux/reducers/report.reducer"


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
    const subscribe_userInformation_staff = useRef<(() => void) | undefined>(undefined);
    const subscribe_reportInformation = useRef<(() => void) | undefined>(undefined);
    const subscribe_userInformation_user = useRef<(() => void) | undefined>(undefined);
    const subscribe_staffLocation_listStaffOnline = useRef<(() => void) | undefined>(undefined);

    // Custom hook


    // Function: Set data for Redux
    const cacheSetData = (param: any) => {
        dispatch(param)
    }

    // Handler

    // Listener
    const enableListener_userInformation_staff = (gmailInput: string) => { //Get staff Information

        if (subscribe_userInformation_staff.current) {
            return
        }

        subscribe_userInformation_staff.current = onSnapshot(doc(db, "staffInformation", sha256(gmailInput)), (doc) => {
            const data = doc.data()
            if (data) {
                cacheSetData(cacheSetFullStaffInformation(data))

            } else {
                cacheSetData(cacheSetDefaultStaffInformation())
            }
        })

    }

    const enableListener_reportInformation = () => { //Get report Information

        if (subscribe_reportInformation.current) {
            return
        }

        subscribe_reportInformation.current = onSnapshot(
            collection(db, "report"),
            (snapshot) => {
                const reportList: interface__report__reducer[] = [];
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    reportList.push({ ...data as interface__report__reducer });
                });

                cacheSetData(cacheAddListReport(reportList))
            },
            (error) => {
                console.error("Error fetching report Information:", error);
            }
        );

    }

    const enableListener_staffLocation_listStaffOnline = async () => { // Get staff status
        if (subscribe_staffLocation_listStaffOnline.current) {
            return;
        }

        const staffStatusCollection = collection(db, "staffStatus");

        subscribe_staffLocation_listStaffOnline.current = onSnapshot(staffStatusCollection, (snapshot) => {
            const staffStatusObj: Record<string, boolean> = {};

            snapshot.forEach((doc) => {
                const data = doc.data();
                staffStatusObj[doc.id] = data.status;
            });

            cacheSetData(cacheSetStaffStatus(staffStatusObj));
        });
    };

    const enableListener_userInformation_user = (gmailInput: string) => { //Get userInformation

        if (subscribe_userInformation_user.current) {
            return
        }

        subscribe_userInformation_user.current = onSnapshot(doc(db, "userInformation", btoa(gmailInput)), (doc) => {
            const data = doc.data()
            if (data) {
                cacheSetData(cacheSetFullUserInformation(data))

            } else {
                cacheSetData(cacheSetDefaultStaffInformation())
            }
        })

    }


    // Off listener
    const disableListener_userInformation_staff = () => {
        if (subscribe_userInformation_staff.current) {
            subscribe_userInformation_staff.current()
            subscribe_userInformation_staff.current = undefined
        }
    }

    const disableListener_reportInformation = () => {
        if (subscribe_reportInformation.current) {
            subscribe_reportInformation.current()
            subscribe_reportInformation.current = undefined
        }
    }

    const disableListener_staffStatus = () => {
        if (subscribe_staffLocation_listStaffOnline.current) {
            subscribe_staffLocation_listStaffOnline.current()
            subscribe_staffLocation_listStaffOnline.current = undefined
        }
    }

    const disableListener_userInformation_user = () => {
        if (subscribe_userInformation_user.current) {
            subscribe_userInformation_user.current()
            subscribe_userInformation_user.current = undefined
        }
    }


    return (
        <CacheContext.Provider value={{
            cacheSetData,

            // Listner
            enableListener_userInformation_staff,
            enableListener_userInformation_user,
            enableListener_staffLocation_listStaffOnline,
            enableListener_reportInformation,

            // Disable listner
            disableListener_userInformation_staff,
            disableListener_reportInformation,
            disableListener_userInformation_user,
            disableListener_staffStatus
        }}>
            {children}
        </CacheContext.Provider>
    )
}