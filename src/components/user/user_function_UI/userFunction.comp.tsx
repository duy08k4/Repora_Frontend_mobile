// Import libraries
import React, { useRef, useState } from "react"

// Import component
import MapResizeHandler from "../../map_resizeHandler/MapResizeHandler";
import UserReportForm from "../user__reportForm/userReportForm.comp";

// Import css
import "./userFunction.comp.css"
import { MapContainer, TileLayer } from "react-leaflet";
import { useToast } from "../../../hooks/toastMessage/toast";
import { useSpinner } from "../../../hooks/spinner/spinner";

const UserFunctionUI: React.FC = () => {
    // State
    const [isReportForm, setIsReportForm] = useState<boolean>(false)

    // Custom hook
    const { addToast } = useToast()
    const { openSpinner } = useSpinner()

    // Map
    const mapRef = useRef<any>(null);

    // Handler
    const handleCloseReportForm = () => {
        setIsReportForm(!isReportForm)
    }

    const handleEmergency = () => {
        // addToast({
        //     typeToast: "s",
        //     content: "pla pla",
        //     duration: 5
        // })

        // openSpinner()
    }

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

                <MapResizeHandler />
            </MapContainer>

            <div className="userFunctionUI__allFunction">
                <button className="userFunctionUI__allFunction__btn userFunctionUI__allFunction__btn--logout">
                    <i className="fas fa-sign-out-alt"></i>
                </button>

                <button className="userFunctionUI__allFunction__btn userFunctionUI__allFunction__btn--incidentLocation">
                    <i className="fas fa-flag"></i>
                </button>

                <button className="userFunctionUI__allFunction__btn userFunctionUI__allFunction__btn--staffLocation">
                    <i className="fas fa-user-shield"></i>
                </button>

                <button className="userFunctionUI__allFunction__btn userFunctionUI__allFunction__btn--createReport" onClick={handleCloseReportForm}>
                    <i className="fas fa-exclamation-circle"></i>
                </button>

                <button className="userFunctionUI__allFunction__btn userFunctionUI__allFunction__btn--myLocation">
                    <i className="fas fa-crosshairs"></i>
                </button>
            </div>

            <div className="userFunctionUI__emergencyContainer">
                <button className="userFunctionUI__emergencyContainer--btn" onClick={handleEmergency}>emergency</button>
            </div>
            
            {!isReportForm ? "" : (
                <UserReportForm closeReportForm={handleCloseReportForm}/>
            )}

        </div>
    )
}

export default UserFunctionUI