// Import libraries
import React, { useEffect, useRef, useState } from "react"

// Import component
import MapResizeHandler from "../../map_resizeHandler/MapResizeHandler";
import StaffListTask from "../staff__listTask/staffListTask.comp";
import StaffReportView from "../staff__report__view/staffReportView.comp";

// Import custom hook
import { useCache } from "../../../hooks/cache/cache";
import { useSocket } from "../../../hooks/socket/socket";

// Import css
import "./staffFunction.comp.css"

// Import leaflet
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Geolocation } from '@capacitor/geolocation';
import L, { Marker as LeafletMarker } from 'leaflet';


// Import redux
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import responseDone from "../../../services/staff/staff.responseDoneTask.serv";
import { useToast } from "../../../hooks/toastMessage/toast";
import { useSpinner } from "../../../hooks/spinner/spinner";
import { interface__report__reducer } from "../../../types/interface__Auth";
import { sha256 } from "js-sha256";
import { logoutAccount } from "../../../services/logoutAccount.serv";
import { useHistory } from "react-router";

// Client marker
const clientMarker = `
    <div class="clientMarker"></div>
`

const customIcon = L.divIcon({
    // iconUrl: 'https://png.pngtree.com/png-clipart/20230805/original/pngtree-map-marker-flat-red-color-icon-ui-position-placement-vector-picture-image_9756810.png',  // Đường dẫn đến biểu tượng
    className: "client__customMarker",
    html: clientMarker,
    iconAnchor: [8, 0]
});

// Report marker
const createReportMarker = () => {
    const reportMarker = `
            <div class="reportMarker">
               <i class="fas fa-flag"></i>
            </div>
        `

    return L.divIcon({
        className: "report__customMarker",
        html: reportMarker,
        iconAnchor: [0, 27]
    })
}

// Staff marker
const createStaffMarker = () => {
    const reportMarker = `
            <div class="staffMarker">
               <i class="fas fa-map-marker-alt"></i>
            </div>
        `

    return L.divIcon({
        className: "staff__customMarker",
        html: reportMarker,
        iconAnchor: [13, 30]
    })
}

const StaffFunctionUI: React.FC = () => {
    // State
    const [isGotTask, setIsGotTask] = useState<boolean>(false)
    const [isNewTask, setIsNewTask] = useState<boolean>(false)
    const [isStaffTaskList, setIsStaffTaskList] = useState<boolean>(false)
    const [showReportLocation, setShowReportLocation] = useState<boolean>(false)
    const [showStaffLocation, setShowStaffLocation] = useState<boolean>(false)
    const [isDetailTask, setIsDetailTask] = useState<boolean>(false)
    const [newReportStructure, setNewReportStructure] = useState<Record<string, interface__report__reducer>>({})

    const redirect = useHistory()


    // Map
    const [position, setPosition] = useState<[number, number]>([10.8231, 106.6297])
    const latestPositionRef = useRef<[number, number]>(position);
    const oldPosition = useRef<[number, number]>([0, 0])
    const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isUserInteractingRef = useRef(false);

    const markerRef = useRef<LeafletMarker>(null)
    const mapRef = useRef<any>(null);
    const getPositionLoop = useRef<ReturnType<typeof setInterval> | null>(null)


    // Redux
    const staffGmail = useSelector((state: RootState) => state.user.gmail)
    const listTask = useSelector((state: RootState) => state.staffInfo.taskList)
    const listReport = useSelector((state: RootState) => state.reportImformation.listReport)
    const getStaffLocation = useSelector((state: RootState) => state.staffLocation.staffLocation)
    const getStaffStatus = useSelector((state: RootState) => state.staffLocation.staffStatus)

    // Custom hook
    const { enableListener_userInformation_staff } = useCache()
    const { shareLocation, setStatusWhenLogout } = useSocket()
    const { addToast } = useToast()
    const { closeSpinner, openSpinner } = useSpinner()

    // Effect
    useEffect(() => {
        const changeStructureReport: Record<string, interface__report__reducer> = {}

        listReport.forEach(report => {
            changeStructureReport[report.reportID] = report
        })

        setNewReportStructure(changeStructureReport)
    }, [listReport])

    useEffect(() => {
        if (
            listTask.length > 0 &&
            newReportStructure[listTask[0]] &&
            newReportStructure[listTask[0]].activeStaff.includes(staffGmail)
        ) {
            setIsGotTask(true)
        } else {
            setIsGotTask(false)
        }

    }, [listTask, newReportStructure, staffGmail])

    useEffect(() => {
        if (listTask.length > 0 && newReportStructure[listTask[0]] && !newReportStructure[listTask[0]].activeStaff.includes(staffGmail)) {
            setIsNewTask(true)
        } else {
            setIsNewTask(false)
        }
    }, [listReport, listTask, newReportStructure])

    useEffect(() => {
        if (staffGmail != "") {
            enableListener_userInformation_staff(staffGmail)
        }
    }, [staffGmail])

    useEffect(() => {
        getPositionLoop.current = setInterval(async () => {
            try {
                const coordinates = await Geolocation.getCurrentPosition({
                    enableHighAccuracy: true,
                    timeout: 30000,
                    maximumAge: 0
                })

                const newPosition: [number, number] = [
                    coordinates.coords.latitude,
                    coordinates.coords.longitude
                ]

                if (oldPosition.current[0] === 0 && oldPosition.current[1] === 0) {
                    setPosition([...newPosition])
                    oldPosition.current = [...newPosition]

                    shareLocation({ staffGmail, staffLocation: newPosition })

                } else {
                    if (oldPosition.current[0] !== newPosition[0] || oldPosition.current[1] !== newPosition[1]) {
                        setPosition([...newPosition])
                        oldPosition.current = [...newPosition]

                        shareLocation({ staffGmail, staffLocation: newPosition })
                    }
                }

                if (mapRef.current && isUserInteractingRef.current == false) {
                    mapRef.current.setView(newPosition, mapRef.current.getZoom())
                }
            } catch (error) {
                // console.log(error)
            }
        }, 2000)

        return () => {
            if (getPositionLoop.current !== null) {
                clearInterval(getPositionLoop.current)
                getPositionLoop.current = null
            }
        }
    }, [])

    useEffect(() => {
        setTimeout(() => {
            shareLocation({ staffGmail, staffLocation: position })
        }, 1500)
        latestPositionRef.current = position;

    }, [position])

    mapRef.current?.on("movestart", () => {
        isUserInteractingRef.current = true;

        if (interactionTimeoutRef.current) {
            clearTimeout(interactionTimeoutRef.current);
        }

        interactionTimeoutRef.current = setTimeout(() => {
            isUserInteractingRef.current = false;
        }, 15000);
    });

    // Handler
    const handleCloseTaskList = () => {
        setIsStaffTaskList(!isStaffTaskList)
    }

    const handleLogout = async () => {
        await logoutAccount().then((res) => {
            if (res.status == 200) {
                setStatusWhenLogout(staffGmail)
                redirect.push("/")
            } else {
                addToast({
                    typeToast: "e",
                    content: "Can't logout",
                    duration: 3
                })
            }
        }).catch((err) => {
            console.log(err)
            addToast({
                typeToast: "e",
                content: "Can't logout",
                duration: 3
            })
        })
    }

    const handleShowReportLocation = () => {
        setShowReportLocation(!showReportLocation)
    }

    const handleCloseDetailList = () => {
        setIsDetailTask(!isDetailTask)
    }

    const handleShowStaffLocation = () => {
        setShowStaffLocation(!showStaffLocation)
    }

    const findMyLocation = () => {
        isUserInteractingRef.current = false;
        if (mapRef.current && position) {
            mapRef.current.setView(position, 21)
        }
    }

    const handleResponeResultTask = async () => {
        await responseDone({ reportID: listTask[0], staffGmail: staffGmail }).then((res) => {
            if (res.status == 200) {
                setIsGotTask(false)
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
        }).catch((error) => {
            console.log(error)
            addToast({
                typeToast: "e",
                content: "Can't response",
                duration: 3
            })
        })
    }

    const findReportLcation = (e: React.MouseEvent) => {
        e.stopPropagation()

        isUserInteractingRef.current = true;
        if (mapRef.current && listTask.length > 0) {
            mapRef.current.setView(newReportStructure[listTask[0]].position, 18)
        }
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

                <Marker position={position} icon={customIcon} ref={markerRef} ></Marker>

                {showReportLocation && listReport.map((report, index) => {
                    return (
                        <Marker key={index} position={report.position} icon={createReportMarker()} ref={markerRef} ></Marker>
                    )
                })}

                {showStaffLocation && Object.keys(getStaffLocation).map((gmail, index) => {
                    if (staffGmail != gmail && getStaffStatus[sha256(gmail)]) {
                        const location = getStaffLocation[gmail]
                        console.log(getStaffStatus)
                        return (
                            <Marker key={index} position={location} icon={createStaffMarker()} ref={markerRef} ></Marker>
                        )
                    }
                })}

                {isGotTask && newReportStructure[listTask[0]] ? (
                    <Marker position={newReportStructure[listTask[0]].position} icon={createReportMarker()} ref={markerRef} ></Marker>
                ) : ""}

                <MapResizeHandler />
            </MapContainer>

            <div className="staffFunctionUI__allFunction">

                {isGotTask ? "" : (
                    <>
                        <button className="staffFunctionUI__allFunction__btn staffFunctionUI__allFunction__btn--logout" onClick={handleLogout} >
                            <i className="fas fa-sign-out-alt"></i>
                        </button>

                        <button className={`staffFunctionUI__allFunction__btn staffFunctionUI__allFunction__btn--incidentLocation ${showReportLocation}`} onClick={handleShowReportLocation} >
                            <i className="fas fa-flag"></i>
                        </button>
                    </>
                )}

                <button className={`staffFunctionUI__allFunction__btn staffFunctionUI__allFunction__btn--anotherStaffLocation ${showStaffLocation}`} onClick={handleShowStaffLocation} >
                    <i className="fas fa-user-shield"></i>
                </button>

                <button className={`staffFunctionUI__allFunction__btn staffFunctionUI__allFunction__btn--task ${isNewTask}`} onClick={handleCloseTaskList} >
                    <i className="fas fa-tasks"></i>
                </button>

                <button className="staffFunctionUI__allFunction__btn staffFunctionUI__allFunction__btn--myLocation" onClick={findMyLocation}>
                    <i className="fas fa-crosshairs"></i>
                </button>
            </div>

            {isGotTask && newReportStructure[listTask[0]] ? (
                <>
                    <div className="staffFunctionUI__reportAnnountContainer">
                        <button className="staffFunctionUI__reportAnnountContainer__btn staffFunctionUI__reportAnnountContainer__btn--DoneTask" onClick={handleResponeResultTask}>
                            Report done
                        </button>
                    </div>

                    <div className="staffFunctionUI__taskStateContainer">
                        <div className={`staffFunctionUI__taskStateContainer__tag ${newReportStructure[listTask[0]].level}`} onClick={handleCloseDetailList}>
                            <div className="staffFunctionUI__taskStateContainer__tag__box staffFunctionUI__taskStateContainer__tag__box--state">
                                {newReportStructure[listTask[0]].level == "normal" && (<i className="fas fa-meh"></i>)}
                                {newReportStructure[listTask[0]].level == "severe" && (<i className="fas fa-frown"></i>)}
                                {newReportStructure[listTask[0]].level == "critical" && (<i className="fas fa-dizzy"></i>)}
                            </div>

                            <div className="staffFunctionUI__taskStateContainer__tag__box staffFunctionUI__taskStateContainer__tag__box--nameTask">
                                <p>{listTask.length > 0 && newReportStructure[listTask[0]].name}</p>
                            </div>

                            <div className="staffFunctionUI__taskStateContainer__tag__box staffFunctionUI__taskStateContainer__tag__box--taskMarker" onClick={(e) => { findReportLcation(e) }} >
                                <i className="fas fa-flag"></i>
                            </div>
                        </div>
                    </div>
                </>
            ) : ""}

            {!isStaffTaskList ? "" : (
                <StaffListTask closeListTask={handleCloseTaskList} />
            )}

            {!isDetailTask ? "" : (
                <StaffReportView closeDetailTask={handleCloseDetailList} report={newReportStructure[listTask[0]]} />
            )}

        </div>
    )
}

export default StaffFunctionUI