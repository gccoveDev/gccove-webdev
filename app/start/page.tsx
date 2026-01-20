"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const products = [
  { id: 1, name: "1-hour infrastructure call", price: "300.00", buttonId: "RAYDS3KHX2EW4" },
  { id: 2, name: "30-minute existing site edit", price: "39.00", buttonId: "VLUX8JERRKK5Q" },
  { id: 3, name: "30-minute existing site edit (Extended)", price: "50.00", buttonId: "KRV3GMP4DJQME" },
  { id: 4, name: "Basic site demo", price: "100.00", buttonId: "NS3GQ5EGLXYFW" },
  { id: 5, name: "Full Stack site demo", price: "200.00", buttonId: "WCTF3WV5DQQK4" },
];

// Helper to load the PayPal script manually since we need specific query params
const usePayPalScript = (clientId: string) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (document.getElementById("paypal-sdk")) {
      setLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&components=hosted-buttons&enable-funding=venmo&currency=USD`;
    script.id = "paypal-sdk";
    script.onload = () => setLoaded(true);
    document.body.appendChild(script);
  }, [clientId]);

  return loaded;
};

export default function StartProject() {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const scriptLoaded = usePayPalScript("BAAh3avgfllx9oLmqObkvScdhvg9OSHpgMnxzVMxBb-WsywKqhsb4DShxfPOwM5ZGoWknSbdgMS9FT12Sk");

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

        {/* Right Side: The Hosted Button */}
        <div className="bg-neutral-900 p-8 rounded-xl border border-gray-800 min-h-[400px] flex flex-col justify-center">
          <h3 className="text-xl font-bold mb-6">2. Payment Details</h3>

          <div className="bg-black p-6 rounded-lg border border-gray-800 flex flex-col items-center justify-center min-h-[200px]">
            {scriptLoaded ? (
              <div className="w-full max-w-sm">
                <PayPalHostedButton buttonId={selectedProduct.buttonId} />
              </div>
            ) : (
              <div className="text-gray-500 animate-pulse">Loading securely...</div>
            )}
          </div>

          <p className="text-xs text-center text-gray-500 mt-6">
            You will be redirected to PayPal to complete your secure transaction.
          </p>
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

function PayPalHostedButton({ buttonId }: { buttonId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !(window as any).paypal) return;

    // Clear previous button if ID changed
    containerRef.current.innerHTML = "";

    // Render new button
    try {
      (window as any).paypal.HostedButtons({
        hostedButtonId: buttonId,
      }).render(containerRef.current);
    } catch (e) {
      console.error("PayPal Render Error:", e);
    }

  }, [buttonId]);

  return <div ref={containerRef} className="z-10 relative" />;
}

