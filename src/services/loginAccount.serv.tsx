import { interface_login_loginAccount_serv } from "../types/interface__login";

const loginAccount = async (data: interface_login_loginAccount_serv) => {
    const serverResponse = await fetch(`${import.meta.env.VITE_SERVER_GATE}/login-account`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

export default loginAccount