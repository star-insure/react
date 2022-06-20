import React from 'react';

interface Props {
    children: React.ReactNode;
    className?: string;
}

export default function TableHead({ children, className = '' }: Props) {
    return (
        <thead className={`${className} px-3 py-4 text-sm text-white bg-gray-600`}>
            {children}
        </thead>
    )
}
