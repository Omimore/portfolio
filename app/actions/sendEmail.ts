
"use server";

import Resend from "resend";
import { EmailTemplate } from "@/components/email-template";
import * as React from "react";

const resend = new Resend(process.env.RESEND_API_KEY ?? "");

export const sendEmail = async (formData: { name: string; email: string; message: string; }) => {
  const { name, email, message } = formData;

  if (!name || !email || !message) {
    return { error: "All fields are required." };
  }

  if (!process.env.RESEND_API_KEY) {
    // Log server-side so the developer can inspect runtime logs.
    console.error("Resend API key is missing (RESEND_API_KEY).");
    return { error: "Email service not configured. Please contact the site owner." };
  }

  try {
    // The Resend SDK throws on errors; it returns a send result on success.
    await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: ["omimore2407@gmail.com"],
      subject: `New message from ${name}`,
      // Pass a React element instead of calling the component as a function
      react: <EmailTemplate name={name} email={email} message={message} />,
    });

    return { success: "Email sent successfully!" };
  } catch (err: any) {
    // Provide a concise message to the client but log full details server-side.
    console.error("Resend send error:", err);
    const publicMessage = err?.message ? `Failed to send email: ${err.message}` : "Failed to send email.";
    return { error: publicMessage };
  }
};
