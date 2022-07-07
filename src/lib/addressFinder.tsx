const prodConfig = {
    key: 'XVAKN4Q9PREJD8CUTFBW',
    baseUrl: 'https://api.addressfinder.io/api/nz/address',
}

const config = prodConfig;

interface AutocompleteResponse {
    completions: AddressCompletion[];
    paid: boolean;
    demo: boolean;
    success: boolean;
}

export interface AddressCompletion {
    a: string;
    pxid: string;
    v: number;
}

export interface AddressData {
    pxid: string;
    a: string;
    aims_address_id: string;
    sufi: number;
    ta_id: string;
    ta: string;
    tasub_id: string;
    tasub: string;
    number: string;
    x: string;
    y: string;
    postcode: string;
    street: string;
    street_name: string;
    street_type: string;
    city: string;
    suburb: string;
    region_id: string;
    region: string;
    postal_line_1: string;
    postal_line_2: string;
    aims_road_section_id: string;
    rural: string;
    address_line_1: string;
    address_line_2?: string;
    primary_parcel_id: string;
    meshblock: string;
    sa1_id: string;
    sa2_id: string;
    sa2: string;
    cb_id: string;
    cb: string;
    ward_id: string;
    ward: string;
    con_id: string;
    con: string;
    maoricon_id: string;
    maoricon: string;
    iur_id: string;
    iur: string;
    ur_id: string;
    ur: string;
    landwater_id: string;
    landwater: string;
    success: boolean;
}

export async function autocomplete(search: string): Promise<AddressCompletion[]> {
    const { key, baseUrl } = config;
    const q = encodeURIComponent(search);

    const res = await fetch(`${baseUrl}/autocomplete/?key=${key}&q=${q}&format=json&strict=2`);

    if (!res.ok) {
        return [];
    }

    const data: AutocompleteResponse = await res.json();

    if (data.completions) {
        return data.completions;
    }

    return [];
}

export async function getAddressData(completion: AddressCompletion): Promise<AddressData|null> {
    const { key, baseUrl } = config;

    const res = await fetch(`${baseUrl}/metadata/?key=${key}&pxid=${completion.pxid}&format=json`);

    if (!res.ok) {
        return null;
    }

    const data: AddressData = await res.json();

    return data;
}
