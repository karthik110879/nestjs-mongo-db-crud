import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class SBranch {
    @Prop() 
    branchName: string;
    @Prop() 
    address: string;
    @Prop() 
    contact: string;
    @Prop() 
    parentBusinessId: string;
}

export const BranchSchema = SchemaFactory.createForClass(SBranch);