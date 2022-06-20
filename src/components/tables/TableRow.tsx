import React from 'react';

interface Props {
    children: React.ReactNode;
    className?: string;
}

export default function TableRow({ children, className = '' }: Props) {
    const bgClass = className.includes('bg') ? '' : 'bg-white even:bg-gray-50'

    return (
        <tr className={`${className} ${bgClass} hover:bg-gray-100`}>
            {children}
        </tr>
    )
}
