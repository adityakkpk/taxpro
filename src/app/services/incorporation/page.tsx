"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  Building2,
  Shield,
  TrendingUp,
  FileText,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Send,
  Menu,
  X,
  ChevronRight,
  Briefcase,
  Users,
  Scale,
  Award,
  Clock,
  Landmark,
} from "lucide-react"

export default function TaxIncorporationPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [formStatus, setFormStatus] = useState<null | "success" | "error">(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    businessType: "",
  })

  // Refs for scroll animations
  const targetRef = useRef<HTMLDivElement>(null)
  const processRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])

  // Process steps data
  const processSteps = [
    {
      title: "Initial Consultation",
      description:
        "We begin with a thorough consultation to understand your business goals, financial situation, and specific needs.",
      icon: <Users className="h-8 w-8 text-blue-600" />,
    },
    {
      title: "Entity Selection",
      description:
        "Our experts help you choose the optimal business structure based on your tax situation, liability concerns, and growth plans.",
      icon: <Briefcase className="h-8 w-8 text-blue-600" />,
    },
    {
      title: "Document Preparation",
      description:
        "We prepare and file all necessary legal documents, including articles of incorporation, bylaws, and operating agreements.",
      icon: <FileText className="h-8 w-8 text-blue-600" />,
    },
    {
      title: "Tax ID & Compliance",
      description:
        "We obtain your Federal Tax ID (EIN), set up state tax accounts, and ensure all compliance requirements are met.",
      icon: <Scale className="h-8 w-8 text-blue-600" />,
    },
    {
      title: "Ongoing Support",
      description:
        "Our relationship continues with ongoing compliance support, tax planning, and strategic business advice.",
      icon: <Shield className="h-8 w-8 text-blue-600" />,
    },
  ]

  // Business structure types
  const businessTypes = [
    {
      name: "S Corporation",
      description:
        "Pass-through taxation with limited liability protection. Ideal for small to medium businesses looking to avoid double taxation.",
      benefits: [
        "Avoid double taxation",
        "Limited liability protection",
        "Potential self-employment tax savings",
        "Easier to transfer ownership",
      ],
      icon: <Building2 className="h-12 w-12 text-blue-600" />,
    },
    {
      name: "C Corporation",
      description:
        "Traditional corporation structure with separate tax entity status. Best for companies planning to go public or raise significant capital.",
      benefits: [
        "Unlimited growth potential",
        "Attractive to investors",
        "Full liability protection",
        "Perpetual existence",
      ],
      icon: <Landmark className="h-12 w-12 text-blue-600" />,
    },
    {
      name: "LLC",
      description:
        "Flexible structure combining liability protection with tax benefits. Popular for small businesses and real estate investments.",
      benefits: [
        "Flexible tax options",
        "Limited liability protection",
        "Less administrative burden",
        "Profit distribution flexibility",
      ],
      icon: <Shield className="h-12 w-12 text-blue-600" />,
    },
  ]

  // Benefits data
  const benefits = [
    {
      title: "Tax Advantages",
      description:
        "Incorporate to access numerous tax deductions, including healthcare, retirement plans, and business expenses.",
      icon: <DollarSign className="h-12 w-12 text-blue-600" />,
    },
    {
      title: "Asset Protection",
      description: "Shield personal assets from business liabilities with the right corporate structure.",
      icon: <Shield className="h-12 w-12 text-blue-600" />,
    },
    {
      title: "Credibility & Growth",
      description: "Enhance your business reputation and create opportunities for expansion and investment.",
      icon: <TrendingUp className="h-12 w-12 text-blue-600" />,
    },
    {
      title: "Perpetual Existence",
      description: "Ensure your business continues regardless of ownership changes or succession planning.",
      icon: <Clock className="h-12 w-12 text-blue-600" />,
    },
  ]

  // Services data
  const services = [
    {
      title: "Tax Strategy & Planning",
      description:
        "Comprehensive tax planning to minimize liabilities and maximize deductions for your incorporated business.",
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
    },
    {
      title: "Business Formation",
      description: "Complete incorporation services including document filing, EIN obtainment, and compliance setup.",
      icon: <Building2 className="h-8 w-8 text-blue-600" />,
    },
    {
      title: "Compliance Management",
      description: "Ongoing support to ensure your corporation meets all state and federal filing requirements.",
      icon: <CheckCircle className="h-8 w-8 text-blue-600" />,
    },
    {
      title: "Financial Advisory",
      description: "Expert guidance on corporate finances, from bookkeeping to strategic investment decisions.",
      icon: <DollarSign className="h-8 w-8 text-blue-600" />,
    },
  ]

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setFormStatus("success")
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormStatus(null)
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
          businessType: "",
        })
      }, 3000)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white font-sans">
      {/* Navigation */}
      {/* <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <Building2 className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">TaxIncorp</span>
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#benefits" className="text-gray-600 hover:text-blue-600 transition-colors">
                Benefits
              </Link>
              <Link href="#process" className="text-gray-600 hover:text-blue-600 transition-colors">
                Process
              </Link>
              <Link href="#structures" className="text-gray-600 hover:text-blue-600 transition-colors">
                Structures
              </Link>
              <Link href="#services" className="text-gray-600 hover:text-blue-600 transition-colors">
                Services
              </Link>
              <Link href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                Contact
              </Link>
              <Link
                href="#contact"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </nav>

            <button className="md:hidden text-gray-600 focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white"
            >
              <div className="px-4 py-2 space-y-1">
                <Link
                  href="#benefits"
                  className="block py-2 text-gray-600 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Benefits
                </Link>
                <Link
                  href="#process"
                  className="block py-2 text-gray-600 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Process
                </Link>
                <Link
                  href="#structures"
                  className="block py-2 text-gray-600 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Structures
                </Link>
                <Link
                  href="#services"
                  className="block py-2 text-gray-600 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </Link>
                <Link
                  href="#contact"
                  className="block py-2 text-gray-600 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  href="#contact"
                  className="block py-2 text-blue-600 font-medium hover:text-blue-800 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header> */}

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white">
          <div className="absolute inset-0 z-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center py-20 md:py-24 lg:py-32">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="space-y-6">
                  <div className="inline-block bg-blue-500 bg-opacity-30 px-4 py-1 rounded-full text-sm font-medium">
                    Tax Incorporation Specialists
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    Strategic Tax <span className="text-blue-300">Incorporation</span> For Your Business
                  </h1>
                  <p className="text-xl text-blue-100 max-w-lg">
                    Maximize tax benefits and protect your assets with our expert incorporation services tailored to
                    your business needs.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <Link
                      href="#contact"
                      className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center"
                    >
                      Free Consultation
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                    <Link
                      href="#process"
                      className="bg-transparent hover:bg-blue-700 text-white border border-white font-medium py-3 px-6 rounded-lg transition-all duration-300 inline-flex items-center"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative h-[400px] md:h-[500px] w-full">
                  <div className="absolute inset-0 bg-blue-600 rounded-3xl transform rotate-3 opacity-20"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=500&width=600"
                      alt="Tax Incorporation Services"
                      fill
                      className="object-cover mix-blend-overlay opacity-40"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-8">
                        <Building2 className="h-20 w-20 mx-auto mb-6 text-white opacity-80" />
                        <div className="text-2xl font-bold mb-2">Trusted by 1000+ Businesses</div>
                        <div className="flex justify-center space-x-2 mb-6">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-yellow-300">
                              ★
                            </span>
                          ))}
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-left">
                          <div className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-300 mr-2" />
                            <span className="text-sm">Tax Savings</span>
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-300 mr-2" />
                            <span className="text-sm">Asset Protection</span>
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-300 mr-2" />
                            <span className="text-sm">Liability Shield</span>
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-300 mr-2" />
                            <span className="text-sm">Growth Strategy</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
        <section id="benefits" className="py-20 bg-white" ref={targetRef}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-16" style={{ opacity, scale }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Benefits of Tax Incorporation</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Strategic incorporation provides significant advantages for business owners, from tax savings to asset
                protection.
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
                  <h3 className="text-2xl font-bold mb-4">Tax Savings Potential</h3>
                  <p className="text-gray-600 mb-6">
                    Proper incorporation can save business owners thousands in taxes annually through deductions,
                    credits, and strategic planning.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Business Expense Deductions</h4>
                        <p className="text-sm text-gray-500">
                          Maximize legitimate business deductions unavailable to sole proprietors
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Retirement Planning</h4>
                        <p className="text-sm text-gray-500">
                          Access to enhanced retirement plans with higher contribution limits
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Healthcare Cost Reduction</h4>
                        <p className="text-sm text-gray-500">
                          Potential tax-advantaged health benefits for you and employees
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative h-64 md:h-80">
                  <Image
                    src="/placeholder.svg?height=400&width=500"
                    alt="Tax Savings Chart"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Process Section */}
        <section id="process" className="py-20 bg-gray-50" ref={processRef}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Incorporation Process</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A streamlined, expert-guided approach to establishing your business entity with maximum tax advantages
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 transform md:-translate-x-1/2"></div>

              {/* Process steps */}
              <div className="space-y-12">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div
                      className={`flex flex-col md:flex-row items-start ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                    >
                      <div className="flex-1 md:px-8">
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

                      <div className="flex-1 hidden md:block"></div>
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
                href="#contact"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center"
              >
                Start Your Incorporation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Business Structures Section */}
        <section id="structures" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Business Structure Options</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choosing the right business structure is crucial for tax optimization and liability protection
              </p>
            </motion.div>

            <div className="bg-gray-50 rounded-2xl p-6 mb-12">
              <div className="flex flex-wrap border-b">
                {businessTypes.map((type, index) => (
                  <button
                    key={index}
                    className={`px-6 py-3 font-medium text-lg transition-colors ${
                      activeTab === index
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab(index)}
                  >
                    {type.name}
                  </button>
                ))}
              </div>

              <div className="py-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div>
                        <div className="flex items-center mb-4">
                          {businessTypes[activeTab].icon}
                          <h3 className="text-2xl font-bold ml-4">{businessTypes[activeTab].name}</h3>
                        </div>
                        <p className="text-gray-600 mb-6">{businessTypes[activeTab].description}</p>
                        <h4 className="font-bold text-lg mb-3">Key Benefits:</h4>
                        <ul className="space-y-2">
                          {businessTypes[activeTab].benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white rounded-xl p-6 shadow-md">
                        <div className="relative h-64">
                          <Image
                            src="/placeholder.svg?height=300&width=500"
                            alt={`${businessTypes[activeTab].name} Structure`}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="mt-6 text-center">
                          <Link
                            href="#contact"
                            className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
                          >
                            Learn if {businessTypes[activeTab].name} is right for you
                            <ChevronRight className="ml-1 h-5 w-5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <motion.div
              className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Not Sure Which Structure Is Best?</h3>
                  <p className="mb-6">
                    Our tax experts will analyze your specific situation and recommend the optimal structure to maximize
                    tax benefits and protect your assets.
                  </p>
                  <Link
                    href="#contact"
                    className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-lg transition-all duration-300 inline-flex items-center"
                  >
                    Get Free Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
                <div className="relative h-64 md:h-80">
                  <Image
                    src="/placeholder.svg?height=400&width=500"
                    alt="Business Structure Comparison"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Incorporation Services</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive solutions to establish and maintain your business entity with optimal tax advantages
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-50 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold">{service.title}</h3>
                  </div>
                  <p className="text-gray-600">{service.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-16 bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium mb-4">
                    Client Success
                  </div>
                  <h3 className="text-2xl font-bold mb-4">We've Helped 1000+ Businesses Save on Taxes</h3>
                  <p className="text-gray-600 mb-6">
                    Our clients typically save 20-30% on their tax liability after proper incorporation and strategic
                    tax planning.
                  </p>
                  <div className="flex items-center">
                    <Award className="h-8 w-8 text-yellow-500 mr-3" />
                    <div>
                      <h4 className="font-bold">Award-Winning Tax Services</h4>
                      <p className="text-sm text-gray-500">
                        Recognized for excellence in tax planning and incorporation
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex justify-center space-x-2 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-2xl">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-4">
                    "Working with TaxIncorp saved our business over $45,000 in taxes the first year. Their expertise in
                    selecting the right corporate structure and ongoing tax planning has been invaluable."
                  </p>
                  <div className="flex items-center">
                    <Image
                      src="/placeholder.svg?height=60&width=60"
                      alt="Client"
                      width={60}
                      height={60}
                      className="rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-bold">Michael Rodriguez</h4>
                      <p className="text-sm text-gray-500">CEO, TechGrowth Solutions</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact/Enquiry Section */}
        <section id="contact" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Started Today</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Schedule a free consultation with our tax incorporation experts to discuss your specific needs
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white h-full">
                  <h3 className="text-2xl font-bold mb-6">Why Choose Our Incorporation Services?</h3>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-white/20 rounded-full w-10 h-10 flex items-center justify-center mr-4 shrink-0">
                        <Shield className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Expert Tax Guidance</h4>
                        <p className="text-blue-100">
                          Our team includes CPAs and tax attorneys with decades of experience
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-white/20 rounded-full w-10 h-10 flex items-center justify-center mr-4 shrink-0">
                        <DollarSign className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Maximize Tax Savings</h4>
                        <p className="text-blue-100">
                          Strategic planning to reduce your tax burden legally and effectively
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-white/20 rounded-full w-10 h-10 flex items-center justify-center mr-4 shrink-0">
                        <FileText className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Complete Documentation</h4>
                        <p className="text-blue-100">
                          We handle all paperwork and filings for a seamless incorporation process
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-white/20 rounded-full w-10 h-10 flex items-center justify-center mr-4 shrink-0">
                        <Clock className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Ongoing Support</h4>
                        <p className="text-blue-100">
                          Continuous guidance to ensure compliance and optimal tax strategy
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-white/20">
                    <div className="flex items-center mb-4">
                      <Award className="h-6 w-6 text-yellow-300 mr-3" />
                      <h4 className="font-bold">100% Satisfaction Guarantee</h4>
                    </div>
                    <p className="text-blue-100">
                      We're confident in our services. If you're not completely satisfied, we'll work with you until you
                      are.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <h3 className="text-2xl font-bold mb-6">Request a Consultation</h3>

                  <AnimatePresence mode="wait">
                    {formStatus === "success" ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-6 text-center"
                      >
                        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                        <h4 className="text-xl font-bold mb-2">Thank You!</h4>
                        <p>
                          Your enquiry has been submitted successfully. One of our tax experts will contact you shortly.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                      >
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
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

                          <div>
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
                        </div>

                        <div>
                          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                            Company Name (if applicable)
                          </label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-1">
                            Interested Business Structure
                          </label>
                          <select
                            id="businessType"
                            name="businessType"
                            value={formData.businessType}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          >
                            <option value="">Select an option</option>
                            <option value="s-corp">S Corporation</option>
                            <option value="c-corp">C Corporation</option>
                            <option value="llc">LLC</option>
                            <option value="not-sure">Not Sure (Need Guidance)</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                            Your Message
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            rows={4}
                            value={formData.message}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            placeholder="Tell us about your business and specific needs..."
                          ></textarea>
                        </div>

                        <div className="pt-2">
                          <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
                          >
                            <Send className="h-5 w-5 mr-2" />
                            Submit Enquiry
                          </button>
                        </div>

                        <p className="text-xs text-gray-500 text-center mt-4">
                          By submitting this form, you agree to our privacy policy and terms of service.
                        </p>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
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
                <Building2 className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">TaxIncorp</span>
              </Link>
              <p className="text-gray-400 mb-4">
                Professional tax incorporation services to maximize your tax benefits and protect your assets.
              </p>
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
                    S Corporation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    C Corporation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    LLC Formation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Tax Planning
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Business Compliance
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Tax Guides
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Business Structure Comparison
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Tax Savings Calculator
                  </Link>
                </li>
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
                  <span className="text-gray-400">info@taxincorp.example.com</span>
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
                    123 Business Ave, Suite 456
                    <br />
                    Financial District, NY 10001
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} TaxIncorp. All rights reserved.</p>
          </div>
        </div>
      </footer> */}
    </div>
  )
}

