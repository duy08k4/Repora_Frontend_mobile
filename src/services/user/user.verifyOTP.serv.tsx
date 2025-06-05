// Import interface
import { interface_register_VerifyOTP_serv } from "../../types/interface__register"


const verifyOTP = async (data:interface_register_VerifyOTP_serv) => {
    const serverResponse = await fetch(`${import.meta.env.VITE_SERVER_GATE}/create-account/verify-otp`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({
            data
        })
    })
    .then(res => res.json())
    .then(data => {
        return data
    })

    return serverResponse
}

export default verifyOTP