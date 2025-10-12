import { User } from "src/users/entities/user.entity";

export const fakeUsers: User[] = [
  { id: 1, name: "Admin", email: "admin@example.com", password: "$2b$10$NEVoyV7ZmmmoQ7Imx3S/YuUJvxH2iE77iqIkYrN4Yg7MBxIqiB8SG", role: "admin", archived: false },
  { id: 2, name: "Manager", email: "manager@example.com", password: "$2b$10$NEVoyV7ZmmmoQ7Imx3S/YuUJvxH2iE77iqIkYrN4Yg7MBxIqiB8SG", role: "manager", archived: false }
];