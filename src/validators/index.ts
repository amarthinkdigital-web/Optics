// Install zod: npm install zod
// import { z } from "zod";

// export const loginSchema = z.object({
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// export const registerSchema = z.object({
//   name: z.string().min(2, "Name must be at least 2 characters"),
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
//   phone: z.string().optional(),
// });

// export const addressSchema = z.object({
//   fullName: z.string().min(2),
//   phone: z.string().min(10),
//   addressLine1: z.string().min(5),
//   addressLine2: z.string().optional(),
//   city: z.string().min(2),
//   state: z.string().min(2),
//   pincode: z.string().min(6),
//   country: z.string().default("India"),
// });

// export type LoginInput = z.infer<typeof loginSchema>;
// export type RegisterInput = z.infer<typeof registerSchema>;
// export type AddressInput = z.infer<typeof addressSchema>;
