import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function TermsAndConditions() {
  const [visibleSections, setVisibleSections] = useState([]);

  useEffect(() => {
    const sections = ['header', 'label', 'cancellation', 'freeCancellation', 'afterCancellation', 'dispatchCancellation', 'refunds', 'sellerCancellations', 'returns', 'eligibility', 'returnWindow', 'nonReturnable', 'initiateReturn', 'condition', 'processing', 'shippingCosts', 'footer'];

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
      <Navbar />
      <div style={styles.container}>
        <h1 style={{ ...styles.mainTitle, ...getSectionStyle('header') }}>
          Cancellation & Return Policy
        </h1>

        <div style={{ ...styles.sectionLabel, ...getSectionStyle('label') }}>
          CANCELLATION POLICY
        </div>

        <section style={{ ...styles.section, ...getSectionStyle('cancellation') }}>
          <h2 style={styles.sectionTitle}>Order Cancellation Before Shipping</h2>
          <p style={styles.paragraph}>
            You may cancel your order any time before it has been dispatched from our warehouse. Once the order is marked as "Shipped", cancellation is no longer available via self-service.
          </p>
        </section>

        <section style={{ ...styles.section, ...getSectionStyle('freeCancellation') }}>
          <h2 style={styles.sectionTitle}>Free Cancellation Window</h2>
          <p style={styles.paragraph}>
            Cancellations requested within 24 hours of order placement (and before dispatch) will be processed free of charge.
          </p>
        </section>

        <section style={{ ...styles.section, ...getSectionStyle('afterCancellation') }}>
          <h2 style={styles.sectionTitle}>Cancellation After Free Window</h2>
          <p style={styles.paragraph}>
            If you request cancellation after the free window but before dispatch, a nominal cancellation fee may apply to cover handling, packaging or logistic costs. (This fee will be communicated to you at cancellation request time.)
          </p>
        </section>

        <section style={{ ...styles.section, ...getSectionStyle('dispatchCancellation') }}>
          <h2 style={styles.sectionTitle}>Cancellation After Dispatch / On Delivery</h2>
          <p style={styles.paragraph}>
            After the order has been dispatched or is out for delivery, cancellation via our system is not permitted. You may refuse the delivery when the courier arrives — this will count as a return (see Return Policy below).
          </p>
        </section>

        <section style={{ ...styles.section, ...getSectionStyle('refunds') }}>
          <h2 style={styles.sectionTitle}>Refunds for Cancellations</h2>
          <p style={styles.paragraph}>
            For prepaid orders: Once cancellation is confirmed, refund will be initiated to the original payment method.<br />
            For Cash on Delivery (COD) orders: Since no prepaid amount was collected, no refund is needed.<br />
            Refund processing time: Generally within 7 business days depending on your bank or payment provider.
          </p>
        </section>

        <section style={{ ...styles.section, ...getSectionStyle('sellerCancellations') }}>
          <h2 style={styles.sectionTitle}>Seller / Store-Initiated Cancellations</h2>
          <p style={styles.paragraph}>
            If we cancel your order (e.g., due to out-of-stock, logistic issues), you will be notified and you will receive a full refund (if prepaid) without any deduction.
          </p>
        </section>

        <div style={{ ...styles.sectionLabel, ...getSectionStyle('returns') }}>
          RETURN & EXCHANGE POLICY
        </div>

        <section style={{ ...styles.section, ...getSectionStyle('eligibility') }}>
          <h2 style={styles.sectionTitle}>Eligibility for Returns/Exchanges</h2>
          <p style={styles.paragraph}>
            Items purchased from CCTV SHOPPEE are eligible for return or exchange if any of the following apply:<br />
            The item is defective, damaged in transit, or not as described.<br />
            Note: Products must be returned in unused condition, with all original packaging, accessories, manuals, and seal (if applicable).
          </p>
        </section>

        <section style={{ ...styles.section, ...getSectionStyle('returnWindow') }}>
          <h2 style={styles.sectionTitle}>Return Window</h2>
          <p style={styles.paragraph}>
            For most electronics and CCTV equipment: You have 7 calendar days from the date of delivery to initiate a return request.<br />
            For accessories, consumables or smaller items: We may offer a shorter return window (for example, 3-5 days). (The exact window will be clearly specified on the product page/checkout if different.)
          </p>
        </section>

        <section style={{ ...styles.section, ...getSectionStyle('nonReturnable') }}>
          <h2 style={styles.sectionTitle}>Non-Returnable Items</h2>
          <p style={styles.paragraph}>
            Some categories may be non-returnable, for example: items that have been installed, or items marked "non-returnable" on the product page. Please check the product listing before purchase.
          </p>
        </section>

        <section style={{ ...styles.section, ...getSectionStyle('initiateReturn') }}>
          <h2 style={styles.sectionTitle}>How to Initiate a Return/Exchange</h2>
          <p style={styles.paragraph}>
            Login to your account, go to "My Orders", select the item, and click "Return/Exchange".<br />
            Provide the reason for return and attach photos (if required) showing the defect/damage.<br />
            Our team will review your request and schedule a pickup (or instruct you on drop-off) at no extra cost if approved.
          </p>
        </section>

        <section style={{ ...styles.section, ...getSectionStyle('condition') }}>
          <h2 style={styles.sectionTitle}>Condition of Return</h2>
          <p style={styles.paragraph}>
            The product must be in its original condition, with all accessories, manuals, packaging intact.<br />
            If the returned item is found used, missing components, damaged beyond the reported issue, or not in the original packaging, CCTV SHOPPEE reserves the right to reject the return or apply a restocking/conversion fee.
          </p>
        </section>

        <section style={{ ...styles.section, ...getSectionStyle('processing') }}>
          <h2 style={styles.sectionTitle}>Refunds / Exchange Processing</h2>
          <p style={styles.paragraph}>
            Once we receive the returned item and inspect it, we will process your refund or dispatch your replacement/exchange.<br />
            Refunds will be credited via the original payment method and typically processed within 7 business days after approval.<br />
            If you choose exchange, we will dispatch the replacement once the returned item is approved/received.
          </p>
        </section>

        <section style={{ ...styles.section, ...getSectionStyle('shippingCosts') }}>
          <h2 style={styles.sectionTitle}>Shipping Costs & Restocking Fees</h2>
          <p style={styles.paragraph}>
            If the return is due to our error (wrong item, defective item, damage), we will bear the return shipping cost and no restocking fee will apply.<br />
            If the return is due to "change of mind" (if allowed for that category) or incorrect purchase, you may be responsible for the return shipping and any restocking fee that may apply (which will be clearly disclosed when you initiate the return).
          </p>
        </section>
      </div>
      <Footer />
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
    color: '#545556',
    marginBottom: '30px',
    marginTop: '40px',
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