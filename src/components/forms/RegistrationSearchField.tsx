import React from 'react';
import { useToast } from '../../lib/toast';
import { ApiResponse, FormStatus, RedbookVehicle, sanitiseVehicleType, VehicleType } from '@star-insure/sdk';

export interface VehicleData {
    make: string;
    model: string;
    year: string;
    vehicle_type: VehicleType;
    is_heavy: boolean;
}

interface Props {
    apiUrl: string;
    onVehicleDataFound: (vehicleData: VehicleData) => void;
}

export default function RegistrationSearchField({ onVehicleDataFound, apiUrl }: Props) {
    const [rego, setRego] = React.useState<string>('');
    const [status, setStatus] = React.useState<FormStatus>('idle');
    const { addToast } = useToast();

    function handleChange(e: React.SyntheticEvent<HTMLInputElement>) {
        setRego(e.currentTarget.value?.toUpperCase() || '');
    }

    function handleKeydown(e: React.KeyboardEvent) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    async function handleSearch() {
        setStatus('processing');

        const res = await fetch(`${apiUrl}?registration=${rego}`, {
            headers: { 'Content-Type': 'application/json' }
        });

        if (!res.ok) {
            addToast({ message: `There was an error with the provided registration.`, status: 'error', timeout: 3000 });
            setStatus('error');
            return;
        }

        const { data }: ApiResponse<RedbookVehicle> = await res.json();

        const { make, model, year, vehicle_type: redbookVehicleType, weight } = data;

        if (!make || !model || !year || !redbookVehicleType) {
            addToast({ message: `We couldn't find all of your data, please complete manually.`, status: 'error', timeout: 3000 });
            setStatus('error');
        }

        onVehicleDataFound({
            make: make || '',
            model: model || '',
            year: year?.toString() || '',
            vehicle_type: redbookVehicleType ? sanitiseVehicleType(redbookVehicleType) : 'car',
            is_heavy: weight && weight > 3500 || false,
        });

        setStatus('success');
    }

    return (
        <div className="w-full flex flex-col">
            <div className="w-full flex gap-3 bg-gray-100 rounded-md p-3">
                <input
                    onKeyDown={handleKeydown}
                    placeholder="Search for your rego"
                    type="text"
                    name="registration_search"
                    id="registration_search"
                    value={rego}
                    onChange={handleChange}
                    className={`flex-grow transition-all ${status === 'processing' ? 'pointer-events-none opacity-50' : ''}`}
                    disabled={status === 'processing'}
                />
                <button title="Search" type="button" onClick={handleSearch} disabled={status === 'processing'} className={`bg-teal px-4 py-3 rounded-md transition-all`}>
                    <span className="sr-only">Search</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
