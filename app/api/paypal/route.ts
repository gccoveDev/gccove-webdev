import { NextResponse } from "next/server";

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;

if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
  console.error("PayPal API Error: Missing Environment Variables");
}

export async function POST() {
  try {
    // 1. Get Access Token
    // NOTE: Switched to LIVE URL (api.paypal.com) based on user request.
    // If you need Sandbox, switch back to "https://api.sandbox.paypal.com"
    const PAYPAL_API_URL = "https://api.paypal.com";

    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64");
    const response = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: { Authorization: `Basic ${auth}` },
    });
    const data = await response.json();

    if (!data.access_token) {
      console.error("PayPal Auth Failed:", data);
      // Return the actual error from PayPal so we can see it in the browser console
      return NextResponse.json({ error: "Auth failed", details: data }, { status: 500 });
    }

    // 2. Get Client Token
    const response2 = await fetch(`${PAYPAL_API_URL}/v1/identity/generate-token`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${data.access_token}`,
        "Content-Type": "application/json",
      },
    });
    const data2 = await response2.json();

    // 3. RETURN BOTH THE TOKEN AND THE ID
    return NextResponse.json({
      client_token: data2.client_token,
      client_id: PAYPAL_CLIENT_ID // <--- Sending this ensures they match!
    });
  } catch (error) {
    console.error("PayPal API Error:", error);
    return NextResponse.json({ error: "Failed to generate token" }, { status: 500 });
  }
}
