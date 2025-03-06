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
  const pricingPlans = [
    {
      name: "Basic",
      price: "$149",
      description: "Perfect for individuals with simple tax situations",
      features: [
        "Federal & State Tax Return",
        "Standard Deductions",
        "E-Filing Included",
        "Basic Tax Planning",
        "Email Support",
      ],
    },
    {
      name: "Premium",
      price: "$249",
      description:
        "Ideal for individuals with investments or rental properties",
      features: [
        "Everything in Basic",
        "Investment Income Reporting",
        "Rental Property Deductions",
        "Self-Employment Support",
        "Priority Support",
        "Year-Round Tax Planning",
      ],
      highlighted: true,
    },
    {
      name: "Business",
      price: "$449",
      description: "Comprehensive solution for business owners",
      features: [
        "Everything in Premium",
        "Business Tax Returns",
        "Quarterly Estimates",
        "Bookkeeping Review",
        "Dedicated Tax Advisor",
        "Audit Protection",
        "Business Strategy Consultation",
      ],
    },
  ];

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
        {/* Pricing Section */}
        <section id="pricing" className={`${styles.sectionPadding} bg-white`}>
          <div className={styles.container}>
            <div className="text-center mb-16">
              <motion.h2
                className={styles.heading}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Transparent Pricing
              </motion.h2>
              <motion.p
                className={styles.subheading + " mx-auto"}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Choose the plan that fits your tax situation with no hidden fees
                or surprises
              </motion.p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={index}
                  className={`rounded-xl overflow-hidden shadow-lg ${
                    plan.highlighted
                      ? "border-2 border-blue-600 relative"
                      : "border border-gray-200"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  {plan.highlighted && (
                    <div className="bg-blue-600 text-white text-center py-1 text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    <div className="mb-6">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-gray-500">/year</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-blue-600 mr-2 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="#contact"
                      className={`block w-full text-center py-3 px-6 rounded-lg transition-all duration-300 ${
                        plan.highlighted
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-white hover:bg-gray-100 text-blue-600 border border-blue-600"
                      }`}
                    >
                      Get Started
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">
                Need a custom solution for your specific tax situation?
              </p>
              <Link href="#contact" className={styles.button.primary}>
                Contact Us for Custom Pricing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
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
        // {/* Contact Section */}
        //{/* Contact Us */}
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
        {/* <section id="contact" className={`${styles.sectionPadding} bg-white`}>
        <div className={styles.container}>             <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div>
                  <h2 className={styles.heading}>Get in Touch</h2>
                  <p className="text-gray-600 mt-4 mb-6">
                    Ready to take control of your tax situation? Our experts are here to help you maximize your refund
                    and minimize your stress.
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start">
                      <Phone className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                      <div>
                        <h4 className="font-bold">Call Us</h4>
                        <p className="text-gray-600">(555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Mail className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                      <div>
                        <h4 className="font-bold">Email Us</h4>
                        <p className="text-gray-600">info@taxpro.example.com</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                      <div>
                        <h4 className="font-bold">Visit Us</h4>
                        <p className="text-gray-600">
                          123 Tax Street, Suite 456
                          <br />
                          Financial District, NY 10001
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Calendar className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                      <div>
                        <h4 className="font-bold">Office Hours</h4>
                        <p className="text-gray-600">
                          Monday-Friday: 9am-6pm
                          <br />
                          Saturday: 10am-2pm (by appointment)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className={styles.card}>
                  <h3 className="text-2xl font-bold mb-6">Schedule a Consultation</h3>
                  <form className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                        Service Interested In
                      </label>
                      <select
                        id="service"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        required
                      >
                        <option value="">Select a service</option>
                        <option value="individual">Individual Tax Preparation</option>
                        <option value="business">Business Tax Preparation</option>
                        <option value="planning">Tax Planning</option>
                        <option value="audit">Audit Protection</option>
                        <option value="advisory">Financial Advisory</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300"
                    >
                      Submit Request
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section> */}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className={styles.container}>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <DollarSign className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">TaxPro</span>
              </Link>
              <p className="text-gray-400 mb-4">
                Professional tax services for individuals and businesses.
                Maximize your refund and minimize your stress.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Services</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Individual Tax Preparation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Business Tax Preparation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Tax Planning
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Audit Protection
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Financial Advisory
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Tax Calculator
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Tax Guides
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Client Portal
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} TaxPro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

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



// import Link from "next/link";
// import { Button } from "@/src/app/components/ui/button";
// import { FileText, Users, Mail } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import SubscribePopup from "./components/layout/SubscribePopup";
// import Hero from "./components/layout/Hero";
// import { useForm } from "react-hook-form";
// import { Label } from "./components/ui/label";
// import { Input } from "./components/ui/input";
// import { Textarea } from "./components/ui/textarea";
// import toast from "react-hot-toast";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";

// // Define validation schema
// const contactFormSchema = z.object({
//   name: z.string().min(2, "Name must be at least 2 characters"),
//   email: z.string().email("Please enter a valid email address"),
//   subject: z.string().min(5, "Subject must be at least 5 characters"),
//   message: z.string().min(10, "Message must be at least 10 characters"),
// });

// type ContactFormData = z.infer<typeof contactFormSchema>;

// export default function Home() {
//   const [showLoginPopup, setShowLoginPopup] = useState(false);
//   const { data: session } = useSession();
//   const [isSubscribed, setIsSubscribed] = useState(false);

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<ContactFormData>({
//     resolver: zodResolver(contactFormSchema),
//   });

//   const onSubmit = async (data: any) => {
//     try {
//       setIsSubmitting(true);
//       const formData = new FormData();
//       formData.append("name", data.name);
//       formData.append("email", data.email);
//       formData.append("subject", data.subject);
//       formData.append("message", data.message);

//       const response = await fetch("/api/contact-us", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error("Failed to submit contact form");
//       }

//       toast.success("Successfully submitted!");

//       reset();
//     } catch (error: any) {
//       toast.error(error.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   useEffect(() => {
//     if (!session) {
//       const timer = setTimeout(() => {
//         setShowLoginPopup(true);
//       }, 30000); // 30 Seconds delay

//       return () => clearTimeout(timer);
//     }
//   }, [showLoginPopup]);

//   return (
//     <section className="min-h-screen">
//       <Hero
//         imageUrl="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
//         pageName="Professional Tax Enquiry Services"
//         pageDesc="Get expert assistance with your tax-related queries. Our team is here to help you navigate through your tax concerns efficiently."
//       />

//       {/* About Us */}
//       <main className="mx-auto px-4 py-16 bg-white max-w-screen-xl mb-5">
//         <h2 className="text-3xl font-bold text-center mb-8">About TaxPro</h2>
//         <div className="grid md:grid-cols-2 gap-12 items-center">
//           <div>
//             <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
//             <p className="text-gray-600 mb-4">
//               At TaxPro, we are committed to providing exceptional tax services
//               and financial guidance to individuals and businesses. Our mission
//               is to help our clients navigate the complex world of taxation
//               while maximizing their financial potential.
//             </p>
//             <p className="text-gray-600">
//               With over 15 years of experience in the industry, we combine
//               expertise with personalized service to ensure the best outcomes
//               for our clients.
//             </p>
//           </div>
//           <div className="relative h-[300px]">
//             <img
//               src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
//               alt="Team meeting"
//               className="object-cover rounded-lg h-full"
//             />
//           </div>
//         </div>
//       </main>

//       {/* Our Services */}
//       <main className="px-4 py-16 bg-gray-200">
//         <div className="max-w-screen-xl mx-auto">
//           <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
//               <FileText className="w-12 h-12 text-blue-600 mb-4" />
//               <h2 className="text-2xl font-semibold mb-4">Tax Planning</h2>
//               <p className="text-gray-600">
//                 Strategic tax planning to minimize your tax liability and
//                 maximize savings.
//               </p>
//             </div>

//             <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
//               <Users className="w-12 h-12 text-blue-600 mb-4" />
//               <h2 className="text-2xl font-semibold mb-4">
//                 Tax Return Preparation
//               </h2>
//               <p className="text-gray-600">
//                 Professional preparation of individual and business tax returns.
//               </p>
//             </div>

//             <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
//               <Mail className="w-12 h-12 text-blue-600 mb-4" />
//               <h2 className="text-2xl font-semibold mb-4">Tax Audit Support</h2>
//               <p className="text-gray-600">
//                 Expert representation and support during tax audits.
//               </p>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Why Choose Us */}
//       <main className="px-4 py-16 bg-gradient-to-b from-gray-50 to-gray-100">
//         <div className="max-w-screen-xl mx-auto ">
//           <h2 className="text-3xl font-bold text-center mb-8">
//             Why Choose TaxPro?
//           </h2>
//           <div className="grid md:grid-cols-3 gap-8 mb-16">
//             <div className="bg-white p-8 rounded-xl shadow-lg">
//               <FileText className="w-12 h-12 text-blue-600 mb-4" />
//               <h2 className="text-2xl font-semibold mb-4">Easy Submission</h2>
//               <p className="text-gray-600">
//                 Submit your tax enquiries easily through our user-friendly form
//                 with file upload capability.
//               </p>
//             </div>

//             <div className="bg-white p-8 rounded-xl shadow-lg">
//               <Users className="w-12 h-12 text-green-600 mb-4" />
//               <h2 className="text-2xl font-semibold mb-4">Expert Support</h2>
//               <p className="text-gray-600">
//                 Get assistance from our team of qualified tax professionals and
//                 experts.
//               </p>
//             </div>

//             <div className="bg-white p-8 rounded-xl shadow-lg">
//               <Mail className="w-12 h-12 text-purple-600 mb-4" />
//               <h2 className="text-2xl font-semibold mb-4">Quick Response</h2>
//               <p className="text-gray-600">
//                 Receive prompt responses and updates about your enquiry via
//                 email.
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="text-center">
//           <Link href="/enquiry">
//             <Button
//               size="lg"
//               className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg"
//             >
//               Submit Your Enquiry
//             </Button>
//           </Link>
//         </div>
//       </main>

//       {/* Contact Us */}
//       <main className="mx-auto px-4 py-16 bg-white max-w-screen-xl mb-5 flex flex-col items-center">
//         <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="space-y-6 max-w-2xl w-full p-5 bg-gray-300 rounded-lg"
//         >
//           <div>
//             <Label htmlFor="name">Full Name</Label>
//             <Input
//               id="name"
//               {...register("name")}
//               required
//               className={`mt-1 ${errors.name ? "border-red-500" : ""}`}
//             />
//             {errors.name && (
//               <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
//             )}
//           </div>

//           <div>
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               type="email"
//               {...register("email")}
//               required
//               className={`mt-1 ${errors.email ? "border-red-500" : ""}`}
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.email.message}
//               </p>
//             )}
//           </div>

//           <div>
//             <Label htmlFor="subject">Subject</Label>
//             <Input
//               id="subject"
//               {...register("subject")}
//               className={`mt-1 ${errors.subject ? "border-red-500" : ""}`}
//             />
//             {errors.subject && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.subject.message}
//               </p>
//             )}
//           </div>

//           <div>
//             <Label htmlFor="message">Message</Label>
//             <Textarea
//               id="message"
//               {...register("message")}
//               className={`mt-1 ${errors.message ? "border-red-500" : ""}`}
//               rows={5}
//             />
//             {errors.message && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.message.message}
//               </p>
//             )}
//           </div>

//           <Button type="submit" className="w-full" disabled={isSubmitting}>
//             {isSubmitting ? "Sending..." : "Send Message"}
//           </Button>
//         </form>
//       </main>

//       {showLoginPopup && !isSubscribed && !session && (
//         <SubscribePopup
//           onClose={() => setShowLoginPopup(false)}
//           setIsSubscribed={setIsSubscribed}
//         />
//       )}
//     </section>
//   );
// }
