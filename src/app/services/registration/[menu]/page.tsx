"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDropzone } from "react-dropzone";
import { Button } from "@/src/app/components/ui/button";
import { Input } from "@/src/app/components/ui/input";
import { Label } from "@/src/app/components/ui/label";
import { Textarea } from "@/src/app/components/ui/textarea";
import { Upload, X } from "lucide-react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Hero from "@/src/app/components/layout/Hero";

// Define validation schema
const enquirySchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  query: z.string().min(10, "Query must be at least 10 characters long"),
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

const Page = ({params}: {params: {menu: string}}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const menu = params.menu;
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
  });

  const { data: session } = useSession();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    onDrop: (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles]);
    },
  });

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: EnquiryFormData) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("query", data.query);
      files.forEach((file) => formData.append("files", file));

      const response = await fetch("/api/enquiry", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit enquiry");
      }

      toast.success("Your enquiry has been submitted successfully!");

      reset();
      setFiles([]);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Sign In Required
            </h1>
            <p className="text-gray-600 mb-8">
              You need to sign in to submit a tax enquiry. Please sign in to
              continue.
            </p>
            <Link
              href="/auth/signin"
              className="w-full bg-black text-white px-4 py-2 rounded-lg inline-block"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero
        imageUrl="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
        pageName={menu}
        pageDesc={`Submit your ${menu} related queries and documents using the form below.`}
      />
      <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {menu}
          </h1>
          <p className="text-gray-600 mb-8">
            Please provide your details and query along with any supporting
            documents.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                {...register("fullName")}
                className={`mt-1 ${errors.fullName ? "border-red-500" : ""}`}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.fullName?.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className={`mt-1 ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email?.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="query">Your Query</Label>
              <Textarea
                id="query"
                {...register("query")}
                className={`mt-1 ${errors.query ? "border-red-500" : ""}`}
                rows={5}
              />
              {errors.query && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.query?.message}
                </p>
              )}
            </div>

            <div>
              <Label>Supporting Documents</Label>
              <div
                {...getRootProps()}
                className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400"
              >
                <input {...getInputProps()} />
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Drag & drop files here, or click to select files
                </p>
                <p className="text-xs text-gray-500">
                  PDF, PNG, JPG up to 10MB each
                </p>
              </div>

              {files.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {files.map((file, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      <span className="text-sm text-gray-600">{file.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Enquiry"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;