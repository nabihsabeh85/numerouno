import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Email transporter error:', error);
  } else {
    console.log('✅ Email server is ready to send messages');
  }
});

// Email templates
export const sendOrderConfirmationEmail = async (orderData) => {
  const { name, email, orderId, items, totalPrice } = orderData;
  
  const itemsList = items.map(item => 
    `<li>${item.filename} - Size: ${item.size} - Quantity: ${item.quantity} - $${item.price.toFixed(2)}</li>`
  ).join('');

  const mailOptions = {
    from: `"Numero Uno Portrait Studio" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your Order Has Been Received - Numero Uno',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #0033A0; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Numero Uno Portrait Studio</h1>
          <p style="margin: 5px 0; color: #FFD700;">Your memories are in good hands.</p>
        </div>
        
        <div style="padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #0033A0;">Order Confirmation</h2>
          <p>Dear ${name},</p>
          <p>Thank you for your order! We have received your photos and they are now being processed.</p>
          
          <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #0033A0; margin-top: 0;">Order Details</h3>
            <p><strong>Order ID:</strong> ${orderId}</p>
            <ul style="list-style: none; padding: 0;">
              ${itemsList}
            </ul>
            <hr style="border: 1px solid #e0e0e0;">
            <p style="font-size: 18px;"><strong>Total: $${totalPrice.toFixed(2)}</strong></p>
          </div>
          
          <div style="background-color: #fffbea; padding: 15px; border-left: 4px solid #FFD700; margin: 20px 0;">
            <h3 style="color: #0033A0; margin-top: 0;">Pickup Instructions</h3>
            <p>Your photos will be ready for pickup within 2-3 business days. We'll send you another email when they're ready!</p>
            <p><strong>Pickup Location:</strong><br>
            Numero Uno Portrait Studio<br>
            [Your Studio Address]<br>
            Phone: [Your Phone Number]</p>
          </div>
          
          <p>If you have any questions, please don't hesitate to contact us.</p>
          <p>Thank you for choosing Numero Uno Portrait Studio!</p>
        </div>
        
        <div style="background-color: #0033A0; color: white; padding: 15px; text-align: center; font-size: 12px;">
          <p style="margin: 5px 0;">© ${new Date().getFullYear()} Numero Uno Portrait Studio. All rights reserved.</p>
          <p style="margin: 5px 0;">35+ Years of Excellence in Portrait Photography</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Order confirmation email sent to customer');
  } catch (error) {
    console.error('❌ Error sending customer email:', error);
    throw error;
  }
};

export const sendStoreNotificationEmail = async (orderData) => {
  const { name, email, phone, orderId, items, totalPrice } = orderData;
  
  const itemsList = items.map(item => 
    `<li><strong>${item.filename}</strong><br>
    Size: ${item.size} | Quantity: ${item.quantity} | Price: $${item.price.toFixed(2)}<br>
    <a href="${item.downloadUrl}">Download Photo</a></li>`
  ).join('');

  const mailOptions = {
    from: `"Numero Uno System" <${process.env.EMAIL_USER}>`,
    to: process.env.STORE_EMAIL || process.env.EMAIL_USER,
    subject: `🆕 New Photo Order Received - ${orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #FFD700; color: #0033A0; padding: 20px;">
          <h1 style="margin: 0;">🎉 New Order Received!</h1>
        </div>
        
        <div style="padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #0033A0;">Order #${orderId}</h2>
          
          <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #0033A0; margin-top: 0;">Customer Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          </div>
          
          <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #0033A0; margin-top: 0;">Order Items</h3>
            <ul style="padding-left: 20px;">
              ${itemsList}
            </ul>
            <hr style="border: 1px solid #e0e0e0;">
            <p style="font-size: 18px;"><strong>Total Paid: $${totalPrice.toFixed(2)}</strong></p>
          </div>
          
          <div style="background-color: #fffbea; padding: 15px; border-left: 4px solid #FFD700;">
            <p><strong>⚠️ Action Required:</strong> Process this order and update the status in the admin dashboard when ready for pickup.</p>
          </div>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Store notification email sent');
  } catch (error) {
    console.error('❌ Error sending store email:', error);
    throw error;
  }
};

export const sendOrderReadyEmail = async (orderData) => {
  const { name, email, orderId } = orderData;

  const mailOptions = {
    from: `"Numero Uno Portrait Studio" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: '📸 Your Photos Are Ready for Pickup!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #FFD700; color: #0033A0; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">📸 Your Photos Are Ready!</h1>
        </div>
        
        <div style="padding: 20px; background-color: #f9f9f9;">
          <p>Dear ${name},</p>
          <p style="font-size: 18px;">Great news! Your photos are now ready for pickup!</p>
          
          <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Order ID:</strong> ${orderId}</p>
          </div>
          
          <div style="background-color: #e8f4f8; padding: 15px; border-left: 4px solid #0033A0; margin: 20px 0;">
            <h3 style="color: #0033A0; margin-top: 0;">Pickup Information</h3>
            <p><strong>Location:</strong><br>
            Numero Uno Portrait Studio<br>
            [Your Studio Address]</p>
            <p><strong>Hours:</strong><br>
            [Your Business Hours]</p>
            <p><strong>Phone:</strong> [Your Phone Number]</p>
          </div>
          
          <p>Please bring this email or your order ID when picking up your photos.</p>
          <p>We can't wait to see your reaction! Thank you for trusting us with your memories.</p>
          
          <p style="margin-top: 30px;">Best regards,<br>
          <strong>The Numero Uno Team</strong></p>
        </div>
        
        <div style="background-color: #0033A0; color: white; padding: 15px; text-align: center; font-size: 12px;">
          <p style="margin: 5px 0; color: #FFD700;">"Your memories are in good hands."</p>
          <p style="margin: 5px 0;">© ${new Date().getFullYear()} Numero Uno Portrait Studio</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Order ready email sent to customer');
  } catch (error) {
    console.error('❌ Error sending ready email:', error);
    throw error;
  }
};

export default transporter;

