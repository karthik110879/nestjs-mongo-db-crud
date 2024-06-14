import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator"


export class CreateBusinessDto {

    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @MaxLength(40)
    @IsNotEmpty()
    readonly businessName: string;

    @IsString()
    @IsNotEmpty()
    readonly address: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(40)
    readonly contactPersonName: string;

    @IsNumber()
    @IsNotEmpty()
    readonly contactPersonPhone: number;

    @IsNumber()
    @IsNotEmpty()
    readonly businessPhone: number;

    @IsNumber()
    @IsOptional()
    readonly branchCount: number;

    @IsArray()
    @IsOptional()
    readonly branches: []

}