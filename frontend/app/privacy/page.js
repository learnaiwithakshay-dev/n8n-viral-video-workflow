export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              1. Information We Collect
            </h2>
            <p className="text-gray-600 mb-6">
              We collect minimal information necessary to provide our service:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>Instagram access tokens (temporarily stored for posting)</li>
              <li>Instagram business account IDs</li>
              <li>Video files you upload (processed and deleted after posting)</li>
              <li>Basic usage analytics to improve our service</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-600 mb-6">
              We use your information solely to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>Post videos to your Instagram accounts</li>
              <li>Generate AI titles for your content</li>
              <li>Provide real-time status updates</li>
              <li>Improve our service functionality</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              3. Data Storage and Security
            </h2>
            <p className="text-gray-600 mb-6">
              Your data is stored securely using industry-standard encryption. 
              Instagram access tokens are stored temporarily and automatically expire 
              according to Instagram's token policies.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              4. Data Sharing
            </h2>
            <p className="text-gray-600 mb-6">
              We do not sell, trade, or share your personal information with third parties 
              except as required by law or to provide our service (e.g., Instagram API, OpenRouter AI).
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              5. Third-Party Services
            </h2>
            <p className="text-gray-600 mb-6">
              Our service integrates with:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>Instagram Graph API (for posting content)</li>
              <li>OpenRouter AI (for title generation)</li>
              <li>n8n Cloud (for workflow automation)</li>
            </ul>
            <p className="text-gray-600 mb-6">
              Each service has its own privacy policy, and we encourage you to review them.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              6. Data Retention
            </h2>
            <p className="text-gray-600 mb-6">
              We retain your data only as long as necessary to provide our service. 
              Video files are deleted immediately after posting. Access tokens are 
              stored only during active sessions.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              7. Your Rights
            </h2>
            <p className="text-gray-600 mb-6">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>Access your stored data</li>
              <li>Request deletion of your data</li>
              <li>Disconnect your Instagram accounts</li>
              <li>Opt out of analytics collection</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              8. Contact Information
            </h2>
            <p className="text-gray-600 mb-6">
              If you have questions about this privacy policy or wish to exercise your rights, 
              please contact us through our application interface.
            </p>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
