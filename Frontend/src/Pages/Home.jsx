import { useNavigate } from "react-router-dom";
import React from "react";
import FeatureProduct from "./FeatureProduct";

export default function Home() {
  const navigate = useNavigate();

  const images = ["/image1.png", "/image2.png"];
  const hooks = [
    "Groceries at Your Doorstep",
    "Stress-Free Shopping Experience",
    "Stock Your Kitchen, Not Your Time - Fast & Fresh Delivery",
  ];

  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[oklch(98%_0.016_73.684)] font-sans p-0 m-0">

      {/* ---------------- HERO SLIDER (NO GAP WITH HEADER) ---------------- */}
      <section className="relative w-full h-[450px] overflow-hidden">

        {/* SLIDES */}
        <div
          className="absolute top-0 left-0 flex h-full transition-transform duration-[1200ms] ease-in-out"
          style={{
            width: `${images.length * 100}%`,
            transform: `translateX(-${index * (100 / images.length)}%)`,
          }}
        >
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="Hero"
              className="w-full h-full object-cover flex-shrink-0"
              style={{ width: `${100 / images.length}%` }}
            />
          ))}
        </div>

        {/* OVERLAY TEXT */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
          <h1
            key={index} // triggers animation on every slide change
            className="text-4xl md:text-6xl font-extrabold drop-shadow-xl
                       bg-clip-text text-transparent
                       bg-gradient-to-r from-gray-600 to-sky-500
                       animate-fadeIn"
          >
            {hooks[index]}
          </h1>

          <button
            className="mt-6 bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-8 rounded-lg 
                       transition-transform hover:scale-105 shadow-lg animate-fadeIn delay-200"
            onClick={() => navigate("/mappedproduct")}
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* ---------------- FEATURE PRODUCTS ---------------- */}
      <FeatureProduct />

      {/* ---------------- FEATURE IMAGE ---------------- */}
      <section className="w-full flex justify-center items-center py-10">
        <img
          src="/features.png"
          alt="Features"
          className="w-[90%] max-w-5xl object-contain"
        />
      </section>
    </div>
  );
}
