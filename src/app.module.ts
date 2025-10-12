import { Module } from "@nestjs/common";
import { ProductsModule } from "./products/products.module";
import { CategoriesModule } from "./categories/categories.module";
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ProductsModule, CategoriesModule, AuthModule, UsersModule],
  controllers: [],
  providers: [UsersService],
})
export class AppModule { }
