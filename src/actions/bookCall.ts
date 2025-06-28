
"use server";

import { z } from "zod";
import { Resend } from 'resend';
import { format } from "date-fns";

const bookCallFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  preferredDate: z.string().refine((date) => !isNaN(Date.parse(date)), {message: "Invalid date format."})
                 .transform((date) => new Date(date)),
  preferredTime: z.string().min(1, { message: "Please select a preferred time." }),
  timeZone: z.string().min(1, { message: "Timezone is required." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(500, { message: "Message must be no more than 500 characters." })
    .optional(),
});

export type BookCallFormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  isSuccess?: boolean;
};

export async function submitBookCallForm(
  prevState: BookCallFormState,
  data: FormData
): Promise<BookCallFormState> {
  const formData = Object.fromEntries(data);
  const parsed = bookCallFormSchema.safeParse(formData);

  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => issue.message);
    return {
      message: "Invalid form data. Please check the fields and try again.",
      fields: formData as Record<string, string>,
      issues,
      isSuccess: false,
    };
  }
  
  const { firstName, lastName, email, preferredDate, preferredTime, timeZone, message } = parsed.data;
  const fullName = `${firstName} ${lastName}`;

  if (!process.env.RESEND_API_KEY) {
    console.error("CRITICAL ERROR: Resend API Key (RESEND_API_KEY) is missing.");
    return {
      message: "Server configuration error. The site administrator has been notified. Please try again later.",
      fields: parsed.data as any, // Keep field data to repopulate
      isSuccess: false,
    };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const formattedDate = format(preferredDate, "PPP (EEEE)"); // e.g., May 30, 2024 (Thursday)

  try {
    const fromAddress = 'AutoMova Bookings <onboarding@resend.dev>';
    const toAddress = 'automova.s@gmail.com'; 

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: fromAddress,
      to: [toAddress], 
      subject: `New Call Booking Request from ${fullName} for ${formattedDate} at ${preferredTime}`,
      reply_to: email,
      html: `
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Call Booking Request</title>
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
      <p>New Call Booking Request</p>
    </div>
    <div class="content">
      <p>You have received a new consultation request. Please review the details below and follow up to confirm.</p>
      <table class="details-table">
        <tr>
          <td>Full Name</td>
          <td>${fullName}</td>
        </tr>
        <tr>
          <td>Email Address</td>
          <td><a href="mailto:${email}">${email}</a></td>
        </tr>
        <tr>
          <td>Preferred Date</td>
          <td>${formattedDate}</td>
        </tr>
        <tr>
          <td>Preferred Time</td>
          <td>${preferredTime}</td>
        </tr>
        <tr>
          <td>Timezone</td>
          <td>${timeZone.replace(/_/g, " ")}</td>
        </tr>
      </table>
      ${message ? `
        <div class="message-block">
          <strong>Additional Details:</strong>
          <p style="margin-top: 5px; white-space: pre-wrap;">${message}</p>
        </div>
      ` : ''}
      <div class="cta">
        <p>Please contact them at your earliest convenience to confirm the appointment.</p>
        <a href="mailto:${email}?subject=Confirming Your Call with AutoMova&body=Hi ${firstName},%0D%0A%0D%0AThank you for booking a call with us! We're looking forward to speaking with you on ${formattedDate} at ${preferredTime} (${timeZone.replace(/_/g, " ")}).%0D%0A%0D%0APlease reply to this email to confirm.%0D%0A%0D%0AThanks,%0D%0AThe AutoMova Team" class="cta-button">Reply to Confirm</a>
      </div>
    </div>
    <div class="footer">
      <p>This email was sent from the AutoMova website. Times are as selected by the user; please confirm the timezone if necessary.</p>
      <p><small>This email was routed to ${toAddress}.</small></p>
    </div>
  </div>
</body>
</html>
      `,
    });

    if (emailError) {
      console.error("Resend API Error (Book a Call):", emailError);
      return {
        message: "Sorry, there was an error submitting your request. Please try again later.",
        fields: parsed.data as any,
        issues: [emailError.message || "Email sending failed"],
        isSuccess: false,
      };
    }

    console.log("Call booking request submitted and email sent:", parsed.data, "Email ID:", emailData?.id);
    return {
      message: `Thank you, ${fullName}! Your call request for ${formattedDate} at ${preferredTime} (${timeZone.replace(/_/g, " ")}) has been submitted. We'll email you shortly to confirm.`,
      isSuccess: true,
    };

  } catch (error) {
    console.error("Failed to send booking request email:", error);
    let errorMessage = "An unexpected error occurred while submitting your request.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return {
      message: `Error: ${errorMessage}`,
      fields: parsed.data as any,
      isSuccess: false,
    };
  }
}
