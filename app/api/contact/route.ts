import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validations/contact";

// In-memory rate limiting map (IP -> timestamp)
// Note: In serverless environments (like Vercel), this may reset across cold starts
// or different edge nodes, but it's sufficient for basic burst protection.
const rateLimit = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute

export async function POST(request: Request) {
  try {
    // Initialize Resend dynamically so it doesn't crash at build time
    // if the environment variable is missing.
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not set in environment variables.");
      return NextResponse.json(
        { success: false, message: "Server configuration error (API Key missing)." },
        { status: 500 }
      );
    }
    const resend = new Resend(resendApiKey);

    // Basic IP-based rate limiting
    // Note: get('x-forwarded-for') is a common way to get IP in Vercel/Next.js
    const ip = request.headers.get("x-forwarded-for") || "unknown-ip";
    const now = Date.now();
    const lastRequestTime = rateLimit.get(ip);
    
    if (lastRequestTime && now - lastRequestTime < RATE_LIMIT_WINDOW_MS) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }
    
    // Update rate limit timestamp
    rateLimit.set(ip, now);

    const body = await request.json();

    // Validate the incoming data against our Zod schema
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: "Invalid form data.", errors: result.error.flatten() },
        { status: 400 }
      );
    }

    const { nickname, fullName, email, subject, message, honeypot } = result.data;

    // Honeypot check - if it's filled, silently reject (act as success to fool bots)
    if (honeypot) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const emailTo = process.env.CONTACT_EMAIL_TO;
    if (!emailTo) {
      console.error("CONTACT_EMAIL_TO is not set in environment variables.");
      return NextResponse.json(
        { success: false, message: "Server configuration error." },
        { status: 500 }
      );
    }

    // Prepare email content
    const htmlContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${fullName} (${nickname})</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <hr />
      <h3>Message:</h3>
      <p style="white-space: pre-wrap;">${message}</p>
    `;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // Replace with verified domain if available
      to: [emailTo],
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: htmlContent,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json(
        { success: false, message: "Failed to send email via Resend.", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });

  } catch (error) {
    console.error("Internal Server Error in contact API:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
