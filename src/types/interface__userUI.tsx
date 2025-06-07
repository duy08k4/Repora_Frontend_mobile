interface interface__user__reportForm__props {
    closeReportForm: () => void,
    clientPosition: [number, number]
}

// Service
interface interface__user__reportForm__serv {
    name: string,
    type: string,
    level: string,
    file: File,
    position: [number, number],
    reporter_gmail: string // Gmail
    reporter_name: string // Name
}

export type {
    interface__user__reportForm__props,

    interface__user__reportForm__serv
}