import { IsOptional, IsString, IsNumberString, IsIn } from "class-validator";

export class FilterProductsDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    sku?: string;

    @IsOptional()
    @IsNumberString()
    categoryId?: string;

    @IsOptional()
    @IsNumberString()
    minPrice?: string;

    @IsOptional()
    @IsNumberString()
    maxPrice?: string;

    @IsOptional()
    @IsNumberString()
    page?: string;

    @IsOptional()
    @IsNumberString()
    pageSize?: string;

    @IsOptional()
    @IsIn(["name", "sku", "category", "stock", "price"])
    sortBy?: string;

    @IsOptional()
    @IsIn(["asc", "desc"])
    sortOrder?: string;
}
