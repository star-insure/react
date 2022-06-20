import React from 'react';

interface Props {
    children: React.ReactNode;
    className?: string;
}

export default function TableBody({ children, className = '' }: Props) {
    return (
        <tbody className={`${className ?? ''} divide-y divide-gray-200 bg-white`}>
            {children}
        </tbody>
    )
}
