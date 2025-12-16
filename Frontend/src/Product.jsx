import React from "react";

const Product = ({
  ImageUrl,
  name,
  price,
  description = "",
  categoryLabel,
  isSponsored = true,
  rating,
  ratingCount,
  boughtText,
  className = "",
  onClick,
}) => {
  const truncate = (text, max) =>
    text && text.length > max ? text.slice(0, max) + "..." : text;

  return (
    <article
      className={`w-full max-w-xs bg-white border border-gray-200 rounded-md p-4 shadow-sm hover:shadow-md transition cursor-pointer ${className}`}
      onClick={onClick}
    >
      {/* ✅ BIGGER IMAGE */}
      <div className="w-full h-72 flex items-center justify-center bg-white">
        {ImageUrl ? (
          <img
            src={ImageUrl[0]}
            alt={name}
            className="object-contain h-full"
          />
        ) : (
          <div className="text-gray-300 text-sm">No Image</div>
        )}
      </div>

      {/* Sponsored */}
      {isSponsored && (
        <p className="mt-3 text-xs text-gray-500 flex items-center gap-1">
          Sponsored <span className="text-[10px] text-gray-400">ℹ️</span>
        </p>
      )}

      {/* ✅ TITLE (Amazon-like length) */}
      <h3 className="mt-1 text-sm font-medium text-gray-900 leading-snug">
        {truncate(name, 85)}
      </h3>

      {/* ✅ LONGER DESCRIPTION */}
      {description && (
        <p className="mt-1 text-xs text-gray-600 leading-snug">
          {truncate(description, 120)}
        </p>
      )}

      {/* Veg Icon + Category */}
      <div className="mt-2 flex items-center gap-2">
        <span className="w-4 h-4 border border-green-700 flex items-center justify-center">
          <span className="w-2 h-2 bg-green-700" />
        </span>

        {categoryLabel && (
          <span className="text-xs bg-gray-100 px-2 py-[2px] rounded border border-gray-200">
            {categoryLabel}
          </span>
        )}
      </div>

      {/* Rating */}
      {(rating || ratingCount) && (
        <div className="mt-1 flex items-center gap-1 text-xs">
          <span className="text-orange-500 font-semibold">{rating} ★</span>
          <span className="text-blue-600">({ratingCount})</span>
        </div>
      )}

      {/* Bought Text */}
      {boughtText && (
        <p className="text-xs text-gray-500 mt-1">{boughtText}</p>
      )}

      {/* Price */}
      {price && (
        <p className="mt-2 text-lg font-semibold text-gray-900">
          ₹{price}
        </p>
      )}
    </article>
  );
};

export default Product;
