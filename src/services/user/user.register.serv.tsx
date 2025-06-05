// Import interface
import { interface_register_register_serv } from "../../types/interface__register"

const createAccount = async (data:interface_register_register_serv) => {
    const serverResponse = await fetch(`${import.meta.env.VITE_SERVER_GATE}/create-account`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
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

export default createAccount