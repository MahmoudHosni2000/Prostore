// Description: This file contains the validation schema for inserting products. It uses the zod library to define the schema and validate the input data. The schema includes fields such as name, slug, category, brand, description, stock, images, isFeatured, banner, and price. The schema enforces certain constraints on the input data, such as minimum length for strings, required fields, and valid price format. This schema can be used to validate the input data before inserting a new product into the database.

import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";

const Currency = z.string().refine(
  (val) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(val))),
  "Price must have exactly two decimal places" // "refine" allows custom validation logic 'regex' in this case
);

// Schema for inserting products
export const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  category: z.string().min(3, "Category must be at least 3 characters"),
  brand: z.string().min(3, "Brand must be at least 3 characters"),
  description: z.string().min(3, "description must be at least 3 characters"),
  stock: z.coerce.number(), // coerce string to number in case string contains only numbers
  images: z.array(z.string()).min(1, "At least one image is required"), // array of strings
  isFeatured: z.boolean(),
  banner: z.string().nullable(), // nullable string
  // banner: z.string().optional(), // optional string
  price: Currency,
});

// Schema for signing users in
export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Schema for signing users up
export const signUpSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
