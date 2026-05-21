export default function ModuleHubHero({
  tone = 'light',
  align = 'center',
  title,
  subtitle,
  searchAriaLabel,
  searchPlaceholder,
  searchHint,
  searchPendingLabel,
  searchIdleLabel,
  inputValue,
  onInputChange,
  isSearchPending = false,
  showSearchStatus = false,
  searchHintId = 'module-hub-search-hint',
  children,
}) {
  return (
    <header className={`module-hub-hero module-hub-hero--${tone} module-hub-hero--${align}`}>
      <div className="module-hub-hero__inner">
        <h1 className="module-hub-hero__title">{title}</h1>
        {subtitle ? <p className="module-hub-hero__subtitle">{subtitle}</p> : null}
        <div className="module-hub-search">
          <label className="module-hub-search__field" aria-label={searchAriaLabel}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
              <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={inputValue}
              placeholder={searchPlaceholder}
              autoComplete="off"
              onChange={(event) => onInputChange(event.target.value)}
              aria-describedby={searchHint ? searchHintId : undefined}
            />
          </label>
          {searchHint ? (
            <p id={searchHintId} className="module-hub-search__hint">
              {searchHint}
              {showSearchStatus ? (
                <span
                  className={`module-hub-search__status${isSearchPending ? ' is-pending' : ''}`}
                  aria-live="polite"
                >
                  {isSearchPending ? searchPendingLabel : searchIdleLabel}
                </span>
              ) : null}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </header>
  )
}
