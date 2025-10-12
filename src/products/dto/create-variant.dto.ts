import { IsString, IsNumber, IsArray, IsOptional, IsObject, MaxLength, IsNotEmpty, IsPositive, Min, Matches } from "class-validator";

export class CreateVariantDto {
    @MaxLength(255)
    @IsNotEmpty()
    @IsString()
    name: string;

    @MaxLength(50)
    @IsString()
    @Matches(/^[a-zA-Z0-9-]+$/, { message: "sku can only contain alphanumeric characters and hyphens" })
    sku: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    @Min(0.1)
    price: number;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    stock: number;

    @IsNotEmpty()
    @IsNumber()
    parentId: number;

    @IsNotEmpty()
    @IsObject()
    attributes: Record<string, string>;
}
