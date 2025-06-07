// Import libraries
import { IonPage } from "@ionic/react"
import React, { useState } from "react"
import { useHistory } from "react-router"
import { sha256 } from "js-sha256"

// Import image
import Repora_Login_Element from "../../assets/Repora_Login_Element.png"

// Import Custom hook
import { useToast } from "../../hooks/toastMessage/toast"
import { useSpinner } from "../../hooks/spinner/spinner"
import { useCache } from "../../hooks/cache/cache"

// Import service
import loginAccount from "../../services/loginAccount.serv"

// Import css
import "./login.page.css"
import { cacheSetUser } from "../../redux/reducers/user.reducer"

const LoginPage: React.FC = () => {
    // State
    const [inputGmail, setInputGmail] = useState<string>("")
    const [inputPassword, setInputPassword] = useState<string>("")
    const redirect = useHistory()

    // Custom hook
    const { addToast } = useToast()
    const { openSpinner, closeSpinner } = useSpinner()
    const { cacheSetData } = useCache()

    // Handler
    const handleLogin = async () => {
        if (!inputGmail || !inputPassword) {
            addToast({
                typeToast: "w",
                content: "Please fill the input",
                duration: 3
            })

            return
        } else {
            const gmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
            if (!gmailRegex.test(inputGmail)) {
                addToast({
                    typeToast: "w",
                    content: "Invalid email format",
                    duration: 3
                })

                return
            }

            // Service
            openSpinner()
            await loginAccount({ gmail: inputGmail, password: sha256(inputPassword) }).then((res) => {
                if (res.status == 200) {
                    const res_data = res.data.data
                    
                    cacheSetData(cacheSetUser({
                        inputGmail: res_data.gmail,
                        inputRole: res_data.role
                    }))

                    addToast({
                        typeToast: "s",
                        content: res.data.mess,
                        duration: 3
                    })

                    redirect.push("/map")
                } else {
                    addToast({
                        typeToast: "e",
                        content: res.data.mess,
                        duration: 3
                    })
                }

                closeSpinner()
            }).catch((err) => {
                console.log(`ERROR: ${err}`)
                closeSpinner()
                addToast({
                    typeToast: "e",
                    content: "Can't proccess...",
                    duration: 3
                })
            })

        }
    }

    return (
        <IonPage>
            <div className="loginPage pagePadding">
                <img className="Repora_Login_Element" src={Repora_Login_Element} alt="Repora Element" />

                <div className="loginForm">
                    <div className="loginForm__titleContainer">
                        <h1 className="loginForm__titleContainer--mainTitle">Login</h1>
                        <p className="loginForm__titleContainer--subTitle">Report your incident</p>
                    </div>

                    <div className="loginForm__inputContainer">
                        <div className="loginForm__inputContainer--input loginForm__inputContainer--inputGmail">
                            <i className="far fa-envelope"></i>
                            <input type="text" placeholder="Gmail..." value={inputGmail} onChange={(e) => { setInputGmail(e.target.value) }} />
                        </div>

                        <div className="loginForm__inputContainer--input loginForm__inputContainer--inputPassword">
                            <i className="fas fa-fingerprint"></i>
                            <input type="password" placeholder="Password..." value={inputPassword} onChange={(e) => { setInputPassword(e.target.value) }} />
                        </div>
                    </div>

                    <div className="loginForm__buttonContainer">
                        <button className="loginForm__buttonContainer--loginBtn" onClick={handleLogin}>login</button>
                    </div>
                </div>

                <div className="loginForm__direction">
                    <span>
                        Cant't login? Let
                        <p className="redirect" onClick={() => { redirect.push("/register") }}>register here</p>
                    </span>
                </div>
            </div>
        </IonPage>
    )
}

export default LoginPage