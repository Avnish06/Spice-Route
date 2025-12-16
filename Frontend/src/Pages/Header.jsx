import React, { useState } from "react";
import { useDetails } from "../context/UserContext.jsx";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import ClipLoader from "react-spinners/ClipLoader";

export default function Header() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useDetails();
  const [search, setSearch] = useState("");
  const isSeller = user?.role === "seller";
  const [sellerMenuOpen, setSellerMenuOpen] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.get(`${serverUrl}/api/v1/auth/logout`, {
        withCredentials: true,
      });
      toast.success("Logout Successful");
      setUser("");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/api/v1/product/getpublishedproduct`
      );

      const allProducts = response.data;

      const filtered = allProducts.filter((product) =>
        product.category?.toLowerCase().includes(search.toLowerCase())
      );

      navigate("/Search", { state: { products: filtered } });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching products.");
    }
  };

  const navClass = ({ isActive }) =>
    `px-2 py-1 rounded-md transition ${
      isActive
        ? "bg-gray-400 text-black"
        : "text-white hover:underline"
    }`;

  return (
    <>
      {/* MAIN HEADER */}
      <header className="w-full bg-[#0F1111] text-white sticky top-0 z-50 shadow-lg">
        {/* TOP SECTION */}
        <div className="flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="text-2xl cursor-pointer flex items-center space-x-2 font-bold"
          >
            <img
              src="/Logo.png"
              alt="Logo"
              className="w-12 h-12 object-contain"
            />
            <span className="text-xl font-semibold">Kakash Agro</span>
          </div>

          {/* Search */}
          <div className="hidden md:flex flex-1 mx-6">
            <div className="flex w-full bg-white rounded-md overflow-hidden">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-4 py-2 text-black focus:outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoComplete="off"
              />
              <button
                className="px-4 bg-[#febd69] text-black font-semibold"
                onClick={handleSearch}
              >
                🔍
              </button>
            </div>
          </div>

          {/* ACCOUNT */}
          <div className="flex items-center space-x-6 text-sm font-medium">
            <div
              onClick={() => navigate("/profile")}
              className="cursor-pointer hover:underline"
            >
              <p className="text-xs">
                Hello, {user ? user.username : "Sign in"}
              </p>
              <p className="font-semibold">Account & Lists</p>
            </div>

            <div
              onClick={() => navigate("/purchasedproduct")}
              className="cursor-pointer hover:underline"
            >
              <p className="text-xs">Returns</p>
              <p className="font-semibold">& Orders</p>
            </div>

            {user && (
              <button
                onClick={() => navigate("/cart")}
                className="relative cursor-pointer"
              >
                🛒
              </button>
            )}
          </div>
        </div>

        {/* BOTTOM NAV */}
        <div className="bg-[#232f3e] w-full py-2 px-6 text-sm font-medium flex items-center">
          <div className="flex flex-1 justify-center space-x-6 overflow-x-auto whitespace-nowrap">
            <NavLink to="/" end className={navClass}>
              Home
            </NavLink>

            <NavLink to="/mappedproduct" className={navClass}>
              Products
            </NavLink>

            <NavLink to="/about" className={navClass}>
              About
            </NavLink>

            <NavLink to="/contact" className={navClass}>
              Contact
            </NavLink>

            {isSeller && (
              <button
                onClick={() => setSellerMenuOpen(true)}
                className="hover:underline font-semibold text-green-300"
              >
                Seller Dashboard
              </button>
            )}
          </div>

          {/* AUTH BUTTON */}
          <div className="flex items-center">
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded-lg ml-4"
              >
                {loading ? <ClipLoader color="white" size={18} /> : "Logout"}
              </button>
            ) : (
              <button
                onClick={() => navigate("/signup")}
                className="bg-green-600 hover:bg-green-700 text-white py-1 px-4 rounded-lg ml-4"
              >
                Signup
              </button>
            )}
          </div>
        </div>
      </header>

      {/* SELLER SIDE MENU */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-[999] transform transition-transform duration-300 ${
          sellerMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setSellerMenuOpen(false)}
          className="absolute top-4 right-4 text-xl"
        >
          ✕
        </button>

        <div className="px-6 py-5 bg-[#232f3e] text-white text-lg font-semibold">
          Hello, Seller
        </div>

        <div className="flex flex-col mt-6 px-6 space-y-4">
          <button
            className="w-full py-3 bg-gray-100 hover:bg-gray-200 rounded-lg"
            onClick={() => {
              navigate("/createproduct");
              setSellerMenuOpen(false);
            }}
          >
            ➕ Create Product
          </button>

          <button
            className="w-full py-3 bg-gray-100 hover:bg-gray-200 rounded-lg"
            onClick={() => {
              navigate("/products");
              setSellerMenuOpen(false);
            }}
          >
            ✏️ Edit Products
          </button>

          <button
            className="w-full py-3 bg-gray-100 hover:bg-gray-200 rounded-lg"
            onClick={() => {
              navigate("/sellerstats");
              setSellerMenuOpen(false);
            }}
          >
            📊 Seller Stats
          </button>
        </div>
      </div>
    </>
  );
}
