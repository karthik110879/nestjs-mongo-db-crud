import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class UserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(40)
    readonly userName:string;

    @IsString()
    @IsNotEmpty()
    readonly password:string; 
}