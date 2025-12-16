import React, { useState } from "react";
import { useDetails } from "../context/UserContext";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const { user, setUser } = useDetails();

  const [username, setUsername] = useState(user?.username || "");
  const [photoUrl, setPhotoUrl] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

   

  const handleEdit = async () => {
    if (!username) {
      toast.error("Username cannot be empty");
      return;
    }
    const formData = new FormData();
    formData.append("username", username);
    if (photoUrl) formData.append("photo", photoUrl); // ✅ must match Multer field name
 
    setLoading(true);

    try {
      const result = await axios.post(
        `${serverUrl}/api/v1/user/editprofile`,
        formData,
        {withCredentials: true} );
     
      setUser(result.data);
      toast.success("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while updating your profile");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-white via-green-200 to-white">
      <div cfirstlassName="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md relative">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">
          Edit Profile
        </h2>

        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <div className="w-28 h-28 rounded-full border-4 border-green-300 overflow-hidden shadow-md">
            <img
              src={
                photoUrl
                  ? URL.createObjectURL(photoUrl)
                  : user?.photoUrl ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          {/* Avatar Upload */}
          <div>
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select Avatar
            </label>
            <input
              id="avatar"
              type="file"
              accept="image/*"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
              onChange={(e) => setPhotoUrl(e.target.files[0])}
            />
          </div>

          {/* Username */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              id="name"
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              readOnly
              type="email"
              value={user?.email || ""}
              className="w-full border border-gray-300 bg-gray-100 rounded-lg px-3 py-2 text-gray-500 focus:outline-none"
            />
          </div>

          {/* Save Button */}
          <div className="mt-6">
            <button
              type="button"
              className="w-full bg-green-200 hover:bg-green-300 text-green-900 font-semibold py-3 rounded-xl shadow-md transition"
              onClick={handleEdit}
              disabled={loading}
            >
              {loading ? <ClipLoader size={30} color="white" /> : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
