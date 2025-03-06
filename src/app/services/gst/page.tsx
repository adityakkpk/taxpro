"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import {
  ArrowRight,
  CheckCircle,
  AlertCircle,
  FileText,
  BarChart,
  Calendar,
  Users,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
} from "lucide-react"

const colors = {
  darkBlue: "#244464",
  mediumBlue: "#3c5473",
  lightBlue: "#475b78",
  grey: "#737474",
  lightGrey: "#c6cbd2",
  blueGrey: "#8c9cac",
  accentBlue: "#546c84",
}

export default function GSTServicesPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null)
  const [gstAmount, setGstAmount] = useState<number>(0)
  const [baseAmount, setBaseAmount] = useState<string>("")
  const [gstRate, setGstRate] = useState<string>("18")

  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.8])

  const calculateGST = () => {
    const base = Number.parseFloat(baseAmount)
    const rate = Number.parseFloat(gstRate)
    if (!isNaN(base) && !isNaN(rate)) {
      setGstAmount(base * (rate / 100))
    } else {
      setGstAmount(0)
    }
  }

  useEffect(() => {
    calculateGST()
  }, [baseAmount, gstRate])

  const gstServices = [
    {
      title: "GST Registration",
      icon: <FileText className="h-8 w-8" />,
      description: "Hassle-free GST registration for your business",
    },
    {
      title: "GST Return Filing",
      icon: <Calendar className="h-8 w-8" />,
      description: "Timely and accurate GST return filing services",
    },
    {
      title: "GST Compliance",
      icon: <CheckCircle className="h-8 w-8" />,
      description: "Ensure full compliance with GST regulations",
    },
    {
      title: "GST Consultation",
      icon: <Users className="h-8 w-8" />,
      description: "Expert advice on GST-related matters",
    },
    {
      title: "GST Reconciliation",
      icon: <BarChart className="h-8 w-8" />,
      description: "Reconcile your GST data for accuracy",
    },
    {
      title: "GST Audit Support",
      icon: <AlertCircle className="h-8 w-8" />,
      description: "Comprehensive support during GST audits",
    },
  ]

  const gstProcess = [
    { title: "Information Gathering", description: "Collect all necessary business and financial documents" },
    { title: "Data Analysis", description: "Analyze your financial data and transactions" },
    { title: "Return Preparation", description: "Prepare your GST return with utmost accuracy" },
    { title: "Review and Validation", description: "Thorough review and validation of the prepared return" },
    { title: "Filing and Submission", description: "Timely filing and submission of your GST return" },
    { title: "Post-Filing Support", description: "Ongoing support for any post-filing queries or issues" },
  ]

  return (
    <div className="min-h-screen  text-white font-sans">
   
      <main>
        {/* Hero Section */}
        <section ref={heroRef} className="relative overflow-hidden bg-gray-900 py-20 sm:py-32">
          <div className="absolute inset-0 z-0">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="hero-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: colors.darkBlue, stopOpacity: 0.8 }} />
                  <stop offset="100%" style={{ stopColor: colors.mediumBlue, stopOpacity: 0.6 }} />
                </linearGradient>
                <pattern id="hero-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="1" fill={colors.lightGrey} fillOpacity="0.1" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#hero-gradient)" />
              <rect width="100" height="100" fill="url(#hero-pattern)" />
            </svg>
          </div>

          <motion.div
            className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center"
            style={{ opacity: heroOpacity, scale: heroScale }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Simplify Your <span className="text-blue-400">GST Compliance</span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Expert GST services to keep your business compliant and maximize your tax efficiency
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                href="#consultation"
                className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:bg-blue-700 inline-flex items-center text-lg"
              >
                Get Expert GST Assistance
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* GST Benefits Section */}
        <section id="benefits" className="py-20" >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Benefits of Proper GST Compliance</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ensuring GST compliance offers numerous advantages for your business
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Legal Compliance",
                  description: "Stay on the right side of tax laws and avoid penalties",
                  icon: <CheckCircle className="h-12 w-12 text-green-400" />,
                },
                {
                  title: "Input Tax Credit",
                  description: "Claim tax credits on your business expenses and reduce overall tax burden",
                  icon: <ArrowRight className="h-12 w-12 text-blue-400" />,
                },
                {
                  title: "Business Expansion",
                  description: "Easier inter-state operations and business growth opportunities",
                  icon: <BarChart className="h-12 w-12 text-yellow-400" />,
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center justify-center mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-center">{benefit.title}</h3>
                  <p className="text-gray-400 text-center">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* GST Services Section */}
        <section id="services" className="py-20" style={{ backgroundColor: colors.mediumBlue }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our GST Services</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Comprehensive GST solutions tailored to your business needs
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gstServices.map((service, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-500 bg-opacity-20 rounded-full p-3 mr-4">{service.icon}</div>
                    <h3 className="text-xl font-bold">{service.title}</h3>
                  </div>
                  <p className="text-gray-400">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* GST Calculator Section */}
        <section id="calculator" className="py-20" >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl text-black md:text-4xl font-bold mb-4">GST Calculator</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Estimate your GST liability with our easy-to-use calculator
              </p>
            </motion.div>

            <div className="bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-700 max-w-2xl mx-auto">
              <div className="mb-6">
                <label htmlFor="baseAmount" className="block text-sm font-medium text-gray-300 mb-2">
                  Base Amount (₹)
                </label>
                <input
                  type="number"
                  id="baseAmount"
                  value={baseAmount}
                  onChange={(e) => setBaseAmount(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter base amount"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="gstRate" className="block text-sm font-medium text-gray-300 mb-2">
                  GST Rate (%)
                </label>
                <select
                  id="gstRate"
                  value={gstRate}
                  onChange={(e) => setGstRate(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="5">5%</option>
                  <option value="12">12%</option>
                  <option value="18">18%</option>
                  <option value="28">28%</option>
                </select>
              </div>
              <div className="bg-gray-700 rounded-md p-4 mb-6">
                <p className="text-lg font-semibold mb-2">GST Amount:</p>
                <p className="text-3xl font-bold text-blue-400">₹ {gstAmount.toFixed(2)}</p>
              </div>
              <p className="text-sm text-gray-400">
                Note: This calculator provides an estimate. Actual GST may vary based on specific circumstances.
              </p>
            </div>
          </div>
        </section>

        {/* GST Filing Process Section */}
        <section id="process" className="py-20" >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl text-black font-bold mb-4">GST Filing Process</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our streamlined approach ensures accurate and timely GST filing
              </p>
            </motion.div>

            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-500 transform md:-translate-x-1/2"></div>

              <div className="space-y-12">
                {gstProcess.map((step, index) => (
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
                        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
                          <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                          <p className="text-gray-400">{step.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-center md:w-16 relative z-10">
                        <div className="h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold shadow-lg">
                          {index + 1}
                        </div>
                      </div>

                      <div className="flex-1 md:w-1/2 hidden md:block"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Expert Consultation Section */}
        <section id="consultation" className="py-20" style={{ backgroundColor: colors.mediumBlue }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Get Expert GST Consultation</h2>
                <p className="text-xl text-gray-300 mb-8">
                  Our GST experts are ready to assist you with personalized advice and solutions tailored to your
                  business needs.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Personalized GST strategy",
                    "Compliance risk assessment",
                    "Industry-specific GST insights",
                    "Ongoing support and guidance",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-green-400 mr-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="#"
                  className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:bg-blue-700 inline-flex items-center text-lg"
                >
                  Schedule a Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-700">
                  <h3 className="text-2xl font-bold mb-6">Contact Us</h3>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md transition-colors hover:bg-blue-700"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

