"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import {
  ArrowRight,
  CheckCircle,
  ChevronRight,
  Clock,
  DollarSign,
  FileText,
  Link,
  Mail,
  MessageSquare,
  Phone,
  Shield,
  User,
} from "lucide-react"

// All code in a single file as requested
const colors = {
  darkBlue: "#1e3a8a",
  mediumBlue: "#3b82f6",
  lightGrey: "#d1d5db",
};

export default function IncomeTaxLanding() {
  // State for carousel
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isIntersecting, setIsIntersecting] = useState<{[key: string]: boolean}>({})
  const heroRef = useRef<HTMLDivElement>(null);
  const heroOpacity = 1; // Define heroOpacity
  const heroScale = 1; // Define heroScale
  const sectionRefs = {
    services: useRef<HTMLDivElement>(null),
    whyUs: useRef<HTMLDivElement>(null),
    experts: useRef<HTMLDivElement>(null),
    testimonials: useRef<HTMLDivElement>(null),
    faq: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  }

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  // // Carousel data
  // const carouselItems = [
  //   {
  //     title: "Expert Tax Solutions",
  //     subtitle: "For Individuals & Businesses",
  //     description: "Professional tax preparation and planning services to minimize your tax liability and maximize your returns.",
  //     image: "/placeholder.svg?height=600&width=800",
  //   },
  //   {
  //     title: "Personalized Tax Planning",
  //     subtitle: "Tailored to Your Needs",
  //     description: "Strategic tax planning that considers your unique financial situation and goals.",
  //     image: "/placeholder.svg?height=600&width=800",
  //   },
  //   {
  //     title: "Stay Compliant",
  //     subtitle: "Avoid Penalties & Audits",
  //     description: "Our experts ensure you meet all tax obligations and deadlines while minimizing audit risks.",
  //     image: "/placeholder.svg?height=600&width=800",
  //   },
  // ]

  // Services data
  const services = [
    {
      title: "Personal Tax Returns",
      description: "Comprehensive tax preparation for individuals with personalized strategies to maximize deductions.",
      icon: <User className="h-10 w-10 text-blue-deep" />,
    },
    {
      title: "Business Taxation",
      description: "Expert tax services for businesses of all sizes, from startups to established corporations.",
      icon: <DollarSign className="h-10 w-10 text-blue-deep" />,
    },
    {
      title: "Tax Planning",
      description: "Strategic planning to minimize tax liability and prepare for future financial goals.",
      icon: <FileText className="h-10 w-10 text-blue-deep" />,
    },
    {
      title: "Audit Support",
      description: "Professional representation and support during tax audits to ensure the best outcome.",
      icon: <Shield className="h-10 w-10 text-blue-deep" />,
    },
  ]

  // Experts data
  const experts = [
    {
      name: "Jane Smith",
      title: "Senior Tax Advisor",
      image: "/placeholder.svg?height=300&width=300",
      experience: "15+ years",
    },
    {
      name: "John Davis",
      title: "Tax Planning Specialist",
      image: "/placeholder.svg?height=300&width=300",
      experience: "12+ years",
    },
    {
      name: "Sarah Johnson",
      title: "Business Tax Expert",
      image: "/placeholder.svg?height=300&width=300",
      experience: "10+ years",
    },
  ]

  // Testimonials data
  const testimonials = [
    {
      name: "Michael Brown",
      company: "Small Business Owner",
      text: "The tax planning strategies they implemented saved my business thousands of dollars. Highly recommended!",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Lisa Anderson",
      company: "Freelance Consultant",
      text: "As a freelancer, my taxes were always complicated. They simplified everything and found deductions I never knew existed.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Robert Wilson",
      company: "Corporate Executive",
      text: "Their expertise in corporate taxation is unmatched. They've been handling our company's taxes for 5 years with excellent results.",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  // FAQ data
  const faqs = [
    {
      question: "When should I start preparing for tax season?",
      answer: "It's best to start preparing for tax season year-round by maintaining organized records. However, actively gathering documents should begin in January when tax forms start arriving. For businesses, quarterly planning is recommended."
    },
    {
      question: "What documents do I need for my tax return?",
      answer: "You'll need income documents (W-2s, 1099s), expense records, investment statements, property tax records, mortgage interest statements, charitable donation receipts, and previous year's tax returns. For businesses, include profit/loss statements and business expense records."
    },
    {
      question: "How can I maximize my tax deductions?",
      answer: "To maximize deductions, keep detailed records of all potential deductible expenses, contribute to retirement accounts, consider bunching itemized deductions, track business expenses meticulously, and consult with our tax professionals for personalized strategies."
    },
    {
      question: "What's the difference between a tax credit and a tax deduction?",
      answer: "A tax deduction reduces your taxable income, while a tax credit directly reduces your tax liability dollar-for-dollar. For example, a $1,000 deduction might save you $220 if you're in the 22% tax bracket, while a $1,000 credit saves you $1,000 regardless of your bracket."
    },
    {
      question: "How long should I keep my tax records?",
      answer: "Generally, keep tax records for at least 3 years from the date you filed, as this is the standard IRS audit period. However, for certain situations like unreported income or fraud cases, the IRS can look back further, so 7 years is often recommended for complete protection."
    },
  ]

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would send this data to your backend
    console.log('Form submitted:', formData)
    alert('Thank you for your inquiry! We will contact you soon.')
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  // // Carousel auto-rotation
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentSlide(current => (current + 1) % carouselItems.length)
  //   }, 5000)
  //   return () => clearInterval(interval)
  // }, [carouselItems.length])

  // Intersection observer for animations
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    const observerOptions = { threshold: 0.1 }
    
    Object.entries(sectionRefs).forEach(([key, ref]) => {
      if (ref.current) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsIntersecting(prev => ({ ...prev, [key]: true }))
              observer.unobserve(entry.target)
            }
          },
          observerOptions
        )
        
        observer.observe(ref.current)
        observers.push(observer)
      }
    })
    
    return () => {
      observers.forEach(observer => observer.disconnect())
    }
  }, [])

  return (
    <div className="font-sans">
      {/* Hero Section with Carousel */}
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
              className="text-4xl sm:text-5xl md:text-6xl text-white font-extrabold tracking-tight mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Expert Tax  <span className="text-blue-400">Solutions</span>
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
              {/* <Link
                href="#consultation"
                className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:bg-blue-700 inline-flex items-center text-lg"
              >
                Get Expert GST Assistance
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link> */}
            </motion.div>
          </motion.div>
        </section>
      {/* Services Section */}
      <section 
        ref={sectionRefs.services}
        className="bg-white py-20"
      >
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-[#244464]">Our Tax Solutions</h2>
            <p className="mx-auto max-w-2xl text-lg text-[#737474]">Comprehensive tax services tailored to your specific needs</p>
          </div>
          
          <div className={`grid gap-8 md:grid-cols-2 lg:grid-cols-4 ${
            isIntersecting.services ? 'animate-[fadeIn_1s_ease-in-out]' : 'opacity-0'
          }`}>
            {services.map((service, index) => (
              <div 
                key={index} 
                className="transform rounded-lg bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                style={{ 
                  animationDelay: `${index * 0.2}s`,
                  animationFillMode: 'forwards' 
                }}
              >
                <div className="mb-4 rounded-full bg-[#c6cbd2] p-3 inline-flex">{service.icon}</div>
                <h3 className="mb-3 text-xl font-bold text-[#244464]">{service.title}</h3>
                <p className="text-[#737474]">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section 
        ref={sectionRefs.whyUs}
        className="bg-[#c6cbd2] py-20"
      >
        <div className="container mx-auto px-6">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className={`${isIntersecting.whyUs ? 'animate-[slideInLeft_1s_ease-in-out]' : 'opacity-0'}`}>
              <h2 className="mb-6 text-4xl font-bold text-[#244464]">Why Choose Our Tax Services</h2>
              <p className="mb-8 text-lg text-[#737474]">With decades of experience and a commitment to excellence, we provide tax solutions that give you peace of mind and financial confidence.</p>
              
              <div className="space-y-4">
                {[
                  "Expert tax professionals with advanced certifications",
                  "Personalized approach tailored to your financial situation",
                  "Maximum deductions and credits to minimize tax liability",
                  "Year-round support and tax planning",
                  "Secure, confidential handling of all your information"
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="mr-3 h-6 w-6 flex-shrink-0 text-[#3c5473]" />
                    <p className="text-[#5e646c]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`relative h-[400px] rounded-lg shadow-xl overflow-hidden ${
              isIntersecting.whyUs ? 'animate-[slideInRight_1s_ease-in-out]' : 'opacity-0'
            }`}>
              <Image 
                src="/placeholder.svg?height=800&width=600" 
                alt="Tax professionals at work" 
                fill
                className="object-cover"
              />
              </div>
              </div>
              </div>
      </section>

      {/* Tax Experts Section */}
      <section 
        ref={sectionRefs.experts}
        className="bg-white py-20"
      >
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-[#244464]">Our Tax Experts</h2>
            <p className="mx-auto max-w-2xl text-lg text-[#737474]">Meet our team of certified tax professionals ready to help you</p>
          </div>
          
          <div className={`grid gap-8 md:grid-cols-3 ${
            isIntersecting.experts ? 'animate-[fadeIn_1s_ease-in-out]' : 'opacity-0'
          }`}>
            {experts.map((expert, index) => (
              <div 
                key={index} 
                className="overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
                style={{ 
                  animationDelay: `${index * 0.2}s`,
                  animationFillMode: 'forwards' 
                }}
              >
                <div className="relative h-80 w-full">
                  <Image 
                    src={expert.image || "/placeholder.svg"} 
                    alt={expert.name} 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-1 text-xl font-bold text-[#244464]">{expert.name}</h3>
                  <p className="mb-3 text-[#546c84]">{expert.title}</p>
                  <div className="flex items-center text-[#737474]">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>{expert.experience} experience</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section 
        ref={sectionRefs.testimonials}
        className="bg-[#244464] py-20 text-white"
      >
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold">Client Testimonials</h2>
            <p className="mx-auto max-w-2xl text-lg text-[#c6cbd2]">What our clients say about our tax services</p>
          </div>
          
          <div className={`grid gap-8 md:grid-cols-3 ${
            isIntersecting.testimonials ? 'animate-[fadeIn_1s_ease-in-out]' : 'opacity-0'
          }`}>
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="rounded-lg bg-[#516484] p-8 shadow-lg transition-all duration-300 hover:shadow-xl"
                style={{ 
                  animationDelay: `${index * 0.2}s`,
                  animationFillMode: 'forwards' 
                }}
              >
                <div className="mb-6 text-xl italic">"{testimonial.text}"</div>
                <div className="flex items-center">
                  <div className="relative mr-4 h-14 w-14 overflow-hidden rounded-full">
                    <Image 
                      src={testimonial.image || "/placeholder.svg"} 
                      alt={testimonial.name} 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-[#c6cbd2]">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section 
        ref={sectionRefs.faq}
        className="bg-[#c6cbd2] py-20"
      >
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-[#244464]">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-[#737474]">Find answers to common tax questions</p>
          </div>
          
          <div className={`mx-auto max-w-3xl divide-y divide-gray-300 rounded-lg bg-white shadow-lg ${
            isIntersecting.faq ? 'animate-[fadeIn_1s_ease-in-out]' : 'opacity-0'
          }`}>
            {faqs.map((faq, index) => (
              <div key={index} className="overflow-hidden">
                <button
                  className="flex w-full items-center justify-between p-6 text-left focus:outline-none"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <h3 className="text-lg font-medium text-[#244464]">{faq.question}</h3>
                  <ChevronRight 
                    className={`h-5 w-5 text-[#546c84] transition-transform ${
                      openFaq === index ? 'rotate-90' : ''
                    }`} 
                  />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="p-6 pt-0 text-[#737474]">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact/Enquiry Form Section */}
      <section 
        ref={sectionRefs.contact}
        className="bg-white py-20"
      >
        <div className="container mx-auto px-6">
          <div className="grid gap-12 md:grid-cols-2">
            <div className={`${isIntersecting.contact ? 'animate-[slideInLeft_1s_ease-in-out]' : 'opacity-0'}`}>
              <h2 className="mb-6 text-4xl font-bold text-[#244464]">Get In Touch</h2>
              <p className="mb-8 text-lg text-[#737474]">Have questions about our tax services? Contact us today for a consultation.</p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Phone className="mr-4 h-6 w-6 text-[#3c5473]" />
                  <div>
                    <h3 className="text-lg font-semibold text-[#546c84]">Phone</h3>
                    <p className="text-[#737474]">(555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="mr-4 h-6 w-6 text-[#3c5473]" />
                  <div>
                    <h3 className="text-lg font-semibold text-[#546c84]">Email</h3>
                    <p className="text-[#737474]">info@taxmatters.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MessageSquare className="mr-4 h-6 w-6 text-[#3c5473]" />
                  <div>
                    <h3 className="text-lg font-semibold text-[#546c84]">Office Hours</h3>
                    <p className="text-[#737474]">Monday - Friday: 9am - 5pm</p>
                    <p className="text-[#737474]">Saturday: 10am - 2pm (by appointment)</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`${isIntersecting.contact ? 'animate-[slideInRight_1s_ease-in-out]' : 'opacity-0'}`}>
              <div className="rounded-lg bg-white p-8 shadow-lg">
                <h3 className="mb-6 text-2xl font-bold text-[#244464]">Send Us a Message</h3>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#5e646c]">
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
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#5e646c]">
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
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium text-[#5e646c]">
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
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-[#5e646c]">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full rounded-lg border border-gray-300 p-3 focus:border-[#546c84] focus:outline-none focus:ring-1 focus:ring-[#546c84]"
                      placeholder="How can we help you?"
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-lg bg-[#244464] px-6 py-3 text-white transition-all hover:bg-[#3c5473]"
                  >
                    <span>Send Message</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

     
              </div>
  )
}

