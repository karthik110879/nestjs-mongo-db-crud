// branch.interface.ts

import { Document } from "mongoose";

interface IAddress extends Document {
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
}

interface IContact extends Document{
    phone: string;
    email: string;
}

interface IOperatingHours extends Document {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
}

interface IManager extends Document {
    name: string;
    email: string;
    phone: string;
}

interface IGeoCoordinates extends Document {
    latitude: number;
    longitude: number;
}

interface IFacilities extends Document {
    parking: boolean;
    wifi: boolean;
    accessibility: boolean;
}

export interface IBranch extends Document {
    readonly branch_id?: string;
    readonly branchName: string;
    readonly address: string;
    readonly contact: string;
    // operating_hours: OperatingHours;
    // services: string[];
    // manager: Manager;
    // geo_coordinates: GeoCoordinates;
    readonly parentBusinessId?: string;
    // status: 'open' | 'closed' | 'temporarily_closed';
    // special_instructions?: string;
    // images?: { url: string; description: string; }[];
}

