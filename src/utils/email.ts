
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
    
    // IMPORTANT: In a browser environment, direct API calls to SendGrid won't work due to CORS
    // This is a fundamental limitation of browser security - you cannot make direct SMTP 
    // or third-party API calls from frontend JavaScript
    
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
    
    // SIMULATION ONLY - The following would work in a Node.js backend but not in a browser
    try {
      // Attempt to make the API call (this will fail due to CORS in browser environments)
      // This is left here to demonstrate what would happen in a real backend implementation
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(emailData),
      });
      
      // In a real backend environment, we would check the response here
      if (!response.ok) {
        throw new Error(`SendGrid API error: ${response.status}`);
      }
      
      console.log('Email sent successfully!');
      
    } catch (apiError) {
      console.error('API call error (expected in browser):', apiError);
      console.warn('CORS ISSUE DETECTED: This is expected in browser environments');
      console.info('In a real application, this API call would be handled by a backend service');
      
      // Log what would have been sent
      console.log('Email details that would be sent in a real backend implementation:', {
        from: SENDGRID_CONFIG.from,
        to,
        subject,
        headers,
        emailData
      });
    }
    
    // Since this is a demo, return success simulation
    // In a real application, this would reflect the actual send status
    return { 
      success: true, 
      note: "This is a simulation only. In a real application, emails would be sent through a backend service." 
    };
  } catch (error) {
    console.error('Failed to prepare email:', error);
    return { 
      success: false, 
      error,
      note: "To implement real email sending, you would need a backend service that makes the API calls to SendGrid." 
    };
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
