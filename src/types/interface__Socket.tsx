import type { ReactNode } from "react";

interface interface__socketContext {
    staffOnline: (data: interface__socket__staff__connect) => void
    shareLocation: (data: interface__socket__staff__shareLocation) => void
    setStatusWhenLogout: (gmail: string) => void
}

interface interface__socketProviderProps {
    children: ReactNode;
}

// Connect
interface interface__socket__staff__connect {
    staffGmail: string
}

// Share location
interface interface__socket__staff__shareLocation {
    staffGmail: string,
    staffLocation: [number, number]
}

export type {
    interface__socketContext,
    interface__socketProviderProps,

    interface__socket__staff__connect,
    interface__socket__staff__shareLocation
}