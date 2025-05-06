import { useState, useEffect } from 'react';
import { ApiKey, fetchApiKeys, createApiKey, deleteApiKey, updateApiKey } from '@/lib/apiKeys';
import { useNotification } from '@/components/NotificationProvider';

interface ToastState {
  message: string;
  type: 'success' | 'error' | 'info';
  show: boolean;
}

interface ConfirmDialogState {
  show: boolean;
  message: string;
  onConfirm: () => void;
}

export function useApiKeyManagement() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [newKeyName, setNewKeyName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingKey, setEditingKey] = useState<ApiKey | null>(null);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState<ToastState>({ message: '', type: 'info', show: false });
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState>({
    show: false,
    message: '',
    onConfirm: () => {},
  });
  const { showNotification } = useNotification();

  useEffect(() => {
    fetchKeys();
  }, []);

  const fetchKeys = async () => {
    try {
      const data = await fetchApiKeys();
      setApiKeys(data);
    } catch (err) {
      setError('Failed to load API keys');
      showNotification('Failed to load API keys', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type, show: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };

  const showConfirmDialog = (message: string, onConfirm: () => void) => {
    setConfirmDialog({ show: true, message, onConfirm });
  };

  const hideConfirmDialog = () => {
    setConfirmDialog(prev => ({ ...prev, show: false }));
  };

  const handleCreateApiKey = async () => {
    try {
      const newKey = await createApiKey(newKeyName || 'New API Key');
      setApiKeys([...apiKeys, newKey]);
      setNewKeyName('');
      showNotification('API key generated successfully', 'success');
    } catch (err) {
      setError('Failed to create API key');
      showNotification('Failed to create API key', 'error');
    }
  };

  const handleDeleteApiKey = async (id: string) => {
    try {
      await deleteApiKey(id);
      setApiKeys(apiKeys.filter(key => key.id !== id));
      showNotification('API key deleted', 'error');
    } catch (err) {
      setError('Failed to delete API key');
      showNotification('Failed to delete API key', 'error');
    }
  };

  const handleUpdateApiKey = async (id: string, name: string) => {
    try {
      const updatedKey = await updateApiKey(id, name);
      setApiKeys(apiKeys.map(key => key.id === id ? updatedKey : key));
      setEditingKey(null);
      showNotification('API key updated successfully', 'success');
    } catch (err) {
      setError('Failed to update API key');
      showNotification('Failed to update API key', 'error');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showNotification('API key copied to clipboard', 'success');
  };

  const toggleKeyVisibility = (keyId: string) => {
    setVisibleKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(keyId)) {
        newSet.delete(keyId);
      } else {
        newSet.add(keyId);
      }
      return newSet;
    });
  };

  const maskApiKey = (key: string) => {
    return `${key.slice(0, 4)}${'•'.repeat(key.length - 4)}`;
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCreateApiKey();
    setIsModalOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingKey) {
      handleUpdateApiKey(editingKey.id, editingKey.name);
    }
  };

  return {
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
  };
} 