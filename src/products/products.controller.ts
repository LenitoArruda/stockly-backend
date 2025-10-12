import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { FilterProductsDto } from "./dto/filter-products.dto";
import { CreateVariantDto } from "./dto/create-variant.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { Roles } from "src/auth/roles/roles.decorator";
import { UserRoles } from "src/auth/roles/roles";
import { RolesGuard } from "src/auth/roles/roles.guard";
import { UpdateVariantDto } from "./dto/update-variant.dto";

@Roles(UserRoles.Manager, UserRoles.Admin)
@UseGuards(AuthGuard, RolesGuard)
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Post("variant")
  createVariant(@Body() createVariantDto: CreateVariantDto) {
    return this.productsService.createVariant(createVariantDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get("by-id/:id")
  findOne(@Param("id") id: string) {
    return this.productsService.findOne(+id);
  }

  @Get("paginated")
  findPaginated(@Query() filter: FilterProductsDto) {
    return this.productsService.findPaginated(filter);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Patch("variant/:id")
  updateVariant(@Param("id") id: string, @Body() updateVariantDto: UpdateVariantDto) {
    return this.productsService.updateVariant(+id, updateVariantDto);
  }

  @HttpCode(204)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productsService.remove(+id);
  }
}
