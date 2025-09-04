export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Terms of Service
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              1. Service Description
            </h2>
            <p className="text-gray-600 mb-6">
              This application helps you upload videos and automatically post them to Instagram 
              using AI-generated viral titles. Our service integrates with Instagram's API to 
              facilitate content creation and distribution.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              2. User Responsibilities
            </h2>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li>You must own or have rights to all content you upload</li>
              <li>You must comply with Instagram's Community Guidelines</li>
              <li>You are responsible for the content posted through our service</li>
              <li>You must provide valid Instagram API credentials</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              3. API Usage
            </h2>
            <p className="text-gray-600 mb-6">
              Our service uses Instagram's Graph API and OpenRouter's AI services. 
              You agree to comply with their respective terms of service and usage limits.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              4. Data Handling
            </h2>
            <p className="text-gray-600 mb-6">
              We temporarily store your Instagram access tokens for posting purposes only. 
              We do not collect or store personal data beyond what's necessary for service operation.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              5. Service Availability
            </h2>
            <p className="text-gray-600 mb-6">
              We strive to maintain high service availability but cannot guarantee uninterrupted access. 
              We reserve the right to modify or discontinue the service with reasonable notice.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              6. Limitation of Liability
            </h2>
            <p className="text-gray-600 mb-6">
              We are not liable for any damages arising from the use of our service, 
              including but not limited to content loss, API failures, or Instagram policy changes.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              7. Changes to Terms
            </h2>
            <p className="text-gray-600 mb-6">
              We may update these terms from time to time. Continued use of the service 
              constitutes acceptance of any changes.
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
