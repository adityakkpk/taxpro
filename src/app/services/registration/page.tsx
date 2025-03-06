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
    </div>
  )
}

