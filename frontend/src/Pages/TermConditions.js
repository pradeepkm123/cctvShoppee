import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function TermsAndConditions() {
    const [visibleSections, setVisibleSections] = useState([]);

    useEffect(() => {
        const sections = ['header', 'lastUpdated', 'intro', 'section1', 'section2', 'section3', 'section4', 'section5', 'section6', 'section7', 'section8', 'section9', 'section10', 'section11', 'section12', 'section13', 'section14', 'section15', 'section16', 'section17', 'section18', 'footer'];

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
                <h1 style={{ ...styles.mainTitle, ...getSectionStyle('header') }}>
                    ⚖️ TERMS & CONDITIONS
                </h1>

                <div style={{ ...styles.lastUpdated, ...getSectionStyle('lastUpdated') }}>
                    Last Updated: November 2025
                </div>

                <section style={{ ...styles.section, ...getSectionStyle('intro') }}>
                    <p style={styles.paragraph}>
                        Welcome to CCTV SHOPPEE ("Company," "we," "our," "us"). These Terms & Conditions ("Terms") govern your access to and use of our website www.cctvshoppee.com, mobile site, or mobile application (collectively referred to as the "Platform").
                    </p>
                    <p style={styles.paragraph}>
                        By accessing or using the Platform, you agree to be bound by these Terms. Please read them carefully before using our services. If you do not agree, you may not access or use our Platform.
                    </p>
                </section>

                <section style={{ ...styles.section, ...getSectionStyle('section1') }}>
                    <h2 style={styles.sectionTitle}>1. General</h2>
                    <p style={styles.paragraph}>
                        <strong>1.1</strong> CCTV SHOPPEE is an online marketplace and service provider for CCTV cameras, NVR/DVR systems, accessories, and related electronics.<br/>
                        <strong>1.2</strong> Use of the Platform and all transactions are governed by the laws of India.<br/>
                        <strong>1.3</strong> We reserve the right to modify, suspend, or discontinue any part of the Platform without prior notice.
                    </p>
                </section>

                <section style={{ ...styles.section, ...getSectionStyle('section2') }}>
                    <h2 style={styles.sectionTitle}>2. Eligibility</h2>
                    <p style={styles.paragraph}>
                        <strong>2.1</strong> Use of this Platform is available only to persons who can form a legally binding contract under the Indian Contract Act, 1872.<br/>
                        <strong>2.2</strong> If you are under 18 years of age, you may use the Platform only with the involvement of a parent or guardian.
                    </p>
                </section>

                <section style={{ ...styles.section, ...getSectionStyle('section3') }}>
                    <h2 style={styles.sectionTitle}>3. Account Registration</h2>
                    <p style={styles.paragraph}>
                        <strong>3.1</strong> To access certain features, you may be required to register an account by providing accurate and complete details.<br/>
                        <strong>3.2</strong> You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account.<br/>
                        <strong>3.3</strong> You agree to notify us immediately of any unauthorized use of your account.
                    </p>
                </section>

                <section style={{ ...styles.section, ...getSectionStyle('section4') }}>
                    <h2 style={styles.sectionTitle}>4. Products and Services</h2>
                    <p style={styles.paragraph}>
                        <strong>4.1</strong> All products listed on the Platform are described and displayed as accurately as possible. However, CCTV SHOPPEE does not guarantee that descriptions, images, or specifications are error-free.<br/>
                        <strong>4.2</strong> We reserve the right to modify or discontinue products without prior notice.<br/>
                        <strong>4.3</strong> All product prices are in Indian Rupees (INR) and inclusive/exclusive of applicable taxes as indicated.
                    </p>
                </section>

                <section style={{ ...styles.section, ...getSectionStyle('section5') }}>
                    <h2 style={styles.sectionTitle}>5. Pricing and Payment</h2>
                    <p style={styles.paragraph}>
                        <strong>5.1</strong> Prices and availability of products are subject to change without notice.<br/>
                        <strong>5.2</strong> We make every effort to ensure accurate pricing; however, in case of any pricing error, we reserve the right to cancel the order.<br/>
                        <strong>5.3</strong> Payments can be made via debit/credit card, UPI, net banking, wallet, or Cash on Delivery (where available).<br/>
                        <strong>5.4</strong> All payments are processed through secure, PCI-DSS-compliant payment gateways.
                    </p>
                </section>

                <section style={{ ...styles.section, ...getSectionStyle('section6') }}>
                    <h2 style={styles.sectionTitle}>6. Order Acceptance and Cancellation</h2>
                    <p style={styles.paragraph}>
                        <strong>6.1</strong> Once you place an order, you will receive an order confirmation email or SMS.<br/>
                        <strong>6.2</strong> Your order constitutes an offer to purchase, and we reserve the right to accept or reject it.<br/>
                        <strong>6.3</strong> Orders may be cancelled by us due to reasons including stock unavailability, pricing errors, or payment issues.<br/>
                        <strong>6.4</strong> You may cancel your order before dispatch, as per our Cancellation & Return Policy.
                    </p>
                </section>

                <section style={{ ...styles.section, ...getSectionStyle('section7') }}>
                    <h2 style={styles.sectionTitle}>7. Shipping and Delivery</h2>
                    <p style={styles.paragraph}>
                        <strong>7.1</strong> We aim to dispatch all confirmed orders within the estimated delivery timeline. However, delays may occur due to logistics or unforeseen circumstances.<br/>
                        <strong>7.2</strong> Title and risk of loss for products pass to you upon delivery.<br/>
                        <strong>7.3</strong> In case of delayed or failed delivery due to incorrect address or unavailability, re-delivery charges may apply.
                    </p>
                </section>

                <section style={{ ...styles.section, ...getSectionStyle('section8') }}>
                    <h2 style={styles.sectionTitle}>8. Returns, Replacements, and Refunds</h2>
                    <p style={styles.paragraph}>
                        <strong>8.1</strong> Please refer to our separate Cancellation & Return Policy for details on return eligibility and refund processing.<br/>
                        <strong>8.2</strong> Refunds (if applicable) will be issued to the original payment method within the specified time frame.
                    </p>
                </section>

                <section style={{ ...styles.section, ...getSectionStyle('section9') }}>
                    <h2 style={styles.sectionTitle}>9. Warranty and Installation</h2>
                    <p style={styles.paragraph}>
                        <strong>9.1</strong> All products sold by CCTV SHOPPEE come with standard manufacturer warranty unless otherwise stated.<br/>
                        <strong>9.2</strong> Warranty coverage is subject to the manufacturer's terms and may exclude physical damage, misuse, or unauthorized repair.<br/>
                        <strong>9.3</strong> Installation and configuration services may be provided separately upon request, either by our technicians or authorized partners.
                    </p>
                </section>

                <section style={{ ...styles.section, ...getSectionStyle('section10') }}>
                    <h2 style={styles.sectionTitle}>10. User Conduct</h2>
                    <p style={styles.paragraph}>
                        You agree not to:
                    </p>
                    <ul style={styles.list}>
                        <li>Use the Platform for unlawful or fraudulent purposes.</li>
                        <li>Upload viruses, malware, or harmful scripts.</li>
                        <li>Violate intellectual property rights of CCTV SHOPPEE or others.</li>
                        <li>Post offensive, abusive, or misleading content.</li>
                        <li>Attempt to gain unauthorized access to our systems.</li>
                    </ul>
                    <p style={styles.paragraph}>
                        Violation of these rules may result in suspension or termination of your account.
                    </p>
                </section>

                <section style={{ ...styles.section, ...getSectionStyle('section11') }}>
                    <h2 style={styles.sectionTitle}>11. Intellectual Property</h2>
                    <p style={styles.paragraph}>
                        <strong>11.1</strong> All trademarks, logos, product images, and content on the Platform are the property of CCTV SHOPPEE or their respective owners.<br/>
                        <strong>11.2</strong> You may not copy, reproduce, or modify any part of the Platform without prior written permission.
                    </p>
                </section>

                <section style={{ ...styles.section, ...getSectionStyle('section12') }}>
                    <h2 style={styles.sectionTitle}>12. Third-Party Links</h2>
                    <p style={styles.paragraph}>
                        Our Platform may include links to external websites (e.g., courier, payment, or service partners). We are not responsible for the content, reliability, or privacy practices of such third-party sites.
                    </p>
                </section>

                <section style={{ ...styles.section, ...getSectionStyle('section13') }}>
                    <h2 style={styles.sectionTitle}>13. Limitation of Liability</h2>
                    <p style={styles.paragraph}>
                        <strong>13.1</strong> To the maximum extent permitted by law, CCTV SHOPPEE shall not be liable for any indirect, incidental, or consequential damages arising from the use or inability to use our Platform or products.<br/>
                        <strong>13.2</strong> Our total aggregate liability shall not exceed the amount paid by you for the specific order that gave rise to the claim.
                    </p>
                </section>

                <section style={{ ...styles.section, ...getSectionStyle('section14') }}>
                    <h2 style={styles.sectionTitle}>14. Indemnification</h2>
                    <p style={styles.paragraph}>
                        You agree to indemnify and hold harmless CCTV SHOPPEE, its employees, affiliates, and partners from any claims, losses, or damages resulting from your violation of these Terms or misuse of the Platform.
                    </p>
                </section>

                <section style={{ ...styles.section, ...getSectionStyle('section15') }}>
                    <h2 style={styles.sectionTitle}>15. Privacy</h2>
                    <p style={styles.paragraph}>
                        Your use of the Platform is also governed by our Privacy Policy, which outlines how your data is collected and used.
                    </p>
                </section>

                <section style={{ ...styles.section, ...getSectionStyle('section16') }}>
                    <h2 style={styles.sectionTitle}>16. Termination</h2>
                    <p style={styles.paragraph}>
                        We may suspend or terminate your access if you violate these Terms or engage in fraudulent or unlawful activities. Upon termination, your right to use the Platform will immediately cease.
                    </p>
                </section>

                <section style={{ ...styles.section, ...getSectionStyle('section17') }}>
                    <h2 style={styles.sectionTitle}>17. Governing Law and Jurisdiction</h2>
                    <p style={styles.paragraph}>
                        These Terms are governed by the laws of India, and any disputes shall be subject to the exclusive jurisdiction of the courts in [Your City], India.
                    </p>
                </section>

                <section style={{ ...styles.section, ...getSectionStyle('section18') }}>
                    <h2 style={styles.sectionTitle}>18. Contact Information</h2>
                    <p style={styles.paragraph}>
                        For questions or concerns regarding these Terms, please contact:
                    </p>
                    <div style={styles.contactInfo}>
                        <p><strong>CCTV SHOPPEE</strong></p>
                        <p>📧 Email: <span style={styles.email}>support@cctvshoppee.com</span></p>
                        <p>📞 Phone: [Insert Helpline Number]</p>
                        <p>🏢 Address: [Insert Registered Office Address]</p>
                    </div>
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