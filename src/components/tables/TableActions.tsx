import React from 'react';

interface Props {
    children: React.ReactNode;
    className?: string;
}

export default function TableActions({ children, className = '' }: Props) {
    return (
        <div className={`${className} flex gap-4 justify-end items-center`}>
            {children}
        </div>
    )
}
