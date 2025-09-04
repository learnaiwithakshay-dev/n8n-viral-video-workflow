import './globals.css'

export const metadata = {
  title: 'n8n Viral Video Workflow',
  description: 'AI-powered video upload and Instagram automation',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  )
}
