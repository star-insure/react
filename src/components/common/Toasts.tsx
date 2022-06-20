import React from 'react';
import type { Toast as ToastInterface } from "@star-insure/sdk";
import { useToast } from "../../lib/toast";
import Toast from "./Toast";

export default function Toasts() {
    const { toasts } = useToast();

    return (
        <div className="fixed bottom-4 right-4 z-[110] flex flex-col gap-6">
            {toasts.map((toast: ToastInterface) => (
                <Toast {...toast} key={toast._id} />
            ))}
        </div>
    );
}
