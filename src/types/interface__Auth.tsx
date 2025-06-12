import type { ReactNode } from "react";

interface interface__authContext {
    cacheSetData: (param: any) => void,


    // Listener
    enableListener_userInformation_staff: (gmail: string) => void,
    enableListener_reportInformation: () => void
    enableListener_userInformation_user: (gmail: string) => void,
    enableListener_staffLocation_listStaffOnline: () => void,


    // Disable Listener
    disableListener_userInformation_staff: () => void,
    disableListener_reportInformation: () => void,
    disableListener_userInformation_user: () => void,
    disableListener_staffStatus: () => void
}

interface interface__authProviderProps {
    children: ReactNode,
}

interface interface__userInformation {
    username: string,
    gmail: string,
    uuid: string,
    avartarCode: string,
    friends: string[] | string,
    requests: string[] | string,
    setting: {} | string, // hoặc cụ thể hơn nếu có
    profileStatus: string
}

interface reportInformationState {
    listReport: interface__report__reducer[];
}


interface interface__report__reducer {
    name: string,
    reportID: string,
    type: string,
    level: string,
    reporter: {
        name: string,
        gmail: string
    },
    time: string,
    position: [number, number],
    imgCode: string,
    staff: string[],
    activeStaff: string[],
    state: string
}

export type {
    interface__authContext,
    interface__authProviderProps,
    interface__userInformation,

    reportInformationState,
    interface__report__reducer
}