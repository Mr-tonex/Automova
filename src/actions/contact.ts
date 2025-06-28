
"use server";

import { z } from "zod";
import { Resend } from 'resend';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(500, { message: "Message must be no more than 500 characters." }),
});

export type ContactFormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  isSuccess?: boolean;
};

export async function submitContactForm(
  prevState: ContactFormState,
  data: FormData
): Promise<ContactFormState> {
  const formData = Object.fromEntries(data);
  const parsed = contactFormSchema.safeParse(formData);

  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => issue.message);
    return {
      message: "Invalid form data. Please check the fields and try again.",
      fields: formData as Record<string, string>,
      issues,
      isSuccess: false,
    };
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("--------------------------------------------------------------------");
    console.error("CRITICAL ERROR: Resend API Key (RESEND_API_KEY) is missing from environment variables!");
    console.error("To fix this:");
    console.error("1. Ensure you have a `.env.local` file in the root of your project.");
    console.error("2. Add your Resend API key like this: RESEND_API_KEY=your_actual_api_key");
    console.error("3. Make sure to RESTART your Next.js development server (e.g., `npm run dev`).");
    console.error("Without the API key, emails cannot be sent.");
    console.error("--------------------------------------------------------------------");
    return {
      message: "Email configuration error. The site administrator has been notified. Please try again later.",
      fields: formData as Record<string, string>,
      isSuccess: false,
    };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { name, email, message } = parsed.data;

  try {
    const fromAddress = 'AutoMova Contact Form <onboarding@resend.dev>';

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: fromAddress,
      to: ['automova.s@gmail.com'], 
      subject: `New Contact Form Submission from ${name}`,
      reply_to: email,
      html: `
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale-1.0">
  <title>New Contact Form Submission</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; line-height: 1.6; color: #333; }
    .container { width: 100%; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9; }
    .header { text-align: center; padding-bottom: 20px; border-bottom: 1px solid #ddd; }
    .header h1 { color: #222; margin: 0; font-size: 24px; }
    .content { padding: 20px 0; }
    .content p { margin: 0 0 10px; }
    .details-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    .details-table td { padding: 12px; border: 1px solid #eee; }
    .details-table td:first-child { font-weight: bold; color: #555; width: 150px; background-color: #fafafa;}
    .message-block { margin-top: 20px; padding: 15px; background-color: #fff; border: 1px solid #eee; border-radius: 5px; }
    .footer { text-align: center; font-size: 12px; color: #777; padding-top: 20px; border-top: 1px solid #ddd; }
    .cta { text-align: center; margin-top: 25px; }
    .cta-button { display: inline-block; padding: 12px 25px; background-color: #3066E1; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>AutoMova</h1>
      <p>New Contact Form Submission</p>
    </div>
    <div class="content">
      <p>You have received a new message from your website's contact form.</p>
      <table class="details-table">
        <tr>
          <td>Full Name</td>
          <td>${name}</td>
        </tr>
        <tr>
          <td>Email Address</td>
          <td><a href="mailto:${email}">${email}</a></td>
        </tr>
      </table>
      <div class="message-block">
        <strong>Message:</strong>
        <p style="margin-top: 5px; white-space: pre-wrap;">${message}</p>
      </div>
      <div class="cta">
        <a href="mailto:${email}" class="cta-button">Reply to ${name}</a>
      </div>
    </div>
    <div class="footer">
      <p>This email was sent from the contact form on the AutoMova website.</p>
    </div>
  </div>
</body>
</html>
      `,
    });

    if (emailError) {
      console.error("Resend API Error:", emailError);
      return {
        message: "Sorry, there was an error sending your message. Please try again later.",
        fields: formData as Record<string, string>,
        issues: [emailError.message || "Email sending failed"],
        isSuccess: false,
      };
    }

    console.log("Contact form submitted and email sent:", parsed.data, "Email ID:", emailData?.id);
    return {
      message: "Thank you! Your message has been sent successfully. We'll be in touch soon.",
      isSuccess: true,
    };

  } catch (error) {
    console.error("Failed to send contact form email:", error);
    let errorMessage = "An unexpected error occurred.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return {
      message: `Sorry, there was an error sending your message: ${errorMessage}`,
      fields: formData as Record<string, string>,
      isSuccess: false,
    };
  }
}
