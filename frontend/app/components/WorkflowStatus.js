'use client'

import { useState, useEffect } from 'react'
import { Play, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import axios from 'axios'

export default function WorkflowStatus({ video, titlesByAccount, selectedAccounts, instagramAccounts, status, onStatusUpdate }) {
  const [workflowStatus, setWorkflowStatus] = useState('ready')
  const [postingResults, setPostingResults] = useState([])
  const [isPosting, setIsPosting] = useState(false)
  const [selectedTitles, setSelectedTitles] = useState({})

  const statusConfig = {
    ready: { icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50', text: 'Ready to Post' },
    posting: { icon: Play, color: 'text-yellow-600', bg: 'bg-yellow-50', text: 'Posting to Instagram' },
    completed: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', text: 'Successfully Posted' },
    error: { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50', text: 'Posting Failed' }
  }

  const currentStatus = statusConfig[workflowStatus]

  // Initialize selected titles with first title from each account
  useEffect(() => {
    const initialTitles = {}
    Object.entries(titlesByAccount).forEach(([accountId, titles]) => {
      if (titles.length > 0) {
        initialTitles[accountId] = titles[0]
      }
    })
    setSelectedTitles(initialTitles)
  }, [titlesByAccount])

  const handleTitleSelect = (accountId, title) => {
    setSelectedTitles(prev => ({
      ...prev,
      [accountId]: title
    }))
  }

  const startPosting = async () => {
    setIsPosting(true)
    setWorkflowStatus('posting')
    onStatusUpdate('posting')

    try {
      const results = []
      
      // Post to each selected account with its specific title
      for (const accountId of selectedAccounts) {
        const account = instagramAccounts.find(acc => acc.id === accountId)
        const title = selectedTitles[accountId]
        
        if (!account || !title) {
          results.push({
            accountId,
            accountName: account?.accountName || 'Unknown',
            status: 'failed',
            error: 'Missing account or title'
          })
          continue
        }

        try {
          // Call n8n webhook for this specific account
          await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/n8n-webhook`, {
            videoData: video,
            title: title,
            accountId: accountId,
            accountName: account.accountName
          })

          // Post to Instagram
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/instagram/post`, {
            videoPath: video.path,
            title: title,
            accountIds: [accountId]
          })

          if (response.data.results && response.data.results.length > 0) {
            results.push(response.data.results[0])
          }
        } catch (error) {
          results.push({
            accountId,
            accountName: account.accountName,
            status: 'failed',
            error: error.message,
            title: title
          })
        }
      }

      setPostingResults(results)
      setWorkflowStatus('completed')
      onStatusUpdate('completed')
    } catch (error) {
      console.error('Posting error:', error)
      setWorkflowStatus('error')
      onStatusUpdate('error')
    } finally {
      setIsPosting(false)
    }
  }

  const getAccountName = (accountId) => {
    const account = instagramAccounts.find(acc => acc.id === accountId)
    return account ? account.accountName : `Account ${accountId}`
  }

  return (
    <div className="card">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Post & Monitor</h2>
        <p className="text-gray-600">Review your settings and post to Instagram</p>
      </div>

      {/* Summary */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-gray-900 mb-3">Posting Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Video:</span>
            <span className="text-gray-900">{video?.originalName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Accounts:</span>
            <span className="text-gray-900">{selectedAccounts.length} selected</span>
          </div>
        </div>
      </div>

      {/* Title Selection for Each Account */}
      {Object.keys(titlesByAccount).length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Select Titles for Each Page</h3>
          <div className="space-y-4">
            {Object.entries(titlesByAccount).map(([accountId, titles]) => (
              <div key={accountId} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <span className="w-3 h-3 bg-primary-500 rounded-full mr-2"></span>
                  {getAccountName(accountId)}
                </h4>
                <div className="space-y-2">
                  {titles.map((title, index) => (
                    <label
                      key={index}
                      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedTitles[accountId] === title
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`title-${accountId}`}
                        value={title}
                        checked={selectedTitles[accountId] === title}
                        onChange={() => handleTitleSelect(accountId, title)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 mr-3"
                      />
                      <span className="text-gray-900">{title}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Status */}
      <div className={`mb-6 p-4 rounded-lg ${currentStatus.bg}`}>
        <div className="flex items-center">
          <currentStatus.icon className={`h-5 w-5 mr-2 ${currentStatus.color}`} />
          <span className={`font-medium ${currentStatus.color}`}>
            {currentStatus.text}
          </span>
        </div>
      </div>

      {/* Action Button */}
      {workflowStatus === 'ready' && (
        <div className="text-center mb-6">
          <button
            onClick={startPosting}
            disabled={isPosting || Object.keys(selectedTitles).length === 0}
            className="btn-primary"
          >
            {isPosting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Posting to {selectedAccounts.length} pages...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Post to {selectedAccounts.length} Instagram Pages
              </>
            )}
          </button>
        </div>
      )}

      {/* Results */}
      {postingResults.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Posting Results</h3>
          <div className="space-y-3">
            {postingResults.map((result, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg ${
                  result.status === 'posted'
                    ? 'border-green-200 bg-green-50'
                    : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{result.accountName}</p>
                    <p className="text-sm text-gray-600">"{result.title}"</p>
                  </div>
                  <div className="flex items-center">
                    {result.status === 'posted' ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                    )}
                    <span className={`text-sm font-medium ${
                      result.status === 'posted' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {result.status === 'posted' ? 'Posted' : 'Failed'}
                    </span>
                  </div>
                </div>
                {result.postedAt && (
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(result.postedAt).toLocaleString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Success Message */}
      {workflowStatus === 'completed' && (
        <div className="text-center p-6 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-green-900 mb-2">
            Successfully Posted!
          </h3>
          <p className="text-green-700">
            Your video has been posted to {postingResults.filter(r => r.status === 'posted').length} Instagram account{postingResults.filter(r => r.status === 'posted').length > 1 ? 's' : ''}.
          </p>
        </div>
      )}

      {/* Error Message */}
      {workflowStatus === 'error' && (
        <div className="text-center p-6 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-red-900 mb-2">
            Posting Failed
          </h3>
          <p className="text-red-700">
            There was an error posting to Instagram. Please try again.
          </p>
        </div>
      )}
    </div>
  )
}
