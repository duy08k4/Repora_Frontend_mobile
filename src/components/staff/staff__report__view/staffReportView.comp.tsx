// Import libraries
import React, { useEffect, useRef } from "react"

// Import interface
import { interface__staff__detailTask__props } from "../../../types/interface__staffUI"

// Import css
import "./staffReportView.comp.css"

const StaffReportView: React.FC<interface__staff__detailTask__props> = ({ closeDetailTask, report }) => {
    // State
    const detailTaskForm = useRef<HTMLDivElement>(null)

    // Effect
    useEffect(() => {
        const handleClickOutsideMenu = (event: MouseEvent | TouchEvent) => {
            if (detailTaskForm.current && !detailTaskForm.current.contains(event.target as Node)) {
                closeDetailTask()
            }
        };

        document.addEventListener('mousedown', handleClickOutsideMenu);
        document.addEventListener('touchstart', handleClickOutsideMenu);

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideMenu);
            document.removeEventListener('touchstart', handleClickOutsideMenu);
        };
    }, [])


    return (
        <div className="staffReportViewContainer">
            <div className="staffReportViewForm" ref={detailTaskForm}>
                <div className="staffReportViewForm__mainInfoBox">
                    <div className="staffReportViewForm__mainInfoBox--imgBox">
                        <img src={`${import.meta.env.VITE_CLOUDINARY_BASE_URL}/report/${report.imgCode}`} alt="" />
                    </div>

                    <h1 className="staffReportViewForm__mainInfoBox--reportName">{report.name}</h1>
                    <p className="staffReportViewForm__mainInfoBox--reportID"><b></b>{report.reportID}</p>
                </div>


                <div className="staffReportViewForm__detailInfoContainer">

                    <div className="staffReportViewForm__detailInfoBox">
                        <p className="staffReportViewForm__detailInfoBox--title">Incident level</p>

                        <span className="staffReportViewForm__detailInfoBox__contentBox">
                            <p>{report.level}</p>
                        </span>
                    </div>

                    <div className="staffReportViewForm__detailInfoBox">
                        <p className="staffReportViewForm__detailInfoBox--title">Incident Type</p>

                        <span className="staffReportViewForm__detailInfoBox__contentBox">
                            <p>{report.type}</p>
                        </span>
                    </div>

                    <div className="staffReportViewForm__detailInfoBox">
                        <p className="staffReportViewForm__detailInfoBox--title">Reporter Name</p>

                        <span className="staffReportViewForm__detailInfoBox__contentBox">
                            <p>{report.reporter.name}</p>
                        </span>
                    </div>

                    <div className="staffReportViewForm__detailInfoBox">
                        <p className="staffReportViewForm__detailInfoBox--title">Reporter Gmail</p>

                        <span className="staffReportViewForm__detailInfoBox__contentBox">
                            <p>{report.reporter.gmail}</p>
                        </span>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default StaffReportView