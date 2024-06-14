import { Document } from "mongoose";

export interface IBusiness extends Document {
    readonly email: string;
    readonly businessName: string;
    readonly address: string;
    readonly contactPersonName: string;
    readonly contactPersonPhone: number;
    readonly businessPhone: number;
    readonly branchCount?: number;
}