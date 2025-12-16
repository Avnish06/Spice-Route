import React from "react";
import { useDetails } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, setUser } = useDetails();
  const navigate = useNavigate()

  return (
    <div
      className="min-h-screen flex items-center justify-center 
      bg-gradient-to-b from-white via-green-200 to-white"
    >
      <div className="relative bg-white rounded-2xl shadow-lg p-8 w-96 text-center pt-24">
        {/* Profile Image */}
        {user ? (
          <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
            <div
              className="w-36 h-36 rounded-full bg-green-100 border-4 border-green-600 shadow-lg overflow-hidden cursor-pointer hover:scale-110 transition-transform flex items-center justify-center text-3xl font-bold text-green-700"
              title="Upload Profile Image"
            >
              {user.user?.photoUrl ? (
                <img
                  src={user.user.photoUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  {user?.username?.split(" ")[0].slice(0, 1)}
                  {user?.username?.split(" ")[1]?.slice(0, 1)}
                </>
              )}
            </div>
          </div>
        ) : (
          ""
        )}

        {/* User Details */}
        <h2 className="text-2xl font-semibold mt-8">{user?.username}</h2>
        <p className="text-gray-500 text-sm">{user?.email}</p>

        {/* Edit Profile Button */}
        <button className="mt-8 bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3 rounded-full shadow hover:opacity-90 transition text-base font-medium"
           onClick={()=> navigate("/editprofile")}>
          Edit Profile
        </button>
      </div>
    </div>
  );
}
