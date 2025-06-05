// Import libraries
import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react"
import { spring } from "motion";

// Import component
import "./registerVerification.comp.css"

// Import services
import sendOTP from "../../../services/user/user.sendOTP.serv";
import verifyOTP from "../../../services/user/user.verifyOTP.serv";
import createAccount from "../../../services/user/user.register.serv";


// Import custom hooks
import { useToast } from "../../../hooks/toastMessage/toast";
import { useSpinner } from "../../../hooks/spinner/spinner";


// Import interface
import { interface_register_register_serv, interface_register_verivicationComp_prop } from "../../../types/interface__register";

// Component
const Register_Verify: React.FC<{ data: interface_register_register_serv, closeOTP: interface_register_verivicationComp_prop }> = ({ data, closeOTP }) => {
    // State


    // Custom hooks
    const { addToast } = useToast()
    const { openSpinner, closeSpinner } = useSpinner()

    // Input Data
    const [inputCode, setInputCode] = useState(["", "", "", ""])
    const inputRef = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null)
    ]

    // Handler
    const handleInputCode = (index: number, inputData: string) => {
        const updateCode = [...inputCode]
        updateCode[index] = inputData
        setInputCode(updateCode)

        if (index < inputRef.length - 1) inputRef[index + 1].current?.focus()
    }

    useEffect(() => {
        (async () => {
            if (!inputCode.includes("")) {
                openSpinner()
                await verifyOTP({ inputOtp: [...inputCode].join("") }).then(async (verify_res) => {
                    closeSpinner()
                    if (verify_res.status == 200) {
                        await createAccount(data).then((createAccount_res) => {
                            if (createAccount_res.status == 200) {
                                addToast({
                                    typeToast: "s",
                                    content: createAccount_res.data.mess,
                                    duration: 5
                                })
                                handleCloseOTP(true)
                            } else {
                                addToast({
                                    typeToast: "e",
                                    content: createAccount_res.data.mess,
                                    duration: 5
                                })
                                handleCloseOTP(true)
                            }
                        }).catch((err) => { throw new Error(err) })

                    } else {
                        setInputCode(["", "", "", ""])
                        inputRef[0].current?.focus()
                        addToast({
                            typeToast: "e",
                            content: verify_res.data.mess,
                            duration: 5
                        })
                    }

                    closeSpinner()
                }).catch((err) => { throw new Error(err) })
            }
        })()
    }, [inputCode])

    const handleCloseOTP = (clearForm: boolean) => {
        closeOTP(false, clearForm)
    }

    const handleResendOTP = async () => {
        openSpinner()
        // const sendOTP_response = await sendOTP({ gmail })
        await sendOTP({ method: "resend", gmail: data.gmail }).then((res) => {
            closeSpinner()
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
        })
    }

    return (
        <motion.div
            className="verification"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className="verification__form"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ spring, duration: 0.3, delay: 0.3 }}
            >
                <h1 className="verification__form--title">Verification</h1>
                <p className="verification__form--note">Please enter the code we sent to your gmail.</p>
                <div className="verification__form__inputContainer">
                    {inputRef.map((ref, index) => (
                        <input
                            key={index}
                            ref={ref}
                            type="number"
                            className="verification__form__inputContainer--form--input"
                            value={inputCode[index]}
                            onChange={(e) => { handleInputCode(index, e.target.value) }}
                        />
                    ))}
                </div>

                <div className="verification__form__btnContainer">
                    <button className="verification__form--resendBtn" onClick={handleResendOTP}>Resend</button>
                    <button className="verification__form--closeBtn" onClick={() => { handleCloseOTP(false) }}>Close</button>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default Register_Verify