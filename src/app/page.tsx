"use client";

import Link from "next/link";
import { Button } from "@/src/app/components/ui/button";
import { FileText, Users, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import SubscribePopup from "./components/layout/SubscribePopup";
import Hero from "./components/layout/Hero";
import { useForm } from "react-hook-form";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Define validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Home() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const { data: session } = useSession();
  const [isSubscribed, setIsSubscribed] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("subject", data.subject);
      formData.append("message", data.message);

      const response = await fetch("/api/contact-us", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit contact form");
      }

      toast.success("Successfully submitted!");

      reset();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!session) {
      const timer = setTimeout(() => {
        setShowLoginPopup(true);
      }, 30000); // 30 Seconds delay

      return () => clearTimeout(timer);
    }
  }, [showLoginPopup]);

  return (
    <section className="min-h-screen">
      <Hero
        imageUrl="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
        pageName="Professional Tax Enquiry Services"
        pageDesc="Get expert assistance with your tax-related queries. Our team is here to help you navigate through your tax concerns efficiently."
      />

      {/* About Us */}
      <main className="mx-auto px-4 py-16 bg-white max-w-screen-xl mb-5">
        <h2 className="text-3xl font-bold text-center mb-8">About TaxPro</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              At TaxPro, we are committed to providing exceptional tax services
              and financial guidance to individuals and businesses. Our mission
              is to help our clients navigate the complex world of taxation
              while maximizing their financial potential.
            </p>
            <p className="text-gray-600">
              With over 15 years of experience in the industry, we combine
              expertise with personalized service to ensure the best outcomes
              for our clients.
            </p>
          </div>
          <div className="relative h-[300px]">
            <img
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
              alt="Team meeting"
              className="object-cover rounded-lg h-full"
            />
          </div>
        </div>
      </main>

      {/* Our Services */}
      <main className="px-4 py-16 bg-gray-200">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <FileText className="w-12 h-12 text-blue-600 mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Tax Planning</h2>
              <p className="text-gray-600">
                Strategic tax planning to minimize your tax liability and
                maximize savings.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h2 className="text-2xl font-semibold mb-4">
                Tax Return Preparation
              </h2>
              <p className="text-gray-600">
                Professional preparation of individual and business tax returns.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <Mail className="w-12 h-12 text-blue-600 mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Tax Audit Support</h2>
              <p className="text-gray-600">
                Expert representation and support during tax audits.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Why Choose Us */}
      <main className="px-4 py-16 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-screen-xl mx-auto ">
          <h2 className="text-3xl font-bold text-center mb-8">
            Why Choose TaxPro?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <FileText className="w-12 h-12 text-blue-600 mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Easy Submission</h2>
              <p className="text-gray-600">
                Submit your tax enquiries easily through our user-friendly form
                with file upload capability.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <Users className="w-12 h-12 text-green-600 mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Expert Support</h2>
              <p className="text-gray-600">
                Get assistance from our team of qualified tax professionals and
                experts.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <Mail className="w-12 h-12 text-purple-600 mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Quick Response</h2>
              <p className="text-gray-600">
                Receive prompt responses and updates about your enquiry via
                email.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/enquiry">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg"
            >
              Submit Your Enquiry
            </Button>
          </Link>
        </div>
      </main>

      {/* Contact Us */}
      <main className="mx-auto px-4 py-16 bg-white max-w-screen-xl mb-5 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 max-w-2xl w-full p-5 bg-gray-300 rounded-lg"
        >
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              {...register("name")}
              required
              className={`mt-1 ${errors.name ? "border-red-500" : ""}`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              required
              className={`mt-1 ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              {...register("subject")}
              className={`mt-1 ${errors.subject ? "border-red-500" : ""}`}
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">
                {errors.subject.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              {...register("message")}
              className={`mt-1 ${errors.message ? "border-red-500" : ""}`}
              rows={5}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </main>

      {showLoginPopup && !isSubscribed && !session && (
        <SubscribePopup
          onClose={() => setShowLoginPopup(false)}
          setIsSubscribed={setIsSubscribed}
        />
      )}
    </section>
  );
}
