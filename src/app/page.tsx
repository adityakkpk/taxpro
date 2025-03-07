"use client";

import { useState, useEffect, useRef } from "react";
import * as z from "zod";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "./components/ui/input";
import {
  ChevronRight,
  ChevronLeft,
  Check,
  ArrowRight,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  Shield,
  TrendingUp,
  FileText,
} from "lucide-react";
import { Label } from "./components/ui/label";
import { Textarea } from "./components/ui/textarea";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Button } from "./components/ui/button";  // ✅ सही import path
import SubscribePopup from "./components/layout/SubscribePopup";

// Custom styles to be included in the same file
const styles = {
  heading: "text-4xl md:text-5xl font-bold tracking-tight",
  subheading: "text-xl text-gray-500 mt-4 max-w-3xl",
  sectionPadding: "py-16 md:py-24",
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  button: {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center",
    secondary:
      "bg-white hover:bg-gray-100 text-blue-600 border border-blue-600 font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center",
    text: "text-blue-600 hover:text-blue-800 font-medium inline-flex items-center",
  },
  card: "bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300",
  gradientBg: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white",
};

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

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
      }, 15000); // 15 Seconds delay

      return () => clearTimeout(timer);
    }
  }, [showLoginPopup]);

  // Hero carousel data
  const heroSlides = [
    {
      title: "Professional Tax Services for Individuals & Businesses",
      description:
        "Get expert tax preparation, planning, and consultation services to maximize your returns and minimize liabilities.",
      image: "AAR1.jpg",
       cta: "Get Started",
    },
    {
      title: "Maximize Your Tax Refund This Season",
      description:
        "Our tax experts use advanced strategies to ensure you get every deduction and credit you deserve.",
      image: "/AAR2.jpg",
      cta: "Calculate Savings",
    },
    {
      title: "Stress-Free Tax Filing Guaranteed",
      description:
        "Let our professionals handle the complexity while you focus on what matters most to you.",
      image: "/AAr3.jpg",
      cta: "Book Consultation",
    },
  ];

  // Services data
  const services = [
    {
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      title: "Tax Preparation",
      description:
        "Professional preparation of individual and business tax returns with maximum deductions.",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      title: "Tax Planning",
      description:
        "Strategic planning to minimize tax liability and maximize wealth accumulation.",
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Audit Protection",
      description:
        "Comprehensive representation and defense during IRS audits and inquiries.",
    },
    {
      icon: <DollarSign className="h-8 w-8 text-blue-600" />,
      title: "Financial Advisory",
      description:
        "Holistic financial guidance aligned with your tax strategy and long-term goals.",
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      quote:
        "Working with this tax service saved me thousands of dollars I didn't know I was eligible for. Their expertise is unmatched!",
      author: "Sarah Johnson",
      position: "Small Business Owner",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "After years of stressful tax seasons, I finally found a team that makes the process simple and maximizes my returns.",
      author: "Michael Chen",
      position: "Freelance Consultant",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "Their business tax services have been instrumental in helping our company grow while staying compliant.",
      author: "Rebecca Torres",
      position: "CEO, Innovate Tech",
      image: "/placeholder.svg?height=100&width=100",
    },
  ];

  // Pricing data
  // const pricingPlans = [
  //   {
  //     name: "Basic",
  //     price: "$149",
  //     description: "Perfect for individuals with simple tax situations",
  //     features: [
  //       "Federal & State Tax Return",
  //       "Standard Deductions",
  //       "E-Filing Included",
  //       "Basic Tax Planning",
  //       "Email Support",
  //     ],
  //   },
  //   {
  //     name: "Premium",
  //     price: "$249",
  //     description:
  //       "Ideal for individuals with investments or rental properties",
  //     features: [
  //       "Everything in Basic",
  //       "Investment Income Reporting",
  //       "Rental Property Deductions",
  //       "Self-Employment Support",
  //       "Priority Support",
  //       "Year-Round Tax Planning",
  //     ],
  //     highlighted: true,
  //   },
  //   {
  //     name: "Business",
  //     price: "$449",
  //     description: "Comprehensive solution for business owners",
  //     features: [
  //       "Everything in Premium",
  //       "Business Tax Returns",
  //       "Quarterly Estimates",
  //       "Bookkeeping Review",
  //       "Dedicated Tax Advisor",
  //       "Audit Protection",
  //       "Business Strategy Consultation",
  //     ],
  //   },
  // ];

  // FAQ data
  const faqs = [
    {
      question: "What documents do I need for tax preparation?",
      answer:
        "You'll need income statements (W-2s, 1099s), expense records, previous year's tax returns, and identification. For specific situations, additional documents may be required. We provide a comprehensive checklist during your initial consultation.",
    },
    {
      question: "How long does the tax preparation process take?",
      answer:
        "Most individual tax returns are completed within 1-2 weeks. Business returns typically take 2-3 weeks. During peak season (March-April), processing times may be slightly longer. We offer expedited services for urgent situations.",
    },
    {
      question: "Do you offer year-round tax services?",
      answer:
        "Yes, we provide tax services throughout the year. Tax planning is most effective when done regularly, not just during tax season. Our year-round services include quarterly reviews, mid-year tax projections, and strategic planning sessions.",
    },
    {
      question: "What if I receive an audit notice from the IRS?",
      answer:
        "Contact us immediately if you receive an audit notice. Our audit protection service includes complete representation before the IRS. We handle all communications, document preparation, and meetings with tax authorities on your behalf.",
    },
    {
      question: "Can you help with back taxes or unfiled returns?",
      answer:
        "Yes, we specialize in helping clients with back taxes and unfiled returns. Our team will work to minimize penalties and interest while bringing you back into compliance with tax authorities. We offer payment plan assistance and, in some cases, tax relief options.",
    },
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (testimonialsRef.current) {
      observer.observe(testimonialsRef.current);
    }

    return () => {
      if (testimonialsRef.current) {
        observer.unobserve(testimonialsRef.current);
      }
    };
  }, []);

  // Navigation handler
  const handleNavigation = (direction: "next" | "prev") => {
    if (direction === "next") {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    } else {
      setActiveSlide(
        (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <main>
        {/* Hero Section with Carousel */}
        <section className="relative overflow-hidden bg-gray-900 text-white">
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="w-full h-full"
              >
                <div className="absolute inset-0 bg-black/50 z-10"></div>
                <img
                  src={heroSlides[activeSlide].image || "/AAR1.jpg"}
                  alt="Tax services"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div
            className={`${styles.container} relative z-10 min-h-[80vh] flex items-center`}
          >
            <div className="py-20 md:py-24 lg:py-32 max-w-3xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                    {heroSlides[activeSlide].title}
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-200 mb-8">
                    {heroSlides[activeSlide].description}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link href="#contact" className={styles.button.primary}>
                      {heroSlides[activeSlide].cta}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                    <Link href="#services" className={styles.button.secondary}>
                      Learn More
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Carousel Navigation */}
          <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeSlide === index ? "bg-white scale-125" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
            onClick={() => handleNavigation("prev")}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
            onClick={() => handleNavigation("next")}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </section>
        {/* Services Section */}
        <section id="services" className={`${styles.sectionPadding} bg-white`}>
          <div className={styles.container}>
            <div className="text-center mb-16">
              <motion.h2
                className={styles.heading}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Our Tax Services
              </motion.h2>
              <motion.p
                className={styles.subheading + " mx-auto"}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Comprehensive tax solutions tailored to your unique financial
                situation
              </motion.p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className={styles.card}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="#contact" className={styles.button.primary}>
                Schedule a Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
        {/* About Section */}
        <section id="about" className={`${styles.sectionPadding} bg-gray-50`}>
          <div className={styles.container}>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
                  alt="Tax professionals at work"
                  width={600}
                  height={600}
                  className="rounded-xl shadow-lg"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className={styles.heading}>
                  Expert Tax Solutions Since 2005
                </h2>
                <p className="text-gray-600 mt-4 mb-6">
                  With over 15 years of experience, our team of certified tax
                  professionals is dedicated to providing personalized tax
                  services that maximize your returns and minimize your
                  liabilities.
                </p>
                <p className="text-gray-600 mb-6">
                  We stay up-to-date with the latest tax laws and regulations to
                  ensure you receive every deduction and credit you're entitled
                  to. Our approach combines technical expertise with a deep
                  understanding of your financial goals.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-blue-600 mr-2" />
                    <span>Certified Experts</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-blue-600 mr-2" />
                    <span>Personalized Service</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-blue-600 mr-2" />
                    <span>Maximum Refunds</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-blue-600 mr-2" />
                    <span>Year-Round Support</span>
                  </div>
                </div>

                <Link href="#testimonials" className={styles.button.text}>
                  See what our clients say
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
        {/* Testimonials Section */}
        <section
          id="testimonials"
          className={`${styles.sectionPadding} ${styles.gradientBg}`}
          ref={testimonialsRef}
        >
          <div className={styles.container}>
            <div className="text-center mb-16">
              <motion.h2
                className={styles.heading}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                What Our Clients Say
              </motion.h2>
              <motion.p
                className="text-xl mt-4 max-w-3xl mx-auto text-blue-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Don't just take our word for it — hear from the clients we've
                helped save money and reduce stress during tax season
              </motion.p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-300">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-white mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.author}
                      width={50}
                      height={50}
                      className="rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-bold text-white">
                        {testimonial.author}
                      </h4>
                      <p className="text-blue-200 text-sm">
                        {testimonial.position}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* FAQ Section */}
        <section id="faq" className={`${styles.sectionPadding} bg-gray-50`}>
          <div className={styles.container}>
            <div className="text-center mb-16">
              <motion.h2
                className={styles.heading}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Frequently Asked Questions
              </motion.h2>
              <motion.p
                className={styles.subheading + " mx-auto"}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Find answers to common questions about our tax services
              </motion.p>
            </div>

            <div className="max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Accordion question={faq.question} answer={faq.answer} />
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">Still have questions?</p>
              <Link href="#contact" className={styles.button.primary}>
                Contact Our Tax Experts
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
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
      </main>

      {/* Accordion Component */}
      {/* This is defined within the same file as requested */}
    </div>
  );
}

// Accordion Component
function Accordion({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        className="flex justify-between items-center w-full p-4 text-left bg-white hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="font-medium text-lg">{question}</span>
        <ChevronRight
          className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <p className="text-gray-600">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
