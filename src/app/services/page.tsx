import {
  Shield,
  Calculator,
  FileText,
  Users,
  Clock,
  Coins,
} from "lucide-react";
import Hero from "../components/layout/Hero";

export default function Services() {
  const services = [
    {
      icon: <Calculator className="h-12 w-12 text-blue-600" />,
      title: "Tax Planning",
      description:
        "Strategic tax planning to minimize your tax liability and maximize savings.",
    },
    {
      icon: <FileText className="h-12 w-12 text-blue-600" />,
      title: "Tax Return Preparation",
      description:
        "Professional preparation of individual and business tax returns.",
    },
    {
      icon: <Shield className="h-12 w-12 text-blue-600" />,
      title: "Tax Audit Support",
      description: "Expert representation and support during tax audits.",
    },
    {
      icon: <Users className="h-12 w-12 text-blue-600" />,
      title: "Business Consulting",
      description:
        "Comprehensive tax consulting services for businesses of all sizes.",
    },
    {
      icon: <Clock className="h-12 w-12 text-blue-600" />,
      title: "Year-Round Support",
      description: "Ongoing tax support and advice throughout the year.",
    },
    {
      icon: <Coins className="h-12 w-12 text-blue-600" />,
      title: "Financial Planning",
      description:
        "Integrated financial planning with tax optimization strategies.",
    },
  ];

  return (
    <main>
      <Hero
        imageUrl="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
        pageName="Our Services"
        pageDesc="Comprehensive tax services tailored to meet your personal and business needs."
      />
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="mb-4">{service.icon}</div>
                <h2 className="text-2xl font-semibold mb-4">{service.title}</h2>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
