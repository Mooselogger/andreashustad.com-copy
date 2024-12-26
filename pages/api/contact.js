// pages/api/contact.js
import { Resend } from 'resend';
import rateLimiter from '@/lib/ratelimits';
import {
  generateUserEmailTemplate,
  generateAutoReplyTemplate,
} from '../../lib/emailTemplates';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get the client's IP address
  const ip =
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress;

  try {
    // Check rate limit
    const { success, limit, reset, remaining } = await rateLimiter.limit(
      ip ?? 'anonymous'
    );

    // Set rate limit headers
    res.setHeader('X-RateLimit-Limit', limit);
    res.setHeader('X-RateLimit-Remaining', remaining);
    res.setHeader('X-RateLimit-Reset', reset);

    if (!success) {
      return res.status(429).json({
        error: 'Too many requests. Please try again later.',
        reset,
      });
    }

    const { name, email, subject, message, token } = req.body;

    // Verify Turnstile token
    const turnstileResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: token,
          remoteip: ip,
        }),
      }
    );

    const turnstileData = await turnstileResponse.json();

    if (!turnstileData.success) {
      return res.status(400).json({ error: 'Invalid security token' });
    }

    // Send notification email to you
    await resend.emails.send({
      from: 'Contact Form <contact@andreashustad.com>',
      to: 'contact@andreashustad.com',
      subject: `New Contact Form Submission: ${subject || 'No Subject'}`,
      html: generateUserEmailTemplate({ name, email, subject, message }),
    });

    // Send auto-reply to the user
    await resend.emails.send({
      from: 'Andreas Hustad <contact@andreashustad.com>',
      to: email,
      subject: 'Thank you for your message',
      html: generateAutoReplyTemplate({ name }),
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
}
