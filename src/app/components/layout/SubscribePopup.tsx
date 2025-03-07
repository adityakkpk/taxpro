"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import Link from "next/link";

// Update the validation schema to correctly handle optional fields
const subscribeFormSchema = z
  .object({
    email: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number").optional().or(z.literal("")),
  })
  .refine((data) => data.email || data.phone, {
    message: "Please provide either an email address or phone number",
    path: ["email"],
  });

type SubscribeFormData = z.infer<typeof subscribeFormSchema>;

export default function SubscribePopup({ onClose, setIsSubscribed }: { onClose: () => void, setIsSubscribed: (arg: boolean) => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SubscribeFormData>({
    resolver: zodResolver(subscribeFormSchema),
    defaultValues: {
      email: "",
      phone: "",
    },
  });

  const watchEmail = watch("email");
  const watchPhone = watch("phone");

  const onSubmit = async (data: SubscribeFormData) => {
    try {
      setIsSubmitting(true);
      
      // Clean up the data before sending
      const payload = {
        email: data.email || undefined,
        phone: data.phone || Math.floor(Math.random() * 100),
      };

      
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      console.log(response)
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to subscribe");
      }

      toast.success("Successfully subscribed!");
      setIsSubscribed(true);
      onClose();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-10 rounded-lg relative max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-3">Subscribe to AAR TAX INDIA</h2>
        <p className="text-gray-800 mb-6">
          Stay updated with our latest tax services and expert advice.
        </p>

        <p className="text-gray-500 mb-6">Please provide either your email or phone number.</p>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              disabled={!!watchPhone}
              className={`block w-full rounded-md border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } shadow-sm px-4 py-2 focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed`}
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="text-center text-gray-500 my-1">- OR -</div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-900 mb-1"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              {...register("phone")}
              disabled={!!watchEmail}
              className={`block w-full rounded-md border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } shadow-sm px-4 py-2 focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed`}
              placeholder="+1234567890"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 disabled:opacity-50"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe Now"}
          </button>
        </form>

        <div className="text-center text-gray-500 my-3">- OR -</div>
        <div className="text-center text-gray-500 my-1"><Link className="underline" href={"/auth/signin"}>Login</Link> to your account</div>


        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
