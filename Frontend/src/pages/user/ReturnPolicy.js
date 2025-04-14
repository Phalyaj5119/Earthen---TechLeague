import React from 'react';
import './ReturnPolicy.css';

export default function ReturnPolicy() {
  return (
    <div className="return-policy-container">
      <h2>🔁 Return Policy</h2>
      <p>
        We want you to love your home. If you’re not completely satisfied with your purchase, we’re here to help!
      </p>

      <h3>Eligibility</h3>
      <ul>
        <li>Returns accepted within 10 days of delivery</li>
        <li>Item must be in original packaging and unused condition</li>
        <li>Furniture or large items may incur return shipping charges</li>
      </ul>

      <h3>How to Request a Return</h3>
      <ol>
        <li>Go to your user dashboard</li>
        <li>Click on “Order History”</li>
        <li>Find the order and click “Request Return”</li>
        <li>We'll guide you through the return process</li>
      </ol>

      <h3>Refunds</h3>
      <p>
        Refunds are processed within 7–10 business days after we receive and inspect the returned item.
      </p>
    </div>
  );
}
