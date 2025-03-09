"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/app/components/ui/button";
import { Input } from "@/src/app/components/ui/input";
import toast from "react-hot-toast";

export default function CreatePageForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    parentMenu: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Generate the href based on parent menu and slugified title
      const slugifiedTitle = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      const href = `/services/${formData.parentMenu}/${slugifiedTitle}`;

      const menuItem = {
        title: formData.title,
        href,
        parentMenu: formData.parentMenu,
      };

      const response = await fetch("/api/admin/menus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(menuItem),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create page");
      }

      toast.success("Page created successfully");
      router.push("/admin/dashboard");
      router.refresh(); // Refresh the page to update the menu
    } catch (error: any) {
      console.error("Error creating page:", error);
      toast.error(error.message || "Failed to create page");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Create New Page</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="Enter page title"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Parent Menu
            </label>
            <select
              name="parentMenu"
              value={formData.parentMenu}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
              required
            >
              <option value="">Select Parent Menu</option>
              <option value="Incorporation">Incorporation</option>
              <option value="Registration">Registration</option>
              <option value="Goods And Service Tax Matters">
                Goods And Service Tax Matters
              </option>
              <option value="Income Tax Matters">Income Tax Matters</option>
              <option value="Ministry Of Corporate Affairs (Mca)">
                Ministry Of Corporate Affairs
              </option>
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit">Create Page</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
