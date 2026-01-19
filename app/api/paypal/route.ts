import { NextResponse } from "next/server";

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;

export async function POST() {
  try {
    // 1. Get an Access Token from PayPal
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64");
    const response = await fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    const data = await response.json();

    // 2. Use that Access Token to generate a Client Token
    const response2 = await fetch("https://api-m.sandbox.paypal.com/v1/identity/generate-token", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${data.access_token}`,
        "Content-Type": "application/json",
      },
    });
    const data2 = await response2.json();
    
    // 3. Send the token back to your frontend
    return NextResponse.json({ client_token: data2.client_token });
  } catch (error) {
    console.error("PayPal API Error:", error);
    return NextResponse.json({ error: "Failed to generate token" }, { status: 500 });
  }
}