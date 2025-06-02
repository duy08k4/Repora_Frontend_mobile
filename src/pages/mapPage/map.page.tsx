// Import libraries
import React, { useRef } from "react"
import { MapContainer, Marker, TileLayer } from "react-leaflet"
import { IonPage } from "@ionic/react"

// Import component
import StaffFunctionUI from "../../components/staff/staff_function_UI/staffFunction.comp"
import UserFunctionUI from "../../components/user/user_function_UI/userFunction.comp"

// Import css
import "./map.page.css"

import 'leaflet/dist/leaflet.css';
// import 'leaflet-defaulticon-compatibility';

const MapPage: React.FC = () => {

    // Map
    const mapRef = useRef<any>(null);

    return (
        <IonPage>
            <div className="mapPage">
                {/* <StaffFunctionUI /> */}
                <UserFunctionUI />
            </div>
        </IonPage>
    )
}

export default MapPage