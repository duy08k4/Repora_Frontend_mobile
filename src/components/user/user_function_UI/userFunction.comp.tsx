// Import libraries
import React, { useEffect, useRef, useState } from "react"

// Import component
import MapResizeHandler from "../../map_resizeHandler/MapResizeHandler";
import UserReportForm from "../user__reportForm/userReportForm.comp";

// Import css
import "./userFunction.comp.css"

// Import leaflet
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Geolocation } from '@capacitor/geolocation';
import L, { Marker as LeafletMarker } from 'leaflet';

// Import custom hook
import { useToast } from "../../../hooks/toastMessage/toast";
import { useSpinner } from "../../../hooks/spinner/spinner";
import { useCache } from "../../../hooks/cache/cache";

// Import redux
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
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


// 
const UserFunctionUI: React.FC = () => {
    // State
    const [isReportForm, setIsReportForm] = useState<boolean>(false)
    const [showReportLocation, setShowReportLocation] = useState<boolean>(false)
    const redirect = useHistory()


    // Custom hook
    const { addToast } = useToast()
    const { openSpinner } = useSpinner()
    const { enableListener_userInformation_user } = useCache()

    // Redux
    const userGmail = useSelector((state: RootState) => state.user.gmail)
    const listReport = useSelector((state: RootState) => state.reportImformation.listReport)

    // Map
    // const position = useRef<[number, number]>([10.8231, 106.6297]);
    // const oldPosition = useRef<[number, number]>([0, 0]);
    const [position, setPosition] = useState<[number, number]>([10.8231, 106.6297])
    const oldPosition = useRef<[number, number]>([0, 0])
    const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isUserInteractingRef = useRef(false);

    const markerRef = useRef<LeafletMarker>(null)
    const mapRef = useRef<any>(null);
    const getPositionLoop = useRef<ReturnType<typeof setInterval> | null>(null)

    // Effect
    useEffect(() => {
        if (userGmail != "") {
            enableListener_userInformation_user(userGmail)
        }
    }, [userGmail])


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

                } else {
                    if (oldPosition.current[0] !== newPosition[0] || oldPosition.current[1] !== newPosition[1]) {
                        setPosition([...newPosition])
                        oldPosition.current = [...newPosition]
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
    const handleCloseReportForm = () => { // Close report form
        setIsReportForm(!isReportForm)
    }

    const findMyLocation = () => { // Find my location
        if (mapRef.current && position) {
            mapRef.current.setView(position, 21)
        }
    }

    const handleLogout = async () => { // Logout
        await logoutAccount().then((res) => {
            if (res.status == 200) {
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

    const handleShowReportLocation = () => { // Show location of report
        setShowReportLocation(!showReportLocation)
    }

    // const handleEmergency = () => {

    // }

    return (
        <div className="userFunctionUI">
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

                <MapResizeHandler />
            </MapContainer>

            <div className="userFunctionUI__allFunction">
                <button className="userFunctionUI__allFunction__btn userFunctionUI__allFunction__btn--logout" onClick={handleLogout} >
                    <i className="fas fa-sign-out-alt"></i>
                </button>

                <button className={`userFunctionUI__allFunction__btn userFunctionUI__allFunction__btn--incidentLocation ${showReportLocation}`} onClick={handleShowReportLocation}>
                    <i className="fas fa-flag"></i>
                </button>

                <button className="userFunctionUI__allFunction__btn userFunctionUI__allFunction__btn--createReport" onClick={handleCloseReportForm}>
                    <i className="fas fa-exclamation-circle"></i>
                </button>

                <button className="userFunctionUI__allFunction__btn userFunctionUI__allFunction__btn--myLocation" onClick={findMyLocation}>
                    <i className="fas fa-crosshairs"></i>
                </button>
            </div>

            {/* <div className="userFunctionUI__emergencyContainer">
                <button className="userFunctionUI__emergencyContainer--btn" onClick={handleEmergency}>emergency</button>
            </div> */}

            {!isReportForm ? "" : (
                <UserReportForm closeReportForm={handleCloseReportForm} clientPosition={position} />
            )}

        </div>
    )
}

export default UserFunctionUI