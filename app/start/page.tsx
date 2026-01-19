"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const products = [
  { id: 1, name: "1-hour infrastructure call", price: "300.00" },
  { id: 2, name: "30-minute existing site edit", price: "39.00" },
  { id: 3, name: "30-minute existing site edit (Extended)", price: "50.00" },
  { id: 4, name: "Basic site demo", price: "100.00" },
];

export default function StartProject() {
  return (
    <PayPalScriptProvider options={{ clientId: "test" }}>
      <main className="min-h-screen bg-black text-white p-8 md:p-24 font-sans">
        
        <h1 className="text-4xl md:text-6xl font-black mb-12 text-center">
          SELECT A <span className="text-purple-500">SERVICE</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {products.map((item) => (
            <div key={item.id} className="border border-gray-800 bg-neutral-900 p-6 rounded-lg flex flex-col justify-between hover:border-purple-500 transition-colors">
              <div>
                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                <p className="text-3xl font-mono text-gray-400 mb-8">${item.price}</p>
              </div>
              
              <div className="w-full relative z-0">
                <PayPalButtons
                  style={{ layout: "horizontal", color: "white", label: "pay" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      intent: "CAPTURE", // <--- ADDED THIS LINE TO FIX THE ERROR
                      purchase_units: [
                        {
                          description: item.name,
                          amount: {
                            currency_code: "USD",
                            value: item.price,
                          },
                        },
                      ],
                    });
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="/" className="text-gray-500 hover:text-white underline">
            &larr; Back to Home
          </a>
        </div>
      </main>
    </PayPalScriptProvider>
  );
}
