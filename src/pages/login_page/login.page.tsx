// Import libraries
import { IonPage } from "@ionic/react"
import React from "react"
import { useHistory } from "react-router"

// Import image
import Repora_Login_Element from "../../assets/Repora_Login_Element.png"

// Import css
import "./login.page.css"

const LoginPage: React.FC = () => {
    // State
    const redirect = useHistory()

    // Handler
    const handleLogin = () => {
        redirect.push("/map")
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
                            <input type="text" placeholder="Gmail..." />
                        </div>

                        <div className="loginForm__inputContainer--input loginForm__inputContainer--inputPassword">
                            <i className="fas fa-fingerprint"></i>
                            <input type="password" placeholder="Password..." />
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