// pages/contact.js
import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Mail, Linkedin, Instagram } from 'lucide-react';
import styles from '@/styles/Contact.module.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [turnstileToken, setTurnstileToken] = useState(null);
  const turnstileRef = useRef(null);

  useEffect(() => {
    // Initialize Turnstile when component mounts
    if (window.turnstile && turnstileRef.current) {
      window.turnstile.render(turnstileRef.current, {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
        callback: function (token) {
          setTurnstileToken(token);
          if (errors.turnstile) {
            setErrors((prev) => ({
              ...prev,
              turnstile: '',
            }));
          }
        },
        'expired-callback': function () {
          setTurnstileToken(null);
          setErrors((prev) => ({
            ...prev,
            turnstile: 'Security check expired. Please try again.',
          }));
        },
        'error-callback': function () {
          setTurnstileToken(null);
          setErrors((prev) => ({
            ...prev,
            turnstile: 'Security check failed. Please try again.',
          }));
        },
      });
    }
  }, [errors.turnstile]);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    if (!turnstileToken) {
      newErrors.turnstile = 'Please complete the security check';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          token: turnstileToken,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTurnstileToken(null);

      // Reset Turnstile
      if (window.turnstile) {
        window.turnstile.reset();
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.contactContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>Get in Touch</h1>
          <p className={styles.subtitle}>
            Have a question or want to work together? I&apos;d love to hear from
            you.
          </p>
        </div>

        <div className={styles.cardsGrid}>
          <Card className={styles.contactCard}>
            <Mail className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Email</h3>
            <a
              href="mailto:contact@andreashustad.com"
              className={styles.cardLink}
            >
              contact@andreashustad.com
            </a>
          </Card>

          <Card className={styles.contactCard}>
            <Linkedin className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>LinkedIn</h3>
            <a
              href="https://www.linkedin.com/in/andreashustad/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cardLink}
            >
              Connect on LinkedIn
            </a>
          </Card>

          <Card className={styles.contactCard}>
            <Instagram className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Instagram</h3>
            <a
              href="https://www.instagram.com/andreas_hustad/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cardLink}
            >
              Follow on Instagram
            </a>
          </Card>
        </div>

        <Card className={styles.formContainer}>
          <h2 className={styles.formTitle}>Send a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`${styles.input} ${errors.name ? styles.error : ''}`}
                placeholder="Your name"
              />
              {errors.name && <p className={styles.errorText}>{errors.name}</p>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`${styles.input} ${errors.email ? styles.error : ''}`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className={styles.errorText}>{errors.email}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="subject" className={styles.label}>
                Subject (Optional)
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={styles.input}
                placeholder="What's this about?"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className={`${styles.textarea} ${errors.message ? styles.error : ''}`}
                placeholder="Your message here..."
              />
              {errors.message && (
                <p className={styles.errorText}>{errors.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <div ref={turnstileRef}></div>
              {errors.turnstile && (
                <p className={styles.errorText}>{errors.turnstile}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitButton}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {submitStatus === 'success' && (
              <p className={styles.successMessage}>
                Message sent successfully!
              </p>
            )}
            {submitStatus === 'error' && (
              <p className={styles.errorMessage}>
                Failed to send message. Please try again.
              </p>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ContactPage;
