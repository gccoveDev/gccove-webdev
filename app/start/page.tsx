"use client";

import {
  PayPalScriptProvider,
  PayPalButtons,
} from "@paypal/react-paypal-js";
import { useState, useEffect } from "react";
import Link from "next/link";

const products = [
  { id: 1, name: "1-hour infrastructure call", price: "300.00" },
  { id: 2, name: "30-minute existing site edit", price: "39.00" },
  { id: 3, name: "30-minute existing site edit (Extended)", price: "50.00" },
  { id: 4, name: "Basic site demo", price: "100.00" },
];

export default function StartProject() {
  const [selectedProduct, setSelectedProduct] = useState(products[3]);
  const [paypalState, setPaypalState] = useState({ clientToken: null, clientId: null });

  // FETCH TOKEN AND ID TOGETHER
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/paypal", { method: "POST" });
        const data = await res.json();
        console.log("PayPal Data Loaded:", data);
        // Save both to state
        setPaypalState({
          clientToken: data.client_token,
          clientId: data.client_id
        });
      } catch (err) {
        console.error("Failed to load PayPal", err);
      }
    })();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-8 md:p-24 font-sans">
      <h1 className="text-4xl md:text-6xl font-black mb-12 text-center">
        SECURE <span className="text-purple-500">CHECKOUT</span>
      </h1>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Side: Product Selection */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold mb-4">1. Select Service</h3>
          {products.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedProduct(item)}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedProduct.id === item.id
                ? "border-purple-500 bg-neutral-900"
                : "border-gray-800 hover:border-gray-600"
                }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold">{item.name}</span>
                <span className="font-mono text-purple-400">${item.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: The Custom Form */}
        <div className="bg-neutral-900 p-8 rounded-xl border border-gray-800 min-h-[400px]">
          <h3 className="text-xl font-bold mb-6">2. Payment Details</h3>
          {/* ONLY RENDER IF WE HAVE BOTH TOKEN AND ID */}
          {paypalState.clientToken && paypalState.clientId ? (
            <PayPalScriptProvider
              options={{
                clientId: paypalState.clientId,
                dataClientToken: paypalState.clientToken,
                components: "buttons",
                currency: "USD",
                intent: "CAPTURE"
              }}
            >
              <div className="space-y-4">
                <PayPalButtons
                  style={{ layout: "vertical", color: "gold", shape: "rect", label: "pay" }}
                  createOrder={(data, actions: any) => {
                    return actions.order?.create({
                      intent: "CAPTURE",
                      purchase_units: [{
                        description: selectedProduct.name,
                        amount: {
                          currency_code: "USD",
                          value: selectedProduct.price,
                        },
                      }],
                    });
                  }}
                  onApprove={(data, actions: any) => {
                    return actions.order?.capture().then((details: any) => {
                      const name = details?.payer?.name?.given_name;
                      alert(`Transaction completed by ${name}`);
                    });
                  }}
                  onError={(err) => {
                    console.error("PayPal Error:", err);
                    alert("Payment failed");
                  }}
                />
              </div>
            </PayPalScriptProvider>
          ) : (
            // LOADING STATE (Prevents the build error!)
            <div className="flex items-center justify-center h-64 text-gray-500 animate-pulse">
              Loading Secure Checkout...
            </div>
          )}
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link href="/" className="text-gray-500 hover:text-white underline transition-colors">
          &larr; Back to Home
        </Link>
      </div>
    </main>
  );
}

