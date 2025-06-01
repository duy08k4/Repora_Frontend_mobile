// Import libraries
import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react"
import { spring } from "motion";

// Import component
import "./registerVerification.comp.css"

// Import services


// Import custom hooks


// Import interface
import { interface_register_verivicationComp_prop } from "../../../types/interface__register";

// Component
const Register_Verify: React.FC<interface_register_verivicationComp_prop> = ({ closeOTP }) => {
    // Custom hooks


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
                
            }
        })()
    }, [inputCode])

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
                    <button className="verification__form--resendBtn">Resend</button>
                    <button className="verification__form--closeBtn" onClick={closeOTP}>Close</button>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default Register_Verify