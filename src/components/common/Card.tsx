import React from 'react';

interface Props {
    className?: string;
    children: React.ReactNode;
}

export default function Card({ className, children }: Props) {
    return (
        <div className={`${className ?? ''} flex flex-col items-start bg-white rounded-md shadow border border-gray-200 p-4 md:p-6`}>
            {children}
        </div>
    );
}
