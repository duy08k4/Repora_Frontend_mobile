import type { ReactNode } from "react";

interface interface__spinnerContext {
    openSpinner: () => void,
    closeSpinner: () => void
}

interface interface__spinnerProviderProps {
    children: ReactNode;
}

export type { interface__spinnerContext, interface__spinnerProviderProps}