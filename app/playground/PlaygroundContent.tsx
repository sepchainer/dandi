'use client';
import { useState } from 'react';
import { useNotification } from '@/components/NotificationProvider';

interface PlaygroundContentProps {}

export default function PlaygroundContent(props: PlaygroundContentProps) {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/protected', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey }),
      });
      if (res.ok) {
        showNotification('API key is valid! Redirecting to /protected...', 'success');
        window.location.href = '/protected';
      } else {
        showNotification('Invalid API key. Please try again.', 'error');
      }
    } catch (err) {
      showNotification('Invalid API key. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 min-h-screen">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-slate-800 dark:text-slate-100">API Playground</h1>
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50 mb-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label htmlFor="apiKey" className="text-slate-700 dark:text-slate-300 font-medium">Enter API Key</label>
            <input
              id="apiKey"
              type="text"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300"
              placeholder=""
              autoFocus
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? 'Validating...' : 'Validate API Key'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 