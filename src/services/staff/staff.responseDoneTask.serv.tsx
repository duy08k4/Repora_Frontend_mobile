// Import interface
import { interface__staff__responseDone__serv } from "../../types/interface__staffUI"

const responseDone = async (data:interface__staff__responseDone__serv) => {
    const serverResponse = await fetch(`${import.meta.env.VITE_SERVER_GATE}/staff-task-response-done`,{
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

export default responseDone