# 📦 Stockly Backend – NestJS API

This repository contains the **backend** of the Stockly project, built with **NestJS**.  
It provides authentication via JWT (stored in HttpOnly Cookies), role-based access control, and CRUD for products and categories.

---

## 🚀 Tech Stack

- [NestJS 11](https://nestjs.com/)
- [JWT](https://jwt.io/)
- HttpOnly Cookies for secure authentication
- [Bcrypt](https://www.npmjs.com/package/bcrypt) for password hashing
- [Class-Validator](https://github.com/typestack/class-validator) & [Class-Transformer](https://github.com/typestack/class-transformer)
- Custom Exception Filters
- Role-Based Access Control (RBAC)

---

## ⚙️ Features

- ✅ Login (`/auth/login`) – generates JWT and HttpOnly cookie
- ✅ Logout (`/auth/logout`) – clears session cookie
- ✅ User profile (`/auth/me`) – returns logged-in user data
- ✅ Products CRUD (with pagination, filters, and variants)
- ✅ Categories CRUD (linked to products)
- ✅ Authentication guards (`AuthGuard`) and roles (`RolesGuard`)

---

## 📂 Project Structure

```
src/
 ├── auth/              # Login, logout, guards, filters
 ├── users/             # User entity (admin, manager)
 ├── products/          # Products CRUD + variants
 ├── categories/        # Categories CRUD
 ├── common/            # Filters and custom errors
 └── main.ts            # NestJS bootstrap
```

---

## 🛠️ How to Run

```bash
cd stockly-backend
yarn install
cp .env.example .env
yarn start:dev
```

---

Obs: You can acces api.http to try API routers using Rest Client extension

## 🔐 Authentication Flow

1. User sends email/password to `/auth/login`
2. Backend validates and generates JWT → returns in HttpOnly cookie
3. Frontend consumes `/auth/me` to fetch user info
4. Middleware protects private routes (requires valid token)
5. Logout (`/auth/logout`) clears cookie and ends session
