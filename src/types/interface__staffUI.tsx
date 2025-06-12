import { interface__report__reducer } from "./interface__Auth"

interface interface__staff__listTask__props {
    closeListTask: () => void
}


interface interface__staff__detailTask__props {
    closeDetailTask: () => void,
    report: interface__report__reducer
}

// Service
interface interface__staff__taskResponse__serv {
    reportID: string,
    staffGmail: string,
    staffResponse: true | false // true: accept task ; false: cancel task
}

interface interface__staff__responseDone__serv {
    reportID: string,
    staffGmail: string,
}

export type {
    interface__staff__listTask__props,
    interface__staff__detailTask__props,

    interface__staff__taskResponse__serv,
    interface__staff__responseDone__serv
}