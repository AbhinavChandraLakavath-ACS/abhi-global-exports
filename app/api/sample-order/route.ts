import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      name, company, country, address, city, zipCode, email, phone, 
      product, productId, sampleType, paymentMethod,
      // Internal calculation values passed from widget
      baseCost, deliveryCharge, profitMarginAmount, totalChargedUSD,
      formattedTotal
    } = body;

    const exporterEmail = process.env.EXPORTER_EMAIL || 'abhinavchandra.lakavath@gmail.com';
    const resendApiKey = process.env.RESEND_API_KEY;

    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    const orderId = `AGE-SMP-${Math.floor(100000 + Math.random() * 900000)}`;

    // 1. Email Payload for Exporter (Owner - INCLUDES INTERNAL PROFIT & COST BREAKDOWN)
    const exporterEmailContent = {
      from: 'ABHI GLOBAL EXPORTS <samples@abhiglobalexports.com>',
      to: [exporterEmail],
      subject: `NEW 1KG SAMPLE ORDER [${orderId}]: ${product} - ${company} (${country})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <div style="background-color: #B71C1C; color: #ffffff; padding: 24px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px; letter-spacing: 0.5px;">NEW QUALITY SAMPLE ORDER</h1>
            <p style="margin: 6px 0 0 0; font-size: 13px; color: #FFC107; font-weight: bold;">ABHI GLOBAL EXPORTS PORTAL • ORDER #${orderId}</p>
          </div>

          <div style="padding: 24px; color: #111827; font-size: 14px; line-height: 1.6;">
            
            <div style="background-color: #fef2f2; border: 1px solid #fecaca; padding: 12px 16px; border-radius: 8px; margin-bottom: 20px; color: #991b1b; font-weight: bold; font-size: 13px;">
               Strictly 1 kg Sample Purchase for Quality Evaluation
            </div>

            <h3 style="color: #B71C1C; margin-top: 0; border-bottom: 2px solid #fee2e2; padding-bottom: 6px;">Customer & Delivery Details:</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr><td style="padding: 6px; font-weight: bold; width: 35%;">Buyer Name:</td><td style="padding: 6px;">${name}</td></tr>
              <tr><td style="padding: 6px; font-weight: bold;">Company Name:</td><td style="padding: 6px;">${company}</td></tr>
              <tr><td style="padding: 6px; font-weight: bold;">Email:</td><td style="padding: 6px;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding: 6px; font-weight: bold;">Phone / WhatsApp:</td><td style="padding: 6px;">${phone || 'N/A'}</td></tr>
              <tr><td style="padding: 6px; font-weight: bold;">Shipping Address:</td><td style="padding: 6px;">${address}, ${city}, ${zipCode}, <strong>${country}</strong></td></tr>
            </table>

            <h3 style="color: #B71C1C; margin-top: 20px; border-bottom: 2px solid #fee2e2; padding-bottom: 6px;">Sample Item Specifications:</h3>
            <table style="width: 100%; border-collapse: collapse; background-color: #f9fafb; border-radius: 6px; overflow: hidden; margin-bottom: 20px;">
              <tr><td style="padding: 8px 12px; font-weight: bold; width: 35%;">Product Variety:</td><td style="padding: 8px 12px; color: #B71C1C; font-weight: bold;">${product}</td></tr>
              <tr><td style="padding: 8px 12px; font-weight: bold;">Quantity:</td><td style="padding: 8px 12px; font-weight: bold;">1.0 KG (Fixed Max Sample Size)</td></tr>
              <tr><td style="padding: 8px 12px; font-weight: bold;">Sample Format:</td><td style="padding: 8px 12px;">${sampleType}</td></tr>
              <tr><td style="padding: 8px 12px; font-weight: bold;">Payment Method:</td><td style="padding: 8px 12px; text-transform: uppercase; font-weight: bold; color: #047857;">${paymentMethod}</td></tr>
              <tr><td style="padding: 8px 12px; font-weight: bold;">Order Time:</td><td style="padding: 8px 12px;">${timestamp} IST</td></tr>
            </table>

            <!-- INTERNAL FINANCIAL BREAKDOWN FOR OWNER ONLY -->
            <div style="background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 16px; margin-top: 20px;">
              <h3 style="color: #047857; margin-top: 0; margin-bottom: 10px; font-size: 15px;">EXPORTER INTERNAL FINANCIAL BREAKDOWN (OWNER ONLY)</h3>
              <p style="font-size: 12px; color: #065f46; margin-bottom: 12px; font-style: italic;">*Note: These internal figures are hidden from the customer.</p>
              
              <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                <tr style="border-bottom: 1px solid #d1fae5;"><td style="padding: 6px 0;">Base Product Cost (1kg):</td><td style="padding: 6px 0; font-weight: bold; text-align: right;">$${Number(baseCost).toFixed(2)}</td></tr>
                <tr style="border-bottom: 1px solid #d1fae5;"><td style="padding: 6px 0;">Express Courier Freight Fee:</td><td style="padding: 6px 0; font-weight: bold; text-align: right;">$${Number(deliveryCharge).toFixed(2)}</td></tr>
                <tr style="border-bottom: 1px solid #d1fae5;"><td style="padding: 6px 0;">Subtotal (Base + Courier):</td><td style="padding: 6px 0; font-weight: bold; text-align: right;">$${(Number(baseCost) + Number(deliveryCharge)).toFixed(2)}</td></tr>
                <tr style="border-bottom: 1px solid #d1fae5; color: #047857;"><td style="padding: 6px 0; font-weight: bold;">+ 30% Owner Profit Margin:</td><td style="padding: 6px 0; font-weight: bold; text-align: right;">+$${Number(profitMarginAmount).toFixed(2)}</td></tr>
                <tr style="font-size: 15px; color: #047857;"><td style="padding: 8px 0; font-weight: bold;">Total Charged to Customer:</td><td style="padding: 8px 0; font-weight: bold; text-align: right;">$${Number(totalChargedUSD).toFixed(2)} (${formattedTotal})</td></tr>
              </table>
              <div style="margin-top: 10px; padding: 8px; background-color: #d1fae5; border-radius: 6px; text-align: center; font-weight: bold; color: #065f46; font-size: 13px;">
                 Net Profit Earned on Sample: +$${Number(profitMarginAmount).toFixed(2)} USD
              </div>
            </div>

          </div>
          <div style="background-color: #111827; color: #9ca3af; padding: 14px; text-align: center; font-size: 11px;">
            ABHI GLOBAL EXPORTS • Guntur Export Processing Hub, India
          </div>
        </div>
      `
    };

    // 2. Email Payload for Buyer (CUSTOMER RECEIPT - NO MARGIN/DELIVERY BREAKDOWN SHOWN)
    const buyerEmailContent = {
      from: 'ABHI GLOBAL EXPORTS <samples@abhiglobalexports.com>',
      to: [email],
      subject: `Sample Kit Order Confirmation [#${orderId}]: ${product} 1kg Kit - ABHI GLOBAL EXPORTS`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <div style="background-color: #B71C1C; color: #ffffff; padding: 24px; text-align: center;">
            <h1 style="margin: 0; font-size: 20px;">ABHI GLOBAL EXPORTS</h1>
            <p style="margin: 5px 0 0 0; font-size: 13px; color: #FFC107;">Official 1kg Quality Sample Kit Order Confirmation</p>
          </div>
          
          <div style="padding: 24px; color: #111827; font-size: 14px; line-height: 1.6;">
            <p>Dear <strong>${name}</strong> (${company}),</p>
            <p>Thank you for placing your product quality evaluation sample order with ABHI GLOBAL EXPORTS. Your 1kg sample package is being prepared at our Guntur processing lab for dispatch.</p>
            
            <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; padding: 18px; border-radius: 8px; margin: 18px 0;">
              <h4 style="margin: 0 0 12px 0; color: #B71C1C; font-size: 15px;">Order Summary [#${orderId}]:</h4>
              <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                <tr><td style="padding: 4px 0; font-weight: bold; width: 40%;">Product Sample:</td><td style="padding: 4px 0;">${product}</td></tr>
                <tr><td style="padding: 4px 0; font-weight: bold;">Sample Quantity:</td><td style="padding: 4px 0;">1.0 KG (Standard Quality Kit)</td></tr>
                <tr><td style="padding: 4px 0; font-weight: bold;">Format:</td><td style="padding: 4px 0;">${sampleType}</td></tr>
                <tr><td style="padding: 4px 0; font-weight: bold;">Delivery Address:</td><td style="padding: 4px 0;">${address}, ${city}, ${zipCode}, ${country}</td></tr>
                <tr><td style="padding: 4px 0; font-weight: bold;">Includes:</td><td style="padding: 4px 0; color: #047857;">Vacuum Pack + Air Courier + COA Lab Report</td></tr>
                <tr style="border-top: 1px solid #e5e7eb;"><td style="padding: 8px 0; font-weight: bold; font-size: 15px; color: #B71C1C;">Estimated Price:</td><td style="padding: 8px 0; font-weight: bold; font-size: 15px; color: #B71C1C;">${formattedTotal}</td></tr>
              </table>
            </div>

            <p>Our quality control team will vacuum-seal the sample and attach the official Certificate of Analysis (COA). Express Airway Bill (AWB) tracking numbers will be updated via email within 24 hours.</p>

            <p style="margin-top: 20px;">If you have any questions or need to modify shipping notes, contact us directly at <a href="mailto:export@abhiglobalexports.com" style="color: #B71C1C;">export@abhiglobalexports.com</a> or WhatsApp: <strong>+91 9866353270</strong>.</p>
            
            <p style="margin-top: 25px; font-weight: bold; color: #B71C1C;">Best Regards,<br />Sample Dispatch Team<br />ABHI GLOBAL EXPORTS</p>
          </div>
          <div style="background-color: #111827; color: #9ca3af; padding: 14px; text-align: center; font-size: 11px;">
            GT Road, Guntur, Andhra Pradesh, 522001, India • export@abhiglobalexports.com
          </div>
        </div>
      `
    };

    // If Resend API Key is set, send live emails via Resend HTTP API
    if (resendApiKey) {
      const [exporterRes, buyerRes] = await Promise.all([
        fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(exporterEmailContent),
        }),
        fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(buyerEmailContent),
        })
      ]);

      console.log('Sample Order Email Sending Status:', exporterRes.status, buyerRes.status);
    } else {
      console.log('Resend API key not set. Sample Order Email payload logged internally:');
      console.log('Exporter Email Target:', exporterEmail);
      console.log('Internal Financial Breakdown:', {
        baseCost,
        deliveryCharge,
        profitMarginAmount,
        totalChargedUSD,
        formattedTotal
      });
    }

    return NextResponse.json({
      success: true,
      orderId,
      message: 'Sample order recorded and notification emails dispatched successfully.'
    });

  } catch (error: any) {
    console.error('Error processing sample purchase route:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to submit sample purchase request.' },
      { status: 500 }
    );
  }
}
