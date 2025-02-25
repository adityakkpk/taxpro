import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText, Users, Mail } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Professional Tax Enquiry Services
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get expert assistance with your tax-related queries. Our team is here to help you navigate through your tax concerns efficiently.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <FileText className="w-12 h-12 text-blue-600 mb-4" />
            <h2 className="text-2xl font-semibold mb-4">Easy Submission</h2>
            <p className="text-gray-600">
              Submit your tax enquiries easily through our user-friendly form with file upload capability.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <Users className="w-12 h-12 text-green-600 mb-4" />
            <h2 className="text-2xl font-semibold mb-4">Expert Support</h2>
            <p className="text-gray-600">
              Get assistance from our team of qualified tax professionals and experts.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <Mail className="w-12 h-12 text-purple-600 mb-4" />
            <h2 className="text-2xl font-semibold mb-4">Quick Response</h2>
            <p className="text-gray-600">
              Receive prompt responses and updates about your enquiry via email.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link href="/enquiry">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg">
              Submit Your Enquiry
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}