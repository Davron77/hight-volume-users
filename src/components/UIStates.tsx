export function LoadingState() {
  return (
    <div className="ui-state ui-state-loading" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true" />
      <p>Loading users…</p>
    </div>
  );
}

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="ui-state ui-state-error" role="alert">
      <p>{message}</p>
      {onRetry && (
        <button type="button" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="ui-state ui-state-empty" role="status">
      <p>No users match your filters.</p>
    </div>
  );
}
