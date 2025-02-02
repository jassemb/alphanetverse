"use client"
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { FiUser, FiMail, FiPhone, FiFileText, FiCamera } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  profilePicture: string;
}

interface Errors {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  password?: string;
}

const EditProfile: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    profilePicture: "",
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState<boolean>(true); // To handle loading state
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found. User is not authenticated.");
        router.push("/"); // Redirect to login or homepage if token is not found
        return;
      }

      try {
        const response = await fetch("https://api.alphanetverse.com/api/v1/me/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Add the token to the Authorization header
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("User Info:", data);
          setFormData({
            first_name: data.first_name || "",
            last_name: data.last_name || "",
            email: data.email || "",
            phone: data.phone || "",
            password: "", // Password should not be fetched, it's just for the form input
            profilePicture: data.profilePicture || "",
          });
          setIsLoading(false); // Once data is fetched, stop loading
        } else {
          const errorData = await response.json();
          console.error("Error fetching user info:", errorData);
        }
      } catch (error) {
        console.error("An error occurred while fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [router]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.last_name.trim()) newErrors.last_name = "Name is required";
    if (!formData.first_name.trim()) newErrors.first_name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      // Add form submission logic here
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Show loading indicator until data is fetched
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Edit Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
            {!formData.profilePicture && (
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-black bg-blue-500 font-bold text-lg border-4 border-blue-500"
                >
                  {formData.first_name.charAt(0)}
                  {formData.last_name.charAt(0)}
                </div>
              )}
              <label
                htmlFor="profile-picture"
                className="absolute bottom-0 right-0 bg-slategray p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors"
              >
                <FiCamera className="text-white w-5 h-5" />
                <input
                  type="file"
                  id="profile-picture"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <FiUser className="mr-2" /> First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.first_name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your first name"
                />
                {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>}
              </div>
              <div className="w-1/2">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <FiUser className="mr-2" /> Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.last_name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your last name"
                />
                {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>}
              </div>
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <FiMail className="mr-2" /> Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <FiPhone className="mr-2" /> Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your phone number"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <FiFileText className="mr-2" /> Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your password"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3 mt-8">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2 bg-cornflowerblue text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
