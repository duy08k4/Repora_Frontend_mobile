// Import interface
import { interface__staff__taskResponse__serv } from "../../types/interface__staffUI"

const taskResponse = async (data:interface__staff__taskResponse__serv) => {
    const serverResponse = await fetch(`${import.meta.env.VITE_SERVER_GATE}/staff-task-response`,{
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

export default taskResponse