
import { toast } from 'sonner';

interface SendEmailProps {
  to: string;
  subject: string;
  html: string;
}

// SendGrid configuration
const SENDGRID_CONFIG = {
  host: 'smtp.sendgrid.net',
  port: 465,
  user: 'apikey',
  pass: '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',
  from: 'support@payouts.com',
};

export const sendTestEmail = async ({ to, subject, html }: SendEmailProps) => {
  try {
    console.log('Sending email to:', to);
    console.log('Email subject:', subject);
    console.log('Email content:', html);
    
    // Create headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SENDGRID_CONFIG.pass}`,
    };
    
    // Create the request body
    const emailData = {
      personalizations: [
        {
          to: [{ email: to }],
          subject: subject,
        },
      ],
      from: { email: SENDGRID_CONFIG.from },
      content: [
        {
          type: 'text/html',
          value: html,
        },
      ],
    };
    
    // For this demo, we'll still simulate a successful email
    // In a production environment, uncomment and use this actual API call:
    /*
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(emailData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`SendGrid API error: ${JSON.stringify(errorData)}`);
    }
    */
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return success
    return { success: true };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
};

export const generateWinningsEmail = (email: string, amount: string = '$5,000') => {
  const subject = `Congratulations! You've Won ${amount} in the Bowl Tournament!`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #0f2a35;
          padding: 20px;
          text-align: center;
        }
        .header img {
          max-width: 150px;
        }
        .content {
          padding: 20px;
          background-color: #ffffff;
        }
        .footer {
          background-color: #f4f4f4;
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #666;
        }
        .button {
          display: inline-block;
          background-color: #d0e92a;
          color: #0f2a35;
          font-weight: bold;
          text-decoration: none;
          padding: 12px 25px;
          border-radius: 4px;
          margin: 20px 0;
        }
        .highlight {
          color: #d0e92a;
          background-color: #0f2a35;
          padding: 3px 8px;
          border-radius: 3px;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://bowl.com/themes/custom/bowl/images/logo.svg" alt="Bowl Logo">
        </div>
        <div class="content">
          <h2>Congratulations, Winner!</h2>
          <p>We're thrilled to inform you that you've won <strong>${amount}</strong> in the recent Bowl Tournament!</p>
          <p>Your exceptional performance has earned you this prize, and we can't wait to process your payout.</p>
          <p>To claim your winnings, please click the button below and complete the quick verification process:</p>
          <div style="text-align: center;">
            <a href="#" class="button">CLAIM YOUR WINNINGS NOW</a>
          </div>
          <p>If you have any questions about your prize or the claiming process, please don't hesitate to contact our support team.</p>
          <p>Congratulations again on your victory!</p>
          <p>Best regards,<br>The Bowl Team</p>
        </div>
        <div class="footer">
          <p>This email was sent to ${email}</p>
          <p>&copy; 2023 Bowl. All rights reserved.</p>
          <p><small>This is a demonstration email for testing the Payouts.com widget integration.</small></p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  return { subject, html };
};
