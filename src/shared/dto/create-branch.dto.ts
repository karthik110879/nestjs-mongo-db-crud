import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateBranchDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(40)
    readonly branchName: string;

    @IsString()
    @IsNotEmpty()
    readonly address: string;

    @IsString()
    @IsNotEmpty()
    readonly contact: string;

    @IsString()
    @IsNotEmpty()
    readonly parentBusinessId?: string;
}