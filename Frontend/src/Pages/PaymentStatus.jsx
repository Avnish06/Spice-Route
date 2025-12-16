import React, { useEffect, useRef } from "react";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function PurchaseSuccess({
  message = "Product purchased successfully!",
  subtitle = "Thank you for your order. Your purchase is confirmed.",
  onContinue = () => window.location.replace("/"),
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const DPR = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = window.innerWidth * DPR;
      canvas.height = window.innerHeight * DPR;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    resize();

    const colors = ["#16a34a", "#f97316", "#06b6d4", "#ef4444", "#f59e0b"];

    const pieces = [];
    const count = 80;

    for (let i = 0; i < count; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        size: (Math.random() * 8 + 6) * DPR,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 0.3,
        speed: Math.random() * 2 + 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
      });
    }

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pieces.forEach((p) => {
        p.x += Math.sin(p.tilt) * 2 + 1;
        p.y += p.speed;
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();

        if (p.y > canvas.height) {
          p.y = Math.random() * -canvas.height;
        }
      });

      raf = requestAnimationFrame(draw);
    };

    draw();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-green-50 to-white overflow-hidden">

      {/* Confetti */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10" />

      {/* Card */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="z-20 max-w-2xl w-full mx-4 p-8 bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl border border-green-100"
      >
        <div className="flex flex-col items-center text-center">

          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
            className="bg-green-600/10 border border-green-300 rounded-full p-5"
          >
            <CheckCircle size={60} className="text-green-600" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-3xl font-bold text-gray-800"
          >
            {message}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-gray-600"
          >
            {subtitle}
          </motion.p>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onContinue}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-md"
            >
              Continue Shopping
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => window.print()}
              className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl shadow-sm"
            >
              Print Receipt
            </motion.button>
          </div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full mt-8 border border-dashed border-green-200 rounded-xl p-5 bg-white"
          >
            <h2 className="text-sm text-gray-700 font-medium">Order Summary</h2>

            <div className="mt-3 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                  🛍️
                </div>
                <div>
                  <p className="text-gray-800 font-semibold">Sample Product</p>
                  <p className="text-xs text-gray-500">Qty: 1</p>
                </div>
              </div>

              <p className="font-semibold text-gray-800">₹499</p>
            </div>
          </motion.div>

          {/* Order ID */}
          <p className="mt-4 text-xs text-gray-500">
            Order ID:{" "}
            <span className="font-semibold">
              {Math.random().toString(36).substring(2, 9).toUpperCase()}
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
