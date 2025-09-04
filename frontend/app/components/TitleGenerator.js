'use client'

import { useState, useEffect } from 'react'
import { Sparkles, Copy, Check, Edit2, Save, X } from 'lucide-react'
import axios from 'axios'

export default function TitleGenerator({ video, selectedAccounts, instagramAccounts, onTitlesGenerated, onNext }) {
  const [generating, setGenerating] = useState(false)
  const [titlesByAccount, setTitlesByAccount] = useState({})
  const [videoDescription, setVideoDescription] = useState('')
  const [videoCategory, setVideoCategory] = useState('entertainment')
  const [copiedIndex, setCopiedIndex] = useState(null)
  const [editingTitle, setEditingTitle] = useState(null)
  const [editValue, setEditValue] = useState('')

  const categories = [
    'entertainment',
    'comedy',
    'tutorial',
    'lifestyle',
    'fitness',
    'food',
    'travel',
    'technology',
    'fashion',
    'beauty'
  ]

  const generateTitles = async () => {
    if (!videoDescription.trim()) {
      alert('Please describe your video first')
      return
    }

    if (!selectedAccounts || selectedAccounts.length === 0) {
      alert('Please select Instagram accounts first')
      return
    }

    setGenerating(true)
    try {
      // Generate titles for each selected account
      const newTitlesByAccount = {}
      
      for (const accountId of selectedAccounts) {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/generate-title`, {
          videoDescription,
          videoCategory,
          accountId // Pass accountId to generate unique titles
        })

        newTitlesByAccount[accountId] = response.data.titles
      }

      setTitlesByAccount(newTitlesByAccount)
      onTitlesGenerated(newTitlesByAccount)
    } catch (error) {
      console.error('Title generation error:', error)
      alert('Failed to generate titles. Please try again.')
    } finally {
      setGenerating(false)
    }
  }

  const copyToClipboard = async (text, accountId, index) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(`${accountId}-${index}`)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (error) {
      console.error('Copy failed:', error)
    }
  }

  const startEditing = (accountId, index, title) => {
    setEditingTitle(`${accountId}-${index}`)
    setEditValue(title)
  }

  const saveEdit = (accountId, index) => {
    const newTitles = [...titlesByAccount[accountId]]
    newTitles[index] = editValue
    setTitlesByAccount({
      ...titlesByAccount,
      [accountId]: newTitles
    })
    setEditingTitle(null)
    setEditValue('')
    onTitlesGenerated({
      ...titlesByAccount,
      [accountId]: newTitles
    })
  }

  const cancelEdit = () => {
    setEditingTitle(null)
    setEditValue('')
  }

  const handleNext = () => {
    const allTitles = Object.values(titlesByAccount).flat()
    if (allTitles.length === 0) {
      alert('Please generate titles before continuing')
      return
    }
    onNext()
  }

  const getAccountName = (accountId) => {
    const account = instagramAccounts.find(acc => acc.id === accountId)
    return account ? account.accountName : `Account ${accountId}`
  }

  return (
    <div className="card">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Generate Viral Titles</h2>
        <p className="text-gray-600">AI will create unique titles for each selected Instagram page</p>
      </div>

      {/* Video Description */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Describe your video
        </label>
        <textarea
          value={videoDescription}
          onChange={(e) => setVideoDescription(e.target.value)}
          placeholder="Describe what your video is about... (e.g., 'Funny cat compilation with unexpected ending')"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          rows="3"
        />
      </div>

      {/* Category Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Video Category
        </label>
        <select
          value={videoCategory}
          onChange={(e) => setVideoCategory(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Generate Button */}
      <div className="mb-6">
        <button
          onClick={generateTitles}
          disabled={generating || !videoDescription.trim() || !selectedAccounts?.length}
          className="btn-primary w-full flex items-center justify-center"
        >
          {generating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Generating titles for {selectedAccounts?.length || 0} pages...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Titles for {selectedAccounts?.length || 0} Pages
            </>
          )}
        </button>
      </div>

      {/* Generated Titles by Account */}
      {Object.keys(titlesByAccount).length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Generated Titles by Page</h3>
          <div className="space-y-6">
            {Object.entries(titlesByAccount).map(([accountId, titles]) => (
              <div key={accountId} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <span className="w-3 h-3 bg-primary-500 rounded-full mr-2"></span>
                  {getAccountName(accountId)}
                </h4>
                <div className="space-y-3">
                  {titles.map((title, index) => (
                    <div
                      key={index}
                      className="p-3 border border-gray-200 rounded-lg bg-gray-50"
                    >
                      {editingTitle === `${accountId}-${index}` ? (
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            autoFocus
                          />
                          <button
                            onClick={() => saveEdit(accountId, index)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <Save className="h-4 w-4" />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="text-gray-600 hover:text-gray-700"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-900 flex-1">{title}</span>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => startEditing(accountId, index, title)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => copyToClipboard(title, accountId, index)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              {copiedIndex === `${accountId}-${index}` ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next Button */}
      {Object.keys(titlesByAccount).length > 0 && (
        <div className="text-center">
          <button
            onClick={handleNext}
            className="btn-primary"
          >
            Continue with {Object.keys(titlesByAccount).length} Page{Object.keys(titlesByAccount).length > 1 ? 's' : ''}
          </button>
        </div>
      )}
    </div>
  )
}
