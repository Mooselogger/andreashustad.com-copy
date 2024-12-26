// lib/emailTemplates.js
export const generateUserEmailTemplate = ({
  name,
  email,
  subject,
  message,
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background-color: #0070f3;
      color: white;
      padding: 20px;
      border-radius: 8px 8px 0 0;
    }
    .content {
      background-color: #f9f9f9;
      padding: 20px;
      border-radius: 0 0 8px 8px;
      border: 1px solid #eaeaea;
    }
    .field {
      margin-bottom: 15px;
    }
    .label {
      font-weight: bold;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="margin: 0;">New Contact Form Submission</h1>
  </div>
  <div class="content">
    <div class="field">
      <div class="label">Name:</div>
      <div>${name}</div>
    </div>
    <div class="field">
      <div class="label">Email:</div>
      <div>${email}</div>
    </div>
    <div class="field">
      <div class="label">Subject:</div>
      <div>${subject || 'No Subject'}</div>
    </div>
    <div class="field">
      <div class="label">Message:</div>
      <div>${message}</div>
    </div>
  </div>
</body>
</html>
`;

export const generateAutoReplyTemplate = ({ name }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background-color: #0070f3;
      color: white;
      padding: 20px;
      border-radius: 8px 8px 0 0;
    }
    .content {
      background-color: #f9f9f9;
      padding: 20px;
      border-radius: 0 0 8px 8px;
      border: 1px solid #eaeaea;
    }
    .social-links {
      margin-top: 20px;
      padding: 15px;
      background: #f0f0f0;
      border-radius: 8px;
    }
    .social-links a {
      color: #0070f3;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="margin: 0;">Thank You for Your Message</h1>
  </div>
  <div class="content">
    <p>Hi ${name},</p>
    <p>Thank you for reaching out! I've received your message and will get back to you as soon as possible.</p>
    <div class="social-links">
      <p>In the meantime, feel free to:</p>
      <ul>
        <li>Connect with me on <a href="https://www.linkedin.com/in/andreashustad/">LinkedIn</a></li>
        <li>Follow me on <a href="https://www.instagram.com/andreas_hustad/">Instagram</a></li>
        <li>Check out my latest work on my <a href="https://andreashustad.com">website</a></li>
      </ul>
    </div>
    <p>Best regards,<br>Andreas Hustad</p>
  </div>
</body>
</html>
`;
