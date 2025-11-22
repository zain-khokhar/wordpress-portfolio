const nodemailer = require('nodemailer');

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Send email notification to admin about premium request
const sendPremiumRequestNotification = async (userEmail, repoTitle, requestId) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: '🔔 New Premium Access Request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f7f6;">
        <div style="background: linear-gradient(135deg, #2c3e50, #1a2530); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0;">New Premium Access Request</h1>
        </div>
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px; color: #333;">A user has requested premium access to a repository:</p>
          <div style="background: #f8f9fa; padding: 15px; border-left: 4px solid #3498db; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>User Email:</strong> ${userEmail}</p>
            <p style="margin: 5px 0;"><strong>Repository:</strong> ${repoTitle}</p>
            <p style="margin: 5px 0;"><strong>Request ID:</strong> ${requestId}</p>
          </div>
          <p style="font-size: 14px; color: #666;">Please log in to your admin panel to approve or reject this request.</p>
          <div style="text-align: center; margin-top: 30px;">
            <a href="${process.env.ADMIN_DASHBOARD_URL || 'http://localhost:3000/dashboard.html'}" 
               style="display: inline-block; padding: 12px 30px; background: #3498db; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Go to Admin Panel
            </a>
          </div>
        </div>
        <div style="text-align: center; padding: 15px; color: #999; font-size: 12px;">
          <p>This is an automated notification from your IT Solutions Platform</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending premium request notification:', error);
    return { success: false, error: error.message };
  }
};

// Send auto-reply to user after premium request
const sendPremiumRequestConfirmation = async (userEmail, repoTitle) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: '✅ Premium Access Request Received',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f7f6;">
        <div style="background: linear-gradient(135deg, #27ae60, #229954); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0;">Request Received!</h1>
        </div>
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px; color: #333;">Thank you for your interest in our premium content!</p>
          <p style="font-size: 14px; color: #666;">We have received your request for premium access to:</p>
          <div style="background: #f8f9fa; padding: 15px; border-left: 4px solid #27ae60; margin: 20px 0;">
            <p style="margin: 5px 0; font-size: 16px; font-weight: bold; color: #2c3e50;">${repoTitle}</p>
          </div>
          <p style="font-size: 14px; color: #666;">Our team will review your request and get back to you shortly. This typically takes 24-48 hours.</p>
          <p style="font-size: 14px; color: #666; margin-top: 20px;">You will receive an email notification once your request has been processed.</p>
        </div>
        <div style="text-align: center; padding: 15px; color: #999; font-size: 12px;">
          <p>Thank you for choosing IT Solutions Platform</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return { success: false, error: error.message };
  }
};

// Send premium access approval notification
const sendPremiumAccessApproved = async (userEmail, repoTitle, githubLink) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: '🎉 Premium Access Approved!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f7f6;">
        <div style="background: linear-gradient(135deg, #27ae60, #229954); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0;">🎉 Access Granted!</h1>
        </div>
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px; color: #333;">Great news! Your premium access request has been approved.</p>
          <div style="background: #f8f9fa; padding: 15px; border-left: 4px solid #27ae60; margin: 20px 0;">
            <p style="margin: 5px 0; font-size: 16px; font-weight: bold; color: #2c3e50;">${repoTitle}</p>
          </div>
          <p style="font-size: 14px; color: #666;">You can now access this premium repository. Click the button below to download:</p>
          <div style="text-align: center; margin-top: 30px;">
            <a href="${githubLink}" 
               style="display: inline-block; padding: 12px 30px; background: #27ae60; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Download Repository
            </a>
          </div>
          <p style="font-size: 12px; color: #999; margin-top: 20px; text-align: center;">This access is permanent. You can download this repository anytime from your profile.</p>
        </div>
        <div style="text-align: center; padding: 15px; color: #999; font-size: 12px;">
          <p>Thank you for using IT Solutions Platform</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending approval email:', error);
    return { success: false, error: error.message };
  }
};

// Send premium access rejection notification
const sendPremiumAccessRejected = async (userEmail, repoTitle, reason = '') => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Premium Access Request Update',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f7f6;">
        <div style="background: linear-gradient(135deg, #e74c3c, #c0392b); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0;">Access Request Update</h1>
        </div>
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px; color: #333;">Thank you for your interest in our premium content.</p>
          <div style="background: #f8f9fa; padding: 15px; border-left: 4px solid #e74c3c; margin: 20px 0;">
            <p style="margin: 5px 0; font-size: 16px; font-weight: bold; color: #2c3e50;">${repoTitle}</p>
          </div>
          <p style="font-size: 14px; color: #666;">Unfortunately, we are unable to approve your premium access request at this time.</p>
          ${reason ? `<p style="font-size: 14px; color: #666; margin-top: 15px;"><strong>Reason:</strong> ${reason}</p>` : ''}
          <p style="font-size: 14px; color: #666; margin-top: 20px;">If you have any questions, please feel free to contact our support team.</p>
        </div>
        <div style="text-align: center; padding: 15px; color: #999; font-size: 12px;">
          <p>Thank you for your understanding</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending rejection email:', error);
    return { success: false, error: error.message };
  }
};

// Send reply to feedback
const sendFeedbackReply = async (userEmail, userName, replyMessage) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Response to Your Feedback',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f7f6;">
        <div style="background: linear-gradient(135deg, #3498db, #2980b9); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0;">Thank You for Your Feedback</h1>
        </div>
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px; color: #333;">Hello ${userName},</p>
          <p style="font-size: 14px; color: #666;">Thank you for reaching out to us. Here's our response to your inquiry:</p>
          <div style="background: #f8f9fa; padding: 20px; border-left: 4px solid #3498db; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #2c3e50; line-height: 1.6;">${replyMessage}</p>
          </div>
          <p style="font-size: 14px; color: #666;">If you have any further questions, please don't hesitate to contact us again.</p>
        </div>
        <div style="text-align: center; padding: 15px; color: #999; font-size: 12px;">
          <p>Best regards,<br>IT Solutions Team</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending feedback reply:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendPremiumRequestNotification,
  sendPremiumRequestConfirmation,
  sendPremiumAccessApproved,
  sendPremiumAccessRejected,
  sendFeedbackReply
};
