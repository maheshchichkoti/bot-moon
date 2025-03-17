export function TermsOfUse() {
  return (
    <div className="prose prose-invert max-w-none">
      <section id="license" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">1. License</h2>
        <p className="mb-4">
          Upon purchase, you are granted a lifetime, non-exclusive, non-transferable license to use our trading bot service under these terms.
        </p>
      </section>

      <section id="payment-terms" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">2. Payment Terms</h2>
        <p className="mb-4">
          Our fee structure consists of:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>One-time payment of $50 USDT for lifetime access</li>
          <li>20% fee on profitable trades only</li>
          <li>No monthly subscriptions or hidden fees</li>
        </ul>
      </section>

      <section id="user-responsibilities" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">3. User Responsibilities</h2>
        <p className="mb-4">
          As a user, you are responsible for:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Maintaining the security of your API keys</li>
          <li>Ensuring sufficient funds for trading</li>
          <li>Monitoring your trading activity</li>
          <li>Complying with your local regulations</li>
        </ul>
      </section>

      <section id="limitation-liability" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">4. Limitation of Liability</h2>
        <p className="mb-4">
          We are not liable for:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Trading losses or missed opportunities</li>
          <li>Market volatility or exchange downtime</li>
          <li>Technical issues beyond our control</li>
          <li>Indirect or consequential damages</li>
        </ul>
      </section>

      <section id="termination" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">5. Termination</h2>
        <p className="mb-4">
          We reserve the right to terminate service:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>For violation of these terms</li>
          <li>For suspicious or fraudulent activity</li>
          <li>To comply with legal requirements</li>
        </ul>
      </section>
    </div>
  );
}