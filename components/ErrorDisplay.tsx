'use client'

interface ErrorDisplayProps {
  error: Error | null
  retry?: () => void
}

export default function ErrorDisplay({ error, retry }: ErrorDisplayProps) {
  if (!error) return null

  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 my-4">
      <div className="flex items-start gap-3">
        <div className="text-2xl">⚠️</div>
        <div className="flex-1">
          <h3 className="font-bold text-red-800 dark:text-red-200 mb-2">
            Something went wrong
          </h3>
          <p className="text-sm text-red-700 dark:text-red-300 mb-3">
            {error.message || 'An unexpected error occurred. Please try again.'}
          </p>
          {retry && (
            <button
              onClick={retry}
              className="text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
