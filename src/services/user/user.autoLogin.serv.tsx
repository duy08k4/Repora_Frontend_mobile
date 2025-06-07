const user_autoLogin = async () => {
    const serverResponse = await fetch(`${import.meta.env.VITE_SERVER_GATE}/login-account/user-auto`, {
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

export default user_autoLogin