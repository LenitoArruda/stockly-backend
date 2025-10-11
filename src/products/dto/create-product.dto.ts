import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class CreateProductDto {
    @IsString()
    name: string;

    @IsString()
    sku: string;

    @IsNumber()
    price: number;

    @IsNumber()
    stock: number;

    @IsString()
    category: string;

    @IsArray()
    variants: string[];
}
