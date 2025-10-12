import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @MaxLength(100)
  @IsNotEmpty()
  @IsString()
  name: string;
}
