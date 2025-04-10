import { IsNotEmpty, IsString } from "class-validator";

export class UpdatePostDto {
    @IsString()
    @IsNotEmpty()
    author: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    text: string;
}