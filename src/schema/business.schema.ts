import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Business {
    @Prop()
    email: string;
    @Prop()
    businessName: string;
    @Prop()
    address: string;
    @Prop()
    contactPersonName: string;
    @Prop()
    contactPersonPhone: number;
    @Prop()
    businessPhone: number;
    @Prop()
    branchCount: number;
    @Prop()
    branches: [];
}

export const BusinessSchema = SchemaFactory.createForClass(Business);