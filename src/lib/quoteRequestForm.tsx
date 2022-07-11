import React from 'react';
import { InertiaFormProps, useForm } from "@inertiajs/inertia-react";
import type { QuoteRequestForm } from '@star-insure/sdk';

interface QuoteRequestFormContextInterface {
    form?: InertiaFormProps<QuoteRequestForm>;
    handleChange?: (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => void;
}

export const initialData: QuoteRequestForm = {
    id: undefined,
    status: 'new',
    source: 'web',
    reference: '',
    client_number: '',
    first_name: '',
    last_name: '',
    phone: '',
    mobile: '',
    email: '',
    licence: '',
    licence_other: '',
    promo_code: '',
    club_membership_number: '',
    length_of_insurance: '',
    dob: '',
    club_id: undefined,
    street_address: {
        address: '',
        unit: '',
        suburb: '',
        city: '',
        post_code: '',
    },
    declaration: {
        had_incident: undefined,
        incidents: [],
        has_demerit_points: undefined,
        demerit_points: '',
        has_lost_licence: undefined,
        lost_licence_details: '',
        was_refused_insurance: undefined,
        refused_insurance_details: '',
        has_criminal_conviction: undefined,
        criminal_conviction_details: '',
        has_vehicle_modifications: undefined,
        vehicle_modifications_details: '',
        has_previous_insurer: undefined,
        previous_insurer_details: '',
        previous_insurer_expires_at: '',
        additional_details: '',
    },
    vehicles: [],
    // Portal specific fields:
    purchase_options: [],
    theme: '',
    broker_fee: undefined,
    broker_id: undefined,
    broker_firm_id: undefined,
    agent_id: undefined,
    agent_firm_id: undefined,
    staff_member_id: undefined,
    sent_at: undefined,
    sold_at: undefined,
    referrer_id: undefined,
    referrer_category_id: undefined,
    pricing_expires_at: undefined,
    follow_up_at: undefined,
}

const QuoteRequestFormContext = React.createContext<QuoteRequestFormContextInterface>({});

export function QuoteRequestFormProvider({ children }: { children: React.ReactNode }) {
    const form = useForm<QuoteRequestForm>(initialData);

    /**
     * Handle the change event for all form inputs
     */
    function handleChange(e: React.SyntheticEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) {
        const { name } = e.currentTarget;
        let value: string|boolean|undefined = e.currentTarget.value;

        if (e.currentTarget.type === 'checkbox' || e.currentTarget.type === 'radio') {
            const target = e.currentTarget as HTMLInputElement;
            value = target.value === '1' ? true : false;
        }

        if (name.includes('.')) {
            const parts = name.split('.');

            if (parts.length === 2) {
                return form.setData(prevData => ({
                    ...prevData,
                    [parts[0]]: {
                        // @ts-ignore TODO: Maybe fix these TS errors
                        ...prevData[parts[0]],
                        [parts[1]]: value,
                    },
                }));
            } else {
                // We don't want to handle anything double-nested. These should be handled by their own local state.
                return;
            }
        }

        return form.setData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    }

    return (
        <QuoteRequestFormContext.Provider value={{ form, handleChange }}>
            {children}
        </QuoteRequestFormContext.Provider>
    );
}

/**
 * Takes in a quote request and returns data suitable to populate a form
 * by recursively calling this function, converting null to undefined.
 */
 export function sanitiseQuoteRequestFormData(value: any): any {
    if (Array.isArray(value)) {
        return value.map(item => sanitiseQuoteRequestFormData(item));
    }

    if (value === null) {
        return "";
    }

    if (typeof value === 'object') {
        // Map over each property and convert null to undefined
        return Object.keys(value).reduce((acc, key) => {
            // @ts-ignore
            acc[key] = sanitiseQuoteRequestFormData(value[key]);
            return acc;
        }, {});
    }

    return value;
}

export const useQuoteRequestForm = () => React.useContext(QuoteRequestFormContext);
