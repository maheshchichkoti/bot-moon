export function PrivacyPolicy() {
  return (
    <div className="prose prose-invert max-w-none">
      <section id="information-we-collect" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
        <p className="mb-4">
          We collect information that you provide directly to us, including:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Email address and contact information</li>
          <li>Exchange API keys (with trading permissions only)</li>
          <li>Trading preferences and settings</li>
          <li>Communication records when you contact support</li>
        </ul>
      </section>

      <section id="how-we-use-information" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
        <p className="mb-4">
          We use the collected information for the following purposes:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>To provide and maintain our trading bot service</li>
          <li>To execute trades on your behalf using your API keys</li>
          <li>To communicate with you about your account and trades</li>
          <li>To improve our services and develop new features</li>
        </ul>
      </section>

      <section id="api-key-security" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">3. API Key Security</h2>
        <p className="mb-4">
          We take the security of your API keys extremely seriously:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>All API keys are encrypted using AES-256 encryption</li>
          <li>Keys are stored in isolated, secure environments</li>
          <li>We only request trading permissions, never withdrawal access</li>
          <li>Regular security audits are performed on our systems</li>
        </ul>
      </section>

      <section id="data-retention" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">4. Data Retention</h2>
        <p className="mb-4">
          We retain your information for as long as your account is active or as needed to provide services. You can request data deletion at any time by contacting support.
        </p>
      </section>

      <section id="third-party-services" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">5. Third-Party Services</h2>
        <p className="mb-4">
          We may use third-party services to:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Process payments</li>
          <li>Analyze service usage</li>
          <li>Provide customer support</li>
        </ul>
        <p>
          These services have their own privacy policies and may collect information as specified in their respective privacy statements.
        </p>
      </section>
    </div>
  );
}