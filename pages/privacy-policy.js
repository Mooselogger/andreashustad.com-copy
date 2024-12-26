// pages/privacy-policy.js

import Head from 'next/head';
import styles from '@/styles/Policy.module.css';

const PrivacyPolicy = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Privacy Policy | Andreas Hustad</title>
        <meta
          name="description"
          content="Privacy Policy of andreashustad.com"
        />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.date}>Last updated: 22 October 2024</p>
        <div className={styles.content}>
          <p>
            Welcome to andreashustad.com. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your personal data in
            compliance with the General Data Protection Regulation (GDPR) and
            Norwegian privacy laws.
          </p>
          <p>
            By using this website, you agree to the terms outlined in this
            Privacy Policy.
          </p>
          <h2>Information We Collect</h2>
          <p>
            We may collect personal data directly from you, including but not
            limited to:
          </p>
          <ul>
            <li>
              Personal Identification Information: Name, email address, and
              other contact details when you subscribe to newsletters or contact
              us.
            </li>
            <li>
              Usage Data: Information on how you access and use the website,
              such as your IP address, browser type, pages visited, and time
              spent on pages. This is collected through cookies and analytics
              tools.
            </li>
          </ul>
          <h2>How We Use Your Data</h2>
          <p>
            We process your personal data based on legitimate interests and
            consent to:
          </p>
          <ul>
            <li>
              Improve User Experience: Personalize your experience by
              understanding how users interact with the website.
            </li>
            <li>
              Improve Services: Enhance the functionality of andreashustad.com
              by analyzing user behavior.
            </li>
            <li>
              Communications: Send you newsletters and updates if you have
              subscribed, or respond to your inquiries.
            </li>
          </ul>
          <h2>Legal Basis for Processing</h2>
          <p>
            We collect and process your personal data based on the following
            legal grounds:
          </p>
          <ul>
            <li>
              Consent: Where required, we ask for your explicit consent to
              process your data, particularly in relation to newsletters.
            </li>
            <li>
              Legitimate Interest: We process data to improve our website&apos;s
              performance and offer a better user experience.
            </li>
            <li>
              Compliance with Legal Obligations: We may process your data to
              comply with Norwegian laws or respond to legal requests.
            </li>
          </ul>
          <h2>Data Retention</h2>
          <p>
            We only retain your personal data for as long as necessary to
            fulfill the purposes for which it was collected or to comply with
            legal obligations. For newsletter subscriptions, we retain your data
            until you choose to unsubscribe.
          </p>
          <h2>Your Rights Under GDPR</h2>
          <p>
            As a user based in Norway or the EU, you have the following rights
            regarding your personal data:
          </p>
          <ul>
            <li>
              Right to Access: You can request details of the personal data we
              hold about you.
            </li>
            <li>
              Right to Rectification: You can ask us to correct inaccurate or
              incomplete personal data.
            </li>
            <li>
              Right to Erasure (&quot;Right to be Forgotten&quot;): You can
              request that we delete your personal data, subject to legal
              obligations.
            </li>
            <li>
              Right to Object: You can object to the processing of your personal
              data for direct marketing purposes.
            </li>
            <li>
              Right to Data Portability: You can request a copy of your personal
              data in a machine-readable format.
            </li>
          </ul>
          <p>
            If you wish to exercise any of these rights, please contact us at{' '}
            <a href="mailto:contact@andreashustad.com">
              contact@andreashustad.com
            </a>
            .
          </p>
          <h2>Sharing Your Data</h2>
          <p>
            We do not sell, trade, or rent your personal data to others.
            However, we may share your data with:
          </p>
          <ul>
            <li>
              Third-Party Service Providers: To help operate the website (e.g.,
              hosting services, analytics tools) under strict data protection
              agreements.
            </li>
            <li>
              Legal Obligations: If required by law, or to protect our rights,
              we may disclose your data to comply with legal processes.
            </li>
          </ul>
          <h2>Data Transfers Outside the EEA</h2>
          <p>
            If any personal data is transferred outside of the European Economic
            Area (EEA), we ensure that it is protected by appropriate safeguards
            as required by GDPR.
          </p>
          <h2>Cookies</h2>
          <p>
            Our site uses cookies to improve user experience and analyze web
            traffic. You can manage your cookie preferences through your browser
            settings. For more details, please see our Cookie Policy.
          </p>
          <h2>Security of Your Data</h2>
          <p>
            We implement appropriate security measures to protect your personal
            data from unauthorized access, disclosure, alteration, or
            destruction. However, no method of transmission over the internet is
            100% secure, and we cannot guarantee absolute security.
          </p>
          <h2>Changes to This Privacy Policy</h2>
          <p>
            We reserve the right to update this Privacy Policy at any time. If
            changes are made, we will post a notice on the main page of our site
            and update the &quot;Last Updated&quot; date. Continued use of the
            site after any changes constitutes your acceptance of the new terms.
          </p>
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or your personal
            data, please contact us at:{' '}
            <a href="mailto:contact@andreashustad.com">
              contact@andreashustad.com
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
