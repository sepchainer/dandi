import { ApiKey } from '@/lib/apiKeys';

interface ApiKeyCardProps {
  apiKey: ApiKey;
  isEditing: boolean;
  editingName: string;
  isVisible: boolean;
  onEdit: (key: ApiKey) => void;
  onEditSubmit: (e: React.FormEvent) => void;
  onEditCancel: () => void;
  onDelete: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  onCopy: (key: string) => void;
  onNameChange: (name: string) => void;
  maskKey: (key: string) => string;
}

export function ApiKeyCard({
  apiKey,
  isEditing,
  editingName,
  isVisible,
  onEdit,
  onEditSubmit,
  onEditCancel,
  onDelete,
  onToggleVisibility,
  onCopy,
  onNameChange,
  maskKey,
}: ApiKeyCardProps) {
  return (
    <div className="border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-4 bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 hover:shadow-md">
      <div className="flex items-center justify-between mb-2">
        {isEditing ? (
          <form onSubmit={onEditSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={editingName}
              onChange={(e) => onNameChange(e.target.value)}
              className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white/50 dark:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              autoFocus
            />
            <button
              type="submit"
              className="p-1.5 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-full transition-all duration-300 group relative"
              title="Save changes"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={onEditCancel}
              className="p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-all duration-300 group relative"
              title="Cancel editing"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </form>
        ) : (
          <h3 className="font-medium text-slate-800 dark:text-slate-100">{apiKey.name}</h3>
        )}
        <div className="flex items-center gap-2">
          {!isEditing && (
            <>
              <button
                onClick={() => onEdit(apiKey)}
                className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-full transition-all duration-300 group relative"
                title="Edit key name"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              </button>
              <button
                onClick={() => onDelete(apiKey.id)}
                className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition-all duration-300 group relative"
                title="Delete key"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-sm text-slate-600 dark:text-slate-300 font-mono">
          {isVisible ? apiKey.key : maskKey(apiKey.key)}
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onToggleVisibility(apiKey.id)}
            className="p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-all duration-300 group relative"
            title={isVisible ? "Hide key" : "Show key"}
          >
            {isVisible ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </button>
          <button
            onClick={() => onCopy(apiKey.key)}
            className="p-1 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-full transition-all duration-300 group relative"
            title="Copy to clipboard"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
            </svg>
          </button>
        </div>
      </div>
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
        Created: {new Date(apiKey.created_at).toLocaleDateString()}
      </p>
    </div>
  );
} 