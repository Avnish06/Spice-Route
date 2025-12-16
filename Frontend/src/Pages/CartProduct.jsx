import { Trash2 } from "lucide-react";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CartItem({ product, quantity, id }) {
  const navigate = useNavigate();

  const deleteProduct = async () => {
    try {
      await axios.delete(
        `${serverUrl}/api/v1/cart/deletecartproduct/${id}`,
        { withCredentials: true }
      );
      toast.success("Product deleted successfully");
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="w-full bg-white shadow-md rounded-xl p-4 border flex justify-between mb-5">
      <div className="flex gap-6 w-[75%]">
        <img
          src={product?.ImageUrl[0]}
          alt={product?.name}
          className="w-32 h-28 object-cover rounded-lg border"
        />

        <div className="flex flex-col w-full">
          <h3 className="text-xl font-semibold text-green-700">
            {product?.name}
          </h3>
          <p className="text-sm text-gray-500">{product?.description}</p>

          <div className="flex gap-10 mt-2">
            <p>Qty: {quantity}</p>
            <p className="text-xl font-bold text-red-600">
              ₹{product?.price * quantity}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          className="bg-green-600 text-white px-6 py-2 rounded-lg"
          onClick={() =>
            navigate("/address", {
              state: {
                product,
                quantity,
                cartId: id,
              },
            })
          }
        >
          Checkout
        </button>

        <Trash2
          size={20}
          className="cursor-pointer text-gray-400 hover:text-red-500"
          onClick={deleteProduct}
        />
      </div>
    </div>
  );
}
