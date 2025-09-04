'use client'

import { useState, useEffect } from 'react'
import { Instagram, Plus, Trash2, Check } from 'lucide-react'
import axios from 'axios'

export default function InstagramManager({ accounts, onAccountsUpdated, onAccountsSelected, onNext }) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newAccount, setNewAccount] = useState({ accessToken: '', businessAccountId: '', accountName: '' })
  const [connecting, setConnecting] = useState(false)
  const [selectedAccounts, setSelectedAccounts] = useState([])

  useEffect(() => {
    fetchAccounts()
  }, [])

      const fetchAccounts = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/instagram/accounts`)
        onAccountsUpdated(response.data.accounts)
      } catch (error) {
      console.error('Failed to fetch accounts:', error)
    }
  }

  const connectAccount = async () => {
    if (!newAccount.accessToken || !newAccount.businessAccountId || !newAccount.accountName) {
      alert('Please fill in all fields')
      return
    }

    setConnecting(true)
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/instagram/connect`, newAccount)
      onAccountsUpdated([...accounts, response.data.account])
      setNewAccount({ accessToken: '', businessAccountId: '', accountName: '' })
      setShowAddForm(false)
    } catch (error) {
      console.error('Connection failed:', error)
      alert('Failed to connect Instagram account. Please check your credentials.')
    } finally {
      setConnecting(false)
    }
  }

  const toggleAccountSelection = (accountId) => {
    const updated = selectedAccounts.includes(accountId)
      ? selectedAccounts.filter(id => id !== accountId)
      : [...selectedAccounts, accountId]
    
    setSelectedAccounts(updated)
    onAccountsSelected(updated)
  }

  const removeAccount = async (accountId) => {
    // In production, implement proper account removal
    const updatedAccounts = accounts.filter(acc => acc.id !== accountId)
    onAccountsUpdated(updatedAccounts)
    
    // Remove from selected accounts if present
    const updatedSelected = selectedAccounts.filter(id => id !== accountId)
    setSelectedAccounts(updatedSelected)
    onAccountsSelected(updatedSelected)
  }

  const handleNext = () => {
    if (selectedAccounts.length === 0) {
      alert('Please select at least one Instagram account')
      return
    }
    onNext()
  }

  return (
    <div className="card">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Connect Instagram Accounts</h2>
        <p className="text-gray-600">Select which Instagram accounts to post your video to</p>
      </div>

      {/* Add New Account */}
      {!showAddForm ? (
        <div className="mb-6">
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-secondary w-full flex items-center justify-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Instagram Account
          </button>
        </div>
      ) : (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h3 className="font-medium text-gray-900 mb-3">Add New Account</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Account Name (e.g., My Business)"
              value={newAccount.accountName}
              onChange={(e) => setNewAccount({ ...newAccount, accountName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Instagram Business Account ID"
              value={newAccount.businessAccountId}
              onChange={(e) => setNewAccount({ ...newAccount, businessAccountId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <input
              type="password"
              placeholder="Instagram Access Token"
              value={newAccount.accessToken}
              onChange={(e) => setNewAccount({ ...newAccount, accessToken: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <div className="flex space-x-2">
              <button
                onClick={connectAccount}
                disabled={connecting}
                className="btn-primary flex-1 flex items-center justify-center"
              >
                {connecting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Instagram className="h-4 w-4 mr-2" />
                    Connect Account
                  </>
                )}
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Connected Accounts */}
      {accounts.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Connected Accounts</h3>
          <div className="space-y-3">
            {accounts.map((account) => (
              <div
                key={account.id}
                className={`p-4 border rounded-lg transition-colors ${
                  selectedAccounts.includes(account.id)
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedAccounts.includes(account.id)}
                      onChange={() => toggleAccountSelection(account.id)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mr-3"
                    />
                    <Instagram className="h-5 w-5 text-pink-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">{account.accountName}</p>
                      <p className="text-sm text-gray-500">@{account.username}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="flex items-center text-sm text-green-600">
                      <Check className="h-4 w-4 mr-1" />
                      Connected
                    </span>
                    <button
                      onClick={() => removeAccount(account.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next Button */}
      {selectedAccounts.length > 0 && (
        <div className="text-center">
          <button
            onClick={handleNext}
            className="btn-primary"
          >
            Continue with {selectedAccounts.length} account{selectedAccounts.length > 1 ? 's' : ''}
          </button>
        </div>
      )}
    </div>
  )
}
