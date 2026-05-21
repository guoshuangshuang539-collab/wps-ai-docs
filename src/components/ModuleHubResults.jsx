import ModuleHubEmptyState from './ModuleHubEmptyState'

export default function ModuleHubResults({ isPending = false, isEmpty = false, emptyMessage, children }) {
  return (
    <div className={`module-hub-results${isPending ? ' is-pending' : ''}`}>
      {isEmpty ? <ModuleHubEmptyState message={emptyMessage} /> : children}
    </div>
  )
}
