// pages/terms-of-service.js

import Head from 'next/head';
import styles from '@/styles/Policy.module.css';

const TermsOfService = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Terms of Service | Andreas Hustad</title>
        <meta
          name="description"
          content="Terms of Service of andreashustad.com"
        />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Terms of Service</h1>
        <p className={styles.date}>Last updated: 22 October 2024</p>

        <p>
          These Terms of Service (&quot;Terms&quot;) govern your access to and
          use of andreashustad.com (the &quot;Website&quot;). By accessing or
          using the Website, you agree to be bound by these Terms in compliance
          with Norwegian law and the General Data Protection Regulation (GDPR).
          If you disagree with any part of the Terms, you may not access the
          Website.
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing andreashustad.com, you confirm that you have read and
          understood these Terms and that you agree to be bound by them. These
          Terms apply to all visitors, users, and others who access or use the
          Website.
        </p>

        <h2>2. Intellectual Property Rights</h2>
        <p>
          All content, features, and functionality (including but not limited to
          text, graphics, images, and software) on the Website are the exclusive
          property of Andreas Hustad and are protected by Norwegian copyright
          law, trademark law, and applicable intellectual property laws. You may
          not reproduce, distribute, modify, or create derivative works of any
          part of the Website without prior written permission.
        </p>

        <h2>3. Data Protection and Privacy</h2>
        <p>
          Your privacy is important to us. All personal data collected through
          your use of the Website will be processed in accordance with our
          Privacy Policy and applicable Norwegian laws, including the GDPR. By
          using the Website, you consent to the processing of your personal data
          as outlined in our Privacy Policy.
        </p>

        <h2>4. Use of the Website</h2>
        <p>
          You agree not to use the Website for any unlawful purposes or in a way
          that may impair the functionality of the Website or interfere with
          others&apos; access to the Website. You may not attempt to gain
          unauthorized access to any portion of the Website or the servers
          hosting the Website.
        </p>

        <h2>5. Termination</h2>
        <p>
          We reserve the right to terminate or suspend your access to the
          Website immediately, without prior notice, if you breach these Terms
          or for any other reason at our sole discretion. Upon termination, your
          right to use the Website will cease immediately.
        </p>

        <h2>6. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by Norwegian law, Andreas Hustad will
          not be liable for any indirect, incidental, or consequential damages
          resulting from your use of the Website, nor for any loss of data,
          revenue, or profit. We provide the Website &quot;as is&quot; and make
          no guarantees regarding its accuracy, availability, or reliability.
        </p>

        <h2>7. Governing Law</h2>
        <p>
          These Terms are governed by and construed in accordance with the laws
          of Norway, without regard to its conflict of law provisions. Any
          disputes arising from these Terms shall be resolved in the Norwegian
          courts.
        </p>

        <h2>8. Changes to Terms</h2>
        <p>
          We reserve the right to modify or replace these Terms at any time in
          compliance with applicable Norwegian laws. If changes are made, we
          will notify you by updating the &quot;Last Updated&quot; date on this
          page. Your continued use of the Website after the changes become
          effective constitutes your acceptance of the new Terms.
        </p>

        <h2>9. Contact Us</h2>
        <p>
          If you have any questions or concerns about these Terms, please
          contact us at{' '}
          <a href="mailto:contact@andreashustad.com">
            contact@andreashustad.com
          </a>
          .
        </p>
      </main>
    </div>
  );
};

export default TermsOfService;
