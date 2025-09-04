import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">Viral Video Workflow</h3>
            <p className="text-gray-400 text-sm">
              AI-powered video automation for Instagram
            </p>
          </div>
          
          <div className="flex space-x-6">
            <Link 
              href="/terms" 
              className="text-gray-300 hover:text-white transition-colors text-sm"
            >
              Terms of Service
            </Link>
            <Link 
              href="/privacy" 
              className="text-gray-300 hover:text-white transition-colors text-sm"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Viral Video Workflow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
