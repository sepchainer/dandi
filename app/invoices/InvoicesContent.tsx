interface InvoicesContentProps {}

export default function InvoicesContent(props: InvoicesContentProps) {
  return (
    <div className="p-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 min-h-screen">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-slate-800 dark:text-slate-100">Invoices</h1>
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
          <p className="text-slate-600 dark:text-slate-300">
            View and manage your billing history and invoices. This feature is coming soon.
          </p>
        </div>
      </div>
    </div>
  );
} 