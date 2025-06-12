// Import libraries
import React, { useEffect, useState } from "react"

// Import interface
import { interface__staff__listTask__props } from "../../../types/interface__staffUI"
import { interface__report__reducer } from "../../../types/interface__Auth"

// Import custom hook
import { useToast } from "../../../hooks/toastMessage/toast"
import { useSpinner } from "../../../hooks/spinner/spinner"

// Import redux
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"

// Import service
import taskResponse from "../../../services/staff/staff.taskResponse.serv"

// Import css
import "./staffListTask.comp.css"

const StaffListTask: React.FC<interface__staff__listTask__props> = ({ closeListTask }) => {
    // State
    const [newReportStructure, setNewReportStructure] = useState<Record<string, interface__report__reducer>>({})
    const [haveNewTast, setHaveNewTast] = useState<boolean>(false)
    const [taskProccessing, setTaskProccessing] = useState<boolean>(false)

    // Redux
    const staffGmail = useSelector((state: RootState) => state.staffInfo.gmail)
    const listReport = useSelector((state: RootState) => state.reportImformation.listReport)
    const taskList = useSelector((state: RootState) => state.staffInfo.taskList)

    // Custom hook
    const { addToast } = useToast()
    const { openSpinner, closeSpinner } = useSpinner()

    // Effect
    useEffect(() => { // Change structure of listReport from Array to Object
        const changeReportStructure: Record<string, interface__report__reducer> = {}
        listReport.forEach(report => {
            changeReportStructure[report.reportID] = report
        })

        setNewReportStructure(changeReportStructure)
    }, [listReport.length])

    useEffect(() => { // Check new task
        let resultCheckNewTask = false
        let taskProccessing = false

        listReport.forEach(report => {
            if (!report.activeStaff.includes(staffGmail) && taskList.includes(report.reportID)) {
                resultCheckNewTask = true
            }

            if (report.activeStaff.includes(staffGmail) && taskList.includes(report.reportID)) {
                taskProccessing = true
            }
        })

        setHaveNewTast(resultCheckNewTask)
        setTaskProccessing(taskProccessing)

    }, [taskList.length, listReport])

    // Handler
    const handleTaskResponse = async (response: boolean, reportID: string) => {
        openSpinner()
        await taskResponse({ reportID, staffGmail, staffResponse: response }).then((res) => {
            closeSpinner()
            console.log(res)
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
        }).catch((err) => {
            closeSpinner()
            console.error(`ERROR: ${err}`)
            addToast({
                typeToast: "e",
                content: `Can't ${response ? "receive" : "deny"} the task`,
                duration: 3
            })
        })
    }

    return (
        <div className="staffListTask pagePadding">
            <div className="staffListTask__header">
                <button className="staffListTask__header--backBtn" onClick={closeListTask}>
                    <i className="fas fa-long-arrow-alt-left"></i>
                </button>

                <div className="staffListTask__header__container">
                    <h1 className="staffListTask__header--mainContent">Your Task</h1>
                    <p className="staffListTask__header--subContent">Let receive your task</p>
                </div>
            </div>

            <div className="staffListTask__listContainer">
                {/* Receive task */}

                {haveNewTast ? (
                    <div className="staffListTask__listContainer__receive">
                        <h3 className="staffListTask__listContainer__receive--title">New task</h3>

                        <div className="staffListTask__listContainer__receiveList">
                            {taskList.map((taskID, index) => {
                                const reportData = newReportStructure[taskID]
                                if (reportData) {
                                    return (
                                        <div key={index} className={`staffListTask__listContainer__receiveTag stateTask_${reportData.level}`}>
                                            <div className="staffListTask__listContainer__receiveTag--avatarBox">
                                                <img src={`${import.meta.env.VITE_CLOUDINARY_BASE_URL}/report/${reportData.imgCode}`} alt="" />
                                            </div>

                                            <div className="staffListTask__listContainer__receiveTag__infoBox">
                                                <p className="staffListTask__listContainer__receiveTag__infoBox--taskName">{reportData.name}</p>

                                                <p className="staffListTask__listContainer__receiveTag__infoBox--type">
                                                    <b>Type:</b> {reportData.type}
                                                </p>
                                            </div>

                                            <div className="staffListTask__listContainer__receiveTag__buttonBox">
                                                <button className="staffListTask__listContainer__receiveTag__buttonBox--receive" onClick={() => { handleTaskResponse(true, reportData.reportID) }} >
                                                    <i className="fas fa-check"></i>
                                                </button>

                                                <button className="staffListTask__listContainer__receiveTag__buttonBox--deny" onClick={() => { handleTaskResponse(false, reportData.reportID) }} >
                                                    <i className="fas fa-times"></i>
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }

                            })}

                        </div>
                    </div>
                ) : ""}

                {/* Proccessing */}
                {!taskProccessing ? "" : (
                    <div className="staffListTask__listContainer__proccess">
                        <h3 className="staffListTask__listContainer__proccess--title">Proccessing</h3>

                        <div className="staffListTask__listContainer__proccessList">

                            {taskList.map((taskID, index) => {
                                const reportData = newReportStructure[taskID]
                                if (reportData) {
                                    return (
                                        <div className="staffListTask__listContainer__receiveTag">
                                            <div className="staffListTask__listContainer__receiveTag--avatarBox">
                                                <img src={`${import.meta.env.VITE_CLOUDINARY_BASE_URL}/report/${reportData.imgCode}`} alt="" />
                                            </div>

                                            <div className="staffListTask__listContainer__receiveTag__infoBox">
                                                <p className="staffListTask__listContainer__receiveTag__infoBox--taskName">{reportData.name}</p>

                                                <p className="staffListTask__listContainer__receiveTag__infoBox--type">
                                                    <b>Type:</b> {reportData.type}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                }

                            })}

                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default StaffListTask