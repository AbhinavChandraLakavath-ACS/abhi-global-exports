import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      name, company, country, email, phone, 
      product, quantity, packaging, port, message 
    } = body;

    const exporterEmail = process.env.EXPORTER_EMAIL || 'abhinavchandra.lakavath@gmail.com';
    const resendApiKey = process.env.RESEND_API_KEY;

    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

    // 1. Email Payload for Exporter (Owner)
    const exporterEmailContent = {
      from: 'ABHI GLOBAL EXPORTS <quotes@abhiglobalexports.com>',
      to: [exporterEmail],
      subject: `NEW B2B RFQ: ${product} (${quantity} MT) - ${company} [${country}]`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #B71C1C; color: #ffffff; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 20px;">NEW INBOUND B2B INQUIRY</h1>
            <p style="margin: 5px 0 0 0; font-size: 12px; color: #FFC107;">ABHI GLOBAL EXPORTS PORTAL</p>
          </div>
          <div style="padding: 20px; color: #111827; font-size: 14px; line-height: 1.6;">
            <h3 style="color: #B71C1C; margin-top: 0;">Buyer Company Details:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 6px; font-weight: bold; width: 35%;">Buyer Name:</td><td style="padding: 6px;">${name}</td></tr>
              <tr><td style="padding: 6px; font-weight: bold;">Company:</td><td style="padding: 6px;">${company}</td></tr>
              <tr><td style="padding: 6px; font-weight: bold;">Country:</td><td style="padding: 6px;">${country}</td></tr>
              <tr><td style="padding: 6px; font-weight: bold;">Email:</td><td style="padding: 6px;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding: 6px; font-weight: bold;">Phone / WhatsApp:</td><td style="padding: 6px;">${phone || 'N/A'}</td></tr>
            </table>

            <h3 style="color: #B71C1C; margin-top: 20px;">Order Specifications:</h3>
            <table style="width: 100%; border-collapse: collapse; background-color: #f9fafb;">
              <tr><td style="padding: 6px; font-weight: bold; width: 35%;">Chilli Variety:</td><td style="padding: 6px; color: #B71C1C; font-weight: bold;">${product}</td></tr>
              <tr><td style="padding: 6px; font-weight: bold;">Requested Volume:</td><td style="padding: 6px; font-weight: bold;">${quantity} Metric Tons</td></tr>
              <tr><td style="padding: 6px; font-weight: bold;">Packaging Type:</td><td style="padding: 6px;">${packaging}</td></tr>
              <tr><td style="padding: 6px; font-weight: bold;">Destination Port:</td><td style="padding: 6px;">${port}</td></tr>
              <tr><td style="padding: 6px; font-weight: bold;">Submission Time:</td><td style="padding: 6px;">${timestamp} IST</td></tr>
            </table>

            ${message ? `
              <h3 style="color: #B71C1C; margin-top: 20px;">Buyer Special Requirements:</h3>
              <div style="background-color: #fef2f2; border-left: 4px solid #B71C1C; padding: 12px; font-style: italic;">
                "${message}"
              </div>
            ` : ''}
          </div>
          <div style="background-color: #111827; color: #9ca3af; padding: 12px; text-align: center; font-size: 11px;">
            ABHI GLOBAL EXPORTS • Guntur, Andhra Pradesh, India
          </div>
        </div>
      `
    };

    // 2. Confirmation Email Payload for Customer (Buyer)
    const buyerEmailContent = {
      from: 'ABHI GLOBAL EXPORTS <quotes@abhiglobalexports.com>',
      to: [email],
      subject: `RFQ Confirmation: ${product} Bulk Export Order - ABHI GLOBAL EXPORTS`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #B71C1C; color: #ffffff; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 20px;">ABHI GLOBAL EXPORTS</h1>
            <p style="margin: 5px 0 0 0; font-size: 12px; color: #FFC107;">Official Request For Quote (RFQ) Confirmation</p>
          </div>
          <div style="padding: 20px; color: #111827; font-size: 14px; line-height: 1.6;">
            <p>Dear <strong>${name}</strong> (${company}),</p>
            <p>Thank you for submitting your bulk inquiry for <strong>${product}</strong> red chillies to ABHI GLOBAL EXPORTS.</p>
            
            <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin: 15px 0;">
              <h4 style="margin: 0 0 10px 0; color: #B71C1C;">Summary of Your Inquiry:</h4>
              <ul style="margin: 0; padding-left: 20px;">
                <li><strong>Variety:</strong> ${product}</li>
                <li><strong>Quantity:</strong> ${quantity} Metric Tons</li>
                <li><strong>Packaging:</strong> ${packaging}</li>
                <li><strong>Destination Port:</strong> ${port}</li>
              </ul>
            </div>

            <p>Our sales & export logistics department in Guntur is currently reviewing your specifications and freight schedules. You will receive a formal <strong>FOB / CIF Quotation Draft</strong> within 12 hours.</p>

            <p style="margin-top: 20px;">If you have urgent questions, feel free to reply directly to this email or reach us on WhatsApp: <strong>+91 9866353270</strong>.</p>
            
            <p style="margin-top: 25px; font-weight: bold; color: #B71C1C;">Best Regards,<br />Export Department<br />ABHI GLOBAL EXPORTS</p>
          </div>
          <div style="background-color: #111827; color: #9ca3af; padding: 12px; text-align: center; font-size: 11px;">
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

      const exporterData = await exporterRes.json();
      const buyerData = await buyerRes.json();

      return NextResponse.json({
        success: true,
        status: 'live_email_sent',
        exporterEmailSent: exporterRes.ok,
        buyerEmailSent: buyerRes.ok,
        details: { exporterData, buyerData }
      });
    }

    // Fallback simulation mode when API key is not yet set
    console.log('--- RFQ RECEIVED ---');
    console.log('Exporter Email Target:', exporterEmail);
    console.log('Buyer Email Target:', email);
    console.log('Product Payload:', body);

    return NextResponse.json({
      success: true,
      status: 'simulated_local',
      message: `RFQ recorded. Notifications dispatched to exporter (${exporterEmail}) and customer (${email}).`,
      exporterEmail,
      buyerEmail: email
    });

  } catch (error: any) {
    console.error('Error processing RFQ API request:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Server error' },
      { status: 500 }
    );
  }
}
