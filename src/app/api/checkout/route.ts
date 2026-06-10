import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { amount, currency, email } = await req.json();

    // 1. Environment Key Validation Check
    if (!process.env.KINGSPAY_SECRET_KEY || !process.env.KINGSPAY_MERCHANT_CODE) {
      console.error("CRITICAL CONFIG ERROR: KingsPay environment keys are missing in .env.local");
      return NextResponse.json(
        { error: "Server Configuration Error: Payment credentials are not configured locally." }, 
        { status: 500 }
      );
    }

    if (!amount) {
      return NextResponse.json({ error: "Amount is required" }, { status: 400 });
    }

    // KingsPay G&S processes amounts in their lowest unit (multiplied by 100)
    const unitAmount = Math.round(parseFloat(amount) * 100);

    // Force Espees configurations
    const kingsPayCurrency = "ESP";
    const paymentType = "espees";

    // Official Payload Structure matching KingsPay G&S specs
    const kingsPayPayload = {
      amount: unitAmount,
      currency: kingsPayCurrency,               
      payment_type: paymentType,         
      description: "LoveWorld Music Week - Partnership Seed",
      email: email || "partner@loveworld.com",
      merchant_callback_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/give/success`,
      merchant_webhook_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/webhook/kingspay`,
      metadata: {
        merchant_code: process.env.KINGSPAY_MERCHANT_CODE,
        wallet_address: process.env.KINGSPAY_WALLET_ADDRESS || "",
      }
    };

    // KingsPay Gateway Communication
    const response = await fetch("https://api.kingspay-gs.com/api/payment/initialize", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.KINGSPAY_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(kingsPayPayload),
    });

    // Read raw response text safely to avoid unexpected JSON parsing exceptions
    const responseText = await response.text();
    
    if (!response.ok) {
      console.error(`KingsPay rejected request with Status ${response.status}:`, responseText);
      return NextResponse.json(
        { error: `Payment gateway authorization failure (Status ${response.status}). Check your credentials.` },
        { status: response.status }
      );
    }

    const data = JSON.parse(responseText);

    if (data.payment_url || (data.data && data.data.payment_url)) {
      const checkoutUrl = data.payment_url || data.data.payment_url;
      return NextResponse.json({ checkoutUrl });
    } else {
      throw new Error(data.message || "Failed to initialize gateway session");
    }
  } catch (error: any) {
    console.error("KingsPay Integration Error:", error);
    return NextResponse.json({ error: error.message || "Internal server pipeline failure" }, { status: 500 });
  }
}