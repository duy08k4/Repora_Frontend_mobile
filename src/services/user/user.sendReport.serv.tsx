// Import interface
import { interface__user__reportForm__serv } from "../../types/interface__userUI"

const sendReport = async (data: interface__user__reportForm__serv) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('type', data.type);
    formData.append('level', data.level);
    formData.append('image', data.file);
    formData.append('reporter_gmail', data.reporter_gmail);
    formData.append('reporter_name', data.reporter_name);
    formData.append('position', JSON.stringify(data.position));

    const serverResponse = await fetch(`${import.meta.env.VITE_SERVER_GATE}/send-report`, {
        method: "POST",
        credentials: "include",
        body: formData
    })
        .then(res => res.json())
        .then(data => {
            return data
        })

    return serverResponse
}

export default sendReport