//  Import libraries
import React, { createContext, useContext, useEffect, useRef, useState } from "react";

// Import Socket
import { io, Socket } from "socket.io-client";

// Import interface
import { interface__socket__staff__connect, interface__socket__staff__shareLocation, interface__socketContext, interface__socketProviderProps } from "../../types/interface__Socket";


// Import redux
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useCache } from "../cache/cache";
import { cacheAddAnotherStaffLocation } from "../../redux/reducers/staffLocation.reducer";

// Import custom

const SocketContext = createContext<interface__socketContext | undefined>(undefined);

export const useSocket = (): interface__socketContext => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
};

export const SocketProvider: React.FC<interface__socketProviderProps> = ({ children }) => {
    const socketRef = useRef<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    //   Redux staff

    // Custom hook
    const { cacheSetData } = useCache()

    // Redux
    const staffStatus = useSelector((state: RootState) => state.staffLocation.staffStatus)
    const staffGmail = useSelector((state: RootState) => state.user.gmail)

    // Staff



    useEffect(() => {
        const socket = io(import.meta.env.VITE_SOCKET_GATE, {
            transports: ["websocket"],
            withCredentials: true,
            reconnection: false
        });

        socketRef.current = socket;

        // Listener socket server
        socket.on("receiveLocation", (data) => {
            const sender = data.from
            const senderLocation = data.location
            if (!staffGmail && sender == staffGmail) return

            cacheSetData(cacheAddAnotherStaffLocation({ targetStaffGmail: sender, targetStaffLocation: senderLocation }))
        })


        // Cleanup when component unmounts
        return () => {
            socket.disconnect();
        };
    }, []);

    // Set online status for staff
    const staffOnline = (data: interface__socket__staff__connect) => {
        socketRef.current?.emit("connected", data)
    }

    // Set status is false when staff logout
    const setStatusWhenLogout = (gmail: string) => {
        if (gmail && gmail != "") {
            socketRef.current?.emit("logout", gmail)
        } else {
            console.log("Socket<userLogout>: Gmail is invalid")
        }
    }

    // Share location for admin, user(reporter) and another staff
    const shareLocation = (data: interface__socket__staff__shareLocation) => {
        const staffLocation = data.staffLocation
        const staffGmail = data.staffGmail

        if (staffGmail && staffLocation[0] != 0 && staffLocation[1] != 0) {
            socketRef.current?.emit("shareLocation", { staffGmail, staffLocation })
        }
    }

    return (
        <SocketContext.Provider value={{
            staffOnline,
            shareLocation,
            setStatusWhenLogout
        }}>
            {children}
        </SocketContext.Provider>
    );
};
