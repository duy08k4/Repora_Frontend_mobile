import type { ReactNode } from "react";

interface interface__authContext {
    cacheSetData: (param: any) => void,


     // Listener
    enableListener_userInformation_staff: (gmail: string) => void,
    enableListener_userInformation_user: (gmail: string) => void,
    

    // Disable Listener
    disableListener_userInformation_staff: () => void,
    disableListener_userInformation_user: () => void,
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

export type { interface__authContext, interface__authProviderProps, interface__userInformation }