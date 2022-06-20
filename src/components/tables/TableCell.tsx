import React from 'react';

interface Props {
    children: React.ReactNode;
    className?: string;
}

export default function TableCell({ children, className = '' }: Props) {
    return (
        <td className={`${className} px-3 py-3 text-sm text-gray-500`}>
            {children}
        </td>
    )
}
