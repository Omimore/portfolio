
import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  message,
}) => (
  <div>
    <h1>New Contact Form Submission</h1>
    <p>You have received a new message from your portfolio contact form.</p>
    <hr />
    <h2>Sender Details:</h2>
    <ul>
      <li><strong>Name:</strong> {name}</li>
      <li><strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a></li>
    </ul>
    <h2>Message:</h2>
    <p>{message}</p>
  </div>
);
