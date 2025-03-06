"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import {
  FileText,
  Shield,
  TrendingUp,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Send,
  Menu,
  X,
  ChevronRight,
  Users,
  Briefcase,
  Scale,
  Award,
  Star,
} from "lucide-react"

export default function TaxRegistrationPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formStatus, setFormStatus] = useState<null | "success" | "error">(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    taxId: "",
    businessType: "",
    annualRevenue: "",
    address: "",
    agreeTerms: false,
  })

  const formRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: formRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])

  const benefits = [
    {
      title: "Compliance Assurance",
      description: "Stay compliant with all tax regulations and avoid penalties.",
      icon: <Shield className="h-12 w-12 text-blue-600" />,
    },
    {
      title: "Financial Clarity",
      description: "Gain clear insights into your tax obligations and financial status.",
      icon: <TrendingUp className="h-12 w-12 text-blue-600" />,
    },
    {
      title: "Access to Benefits",
      description: "Unlock tax credits, deductions, and government support programs.",
      icon: <DollarSign className="h-12 w-12 text-blue-600" />,
    },
    {
      title: "Business Credibility",
      description: "Enhance your business reputation with proper tax registration.",
      icon: <Award className="h-12 w-12 text-blue-600" />,
    },
  ]

  const registrationSteps = [
    {
      title: "Gather Information",
      description: "Collect all necessary personal and business documents.",
      icon: <FileText className="h-8 w-8 text-blue-600" />,
    },
    {
      title: "Complete Registration",
      description: "Fill out our secure online registration form.",
      icon: <Briefcase className="h-8 w-8 text-blue-600" />,
    },
    {
      title: "Verification Process",
      description: "Our team verifies your information for accuracy.",
      icon: <CheckCircle className="h-8 w-8 text-blue-600" />,
    },
    {
      title: "Receive Tax ID",
      description: "Get your unique Tax Identification Number.",
      icon: <Scale className="h-8 w-8 text-blue-600" />,
    },
    {
      title: "Ongoing Support",
      description: "Access continuous support for your tax-related queries.",
      icon: <Users className="h-8 w-8 text-blue-600" />,
    },
  ]

  const faqs = [
    {
      question: "Why do I need to register for taxes?",
      answer:
        "Tax registration is crucial for legal compliance, accessing government benefits, and maintaining good financial standing. It helps you avoid penalties and enables you to operate your business or manage your finances transparently.",
    },
    {
      question: "How long does the registration process take?",
      answer:
        "The online registration process typically takes about 15-20 minutes to complete. After submission, the verification process usually takes 2-3 business days, after which you'll receive your Tax ID.",
    },
    {
      question: "What documents do I need for registration?",
      answer:
        "You'll need personal identification (such as a driver's license or passport), Social Security Number or ITIN, business formation documents (if applicable), and proof of address. Specific requirements may vary based on your situation.",
    },
    {
      question: "Is my information secure?",
      answer:
        "Yes, we use state-of-the-art encryption and security measures to protect your personal and financial information. Our systems are regularly audited and comply with all relevant data protection regulations.",
    },
    {
      question: "What if my situation changes after registration?",
      answer:
        "If your personal or business situation changes after registration, you should update your information as soon as possible. You can do this through your online account or by contacting our support team.",
    },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setFormStatus("success")
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormStatus(null)
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          taxId: "",
          businessType: "",
          annualRevenue: "",
          address: "",
          agreeTerms: false,
        })
        setCurrentStep(1)
      }, 3000)
    }, 1000)
  }

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3))
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white font-sans">

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="absolute inset-0 z-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                  <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="py-20 md:py-28 lg:py-32 flex flex-col items-center text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Simplify Your Tax Registration
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
                  Register for your tax obligations quickly and easily. Ensure compliance and unlock financial benefits
                  for your business.
                </p>
                <Link
                  href="#registration"
                  className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center text-lg"
                >
                  Start Registration
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill="#ffffff"
                fillOpacity="1"
                d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Benefits of Tax Registration</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Registering for taxes offers numerous advantages for individuals and businesses alike. Here's why it's
                crucial:
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="bg-blue-50 rounded-full w-20 h-20 flex items-center justify-center mb-6">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Stay Ahead of Tax Obligations</h3>
                  <p className="text-gray-600 mb-6">
                    Proper tax registration ensures you're always compliant, avoiding penalties and legal issues while
                    maximizing potential benefits and deductions.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <span>Avoid late filing penalties and interest charges</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <span>Access government support programs and incentives</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <span>Improve financial planning and budgeting</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <span>Build credibility with customers and partners</span>
                    </li>
                  </ul>
                </div>
                <div className="relative h-64 md:h-auto">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Tax Compliance Illustration"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Registration Process</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our streamlined process makes tax registration quick and hassle-free. Here's how it works:
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 transform md:-translate-x-1/2"></div>

              {/* Process steps */}
              <div className="space-y-12">
                {registrationSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div
                      className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                    >
                      <div className="flex-1 md:w-1/2 md:px-8">
                        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                          <div className="flex items-center mb-4">
                            <div className="mr-4">{step.icon}</div>
                            <h3 className="text-xl font-bold">{step.title}</h3>
                          </div>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-center md:w-16 relative z-10">
                        <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-lg">
                          {index + 1}
                        </div>
                      </div>

                      <div className="flex-1 md:w-1/2 hidden md:block"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              className="mt-16 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                href="#registration"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center"
              >
                Start Your Registration
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Registration Form Section */}
        <section id="registration" className="py-20 bg-white" ref={formRef}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-16" style={{ opacity, scale }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Register for Your Tax ID</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Complete the form below to start your tax registration process. Our team will guide you through every
                step.
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            currentStep >= step ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {step}
                        </div>
                        <span className="text-sm mt-2">
                          {step === 1 ? "Personal Info" : step === 2 ? "Business Details" : "Confirmation"}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="w-full bg-gray-200 h-1 rounded-full">
                    <div
                      className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {formStatus === "success" ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-6 text-center"
                    >
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <h4 className="text-xl font-bold mb-2">Registration Submitted!</h4>
                      <p>
                        Thank you for registering. We've received your information and will process your application
                        shortly. You'll receive a confirmation email with next steps.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      onSubmit={handleSubmit}
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      {currentStep === 1 && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="mb-4">
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                              Full Name
                            </label>
                            <input
                              type="text"
                              id="fullName"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                              required
                            />
                          </div>
                          <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                              Email Address
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                              required
                            />
                          </div>
                          <div className="mb-4">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                              required
                            />
                          </div>
                        </motion.div>
                      )}

                      {currentStep === 2 && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="mb-4">
                            <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-1">
                              Business Type
                            </label>
                            <select
                              id="businessType"
                              name="businessType"
                              value={formData.businessType}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                              required
                            >
                              <option value="">Select business type</option>
                              <option value="sole-proprietorship">Sole Proprietorship</option>
                              <option value="partnership">Partnership</option>
                              <option value="llc">LLC</option>
                              <option value="corporation">Corporation</option>
                            </select>
                          </div>
                          <div className="mb-4">
                            <label htmlFor="taxId" className="block text-sm font-medium text-gray-700 mb-1">
                              Existing Tax ID (if any)
                            </label>
                            <input
                              type="text"
                              id="taxId"
                              name="taxId"
                              value={formData.taxId}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            />
                          </div>
                          <div className="mb-4">
                            <label htmlFor="annualRevenue" className="block text-sm font-medium text-gray-700 mb-1">
                              Estimated Annual Revenue
                            </label>
                            <select
                              id="annualRevenue"
                              name="annualRevenue"
                              value={formData.annualRevenue}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                              required
                            >
                              <option value="">Select revenue range</option>
                              <option value="0-50000">$0 - $50,000</option>
                              <option value="50001-100000">$50,001 - $100,000</option>
                              <option value="100001-500000">$100,001 - $500,000</option>
                              <option value="500001-1000000">$500,001 - $1,000,000</option>
                              <option value="1000001+">$1,000,001+</option>
                            </select>
                          </div>
                        </motion.div>
                      )}

                      {currentStep === 3 && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="mb-4">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                              Business Address
                            </label>
                            <textarea
                              id="address"
                              name="address"
                              value={formData.address}
                              onChange={handleInputChange}
                              rows={3}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                              required
                            ></textarea>
                          </div>
                          <div className="mb-6">
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                name="agreeTerms"
                                checked={formData.agreeTerms}
                                onChange={handleInputChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                required
                              />
                              <span className="ml-2 text-sm text-gray-600">
                                I agree to the{" "}
                                <Link href="#" className="text-blue-600 hover:underline">
                                  Terms and Conditions
                                </Link>{" "}
                                and{" "}
                                <Link href="#" className="text-blue-600 hover:underline">
                                  Privacy Policy
                                </Link>
                              </span>
                            </label>
                          </div>
                        </motion.div>
                      )}

                      <div className="flex justify-between">
                        {currentStep > 1 && (
                          <button
                            type="button"
                            onClick={prevStep}
                            className="bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors hover:bg-gray-300"
                          >
                            Previous
                          </button>
                        )}
                        {currentStep < 3 ? (
                          <button
                            type="button"
                            onClick={nextStep}
                            className="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors hover:bg-blue-700 ml-auto"
                          >
                            Next
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors hover:bg-green-700 ml-auto flex items-center"
                          >
                            Submit Registration
                            <Send className="ml-2 h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Find answers to common questions about tax registration and our services.
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <Accordion key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Hear from businesses who have successfully registered with our help.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  company: "Tech Innovators LLC",
                  quote:
                    "The registration process was smooth and efficient. Their team guided us every step of the way, making tax compliance a breeze.",
                },
                {
                  name: "Michael Chen",
                  company: "Green Earth Consulting",
                  quote:
                    "As a new business owner, I was worried about tax registration. TaxRegister made it simple and stress-free. Highly recommended!",
                },
                {
                  name: "Emily Rodriguez",
                  company: "Artisan Bakery Co.",
                  quote:
                    "Their expertise in tax matters is unmatched. They helped us set up our bakery's tax structure perfectly, saving us time and money.",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 rounded-xl p-6 shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                  <div className="font-medium">
                    <p className="text-gray-800">{testimonial.name}</p>
                    <p className="text-gray-500 text-sm">{testimonial.company}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <FileText className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">TaxRegister</span>
              </Link>
              <p className="text-gray-400 mb-4">Simplifying tax registration for businesses of all sizes.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Business Registration
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Tax ID Application
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Compliance Assistance
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Tax Planning
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Tax Guides
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Webinars
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Contact Us</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-gray-400">(555) 123-4567</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-gray-400">support@taxregister.com</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-gray-400">
                    123 Tax Street, Suite 456
                    <br />
                    Financial District, NY 10001
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} TaxRegister. All rights reserved.</p>
          </div>
        </div>
      </footer> */}
    </div>
  )
}

// Accordion Component
function Accordion({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full py-4 text-left text-gray-800 hover:text-gray-600 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-lg">{question}</span>
        <ChevronRight
          className={`h-5 w-5 text-gray-500 transform transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="pb-4 text-gray-600">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

