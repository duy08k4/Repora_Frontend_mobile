// Import libraries
import React from "react"

// Import interface
import { interface__staff__listTask__props } from "../../../types/interface__staffUI"

// Import css
import "./staffListTask.comp.css"

const StaffListTask: React.FC<interface__staff__listTask__props> = ({ closeListTask }) => {


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
                <div className="staffListTask__listContainer__receive">
                    <h3 className="staffListTask__listContainer__receive--title">New task</h3>

                    <div className="staffListTask__listContainer__receiveList">

                        <div className="staffListTask__listContainer__receiveTag stateTask_normal">
                            <div className="staffListTask__listContainer__receiveTag--avatarBox">
                                <img src="https://img.freepik.com/premium-vector/vector-illustration-concept-incident-management-root-cause-analysis-problem-solving_675567-3043.jpg" alt="" />
                            </div>

                            <div className="staffListTask__listContainer__receiveTag__infoBox">
                                <p className="staffListTask__listContainer__receiveTag__infoBox--taskName">Name task</p>

                                <p className="staffListTask__listContainer__receiveTag__infoBox--type">
                                    <b>Type:</b> traffic
                                </p>
                            </div>

                            <div className="staffListTask__listContainer__receiveTag__buttonBox">
                                <button className="staffListTask__listContainer__receiveTag__buttonBox--receive">
                                    <i className="fas fa-check"></i>
                                </button>

                                <button className="staffListTask__listContainer__receiveTag__buttonBox--deny">
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                        </div>

                        <div className="staffListTask__listContainer__receiveTag stateTask_normal">
                            <div className="staffListTask__listContainer__receiveTag--avatarBox">
                                <img src="https://img.freepik.com/premium-vector/vector-illustration-concept-incident-management-root-cause-analysis-problem-solving_675567-3043.jpg" alt="" />
                            </div>

                            <div className="staffListTask__listContainer__receiveTag__infoBox">
                                <p className="staffListTask__listContainer__receiveTag__infoBox--taskName">Name task</p>

                                <p className="staffListTask__listContainer__receiveTag__infoBox--type">
                                    <b>Type:</b> traffic
                                </p>
                            </div>

                            <div className="staffListTask__listContainer__receiveTag__buttonBox">
                                <button className="staffListTask__listContainer__receiveTag__buttonBox--receive">
                                    <i className="fas fa-check"></i>
                                </button>

                                <button className="staffListTask__listContainer__receiveTag__buttonBox--deny">
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Proccessing */}
                <div className="staffListTask__listContainer__proccess">
                    <h3 className="staffListTask__listContainer__proccess--title">Proccessing</h3>

                    <div className="staffListTask__listContainer__proccessList">

                        <div className="staffListTask__listContainer__receiveTag">
                            <div className="staffListTask__listContainer__receiveTag--avatarBox">
                                <img src="https://img.freepik.com/premium-vector/vector-illustration-concept-incident-management-root-cause-analysis-problem-solving_675567-3043.jpg" alt="" />
                            </div>

                            <div className="staffListTask__listContainer__receiveTag__infoBox">
                                <p className="staffListTask__listContainer__receiveTag__infoBox--taskName">Name task</p>

                                <p className="staffListTask__listContainer__receiveTag__infoBox--type">
                                    <b>Type:</b> traffic
                                </p>
                            </div>
                        </div>

                        <div className="staffListTask__listContainer__receiveTag">
                            <div className="staffListTask__listContainer__receiveTag--avatarBox">
                                <img src="https://img.freepik.com/premium-vector/vector-illustration-concept-incident-management-root-cause-analysis-problem-solving_675567-3043.jpg" alt="" />
                            </div>

                            <div className="staffListTask__listContainer__receiveTag__infoBox">
                                <p className="staffListTask__listContainer__receiveTag__infoBox--taskName">Name task</p>

                                <p className="staffListTask__listContainer__receiveTag__infoBox--type">
                                    <b>Type:</b> traffic
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Done */}
                <div className="staffListTask__listContainer__done">
                    <h3 className="staffListTask__listContainer__done--title">Done</h3>

                    <div className="staffListTask__listContainer__doneList">

                        <div className="staffListTask__listContainer__receiveTag">
                            <div className="staffListTask__listContainer__receiveTag--avatarBox">
                                <img src="https://img.freepik.com/premium-vector/vector-illustration-concept-incident-management-root-cause-analysis-problem-solving_675567-3043.jpg" alt="" />
                            </div>

                            <div className="staffListTask__listContainer__receiveTag__infoBox">
                                <p className="staffListTask__listContainer__receiveTag__infoBox--taskName">Name task</p>

                                <p className="staffListTask__listContainer__receiveTag__infoBox--type">
                                    <b>Type:</b> traffic
                                </p>
                            </div>
                        </div>

                        <div className="staffListTask__listContainer__receiveTag">
                            <div className="staffListTask__listContainer__receiveTag--avatarBox">
                                <img src="https://img.freepik.com/premium-vector/vector-illustration-concept-incident-management-root-cause-analysis-problem-solving_675567-3043.jpg" alt="" />
                            </div>

                            <div className="staffListTask__listContainer__receiveTag__infoBox">
                                <p className="staffListTask__listContainer__receiveTag__infoBox--taskName">Name task</p>

                                <p className="staffListTask__listContainer__receiveTag__infoBox--type">
                                    <b>Type:</b> traffic
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StaffListTask