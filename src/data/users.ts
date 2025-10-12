import { User } from "src/users/entities/user.entity";

export const fakeUsers: User[] = [
  { id: 1, name: "Admin", email: "admin@example.com", password: "$2y$12$vxUN.Kz5BThSymvzL2mgzegxGMKFoZGSijGYRu33AawECWjogfh.q", role: "admin", archived: false },
  { id: 2, name: "Manager", email: "manager@example.com", password: "$2y$12$vxUN.Kz5BThSymvzL2mgzegxGMKFoZGSijGYRu33AawECWjogfh.q", role: "manager", archived: false }
];