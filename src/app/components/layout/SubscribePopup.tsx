"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function SubscribePopup({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg relative">
        <h2 className="text-2xl font-bold my-4">Subscribe to TaxPro</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 block w-full rounded-md border border-gray-500 shadow-lg py-2 px-2 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Subscribe
          </button>
        </form>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-600 font-bold rounded absolute top-2 right-2"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
