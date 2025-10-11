import { Category } from "../entities/category.entity";

export class CategoryResponseDto {
    id: number;
    name: string;

    static fromEntity(category: Category): CategoryResponseDto {
        return {
            id: category.id,
            name: category.name,
        };
    }
}
