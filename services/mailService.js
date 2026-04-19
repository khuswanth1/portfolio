import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Professional Mailing Service
 * Handles transporter configuration and high-fidelity email templates.
 */
class MailService {
  constructor() {
    this.transporter = this.createTransporter();
    this.myEmail = 'khuswanthraojadav@gmail.com';
  }

  createTransporter() {
    const config = {
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || this.myEmail,
        pass: process.env.EMAIL_PASS
      }
    };

    // If not using Gmail, fallback to SMTP settings
    if (process.env.EMAIL_HOST && !process.env.EMAIL_HOST.includes('gmail')) {
      config.host = process.env.EMAIL_HOST;
      config.port = parseInt(process.env.EMAIL_PORT) || 587;
      config.secure = process.env.EMAIL_SECURE === 'true';
      delete config.service;
    }

    return nodemailer.createTransport(config);
  }

  /**
   * Send notification to the portfolio owner
   */
  async sendContactNotification({ name, email, subject, message }) {
    const fromEmail = process.env.EMAIL_FROM || process.env.EMAIL_USER || this.myEmail;
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const mailOptions = {
      from: `"Portfolio Terminal" <${fromEmail}>`,
      to: process.env.EMAIL_TO || this.myEmail,
      replyTo: email,
      subject: `[TRANS-LOG] New Message from ${name}: ${subject}`,
      html: this.buildNotificationTemplate({ name, email, subject, message, timestamp })
    };

    try {
      return await this.transporter.sendMail(mailOptions);
    } catch (err) {
      if (err.message.includes('Invalid login') || err.message.includes('534-5.7.9')) {
        console.error('\n❌ [MAIL SYSTEM] AUTHENTICATION ERROR');
        console.error('👉 ACTION REQUIRED: Google is blocking your login because "Kushu@..." is your regular password.');
        console.error('👉 FIX: You MUST generate a Google App Password here: https://myaccount.google.com/apppasswords');
        console.error('👉 Then, update EMAIL_PASS in your .env file with the 16-character code.\n');
      }
      throw err;
    }
  }

  /**
   * Send a professional acknowledgement to the user
   */
  async sendAcknowledgement({ name, email, subject, message }) {
    const fromEmail = process.env.EMAIL_FROM || process.env.EMAIL_USER || this.myEmail;

    const mailOptions = {
      from: `"Khuswanth Rao Jadav" <${fromEmail}>`,
      to: email,
      subject: `Transmission Received — Khuswanth Rao Jadav`,
      html: this.buildAcknowledgementTemplate({ name, subject, message })
    };

    return this.transporter.sendMail(mailOptions);
  }

  buildNotificationTemplate({ name, email, subject, message, timestamp }) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Rajdhani:wght@600;700&display=swap');
        body { margin: 0; padding: 0; font-family: 'DM Sans', sans-serif; background-color: #030712; color: #f8fafc; }
        .wrapper { padding: 40px 20px; background-color: #030712; }
        .container { max-width: 600px; margin: 0 auto; background: #0b1120; border: 1px solid rgba(0, 212, 255, 0.1); border-radius: 20px; overflow: hidden; }
        .header { background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(123, 47, 255, 0.1)); padding: 40px; text-align: center; border-bottom: 1px solid rgba(0, 212, 255, 0.05); }
        .header h1 { font-family: 'Rajdhani', sans-serif; color: #00d4ff; font-size: 28px; margin: 0; letter-spacing: 4px; text-transform: uppercase; }
        .header p { color: #94a3b8; font-size: 14px; margin-top: 10px; font-weight: 500; }
        .content { padding: 40px; }
        .field { margin-bottom: 24px; }
        .label { font-family: 'Rajdhani', sans-serif; color: #00d4ff; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; }
        .value { color: #e2e8f0; font-size: 16px; line-height: 1.6; background: rgba(255, 255, 255, 0.02); padding: 12px 16px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.05); }
        .message-box { background: rgba(0, 212, 255, 0.03); border: 1px solid rgba(0, 212, 255, 0.1); border-radius: 12px; padding: 20px; color: #f1f5f9; font-size: 15px; line-height: 1.8; white-space: pre-wrap; }
        .footer { padding: 30px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.05); }
        .footer-tag { color: #64748b; font-size: 12px; margin-bottom: 4px; }
        .footer-time { color: #00d4ff; font-size: 11px; font-family: monospace; }
        .btn { display: inline-block; padding: 12px 24px; background: #00d4ff; color: #0b1120; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 14px; margin-top: 20px; text-transform: uppercase; letter-spacing: 1px; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          <div class="header">
            <h1>New Message</h1>
            <p>Portfolio Transmission Protocol</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">From</div>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <div class="label">Sender Identity</div>
              <div class="value">${email}</div>
            </div>
            <div class="field">
              <div class="label">Subject</div>
              <div class="value">${subject}</div>
            </div>
            <div class="field">
              <div class="label">Transmission Payload</div>
              <div class="message-box">${message}</div>
            </div>
            <div style="text-align: center;">
              <a href="mailto:${email}" class="btn">Initiate Response</a>
            </div>
          </div>
          <div class="footer">
            <div class="footer-tag">AUTOMATED SYSTEM TRANSMISSION</div>
            <div class="footer-time">TIMESTAMP: ${timestamp} IST</div>
          </div>
        </div>
      </div>
    </body>
    </html>`;
  }

  buildAcknowledgementTemplate({ name, subject, message }) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Rajdhani:wght@600;700&display=swap');
        body { margin: 0; padding: 0; font-family: 'DM Sans', sans-serif; background-color: #030712; color: #f8fafc; }
        .wrapper { padding: 40px 20px; background-color: #030712; }
        .container { max-width: 600px; margin: 0 auto; background: #0b1120; border: 1px solid rgba(0, 212, 255, 0.1); border-radius: 20px; overflow: hidden; }
        .header { background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(123, 47, 255, 0.1)); padding: 40px; text-align: center; border-bottom: 1px solid rgba(0, 212, 255, 0.05); }
        .header h1 { font-family: 'Rajdhani', sans-serif; color: #00d4ff; font-size: 28px; margin: 0; letter-spacing: 4px; text-transform: uppercase; }
        .content { padding: 40px; color: #94a3b8; line-height: 1.8; }
        .hi { color: #f8fafc; font-size: 18px; font-weight: 700; margin-bottom: 16px; }
        .summary-box { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 20px; margin-top: 24px; }
        .summary-title { font-family: 'Rajdhani', sans-serif; color: #00d4ff; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px; }
        .summary-item { margin-bottom: 10px; font-size: 13px; }
        .summary-label { color: #64748b; margin-right: 8px; }
        .summary-value { color: #e2e8f0; }
        .highlight { color: #00d4ff; font-weight: 600; }
        .footer { padding: 30px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.05); background: rgba(255,255,255,0.01); }
        .signature { margin-top: 30px; color: #f8fafc; font-weight: 600; }
        .socials { margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.05); }
        .socials a { color: #00d4ff; text-decoration: none; margin: 0 10px; font-size: 13px; font-family: 'Rajdhani', sans-serif; letter-spacing: 1px; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          <div class="header">
            <h1>Received</h1>
          </div>
          <div class="content">
            <div class="hi">Hi ${name},</div>
            <p>Thank you for reaching out through my portfolio. This is an automated confirmation that your transmission has been successfully processed by my systems.</p>
            <p>I have received your message and will review it shortly. You can expect a response within <span class="highlight">24-48 standard hours</span>.</p>
            
            <div class="summary-box">
              <div class="summary-title">Transmission Summary</div>
              <div class="summary-item">
                <span class="summary-label">Subject:</span>
                <span class="summary-value">${subject}</span>
              </div>
              <div class="summary-item">
                <span class="summary-label">Payload:</span>
                <div class="summary-value" style="white-space: pre-wrap; margin-top: 5px; font-size: 12px; opacity: 0.8;">${message}</div>
              </div>
            </div>

            <div class="signature">
              Best regards,<br>
              <span class="highlight">Khuswanth Rao Jadav</span><br>
              Full Stack Developer
            </div>
          </div>
          <div class="footer">
            <div class="socials">
              <a href="https://github.com/khuswanth1">GITHUB</a>
              <a href="https://www.linkedin.com/in/khuswanth-rao-jadav-991686250/">LINKEDIN</a>
              <a href="https://khuswanth.dev">PORTFOLIO</a>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>`;
  }
}

export default new MailService();
