// Import libraries
import React, { useEffect, useRef } from "react"
import { MapContainer, Marker, TileLayer } from "react-leaflet"
import { IonPage } from "@ionic/react"

// Import component
import StaffFunctionUI from "../../components/staff/staff_function_UI/staffFunction.comp"
import UserFunctionUI from "../../components/user/user_function_UI/userFunction.comp"

// Import css
import "./map.page.css"

import 'leaflet/dist/leaflet.css';
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { useCache } from "../../hooks/cache/cache"
// import 'leaflet-defaulticon-compatibility';

const MapPage: React.FC = () => {

    // Map
    const mapRef = useRef<any>(null);

    // Custom hook
    const { enableListener_staffLocation_listStaffOnline, enableListener_reportInformation } = useCache()

    // Redux
    const userRole = useSelector((state: RootState) => state.user.role)

    useEffect(() => {
        enableListener_staffLocation_listStaffOnline()
        enableListener_reportInformation()
    }, [])

    return (
        <IonPage>
            <div className="mapPage">
                {userRole == "user" ? (
                    <UserFunctionUI />
                ) : (
                    <StaffFunctionUI />
                )}
            </div>
        </IonPage>
    )
}

export default MapPage