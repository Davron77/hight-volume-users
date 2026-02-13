import type { RoleFilter, SortField, SortState } from '../types/user.js';

interface TableToolbarProps {
  searchRaw: string;
  onSearchChange: (value: string) => void;
  roleFilter: RoleFilter;
  onRoleFilterChange: (value: RoleFilter) => void;
  sort: SortState;
  onSortField: (field: SortField) => void;
}

const SORT_FIELDS: { value: SortField; label: string }[] = [
  { value: 'name', label: 'Name' },
  { value: 'email', label: 'Email' },
  { value: 'age', label: 'Age' },
];

const ROLE_OPTIONS: { value: RoleFilter; label: string }[] = [
  { value: 'all', label: 'All roles' },
  { value: 'admin', label: 'Admin' },
  { value: 'user', label: 'User' },
  { value: 'guest', label: 'Guest' },
];

export function TableToolbar({
  searchRaw,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
  sort,
  onSortField,
}: TableToolbarProps) {
  return (
    <div className="table-toolbar">
      <input
        type="search"
        placeholder="Search name or email..."
        value={searchRaw}
        onChange={(e) => onSearchChange(e.target.value)}
        className="toolbar-search"
        aria-label="Search users"
      />
      <select
        value={roleFilter}
        onChange={(e) => onRoleFilterChange(e.target.value as RoleFilter)}
        className="toolbar-filter"
        aria-label="Filter by role"
      >
        {ROLE_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="toolbar-sort" role="group" aria-label="Sort">
        {SORT_FIELDS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => onSortField(value)}
            className={`sort-btn ${sort.field === value ? 'sort-active' : ''}`}
            aria-pressed={sort.field === value}
          >
            {label}{' '}
            {sort.field === value ? (sort.direction === 'asc' ? '↑' : '↓') : ''}
          </button>
        ))}
      </div>
    </div>
  );
}
