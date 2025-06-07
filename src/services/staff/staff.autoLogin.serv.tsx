const staff_autoLogin = async () => {
    const serverResponse = await fetch(`${import.meta.env.VITE_SERVER_GATE}/login-account/staff-auto`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    })
        .then(res => res.json())
        .then(data => {
            return data
        })

    return serverResponse
}

export default staff_autoLogin