"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import {
  ArrowRight,
  Building2,
  CheckCircle,
  ChevronRight,
  ClipboardCheck,
  Mail,
  MessageSquare,
  Phone,
  PieChart,
  Shield,
  TrendingUp,
} from "lucide-react"

export default function TaxIncorporationPage() {
  // State for animations
  const [isIntersecting, setIsIntersecting] = useState<{ [key: string]: boolean }>({})

  // State for active tab in business entities section
  const [activeTab, setActiveTab] = useState<string>("llc")

  // State for FAQ
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessType: "",
    message: "",
  })

  // Section refs for animations
  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    benefits: useRef<HTMLDivElement>(null),
    process: useRef<HTMLDivElement>(null),
    advantages: useRef<HTMLDivElement>(null),
    entities: useRef<HTMLDivElement>(null),
    enquiry: useRef<HTMLDivElement>(null),
  }

  // Benefits data
  const benefits = [
    {
      title: "Limited Liability Protection",
      description: "Shield your personal assets from business debts and liabilities.",
      icon: <Shield className="h-10 w-10 text-[#3c5473]" />,
    },
    {
      title: "Tax Advantages",
      description: "Access tax deductions, credits, and strategies unavailable to sole proprietors.",
      icon: <TrendingUp className="h-10 w-10 text-[#3c5473]" />,
    },
    {
      title: "Enhanced Credibility",
      description: "Establish trust with clients, vendors, and partners as a formal business entity.",
      icon: <Building2 className="h-10 w-10 text-[#3c5473]" />,
    },
    {
      title: "Easier Capital Raising",
      description: "Attract investors and secure financing with a proper corporate structure.",
      icon: <PieChart className="h-10 w-10 text-[#3c5473]" />,
    },
  ]

  // Process steps
  const processSteps = [
    {
      number: "01",
      title: "Business Structure Selection",
      description:
        "We help you choose the right entity type based on your goals, liability concerns, and tax situation.",
    },
    {
      number: "02",
      title: "Name Reservation & Documentation",
      description:
        "We handle name searches, reservations, and prepare all required legal documents for your incorporation.",
    },
    {
      number: "03",
      title: "Filing & Registration",
      description: "We file articles of incorporation, obtain your EIN, and register with appropriate state agencies.",
    },
    {
      number: "04",
      title: "Compliance Setup",
      description:
        "We establish bylaws, operating agreements, and compliance calendars to keep your business in good standing.",
    },
    {
      number: "05",
      title: "Tax Strategy Implementation",
      description: "We develop and implement tax strategies tailored to your new corporate structure.",
    },
  ]

  // Tax advantages data
  const taxAdvantages = [
    "Deduct business expenses including home office, travel, and meals",
    "Flexible tax year selection for optimal tax planning",
    "Retirement plan options with higher contribution limits",
    "Income splitting strategies to reduce overall tax burden",
    "Healthcare cost deductions through corporate plans",
    "Carry forward losses to offset future profits",
    "Fringe benefits that are tax-deductible for the business",
  ]

  // Business entity types
  const entityTypes = {
    llc: {
      title: "Limited Liability Company (LLC)",
      description:
        "Combines the liability protection of a corporation with the tax flexibility of a partnership. Ideal for small to medium businesses seeking simplicity and protection.",
      features: [
        "Pass-through taxation by default",
        "Flexible management structure",
        "Less paperwork and formalities than corporations",
        "Can elect different tax treatments (S-Corp, C-Corp)",
        "Protected from personal liability for business debts",
      ],
      image: "/placeholder.svg?height=400&width=600",
    },
    scorp: {
      title: "S Corporation",
      description:
        "A corporation that elects to pass corporate income, losses, deductions, and credits through to shareholders for federal tax purposes, avoiding double taxation.",
      features: [
        "Pass-through taxation",
        "Self-employment tax savings",
        "Limited to 100 shareholders",
        "Must be a domestic corporation",
        "Requires reasonable salary payments to owner-employees",
      ],
      image: "/placeholder.svg?height=400&width=600",
    },
    ccorp: {
      title: "C Corporation",
      description:
        "A legal entity separate from its owners, offering the strongest protection from personal liability but subject to potential double taxation.",
      features: [
        "Unlimited number of shareholders",
        "Attractive to outside investors and venture capital",
        "Perpetual existence independent of owners",
        "Ability to deduct fringe benefits",
        "Can retain earnings for future growth at corporate tax rates",
      ],
      image: "/placeholder.svg?height=400&width=600",
    },
    partnership: {
      title: "Partnership",
      description:
        "A business relationship between two or more people who conduct business together, sharing profits and losses.",
      features: [
        "Pass-through taxation",
        "Shared management responsibilities",
        "Easy and inexpensive to form",
        "Flexible profit distribution",
        "Partners personally liable for business debts (except in LLPs)",
      ],
      image: "/placeholder.svg?height=400&width=600",
    },
  }

  // FAQ data
  const faqs = [
    {
      question: "How long does the incorporation process take?",
      answer:
        "The incorporation process typically takes 1-3 weeks depending on your state and the complexity of your business structure. Expedited services are available in most states for an additional fee.",
    },
    {
      question: "What's the difference between an LLC and an S Corporation?",
      answer:
        "While both offer limited liability protection and pass-through taxation, S Corporations can provide self-employment tax savings for owner-employees. LLCs offer more flexibility in management and profit distribution but may have higher self-employment taxes.",
    },
    {
      question: "Do I need a lawyer to incorporate my business?",
      answer:
        "While not legally required, professional assistance ensures your incorporation is done correctly. Our tax professionals work with legal partners to provide comprehensive incorporation services that protect your interests.",
    },
    {
      question: "What ongoing compliance requirements will I have after incorporating?",
      answer:
        "Requirements vary by entity type and state but typically include annual reports, state fees, maintaining corporate records, separate business banking, and following corporate formalities for meetings and decisions.",
    },
    {
      question: "Can I change my business structure later if my needs change?",
      answer:
        "Yes, you can convert your business structure as your needs evolve. However, conversions may have tax implications and require new filings. We provide restructuring services to help businesses transition smoothly.",
    },
  ]

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would send this data to your backend
    console.log("Form submitted:", formData)
    alert("Thank you for your inquiry! We will contact you soon about your incorporation needs.")
    setFormData({ name: "", email: "", phone: "", businessType: "", message: "" })
  }

  // Intersection observer for animations
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    const observerOptions = { threshold: 0.1 }

    Object.entries(sectionRefs).forEach(([key, ref]) => {
      if (ref.current) {
        const observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            setIsIntersecting((prev) => ({ ...prev, [key]: true }))
          }
        }, observerOptions)

        observer.observe(ref.current)
        observers.push(observer)
      }
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  // CSS for animations
  const fadeInAnimation = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `

  const slideInLeftAnimation = `
    @keyframes slideInLeft {
      from { transform: translateX(-50px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `

  const slideInRightAnimation = `
    @keyframes slideInRight {
      from { transform: translateX(50px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `

  const slideInUpAnimation = `
    @keyframes slideInUp {
      from { transform: translateY(50px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `

  const pulseAnimation = `
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
  `

  return (
    <div className="font-sans">
      <style jsx global>{`
        ${fadeInAnimation}
        ${slideInLeftAnimation}
        ${slideInRightAnimation}
        ${slideInUpAnimation}
        ${pulseAnimation}
      `}</style>

      {/* Hero Section - Unique Design with Hexagon Pattern */}
      <section ref={sectionRefs.hero} className="relative bg-white py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#244464] to-[#3c5473] opacity-95"></div>
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556l-1.414-1.414L28 0h4zM.284 0l28 28-1.414 1.414L0 2.544v2.83L26.272 32l-1.414 1.414-28-28V0h3.428zM60 0v3.428L31.716 31.716l-1.414-1.414L57.456 3.428H54.627L28 30.284l-1.414-1.414L60 0zM60 60H57.414l-28-28 1.414-1.414L60 60zm0-5.656L32.272 26.272l1.414-1.414L60 51.544v-2.828L33.686 22.272l1.414-1.414 28 28v5.657zM30 60l3.586-3.586 1.414 1.414L30 62.142l-5-5 1.414-1.414L30 60zm-5.414-8.414l-28-28L0 57.414V60h2.544L30 32.544l-5.414 19.042zm-1.414-1.414L5.414 60H2.586l22.9-22.9 1.414 1.414L0 60h5.414l3.586-3.586 14.172-14.172zM60 49.414L26.272 15.686l-1.414 1.414L60 52.544v-3.13zM60 5.414L32.272 33.142l-1.414 1.414L60 2.544v2.87zM0 49.414l26.272-26.272 1.414 1.414L0 52.544v-3.13zM0 5.414L27.728 33.142l-1.414 1.414L0 2.544v2.87z' fill='%23ffffff' fillOpacity='1' fillRule='evenodd'/%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center min-h-[70vh]">
            <div className={`text-white ${isIntersecting.hero ? "animate-[slideInLeft_1s_ease-in-out]" : "opacity-0"}`}>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                Transform Your Business Through <span className="text-[#c6cbd2]">Incorporation</span>
              </h1>
              <p className="text-xl mb-8">
                Strategic tax planning and business structuring to protect your assets and maximize your profits.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-[#244464] px-8 py-3 rounded-lg font-semibold hover:bg-[#c6cbd2] transition-all duration-300 flex items-center">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>

            <div className={`relative ${isIntersecting.hero ? "animate-[slideInRight_1s_ease-in-out]" : "opacity-0"}`}>
              <div className="relative h-[500px] w-full">
                <div className="absolute top-0 right-0 w-4/5 h-4/5 bg-[#c6cbd2] rounded-lg transform rotate-3"></div>
                <div className="absolute bottom-0 left-0 w-4/5 h-4/5 border-4 border-white rounded-lg transform -rotate-3"></div>
                <div className="absolute inset-0 m-auto w-4/5 h-4/5 overflow-hidden rounded-lg shadow-2xl">
                  <img
                    src="/AAR1.jpg"
                    alt="Business incorporation"
                    className="object-cover h-[400px] w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-white">
            {[
              { number: "500+", text: "Businesses Incorporated" },
              { number: "$10M+", text: "Tax Savings Generated" },
              { number: "25+", text: "Years of Experience" },
              { number: "100%", text: "Client Satisfaction" },
            ].map((stat, index) => (
              <div
                key={index}
                className={`text-center p-4 border border-white/20 rounded-lg backdrop-blur-sm bg-white/5 ${
                  isIntersecting.hero ? "animate-[fadeIn_1s_ease-in-out]" : "opacity-0"
                }`}
                style={{ animationDelay: `${0.2 + index * 0.2}s` }}
              >
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm md:text-base text-[#c6cbd2]">{stat.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits of Incorporation Section */}
      <section ref={sectionRefs.benefits} className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#244464] mb-4">Benefits of Incorporation</h2>
            <p className="text-lg text-[#737474] max-w-2xl mx-auto">
              Incorporating your business provides numerous advantages that can protect your assets and optimize your
              tax situation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                  isIntersecting.benefits ? "animate-[fadeIn_1s_ease-in-out]" : "opacity-0"
                }`}
                style={{
                  animationDelay: `${index * 0.2}s`,
                  animationFillMode: "forwards",
                }}
              >
                <div className="bg-[#f0f4f8] p-4 rounded-full inline-flex mb-6">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-[#244464] mb-3">{benefit.title}</h3>
                <p className="text-[#737474]">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Incorporation Process Section */}
      <section ref={sectionRefs.process} className="bg-[#f0f4f8] py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#244464] mb-4">Our Incorporation Process</h2>
            <p className="text-lg text-[#737474] max-w-2xl mx-auto">
              We guide you through every step of the incorporation process, ensuring compliance and optimal tax
              positioning.
            </p>
          </div>

          <div className="relative">
            {/* Process timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-[#c6cbd2] transform md:translate-x-[-50%] hidden md:block"></div>

            <div className="space-y-12 relative">
              {processSteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""} ${
                    isIntersecting.process ? "animate-[fadeIn_1s_ease-in-out]" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="md:w-1/2 p-6">
                    <div className={`bg-white rounded-lg p-8 shadow-lg ${index % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}>
                      <div className="text-4xl font-bold text-[#c6cbd2] mb-4">{step.number}</div>
                      <h3 className="text-xl font-bold text-[#244464] mb-3">{step.title}</h3>
                      <p className="text-[#737474]">{step.description}</p>
                    </div>
                  </div>

                  <div className="md:w-1/2 flex justify-center">
                    <div className="bg-[#244464] text-white h-12 w-12 rounded-full flex items-center justify-center font-bold text-lg z-10">
                      {index + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tax Advantages Section */}
      <section ref={sectionRefs.advantages} className="bg-[#244464] py-20 text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`${isIntersecting.advantages ? "animate-[slideInLeft_1s_ease-in-out]" : "opacity-0"}`}>
              <h2 className="text-4xl font-bold mb-6">Tax Advantages of Incorporation</h2>
              <p className="text-lg text-[#c6cbd2] mb-8">
                Incorporating your business opens up numerous tax planning opportunities that can significantly reduce
                your tax burden.
              </p>

              <div className="space-y-4">
                {taxAdvantages.map((advantage, index) => (
                  <div key={index} className="flex items-start" style={{ animationDelay: `${0.5 + index * 0.1}s` }}>
                    <CheckCircle className="h-6 w-6 text-[#c6cbd2] mr-3 flex-shrink-0" />
                    <p>{advantage}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <button className="bg-white text-[#244464] px-8 py-3 rounded-lg font-semibold hover:bg-[#c6cbd2] transition-all duration-300 flex items-center">
                  Schedule a Tax Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>

            <div
              className={`relative ${isIntersecting.advantages ? "animate-[slideInRight_1s_ease-in-out]" : "opacity-0"}`}
            >
              <div className="relative h-[500px] w-full">
                <div className="absolute top-0 left-0 w-3/4 h-3/4 bg-[#3c5473] rounded-lg"></div>
                <div className="absolute bottom-0 right-0 w-3/4 h-3/4 border-4 border-[#c6cbd2] rounded-lg"></div>
                <div className="absolute inset-0 m-auto w-3/4 h-3/4 overflow-hidden rounded-lg shadow-2xl">
                  <img
                    src="/AAR2.jpg"
                    alt="Tax advantages"
                    className="object-cover h-[400px] w-full"
                  />
                </div>

                <div className="absolute -bottom-6 -left-6 bg-white text-[#244464] rounded-lg p-6 shadow-xl max-w-[250px]">
                  <div className="text-3xl font-bold mb-2">30%</div>
                  <p className="text-sm">Average tax savings for our incorporated clients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Entity Types Section */}
      <section ref={sectionRefs.entities} className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#244464] mb-4">Types of Business Entities</h2>
            <p className="text-lg text-[#737474] max-w-2xl mx-auto">
              Choosing the right business structure is crucial for tax optimization and liability protection.
            </p>
          </div>

          <div className={`${isIntersecting.entities ? "animate-[fadeIn_1s_ease-in-out]" : "opacity-0"}`}>
            {/* Entity Type Tabs */}
            <div className="flex flex-wrap justify-center mb-8 gap-2">
              {Object.entries(entityTypes).map(([key, entity]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === key ? "bg-[#244464] text-white" : "bg-[#f0f4f8] text-[#244464] hover:bg-[#c6cbd2]"
                  }`}
                >
                  {entity.title}
                </button>
              ))}
            </div>

            {/* Entity Type Content */}
            <div className="bg-[#f0f4f8] rounded-lg p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-[#244464] mb-4">
                    {entityTypes[activeTab as keyof typeof entityTypes].title}
                  </h3>
                  <p className="text-[#737474] mb-6">
                    {entityTypes[activeTab as keyof typeof entityTypes].description}
                  </p>

                  <div className="space-y-3">
                    {entityTypes[activeTab as keyof typeof entityTypes].features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-[#3c5473] mr-3 flex-shrink-0" />
                        <p className="text-[#5e646c]">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative h-[300px] rounded-lg overflow-hidden shadow-lg">
                  <img
                    src="/AAr3.jpg"
                    alt={entityTypes[activeTab as keyof typeof entityTypes].title}
                    
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div
            className={`mt-16 ${isIntersecting.entities ? "animate-[slideInUp_1s_ease-in-out]" : "opacity-0"}`}
            style={{ animationDelay: "0.3s" }}
          >
            <h3 className="text-2xl font-bold text-[#244464] mb-6 text-center">Frequently Asked Questions</h3>

            <div className="max-w-3xl mx-auto divide-y divide-gray-200 rounded-lg bg-white shadow-lg">
              {faqs.map((faq, index) => (
                <div key={index} className="overflow-hidden">
                  <button
                    className="flex w-full items-center justify-between p-6 text-left focus:outline-none"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <h4 className="text-lg font-medium text-[#244464]">{faq.question}</h4>
                    <ChevronRight
                      className={`h-5 w-5 text-[#546c84] transition-transform ${openFaq === index ? "rotate-90" : ""}`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="p-6 pt-0 text-[#737474]">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Form Section */}
      <section ref={sectionRefs.enquiry} className="bg-[#f0f4f8] py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`${isIntersecting.enquiry ? "animate-[slideInLeft_1s_ease-in-out]" : "opacity-0"}`}>
              <h2 className="text-4xl font-bold text-[#244464] mb-6">Start Your Incorporation Today</h2>
              <p className="text-lg text-[#737474] mb-8">
                Ready to take the next step? Contact us for a personalized consultation about incorporating your
                business.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <ClipboardCheck className="h-6 w-6 text-[#3c5473] mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-[#546c84]">Comprehensive Service</h3>
                    <p className="text-[#737474]">
                      We handle all paperwork, filings, and registrations for a seamless process.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-[#3c5473] mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-[#546c84]">Free Consultation</h3>
                    <p className="text-[#737474]">
                      Call us at (555) 123-4567 for a no-obligation discussion about your needs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-[#3c5473] mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-[#546c84]">Email Support</h3>
                    <p className="text-[#737474]">Send questions to info@taxincorporation.com for prompt responses.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${isIntersecting.enquiry ? "animate-[slideInRight_1s_ease-in-out]" : "opacity-0"}`}>
              <div className="bg-white rounded-lg p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-[#244464] mb-6">Send Us a Message</h3>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-[#5e646c] mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-300 p-3 focus:border-[#546c84] focus:outline-none focus:ring-1 focus:ring-[#546c84]"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-[#5e646c] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-300 p-3 focus:border-[#546c84] focus:outline-none focus:ring-1 focus:ring-[#546c84]"
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-[#5e646c] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-300 p-3 focus:border-[#546c84] focus:outline-none focus:ring-1 focus:ring-[#546c84]"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="businessType" className="block text-sm font-medium text-[#5e646c] mb-2">
                      Business Type
                    </label>
                    <select
                      id="businessType"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-300 p-3 focus:border-[#546c84] focus:outline-none focus:ring-1 focus:ring-[#546c84]"
                      required
                    >
                      <option value="">Select Business Type</option>
                      <option value="startup">Startup</option>
                      <option value="smallBusiness">Small Business</option>
                      <option value="consulting">Consulting</option>
                      <option value="ecommerce">E-Commerce</option>
                      <option value="realEstate">Real Estate</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-[#5e646c] mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full rounded-lg border border-gray-300 p-3 focus:border-[#546c84] focus:outline-none focus:ring-1 focus:ring-[#546c84]"
                      placeholder="Tell us about your incorporation needs"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#244464] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#3c5473] transition-all duration-300 flex items-center justify-center"
                  >
                    <span>Submit Inquiry</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#244464] text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-xl font-bold mb-4">Tax Incorporation</h3>
              <p className="text-[#c6cbd2]">
                Professional incorporation and tax planning services for businesses of all sizes.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-[#c6cbd2] hover:text-white transition-colors">
                    Business Formation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#c6cbd2] hover:text-white transition-colors">
                    Tax Planning
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#c6cbd2] hover:text-white transition-colors">
                    Compliance Services
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#c6cbd2] hover:text-white transition-colors">
                    Business Consulting
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-[#c6cbd2] hover:text-white transition-colors">
                    Tax Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#c6cbd2] hover:text-white transition-colors">
                    Business Entity Comparison
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#c6cbd2] hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#c6cbd2] hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span className="text-[#c6cbd2]">(555) 123-4567</span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span className="text-[#c6cbd2]">info@taxincorporation.com</span>
                </li>
                <li className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  <span className="text-[#c6cbd2]">Mon-Fri: 9am-5pm</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/20 text-center text-[#c6cbd2]">
            <p>&copy; {new Date().getFullYear()} Tax Incorporation Services. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

