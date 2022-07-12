import React from "react";
import { padStart } from "lodash-es";

interface Props {
    value?: string;
    onChange: (newValue: string) => void;
}

export default function DateOfBirthField({ value, onChange }: Props) {
    const [dateOfBirth, setDateOfBirth] = React.useState({
        day: value?.split("-")[2] || '',
        month: value?.split("-")[1] || '',
        year: value?.split("-")[0] || '',
    });

    const dayOptions = [...Array.from(Array(31).keys())].map(value => {
        return padStart(`${value + 1}`, 2, '0');
    });

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthOptions = [...Array.from(Array(12).keys())].map(value => {
        return {
            title: months[value],
            value: padStart(`${value + 1}`, 2, '0')
        }
    })

    const thisYear = new Date().getFullYear();
    const yearOptions = [...Array.from(Array(100).keys())].map(value => {
        return (thisYear - value - 16).toString();
    });

    function handleSelectChange(e: React.FormEvent<HTMLSelectElement>) {
        // Set local state
        setDateOfBirth({
            ...dateOfBirth,
            [e.currentTarget.name]: e.currentTarget.value,
        });
    }

    /**
     * Handle upstream prop updates
     */
    React.useEffect(() => {
        setDateOfBirth({
            day: value?.split("-")[2] || '',
            month: value?.split("-")[1] || '',
            year: value?.split("-")[0] || '',
        });
    }, [value]);

    /**
     * Pass the value upwards
     */
    React.useEffect(() => {
        if (dateOfBirth.day && dateOfBirth.month && dateOfBirth.year) {
            // Format date in YYYY-MM-DD format
            const formattedDate = `${dateOfBirth.year}-${dateOfBirth.month}-${dateOfBirth.day}`;

            // Call the updater function to emit upwards
            onChange(formattedDate);
        } else {
            // Set to an empty string if we're missing part of the date
            onChange('');
        }
    }, [dateOfBirth]);

    return (
        <label className="w-full">
            <span className="relative mr-auto">
                <span>Date of birth</span>
            </span>

            <span className="flex space-x-4 border border-gray-300 rounded-lg mt-1 bg-white">
                <select name="day" value={dateOfBirth.day} className="flex-grow focus:outline-none border-0" onChange={handleSelectChange} required>
                    <option value="">Day</option>
                    {dayOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                <select name="month" value={dateOfBirth.month} className="flex-grow focus:outline-none border-0" onChange={handleSelectChange} required>
                    <option value="">Month</option>
                    {monthOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.title}</option>
                    ))}
                </select>
                <select name="year" value={dateOfBirth.year} className="flex-grow focus:outline-none border-0" onChange={handleSelectChange} required>
                    <option value="">Year</option>
                    {yearOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </span>
        </label>
    )
}
