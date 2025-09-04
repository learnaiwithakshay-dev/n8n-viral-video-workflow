'use client'

import { useState, useEffect } from 'react'
import VideoUpload from './components/VideoUpload'
import TitleGenerator from './components/TitleGenerator'
import InstagramManager from './components/InstagramManager'
import WorkflowStatus from './components/WorkflowStatus'
import Footer from './components/Footer'

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1)
  const [uploadedVideo, setUploadedVideo] = useState(null)
  const [titlesByAccount, setTitlesByAccount] = useState({})
  const [instagramAccounts, setInstagramAccounts] = useState([])
  const [selectedAccounts, setSelectedAccounts] = useState([])
  const [workflowStatus, setWorkflowStatus] = useState('idle')

  const steps = [
    { id: 1, title: 'Upload Video', component: 'upload' },
    { id: 2, title: 'Connect Instagram', component: 'instagram' },
    { id: 3, title: 'Generate Titles', component: 'title' },
    { id: 4, title: 'Post & Monitor', component: 'post' }
  ]

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <VideoUpload 
            onVideoUploaded={setUploadedVideo}
            onNext={() => setCurrentStep(2)}
          />
        )
      case 2:
        return (
          <InstagramManager
            accounts={instagramAccounts}
            onAccountsUpdated={setInstagramAccounts}
            onAccountsSelected={setSelectedAccounts}
            onNext={() => setCurrentStep(3)}
          />
        )
      case 3:
        return (
          <TitleGenerator
            video={uploadedVideo}
            selectedAccounts={selectedAccounts}
            instagramAccounts={instagramAccounts}
            onTitlesGenerated={setTitlesByAccount}
            onNext={() => setCurrentStep(4)}
          />
        )
      case 4:
        return (
          <WorkflowStatus
            video={uploadedVideo}
            titlesByAccount={titlesByAccount}
            selectedAccounts={selectedAccounts}
            instagramAccounts={instagramAccounts}
            status={workflowStatus}
            onStatusUpdate={setWorkflowStatus}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <div className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              n8n Viral Video Workflow
            </h1>
            <p className="text-lg text-gray-600">
              AI-powered video upload and Instagram automation
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.id 
                      ? 'bg-primary-600 border-primary-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-500'
                  }`}>
                    {currentStep > step.id ? '✓' : step.id}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    currentStep >= step.id ? 'text-primary-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 ml-2 ${
                      currentStep > step.id ? 'bg-primary-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            {renderStep()}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
