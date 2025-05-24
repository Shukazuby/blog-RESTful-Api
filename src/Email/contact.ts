import { sendEmail } from "src/utils/function";

export async function sendContactEmail(payload) {
const body = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Contact Form Submission</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f4f6f8;
      color: #333333;
      margin: 0;
      padding: 40px 20px;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      padding: 30px 40px;
      border: 1px solid #e0e6ed;
    }
    h1 {
      font-size: 24px;
      color: #1e3a8a;
      margin-bottom: 30px;
    }
    p {
      font-size: 16px;
      line-height: 1.6;
      margin: 12px 0;
    }
    .label {
      font-weight: 600;
      color: #374151;
    }
    .message-box {
      background-color: #f9fafb;
      border-left: 4px solid #2563eb;
      padding: 15px 20px;
      margin: 15px 0 25px;
      border-radius: 6px;
      font-style: italic;
      color: #4b5563;
      white-space: pre-wrap;
    }
    .footer {
      font-size: 14px;
      color: #6b7280;
      border-top: 1px solid #e0e6ed;
      padding-top: 20px;
      margin-top: 30px;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <h1>Dear Zuby,</h1>

    <p>You have received a new message through your contact form. Here are the details:</p>

    <p><span class="label">Name:</span> ${payload.name}</p>
    <p><span class="label">Email:</span> ${payload.email}</p>
    
    <p><span class="label">Message:</span></p>
    <div class="message-box">
      ${payload.message}
    </div>

    <div class="footer">
      This message was sent from your website contact form.
    </div>
  </div>
</body>
</html>

`
  await sendEmail(body, payload.subject, 'shukazuby@gmail.com');
}


