'use client';

import { useApiKeyManagement } from './useApiKeyManagement';
import { ApiKeyCard } from './components/ApiKeyCard';
import { CreateApiKeyModal } from './components/CreateApiKeyModal';
import { ConfirmDialog } from './components/ConfirmDialog';
import Toast from '@/components/Toast';

export default function Dashboard() {
  const {
    apiKeys,
    newKeyName,
    setNewKeyName,
    loading,
    error,
    editingKey,
    setEditingKey,
    visibleKeys,
    toggleKeyVisibility,
    isModalOpen,
    setIsModalOpen,
    toast,
    hideToast,
    confirmDialog,
    setConfirmDialog,
    handleModalSubmit,
    handleEditSubmit,
    handleUpdateApiKey,
    handleDeleteApiKey,
    copyToClipboard,
    maskApiKey,
  } = useApiKeyManagement();

  if (loading) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 min-h-screen">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-slate-800 dark:text-slate-100">API Key Management</h1>
        
        {error && (
          <div className="bg-red-50/50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 backdrop-blur-sm">
            {error}
          </div>
        )}

        {/* Create new API key */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 mb-8 shadow-lg border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">Create New API Key</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Generate New Key
          </button>
        </div>

        {/* List of API keys */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300">
          <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">Your API Keys</h2>
          {apiKeys.length === 0 ? (
            <p className="text-slate-500 dark:text-slate-400">No API keys generated yet.</p>
          ) : (
            <div className="space-y-4">
              {apiKeys.map((apiKey) => (
                <ApiKeyCard
                  key={apiKey.id}
                  apiKey={apiKey}
                  isEditing={editingKey?.id === apiKey.id}
                  editingName={editingKey?.name || ''}
                  isVisible={visibleKeys.has(apiKey.id)}
                  onEdit={setEditingKey}
                  onEditSubmit={handleEditSubmit}
                  onEditCancel={() => setEditingKey(null)}
                  onDelete={handleDeleteApiKey}
                  onToggleVisibility={toggleKeyVisibility}
                  onCopy={copyToClipboard}
                  onNameChange={(name) => setEditingKey({ ...editingKey!, name })}
                  maskKey={maskApiKey}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <CreateApiKeyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        keyName={newKeyName}
        onKeyNameChange={setNewKeyName}
      />

      <ConfirmDialog
        isOpen={confirmDialog.show}
        onClose={() => setConfirmDialog({ ...confirmDialog, show: false })}
        onConfirm={confirmDialog.onConfirm}
        message={confirmDialog.message}
      />

      {/* Toast */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </div>
  );
} 