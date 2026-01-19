"use client";

import { 
  PayPalScriptProvider, 
  PayPalHostedFieldsProvider, 
  PayPalHostedField, 
  usePayPalHostedFields 
} from "@paypal/react-paypal-js";
import { useState } from "react";
import Link from "next/link"; // Added this for the back button

const products = [
  { id: 1, name: "1-hour infrastructure call", price: "300.00" },
  { id: 2, name: "30-minute existing site edit", price: "39.00" },
  { id: 3, name: "30-minute existing site edit (Extended)", price: "50.00" },
  { id: 4, name: "Basic site demo", price: "100.00" },
];

export default function StartProject() {
  const [selectedProduct, setSelectedProduct] = useState(products[3]);

  return (
    <PayPalScriptProvider 
      options={{ 
        clientId: "Ac-E3F1bdEvc1PvqMnTTFNd4FA7wTJuu90e-1lZEWC6vHp5zVLAefgiZnfbZomi0LHFaQy_1T90hwTI5", 
        components: "hosted-fields,buttons",
        currency: "USD",
        intent: "CAPTURE"
      }}
    >
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
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedProduct.id === item.id 
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
          <div className="bg-neutral-900 p-8 rounded-xl border border-gray-800">
            <h3 className="text-xl font-bold mb-6">2. Payment Details</h3>
            
            <PayPalHostedFieldsProvider
              createOrder={((data: any, actions: any) => {
                return actions.order.create({
                  intent: "CAPTURE",
                  purchase_units: [{
                    description: selectedProduct.name,
                    amount: {
                      currency_code: "USD",
                      value: selectedProduct.price,
                    },
                  }],
                });
              }) as any}
            >
              <CreditCardForm product={selectedProduct} />
            </PayPalHostedFieldsProvider>
          </div>
        </div>

        {/* --- ADDED THIS BACK: The Back Button --- */}
        <div className="mt-12 text-center">
          <Link href="/" className="text-gray-500 hover:text-white underline transition-colors">
            &larr; Back to Home
          </Link>
        </div>

      </main>
    </PayPalScriptProvider>
  );
}

function CreditCardForm({ product }: { product: any }) {
  const { cardFields } = usePayPalHostedFields();
  const [paying, setPaying] = useState(false);

  const submitHandler = () => {
    if (!cardFields) return; // Keeps the build safe!

    setPaying(true);
    
    cardFields.submit()
      .then(() => {
        alert(`Payment successful for ${product.name}!`);
        setPaying(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Payment failed. Check console.");
        setPaying(false);
      });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Card Number</label>
        <PayPalHostedField
          id="card-number"
          hostedFieldType="number"
          options={{ selector: "#card-number", placeholder: "0000 0000 0000 0000" }}
          className="h-12 w-full bg-black border border-gray-700 rounded px-4 py-3 text-white focus:border-purple-500 transition-colors"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Expiration</label>
          <PayPalHostedField
            id="expiration-date"
            hostedFieldType="expirationDate"
            options={{ selector: "#expiration-date", placeholder: "MM/YY" }}
            className="h-12 w-full bg-black border border-gray-700 rounded px-4 py-3 text-white focus:border-purple-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">CVV</label>
          <PayPalHostedField
            id="cvv"
            hostedFieldType="cvv"
            options={{ selector: "#cvv", placeholder: "123" }}
            className="h-12 w-full bg-black border border-gray-700 rounded px-4 py-3 text-white focus:border-purple-500 transition-colors"
          />
        </div>
      </div>

      <button 
        onClick={submitHandler}
        disabled={paying}
        className="w-full bg-white text-black font-bold py-4 rounded hover:bg-gray-200 transition-colors disabled:opacity-50"
      >
        {paying ? "PROCESSING..." : `PAY $${product.price}`}
      </button>

      <p className="text-xs text-center text-gray-500 mt-4">
        Payments processed securely by PayPal. No card data is stored on our servers.
      </p>
    </div>
  );
}
