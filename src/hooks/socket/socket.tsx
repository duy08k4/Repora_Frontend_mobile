//  Import libraries
import React, { createContext, useContext, useEffect, useRef, useState } from "react";

// Import Socket
import { io, Socket } from "socket.io-client";

// Import interface
import { interface__socketContext, interface__socketProviderProps } from "../../types/interface__Socket";


// Import redux
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

// Import custom
import { useCache } from "../cache/cache";

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

    //   Redux



    

    useEffect(() => {
        const socket = io(import.meta.env.VITE_SOCKET_GATE, {
            transports: ["websocket"],
            withCredentials: true,
            reconnection: false
        });

        socketRef.current = socket;

        // Listener socket server

        


        // Cleanup when component unmounts
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ }}>
            {children}
        </SocketContext.Provider>
    );
};
