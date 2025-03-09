"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/src/app/components/ui/button";
import { Input } from "@/src/app/components/ui/input";
import { Label } from "@/src/app/components/ui/label";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AdminSignIn() {
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("adminKey", data.adminKey);

      const response = await fetch("/api/admin/signin", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const { message, token, user } = await response.json();
        // Store the token in localStorage or secure cookie
        localStorage.setItem("adminToken", token);
        localStorage.setItem("adminUser", JSON.stringify(user));
        toast.success(message);
        router.push("/admin/dashboard");
      } else {
        const { error } = await response.json();
        setError(error);
        toast.error(error);
      }
    } catch (error: any) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Sign In
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300"
              />
            </div>
            <div>
              <Label htmlFor="adminKey">Admin Key</Label>
              <Input
                id="adminKey"
                type="password"
                {...register("adminKey")}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign In as Admin"}
          </Button>
        </form>
      </div>
    </div>
  );
}