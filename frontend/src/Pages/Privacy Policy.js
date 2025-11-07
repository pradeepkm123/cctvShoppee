import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function TermsAndConditions() {
  const [visibleSections, setVisibleSections] = useState([]);

  useEffect(() => {
    const sections = ['header', 'lastUpdated', 'disclaimer', 'intro', 'section1', 'section2', 'section3', 'section4', 'section5', 'section6', 'section7', 'section8', 'section9', 'section10', 'section11', 'section12', 'footer'];
    
    sections.forEach((section, index) => {
      setTimeout(() => {
        setVisibleSections(prev => [...prev, section]);
      }, index * 150);
    });
  }, []);

  const getSectionStyle = (sectionName) => ({
    ...styles.fadeIn,
    opacity: visibleSections.includes(sectionName) ? 1 : 0,
    transform: visibleSections.includes(sectionName) ? 'translateY(0)' : 'translateY(20px)',
  });

  return (
    <div>
        <Navbar/>
        <div style={styles.container}>
      <h1 style={{...styles.mainTitle, ...getSectionStyle('header')}}>
        PRIVACY POLICY
      </h1>
      
      <div style={{...styles.lastUpdated, ...getSectionStyle('lastUpdated')}}>
        Last Updated: November 2025
      </div>

      <section style={{...styles.section, ...getSectionStyle('disclaimer')}}>
        <p style={styles.paragraph}>
          <strong>Disclaimer:</strong> In case of any discrepancy or difference, the English version of this Privacy Policy will take precedence over any translation.
        </p>
      </section>
      
      <section style={{...styles.section, ...getSectionStyle('intro')}}>
        <p style={styles.paragraph}>
          We, at CCTV SHOPPEE ("Company", "we", "our", "us"), value the trust you place in us and recognize the importance of secure transactions and information privacy. This Privacy Policy explains how CCTV SHOPPEE and its affiliates collect, use, share, and protect your personal data when you visit or make a purchase through our website www.cctvshoppee.com, our mobile application, or any other related platform (collectively referred to as the "Platform").
        </p>
        <p style={styles.paragraph}>
          By visiting or using our Platform, you agree to this Privacy Policy and the Terms of Use. If you do not agree, please do not use or access our Platform.
        </p>
      </section>

      <section style={{...styles.section, ...getSectionStyle('section1')}}>
        <h2 style={styles.sectionTitle}>1. Collection of Your Information</h2>
        <p style={styles.paragraph}>
          When you use our Platform, we collect information that you provide from time to time. Once you share personal data, you are not anonymous to us. You always have the option not to provide certain information by choosing not to use a specific service or feature.
        </p>
        <p style={styles.paragraph}>
          We collect and store:
        </p>
        <ul style={styles.list}>
          <li><strong>Personal Information:</strong> name, phone number, email address, billing and shipping address, payment method details, and any communication you share with us.</li>
          <li><strong>Automatically Collected Information:</strong> your device type, browser, IP address, location, pages visited, and cookies for session management and analytics.</li>
          <li><strong>Communication Data:</strong> messages, emails, or feedback shared with our support team.</li>
          <li><strong>Order & Transaction Data:</strong> information about items purchased, payment mode, and delivery preferences.</li>
        </ul>
        <p style={styles.paragraph}>
          We may analyze your data (such as purchase history, browsing patterns, and preferences) to improve your shopping experience and personalize our offers.
        </p>
      </section>

      <section style={{...styles.section, ...getSectionStyle('section2')}}>
        <h2 style={styles.sectionTitle}>2. Use of Your Information</h2>
        <p style={styles.paragraph}>
          We use your personal data to:
        </p>
        <ul style={styles.list}>
          <li>Process and fulfill your orders, and deliver products or services.</li>
          <li>Communicate about orders, shipments, offers, and promotions.</li>
          <li>Improve our Platform, user interface, and customer service.</li>
          <li>Detect and prevent fraud, unauthorized access, or illegal activities.</li>
          <li>Provide technical support and resolve disputes.</li>
          <li>Comply with legal and regulatory obligations.</li>
        </ul>
        <p style={styles.paragraph}>
          With your consent, we may send you marketing or promotional communications. You can opt out at any time.
        </p>
      </section>

      <section style={{...styles.section, ...getSectionStyle('section3')}}>
        <h2 style={styles.sectionTitle}>3. Cookies and Tracking Technologies</h2>
        <p style={styles.paragraph}>
          We use cookies and similar tools to improve user experience, measure website performance, and remember your preferences.
        </p>
        <ul style={styles.list}>
          <li><strong>Session Cookies</strong> help you stay logged in and expire when you close your browser.</li>
          <li><strong>Analytical Cookies</strong> (e.g., Google Analytics) help us understand site traffic and improve our services.</li>
        </ul>
        <p style={styles.paragraph}>
          You can disable cookies via your browser settings, though some features of the site may not function properly.
        </p>
      </section>

      <section style={{...styles.section, ...getSectionStyle('section4')}}>
        <h2 style={styles.sectionTitle}>4. Sharing of Personal Data</h2>
        <p style={styles.paragraph}>
          We do not sell or rent your personal data. We may share limited information with:
        </p>
        <ul style={styles.list}>
          <li><strong>Delivery & Logistics Partners:</strong> for product shipping and tracking.</li>
          <li><strong>Payment Gateways:</strong> to securely process your transactions.</li>
          <li><strong>Service Providers:</strong> IT support, analytics, and marketing agencies under confidentiality obligations.</li>
          <li><strong>Legal Authorities:</strong> when required to comply with law or prevent fraud.</li>
        </ul>
        <p style={styles.paragraph}>
          If our business merges or is acquired, your data may be transferred to the new entity subject to this same Privacy Policy.
        </p>
      </section>

      <section style={{...styles.section, ...getSectionStyle('section5')}}>
        <h2 style={styles.sectionTitle}>5. Data Security</h2>
        <p style={styles.paragraph}>
          We use industry-standard measures such as:
        </p>
        <ul style={styles.list}>
          <li>SSL encryption for all transactions.</li>
          <li>Restricted data access by authorized personnel only.</li>
          <li>Regular system monitoring and firewalls.</li>
        </ul>
        <p style={styles.paragraph}>
          While we take all precautions, no system is completely secure, and we cannot guarantee absolute protection against unauthorized access.
        </p>
      </section>

      <section style={{...styles.section, ...getSectionStyle('section6')}}>
        <h2 style={styles.sectionTitle}>6. Your Rights & Choices</h2>
        <p style={styles.paragraph}>
          You have the right to:
        </p>
        <ul style={styles.list}>
          <li>Access, review, and correct your stored information.</li>
          <li>Request deletion of your personal data (except where legally required to retain it).</li>
          <li>Opt out of marketing communications.</li>
          <li>Withdraw previously given consent.</li>
        </ul>
        <p style={styles.paragraph}>
          To exercise your rights, please email us at <span style={styles.email}>privacy@cctvshoppee.com</span>.
        </p>
      </section>

      <section style={{...styles.section, ...getSectionStyle('section7')}}>
        <h2 style={styles.sectionTitle}>7. Retention of Information</h2>
        <p style={styles.paragraph}>
          We retain your data only for as long as necessary to:
        </p>
        <ul style={styles.list}>
          <li>Complete transactions and provide after-sales support.</li>
          <li>Comply with legal, accounting, and warranty obligations.</li>
        </ul>
        <p style={styles.paragraph}>
          After this period, your data is securely deleted or anonymized.
        </p>
      </section>

      <section style={{...styles.section, ...getSectionStyle('section8')}}>
        <h2 style={styles.sectionTitle}>8. Third-Party Links</h2>
        <p style={styles.paragraph}>
          Our Platform may contain links to external websites such as courier partners or payment gateways. We are not responsible for their privacy practices. Please review their policies before sharing your information.
        </p>
      </section>

      <section style={{...styles.section, ...getSectionStyle('section9')}}>
        <h2 style={styles.sectionTitle}>9. Children's Information</h2>
        <p style={styles.paragraph}>
          Our services are intended only for individuals aged 18 and above. We do not knowingly collect personal data from minors. If such data is found, we will delete it immediately.
        </p>
      </section>

      <section style={{...styles.section, ...getSectionStyle('section10')}}>
        <h2 style={styles.sectionTitle}>10. Advertisements & Marketing</h2>
        <p style={styles.paragraph}>
          We may partner with third-party service providers to display advertisements or run promotions relevant to your interests. These partners may use cookies but do not receive your personal details like name or contact number. You can opt out of personalized ads through your device or browser settings.
        </p>
      </section>

      <section style={{...styles.section, ...getSectionStyle('section11')}}>
        <h2 style={styles.sectionTitle}>11. Changes to This Policy</h2>
        <p style={styles.paragraph}>
          CCTV SHOPPEE reserves the right to modify or update this Privacy Policy at any time. The "Last Updated" date at the top reflects the most recent changes. Continued use of our Platform after updates means you accept the revised terms.
        </p>
      </section>

      <section style={{...styles.section, ...getSectionStyle('section12')}}>
        <h2 style={styles.sectionTitle}>12. Contact & Grievance Officer</h2>
        <p style={styles.paragraph}>
          In compliance with the Information Technology Act, 2000 and applicable rules, our Grievance Officer details are below:
        </p>
        <div style={styles.contactInfo}>
          <p><strong>Mr. [Insert Name]</strong></p>
          <p>Designation: Privacy & Compliance Officer</p>
          <p>CCTV SHOPPEE</p>
          <p>[Insert Full Office Address]</p>
          <p>📧 Email: <span style={styles.email}>privacy@cctvshoppee.com</span></p>
          <p>📞 Phone: [Insert Contact Number]</p>
        </div>
        <p style={styles.paragraph}>
          For product or service-related support, please reach our customer support team at <span style={styles.email}>support@cctvshoppee.com</span> or visit our Help Centre.
        </p>
      </section>
    </div>
    <Footer/>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    color: '#333',
    lineHeight: '1.6',
  },
  fadeIn: {
    transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
  },
  mainTitle: {
    fontSize: '42px',
    fontWeight: '700',
    marginBottom: '20px',
    color: '#2d3436',
  },
  lastUpdated: {
    fontSize: '14px',
    color: '#636e72',
    marginBottom: '30px',
    fontStyle: 'italic',
  },
  section: {
    marginBottom: '40px',
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '15px',
    color: '#2d3436',
  },
  paragraph: {
    fontSize: '15px',
    color: '#636e72',
    lineHeight: '1.8',
    marginBottom: '15px',
  },
  list: {
    fontSize: '15px',
    color: '#636e72',
    lineHeight: '1.8',
    marginBottom: '15px',
    paddingLeft: '20px',
  },
  contactInfo: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    margin: '15px 0',
    borderLeft: '4px solid #00b8d4',
  },
  email: {
    color: '#00b8d4',
    fontWeight: '500',
  },
  footer: {
    marginTop: '60px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  readNext: {
    fontSize: '14px',
    color: '#dfe6e9',
  },
  button: {
    padding: '12px 28px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#00b8d4',
    backgroundColor: 'transparent',
    border: '2px solid #00b8d4',
    borderRadius: '25px',
    cursor: 'pointer',
    letterSpacing: '0.5px',
    transition: 'all 0.3s ease',
  },
};