import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6">
        {/* Company */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4 border-b-2 border-pink-500 inline-block">
            Company
          </h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Our Services</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Affiliate Program</a></li>
          </ul>
        </div>

        {/* Get Help */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4 border-b-2 border-pink-500 inline-block">
            Get Help
          </h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">FAQ</a></li>
            <li><a href="#" className="hover:text-white">Shipping</a></li>
            <li><a href="#" className="hover:text-white">Returns</a></li>
            <li><a href="#" className="hover:text-white">Order Status</a></li>
            <li><a href="#" className="hover:text-white">Payment Options</a></li>
          </ul>
        </div>

        {/* Online Shop */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4 border-b-2 border-pink-500 inline-block">
            Online Shop
          </h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">Watch</a></li>
            <li><a href="#" className="hover:text-white">Bag</a></li>
            <li><a href="#" className="hover:text-white">Shoes</a></li>
            <li><a href="#" className="hover:text-white">Dress</a></li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4 border-b-2 border-pink-500 inline-block">
            Follow Us
          </h3>
          <div className="flex space-x-4 mt-2">
            <a href="https://www.facebook.com/kakashagro/" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-500 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-500 transition">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com/santtushti/" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-500 transition">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/company/kakash-agro/" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-500 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
