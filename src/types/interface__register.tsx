interface interface_register_verivicationComp_prop {
    (state: boolean, clearForm: boolean): void
}

// Service
interface interface_register_register_serv {
    gmail: string,
    username: string,
    password: string
} 

interface interface_register_SendOTP_serv {
    method: string
    gmail: string
}

interface interface_register_VerifyOTP_serv {
    inputOtp: string
}

export type {
    interface_register_verivicationComp_prop,

    // Service
    interface_register_register_serv,
    interface_register_SendOTP_serv,
    interface_register_VerifyOTP_serv,
}