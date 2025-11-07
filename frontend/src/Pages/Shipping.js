import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function TermsAndConditions() {
    const [visibleSections, setVisibleSections] = useState([]);

    useEffect(() => {
        const sections = ['header', 'label', 'section1', 'section2', 'section3', 'section4', 'section5', 'section6', 'footer'];

        sections.forEach((section, index) => {
            setTimeout(() => {
                setVisibleSections(prev => [...prev, section]);
            }, index * 200);
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
                    Terms and Conditions
                </h1>

                <div style={{ ...styles.sectionLabel, ...getSectionStyle('label') }}>
                    ABOUT THIS AGREEMENT
                </div>

                <section style={{ ...styles.section, ...getSectionStyle('section1') }}>
                    <h2 style={styles.sectionTitle}>1.1 About</h2>
                    <p style={styles.paragraph}>
                        This agreement governs Customer free testing, usage and subscription of DealsDistributed.com services.
                        "services" means the web-based application service provided at DealsDistributed.com, including associated
                        online and offline components.
                    </p>
                </section>

                <section style={{ ...styles.section, ...getSectionStyle('section2') }}>
                    <h2 style={styles.sectionTitle}>1.2 Contracting Parties</h2>
                    <p style={styles.paragraph}>
                        This agreement is effective between you, herein referred to as the ("Customer") and Dealium Limited,
                        c���o Ardagh Consultants, Main Street, Tullyallen, Co. Louth, Ireland. Company number 483471, herein
                        referred to as the ("Service Provider")
                    </p>
                </section>

                <section style={{ ...styles.section, ...getSectionStyle('section3') }}>
                    <h2 style={styles.sectionTitle}>1.3. Relationship of the Parties.</h2>
                    <p style={styles.paragraph}>
                        The parties are independent contractors. This Agreement does not create a partnership, franchise, joint
                        venture, agency, fiduciary or employment relationship between the parties.
                    </p>
                </section>

                <section style={{ ...styles.section, ...getSectionStyle('section4') }}>
                    <h2 style={styles.sectionTitle}>1.4 Acceptance</h2>
                    <p style={styles.paragraph}>
                        This agreement and its terms and conditions will be accepted by the Customer by signing this agreement and
                        the Order form referencing this agreement.
                    </p>
                </section>

                <section style={{ ...styles.section, ...getSectionStyle('section5') }}>
                    <h2 style={styles.sectionTitle}>1.5 Version</h2>
                    <p style={styles.paragraph}>
                        This agreement is effective from the date of the Customer's last acceptance in its actual version.
                    </p>
                </section>

                <section style={{ ...styles.section, ...getSectionStyle('section6') }}>
                    <h2 style={styles.sectionTitle}>1.6 Update</h2>
                    <p style={styles.paragraph}>
                        It was last updated on June 15th, 2014.
                    </p>
                </section>

                <div style={{ ...styles.footer, ...getSectionStyle('footer') }}>
                    <span style={styles.readNext}>Read next:</span>
                    <button
                        style={styles.button}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#00b8d4';
                            e.target.style.color = '#fff';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                            e.target.style.color = '#00b8d4';
                        }}
                    >
                        FREE TESTING
                    </button>
                </div>
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
        marginBottom: '50px',
        color: '#2d3436',
    },
    sectionLabel: {
        fontSize: '11px',
        fontWeight: '600',
        letterSpacing: '1.5px',
        color: '#dfe6e9',
        marginBottom: '30px',
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
        marginBottom: '0',
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