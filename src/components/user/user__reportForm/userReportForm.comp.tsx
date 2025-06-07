// Import libraries
import React, { useEffect, useRef, useState } from "react"

// Import interface
import { interface__user__reportForm__props } from "../../../types/interface__userUI"

// Import css
import "./userReportForm.comp.css"

// Import custom hook
import { useToast } from "../../../hooks/toastMessage/toast"

// Import service
import sendReport from "../../../services/user/user.sendReport.serv"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"

const UserReportForm: React.FC<interface__user__reportForm__props> = ({ closeReportForm, clientPosition }) => {
    // State
    const [reportName, setReportName] = useState<string>("")
    const [incidentType, setIncidentType] = useState<string>("")
    const [incidentLevel, setIncidentLevel] = useState<string>("")
    const [imageSelected, setImageSelected] = useState<File | null>(null)

    const [isIncidenLevelForm, setIsIncidenLevelForm] = useState<boolean>(false)

    // Ref
    const reportForm = useRef<HTMLDivElement>(null)
    const incidentLevelForm = useRef<HTMLDivElement>(null)
    const inputFileType = useRef<HTMLInputElement | null>(null);

    // Custom hook
    const { addToast } = useToast()

    // Redux
    const userGmail = useSelector((state: RootState) => state.userInfo.gmail)
    const username = useSelector((state: RootState) => state.userInfo.username)

    // Handler
    const handleChooseImg = () => {
        inputFileType.current?.click();
    }

    const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageSelected(file);
        }
    }

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setIncidentType(event.target.value);
    };

    const handleCheckData = () => {
        if (reportName && incidentType && imageSelected) {
            setIsIncidenLevelForm(true)

        } else {
            addToast({
                typeToast: "w",
                content: "Please fill report form",
                duration: 3
            })
        }
    }

    const handleSendReport = async () => {
        if (incidentLevel && clientPosition[0] != 0 && clientPosition[1] != 0) {
            alert("Sent your report")
            await sendReport({
                name: reportName,
                type: incidentType,
                level: incidentLevel,
                file: imageSelected!,
                reporter_name: username,
                reporter_gmail: userGmail,
                position: clientPosition
            }).then((res) => {
                if (res.status == 200) {
                    addToast({
                        typeToast: "s",
                        content: res.data.mess,
                        duration: 3
                    })
                } else {
                    addToast({
                        typeToast: "e",
                        content: res.data.mess,
                        duration: 3
                    })
                }

                closeReportForm()
            }).catch((err) => {
                closeReportForm()
                console.log(err)
                addToast({
                    typeToast: "e",
                    content: "Can't send report",
                    duration: 3
                })
            })
        } else {
            addToast({
                typeToast: "w",
                content: "Please choose level",
                duration: 3
            })
        }
    }

    // Effect
    useEffect(() => {
        let justClosedIncidentForm = false;

        const handleClickOutsideMenu = (event: MouseEvent | TouchEvent) => {
            const clickedOutsideReport = reportForm.current && !reportForm.current.contains(event.target as Node);
            const clickedOutsideIncident = incidentLevelForm.current && !incidentLevelForm.current.contains(event.target as Node);

            if (isIncidenLevelForm) {
                if (clickedOutsideIncident) {
                    setIsIncidenLevelForm(false);
                    justClosedIncidentForm = true;
                }
            } else if (clickedOutsideReport) {
                if (!justClosedIncidentForm) {
                    closeReportForm();
                }
            }
        };

        const resetFlag = () => {
            justClosedIncidentForm = false;
        };

        document.addEventListener('mousedown', handleClickOutsideMenu);
        document.addEventListener('touchstart', handleClickOutsideMenu);
        document.addEventListener('click', resetFlag);

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideMenu);
            document.removeEventListener('touchstart', handleClickOutsideMenu);
            document.removeEventListener('click', resetFlag);
        };
    }, [isIncidenLevelForm]);


    return (
        <div className="userReportContainer">
            <div className="userReportForm" ref={reportForm}>
                <div className="userReportForm__header">
                    <h1 className="userReportForm__header--mainTitle">report</h1>
                    <p className="userReportForm__header--subTitle">Please fill the input below here</p>
                </div>

                <div className="userReportForm__form">
                    <div className="userReportForm__form__inputform">
                        <input type="text" placeholder="Name" value={reportName} onChange={(e) => { setReportName(e.target.value) }} />

                        <select value={incidentType} onChange={handleSelectChange}>
                            <option value="">Incident's type</option>
                            <option value="traffic">Traffic</option>
                            <option value="electricity">Electricity</option>
                            <option value="other">Other</option>
                        </select>

                        <button className={`reportForm__addImage ${imageSelected && "addedImage"}`} onClick={handleChooseImg}>
                            <i className="far fa-image"></i>
                            {imageSelected == null ? "Add image" : "Change image"}
                        </button>

                        <input className="inputfile" ref={inputFileType} onChange={handleChangeImg} type="file" accept="image/*" />
                    </div>

                    <div className="userReportForm__form__btnContainer">
                        <button className="userReportForm__form__btn" onClick={handleCheckData}>Continue</button>
                    </div>
                </div>
            </div>

            {!isIncidenLevelForm ? "" : (
                <div className="incidentLevelContainer">
                    <div className="incidentLevelForm" ref={incidentLevelForm}>
                        <h1 className="incidentLevelForm--title">Incident Level</h1>

                        <div className="incidentLevelForm__list">
                            <div className={`incidentLevelForm__list--level incidentLevelForm__list--normal ${incidentLevel}`} onClick={() => { setIncidentLevel("normal") }}>
                                <i className="fas fa-meh"></i>
                            </div>

                            <div className={`incidentLevelForm__list--level incidentLevelForm__list--severe ${incidentLevel}`} onClick={() => { setIncidentLevel("severe") }} >
                                <i className="fas fa-frown"></i>
                            </div>

                            <div className={`incidentLevelForm__list--level incidentLevelForm__list--crirical ${incidentLevel}`} onClick={() => { setIncidentLevel("critical") }} >
                                <i className="fas fa-dizzy"></i>
                            </div>
                        </div>

                        <button className={`incidentLevelFormBtn ${incidentLevel}`} onClick={handleSendReport}>
                            {incidentLevel == "" ? "Choose level" : `Choose "${incidentLevel}"`}
                        </button>
                    </div>
                </div>
            )}

        </div>
    )
}

export default UserReportForm