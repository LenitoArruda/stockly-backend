import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { UserRoles } from "src/auth/roles/roles";
import { Roles } from "src/auth/roles/roles.decorator";
import { RolesGuard } from "src/auth/roles/roles.guard";

@Roles(UserRoles.Manager, UserRoles.Admin)
@UseGuards(AuthGuard, RolesGuard)
@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get("by-id/:id")
  findOne(@Param("id") id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(":id")
  @HttpCode(204)
  remove(@Param("id") id: string) {
    return this.categoriesService.remove(+id);
  }
}
