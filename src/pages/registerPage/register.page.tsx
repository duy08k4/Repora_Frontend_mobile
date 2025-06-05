// Import libraries
import { IonPage } from "@ionic/react"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"

// Import component
import Register_Verify from "../../components/user/register_verification/registerVerification.comp"

// Import service
import sendOTP from "../../services/user/user.sendOTP.serv"

// Import custom hook
import { useToast } from "../../hooks/toastMessage/toast"
import { useSpinner } from "../../hooks/spinner/spinner"

// import css
import "./register.page.css"

const RegisterPage: React.FC = () => {
    // State
    const [isOTP, setIsOTP] = useState<boolean>(false)

    const [checkData, setCheckData] = useState<boolean>(true) // Check data (username, gmail, password) is valid or not
    const [inputGmail, setInputGmail] = useState<string>("")
    const [inputName, setInputName] = useState<string>("")
    const [inputPassword, setInputPassword] = useState<string>("")
    const [inputConfirmPassword, setInputConfirmPassword] = useState<string>("")

    const redirect = useHistory()

    // Announce
    const [errorGmail, setErrorGmail] = useState<string>("")
    const [errorName, setErrorName] = useState<string>("")
    const [errorPassword, setErrorPassword] = useState<string>("")
    const [errorConfirmPassword, setErrorConfirmPassword] = useState<string>("")

    // Custom hook
    const { addToast } = useToast()
    const { openSpinner, closeSpinner } = useSpinner()

    // Redux

    // Effect
    useEffect(() => {
        let returnError = ""

        if (inputGmail === "") {
            returnError = "Please enter your gmail"
            setCheckData(false)
        } else {
            const gmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
            if (!gmailRegex.test(inputGmail)) {
                returnError = "Invalid email format"
                setCheckData(false)
            }
        }

        if (returnError == "") setCheckData(true)

        setErrorGmail(returnError)
    }, [inputGmail])

    useEffect(() => {
        let returnError = ""
        if (inputName == "") {
            returnError = "Please enter your username"
            setCheckData(false)
        } else {
            if (inputName.length >= 20) {
                returnError = "Username must be less than 20 characters"
                setCheckData(false)
            }
        }

        if (returnError == "") setCheckData(true)

        setErrorName(returnError)
    }, [inputName])

    useEffect(() => {
        let returnError = ""
        if (inputPassword == "") {
            returnError = "Please enter your password"
            setCheckData(false)
        } else {
            if (inputPassword.length < 8 || inputPassword.length > 20) {
                returnError = "Password must be between 8 and 20 characters"
                setCheckData(false)
            }

            if (inputPassword.toLowerCase() === inputPassword) {
                returnError = "Password must contain at least one uppercase letter"
                setCheckData(false)
            }

            const findNumber = /\d/;
            if (!findNumber.test(inputPassword)) {
                returnError = "Password must contain at least one number"
                setCheckData(false)
            }
        }

        if (returnError == "") setCheckData(true)

        setErrorPassword(returnError)
    }, [inputPassword])

    useEffect(() => {
        let returnError = ""

        if (inputConfirmPassword == "") {
            returnError = "Please enter your confirm password"
            setCheckData(false)
        } else {
            if (inputConfirmPassword != inputPassword) {
                returnError = "Confirm password is incorrect"
                setCheckData(false)
            }
        }
        if (returnError == "") setCheckData(true)

        setErrorConfirmPassword(returnError)
    }, [inputConfirmPassword])


    // Handler
    const handleOpenOTP = async () => {
        if (checkData) {
            openSpinner()
            await sendOTP({ gmail: inputGmail, method: "send" }).then((res) => {
                closeSpinner()
                setIsOTP(true)

                if (res.status == 200) {
                    addToast({
                        typeToast: "i",
                        content: res.data.mess,
                        duration: 5
                    })
                } else {
                    addToast({
                        typeToast: "w",
                        content: res.data.mess,
                        duration: 5
                    })
                }
                closeSpinner()
            }).catch((error) => {
                console.log(error)
            })
        } else {
            addToast({
                typeToast: "w",
                content: "Please fill the input",
                duration: 5
            })
        }
    }

    const handleCloseOTP = (state: boolean, clearForm: boolean) => {
        setIsOTP(state)

        if (clearForm) {
            setInputName("")
            setInputGmail("")
            setInputPassword("")
            setInputConfirmPassword("")
        }
    }

    return (
        <IonPage>
            <div className="registerPage pagePadding">
                <div className="registerForm">
                    <div className="registerForm__backbtnBox">
                        <button className="registerForm__backbtnBox--btn" onClick={() => { redirect.push("/") }}>
                            <i className="fas fa-long-arrow-alt-left"></i>
                        </button>
                    </div>

                    <div className="registerForm__titleContainer">
                        <h1 className="registerForm__titleContainer--mainTitle">Create Account</h1>
                        <p className="registerForm__titleContainer--subTitle">Please fill the input below here</p>
                    </div>

                    <div className="registerForm__inputContainer">
                        <div className="announceBox">
                            <div className="registerForm__inputContainer--input registerForm__inputContainer--inputGmail">
                                <i className="far fa-envelope"></i>
                                <input type="text" placeholder="Gmail..." value={inputGmail} onChange={(e) => { setInputGmail(e.target.value) }} />
                            </div>

                            <p className="announce_line">{errorGmail}</p>
                        </div>

                        <div className="announceBox">
                            <div className="registerForm__inputContainer--input registerForm__inputContainer--inputPassword">
                                <i className="fas fa-tag"></i>
                                <input type="text" placeholder="Your name..." value={inputName} onChange={(e) => { setInputName(e.target.value) }} />
                            </div>

                            <p className="announce_line">{errorName}</p>
                        </div>

                        <div className="announceBox">
                            <div className="registerForm__inputContainer--input registerForm__inputContainer--inputPassword">
                                <i className="fas fa-fingerprint"></i>
                                <input type="password" placeholder="Password..." value={inputPassword} onChange={(e) => { setInputPassword(e.target.value) }} />
                            </div>

                            <p className="announce_line">{errorPassword}</p>
                        </div>

                        <div className="announceBox">
                            <div className="registerForm__inputContainer--input registerForm__inputContainer--inputPassword">
                                <i className="fas fa-fingerprint"></i>
                                <input type="password" placeholder="Confirm password..." value={inputConfirmPassword} onChange={(e) => { setInputConfirmPassword(e.target.value) }} />
                            </div>

                            <p className="announce_line">{errorConfirmPassword}</p>
                        </div>

                    </div>

                    <div className="registerForm__buttonContainer">
                        <button className="registerForm__buttonContainer--registerBtn" onClick={handleOpenOTP}>register</button>
                    </div>
                </div>

                <div className="registerForm__direction">
                    <span>
                        Already have account? Let
                        <p className="redirect" onClick={() => { redirect.push("/") }}>login here</p>
                    </span>
                </div>

                {!isOTP ? "" : (
                    <Register_Verify data={{ gmail: inputGmail, username: inputName, password: inputPassword }} closeOTP={handleCloseOTP} />
                )}
            </div>
        </IonPage>
    )
}

export default RegisterPage