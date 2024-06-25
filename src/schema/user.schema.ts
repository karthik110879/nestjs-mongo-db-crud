import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class SUser {
    @Prop()
    userName:string;
    @Prop()
    password:string;
}

export const UserSchema = SchemaFactory.createForClass(SUser);