// Import libraries
import React, { useEffect, useRef, useState } from "react"

// Import component
import MapResizeHandler from "../../map_resizeHandler/MapResizeHandler";
import StaffListTask from "../staff__listTask/staffListTask.comp";
import StaffReportView from "../staff__report__view/staffReportView.comp";

// Import custom hook
import { useCache } from "../../../hooks/cache/cache";

// Import css
import "./staffFunction.comp.css"
import { MapContainer, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const StaffFunctionUI: React.FC = () => {
    // State
    const [isGotTask, setIsGotTask] = useState<boolean>(true)
    const [isStaffTaskList, setIsStaffTaskList] = useState<boolean>(false)
    const [isDetailTask, setIsDetailTask] = useState<boolean>(false)

    // Map
    const mapRef = useRef<any>(null);

    // Redux
    const staffGmail = useSelector((state: RootState) => state.user.gmail)

    // Custom hooke
    const { enableListener_userInformation_staff } = useCache()

    // Effect
    useEffect(() => {
        if (staffGmail != "") {
            enableListener_userInformation_staff(staffGmail)
        }
    },[staffGmail])

    // Handler
    const handleCloseTaskList = () => {
        setIsStaffTaskList(!isStaffTaskList)
    }

    const handleCloseDetailList = () => {
        setIsDetailTask(!isDetailTask)
    }

    return (
        <div className="staffFunctionUI">
            <MapContainer
                center={[10.8231, 106.6297]}
                zoom={16}
                style={{ height: "100%", width: "100%" }}
                ref={mapRef}
                zoomControl={false}
                whenReady={() => {
                    setTimeout(() => {
                        if (mapRef.current) {
                            mapRef.current.invalidateSize();
                        }
                    }, 100);
                }}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                <MapResizeHandler />
            </MapContainer>

            <div className="staffFunctionUI__allFunction">
                <button className="staffFunctionUI__allFunction__btn staffFunctionUI__allFunction__btn--logout">
                    <i className="fas fa-sign-out-alt"></i>
                </button>

                <button className="staffFunctionUI__allFunction__btn staffFunctionUI__allFunction__btn--incidentLocation">
                    <i className="fas fa-map-pin"></i>
                </button>

                <button className="staffFunctionUI__allFunction__btn staffFunctionUI__allFunction__btn--task">
                    <i className="fas fa-tasks" onClick={handleCloseTaskList}></i>
                </button>

                <button className="staffFunctionUI__allFunction__btn staffFunctionUI__allFunction__btn--myLocation">
                    <i className="fas fa-crosshairs"></i>
                </button>
            </div>

            {!isGotTask ? "" : (
                <>
                    <div className="staffFunctionUI__reportAnnountContainer">
                        <button className="staffFunctionUI__reportAnnountContainer__btn staffFunctionUI__reportAnnountContainer__btn--requireSupport">
                            Require support
                        </button>

                        <button className="staffFunctionUI__reportAnnountContainer__btn staffFunctionUI__reportAnnountContainer__btn--DoneTask">
                            Report done
                        </button>
                    </div>

                    <div className="staffFunctionUI__taskStateContainer">
                        <div className="staffFunctionUI__taskStateContainer__tag" onClick={handleCloseDetailList}>
                            <div className="staffFunctionUI__taskStateContainer__tag__box staffFunctionUI__taskStateContainer__tag__box--state">
                                <i className="fas fa-exclamation-circle staffFunctionUI__stateTask"></i>
                            </div>

                            <div className="staffFunctionUI__taskStateContainer__tag__box staffFunctionUI__taskStateContainer__tag__box--nameTask">
                                <p>Name task</p>
                            </div>

                            <div className="staffFunctionUI__taskStateContainer__tag__box staffFunctionUI__taskStateContainer__tag__box--taskMarker">
                                <i className="fas fa-map-marker-alt"></i>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {!isStaffTaskList ? "" : (
                <StaffListTask closeListTask={handleCloseTaskList} />
            )}

            {!isDetailTask ? "" : (
                <StaffReportView closeDetailTask={handleCloseDetailList} />
            )}

        </div>
    )
}

export default StaffFunctionUI