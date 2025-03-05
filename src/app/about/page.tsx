import Image from 'next/image';
import { Award, Users, Globe, Briefcase } from 'lucide-react';
import Hero from '../components/layout/Hero';

export default function About() {
  const stats = [
    { icon: <Users className="h-6 w-6" />, value: '10,000+', label: 'Clients Served' },
    { icon: <Award className="h-6 w-6" />, value: '15+', label: 'Years Experience' },
    { icon: <Globe className="h-6 w-6" />, value: '50+', label: 'Countries' },
    { icon: <Briefcase className="h-6 w-6" />, value: '98%', label: 'Success Rate' },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <Hero imageUrl='https://images.unsplash.com/photo-1454165804606-c3d57bc86b40' pageName='About TaxPro' pageDesc='Your trusted partner in professional tax services and financial planning' />
      
      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              At TaxPro, we are committed to providing exceptional tax services and financial guidance
              to individuals and businesses. Our mission is to help our clients navigate the complex
              world of taxation while maximizing their financial potential.
            </p>
            <p className="text-gray-600">
              With over 15 years of experience in the industry, we combine expertise with personalized
              service to ensure the best outcomes for our clients.
            </p>
          </div>
          <div className="relative h-[300px]">
            <Image
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
              alt="Team meeting"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div> 

      {/* Stats Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center text-blue-600 mb-2">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Leadership Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: 'John Smith',
              role: 'CEO & Founder',
              image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
            },
            {
              name: 'Sarah Johnson',
              role: 'Tax Director',
              image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
            },
            {
              name: 'Michael Chen',
              role: 'Financial Advisor',
              image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
            },
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}