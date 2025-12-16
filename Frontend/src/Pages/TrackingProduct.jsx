import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";

import { MapPin, Clock, CheckCircle2 } from "lucide-react";

function TrackingProduct() {
  const [order, setOrder] = useState([]);
  const { orderid } = useParams();

  useEffect(() => {
    async function getTrackingDetails() {
      try {
        const trackingDetails = await axios.post(
          serverUrl + "/api/v1/tracking/trackingfedex",
          { orderid }
        );

        const data = trackingDetails.data;

        // Ensure it ALWAYS becomes an array
        setOrder(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.log(error);
        setOrder([]); // prevent further crashes
      }
    }
    getTrackingDetails();
  }, [orderid]);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white border shadow-lg rounded-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Shipment Tracking Timeline
      </h1>

      {order.length === 0 ? (
        <p className="text-gray-500 text-center">Loading tracking details…</p>
      ) : (
        <div className="space-y-8">
          {order.map((event, index) => (
            <div key={index} className="relative pl-8 border-l-2 border-blue-500 pb-6">
              <div className="absolute -left-3 top-1 w-6 h-6 bg-blue-500 text-white flex items-center justify-center rounded-full shadow-md">
                <CheckCircle2 size={16} />
              </div>

              <div className="flex items-center space-x-2">
                <MapPin className="text-blue-600" size={20} />
                <p className="text-xl font-semibold text-gray-900">
                  {event.city || "Unknown City"}
                </p>
              </div>

              <p className="mt-1 text-blue-600 font-medium text-lg">
                {event.status || "Status Unavailable"}
              </p>

              <div className="flex items-center space-x-2 mt-2 text-gray-500">
                <Clock size={16} />
                <p className="text-sm">
                  {event.date || "No Date"} {event.time ? "• " + event.time : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TrackingProduct;
