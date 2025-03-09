import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
  status: z.enum(["pending", "responded", "closed"]).optional(),
});

export const subscriberSchema = z.object({
  email: z.string().email(),
  subscriptionDate: z.date().optional(),
  status: z.enum(["active", "unsubscribed"]).optional(),
});

export const userSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  role: z.enum(["user", "admin"]),
  status: z.enum(["active", "blocked"]).optional(),
});