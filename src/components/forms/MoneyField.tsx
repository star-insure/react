import React from 'react';
import { formatMoney, formatNumber } from "@star-insure/sdk";

interface Props {
    value?: number;
    onChange: (value: number) => void;
    id?: string;
    name?: string;
    className?: string;
    required?: boolean;
}

export default function MoneyField({ value = 0, onChange, name = 'value', id = 'value', className = '', required = false }: Props) {
    function handleChange(e: React.SyntheticEvent<HTMLInputElement>) {
        let newValue: number = 0;

        if (e.currentTarget.value) {
            newValue = formatNumber(e.currentTarget.value);

            if (isNaN(newValue)) {
                newValue = 0;
            }
        }

        onChange(newValue);
    }

    const displayValue = formatMoney(value, 0);

    return (
        <div className={`${className} flex items-center gap-2 pl-4 rounded-md border border-gray-300 transition-all focus-within:border-teal focus-within:outline-none focus-within:ring focus-within:ring-teal focus-within:ring-opacity-50`}>
            <span className="font-bold">$</span>
            <input
                type="text"
                name={name}
                id={id}
                value={displayValue}
                onChange={handleChange}
                className="w-full !pl-0 !focus:outline-none !focus:ring-0 !focus:ring-transparent !focus:ring-opacity-0 !ring-0 !border-0 !transition-none"
                required={required}
            />
        </div>
    );

}
