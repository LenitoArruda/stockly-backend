import { User } from "src/users/entities/user.entity";

export const fakeUsers: User[] = [
  { id: 1, name: "admin", email: "admin@example.com", password: "$2a$12$VIcb/1sEqkQ9yMrEhyMH3ucXkdm9FSlrtvLJTfV0ZKGrsWu6PsHE2", role: "admin" },
  { id: 2, name: "manager", email: "manager@example.com", password: "$2a$12$VIcb/1sEqkQ9yMrEhyMH3ucXkdm9FSlrtvLJTfV0ZKGrsWu6PsHE2", role: "manager" }
];