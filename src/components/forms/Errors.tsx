import React from 'react';
import { ErrorBag, Errors } from "@inertiajs/inertia"
import { Card } from "../common";

interface Props {
    heading?: string;
    errors?: Errors & ErrorBag;
    renderKeys?: boolean;
    className?: string;
}

export default function Errors({ heading = 'There was an error with your submission.', errors = {}, renderKeys = false, className = '' }: Props) {
    if (Object.values(errors).length === 0) {
        return <></>
    }

    return (
        <aside className={`${className} col-span-full`}>
            <Card className="border border-red-500 !bg-red-50">
                <h2 className="font-black text-red-500 mb-2">{heading}</h2>
                <ul className="space-y-2 list-disc ml-4">
                    {Object.entries(errors).map(([field, message]) => (
                        <li className="font-bold text-red-500" key={field}>
                            {renderKeys && <strong>{field}: </strong>}
                            { message }
                        </li>
                    ))}
                </ul>
            </Card>
        </aside>
    )
}
