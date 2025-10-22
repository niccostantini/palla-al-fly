import React from 'react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        
        <div className="space-y-4 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
            <p>
              When you use Palla al Fly, we collect the following information:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Email address (for authentication)</li>
              <li>Name and phone number (when signing up for matches)</li>
              <li>Match participation data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
            <p>
              We use your information to:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Manage your account and authentication</li>
              <li>Organize volleyball matches and rosters</li>
              <li>Send notifications about matches you're registered for</li>
              <li>Communicate with other participants</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. Data Sharing</h2>
            <p>
              Your name and phone number are visible to authenticated users when you sign up for a match. 
              We do not share your information with third parties except as necessary to provide our services 
              (e.g., authentication providers, notification services).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information. 
              Your data is stored securely using industry-standard practices.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Access your personal data</li>
              <li>Request deletion of your account and data</li>
              <li>Opt out of notifications</li>
              <li>Update your information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">6. Contact</h2>
            <p>
              For privacy-related questions or requests, please contact the administrator.
            </p>
          </section>

          <section>
            <p className="text-sm text-gray-500 mt-6">
              Last updated: {new Date().toLocaleDateString('it-IT')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
