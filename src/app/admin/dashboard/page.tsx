"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("enquiries");
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editFormData, setEditFormData] = useState<any>({});

  useEffect(() => {
    if (!session?.user) {
      router.push("/auth/signin");
      return;
    }

    fetchData(activeTab);
  }, [activeTab, session]);

  const fetchData = async (tab: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/${tab}`);
      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setEditFormData(item);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/admin/${activeTab}/${editingItem._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editFormData),
      });

      if (response.ok) {
        toast.success('Item updated successfully');
        setIsEditModalOpen(false);
        fetchData(activeTab);
      } else {
        const error = await response.json();
        toast.error(error.message);
      }
    } catch (error) {
      console.error('Error updating item:', error);
      toast.error('Failed to update item');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch(`/api/admin/${activeTab}/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast.success('Item deleted successfully');
          fetchData(activeTab);
        } else {
          const error = await response.json();
          toast.error(error.message);
        }
      } catch (error) {
        console.error('Error deleting item:', error);
        toast.error('Failed to delete item');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const getDisplayValue = (value: any, key: string) => {
    if (value === null || value === undefined) return '';
    
    if (typeof value === 'object') {
      if (value instanceof Date) {
        return new Date(value).toLocaleString();
      }
      return JSON.stringify(value);
    }
    
    return String(value);
  };

  const getEditableFields = (item: any) => {
    const nonEditableFields = ['_id', 'createdAt', 'updatedAt'];
    return Object.keys(item).filter(key => !nonEditableFields.includes(key));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="mb-6">
          <nav className="flex space-x-4">
            {["enquiries", "subscribers", "contacts", "users"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md ${
                  activeTab === tab
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    {data[0] && Object.keys(data[0])
                      .filter(key => key !== '__v')
                      .map((key) => (
                        <th
                          key={key}
                          className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {key}
                        </th>
                      ))}
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.map((item: any, index: number) => (
                    <tr key={index}>
                      {Object.entries(item)
                        .filter(([key]) => key !== '__v')
                        .map(([key, value]) => (
                          <td
                            key={key}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                          >
                            {getDisplayValue(value, key)}
                          </td>
                        ))}
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                        <Button
                          onClick={() => handleEdit(item)}
                          className="bg-blue-500 hover:bg-blue-600"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
                              handleDelete(item._id);
                            }
                          }}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {activeTab.slice(0, -1)}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {editingItem && getEditableFields(editingItem).map((key) => (
              <div key={key} className="space-y-2">
                <label className="text-sm font-medium capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <Input
                  name={key}
                  value={editFormData[key] || ''}
                  onChange={handleInputChange}
                  type={key.includes('date') ? 'datetime-local' : 'text'}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end space-x-2">
            <Button onClick={() => setIsEditModalOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleUpdate}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}