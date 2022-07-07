import * as React from 'react';
import type { Toast } from "@star-insure/sdk";
interface ToastContextInterface {
    toasts: Toast[];
    addToast: (toast: Toast) => void;
    removeToast: (id: Toast['_id']) => void;
}

const ToastContext = React.createContext<ToastContextInterface>({
    toasts: [],
    addToast: (t: Toast) => {t},
    removeToast: (t: Toast['_id']) => {t},
});

export function ToastProvider({ children }: any) {
    const [toasts, setToasts] = React.useState<Toast[]>([]);

    /**
     * Add a new toast popup message
     */
    function addToast({ message, status, timeout = 4000 }: Toast) {
        const newToast: Toast = { message, status, timeout };

        newToast._id = Date.now().toString();

        setToasts(curr => [...curr, newToast]);

        setTimeout(() => {
            removeToast(newToast._id);
        }, timeout);
    }

    /**
     * Remove a toast message
     */
    function removeToast(id: Toast['_id']) {
        setToasts(curr => curr.filter(toast => toast._id !== id));
    }

    const context: ToastContextInterface = {
        toasts,
        addToast,
        removeToast,
    }

    return (
        <ToastContext.Provider value={context}>
            {children}
        </ToastContext.Provider>
    );
}

export const useToast = () => React.useContext(ToastContext);
