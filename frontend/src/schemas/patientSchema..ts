import { z } from "zod";

export const patientSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .regex(/^[A-Za-z\s]+$/, "Only letters are allowed"),
  email: z
    .string()
    .email("Invalid email")
    .endsWith("@gmail.com", "Only @gmail.com addresses are allowed"),
  countryCode: z.string().min(1),
  phone: z.string().min(6, "Phone number required"),
  photo: z
    .custom<File>()
    .refine((file) => file && file.type === "image/jpeg", "Only .jpg images allowed"),
});