import { useCallback, useEffect, useMemo, useState } from 'react';
import { getUsersAsync } from '../data/mockUsers.js';
import type {
  RoleFilter,
  SortField,
  SortState,
  User,
  UserPatch,
} from '../types/user.js';
import { useDebouncedValue } from './useDebouncedValue.js';

const FAILURE_PROBABILITY = 0.2;
const SAVE_DELAY_MS = 600;

export function useUsersTable() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchRaw, setSearchRaw] = useState('');
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all');
  const [sort, setSort] = useState<SortState>({ field: 'name', direction: 'asc' });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  const debouncedSearch = useDebouncedValue(searchRaw, 400);

  const loadUsers = useCallback(() => {
    setLoading(true);
    setLoadError(null);
    getUsersAsync()
      .then(setUsers)
      .catch((err) => setLoadError(err instanceof Error ? err.message : 'Failed to load users'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadUsers();
  }, [loadUsers]);

  const derivedList = useMemo(() => {
    if (users === null) return [];
    let list = users;

    if (roleFilter !== 'all') {
      list = list.filter((u) => u.role === roleFilter);
    }
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.trim().toLowerCase();
      list = list.filter(
        (u) =>
          u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
      );
    }
    const { field, direction } = sort;
    const mult = direction === 'asc' ? 1 : -1;
    list = [...list].sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return mult * aVal.localeCompare(bVal);
      }
      return mult * ((aVal as number) - (bVal as number));
    });
    return list;
  }, [users, roleFilter, debouncedSearch, sort]);

  const onSave = useCallback(
    (userId: string, patch: UserPatch) => {
      if (users === null) return;
      const prev = users.find((u) => u.id === userId);
      if (!prev) return;

      const snapshot = [...users];
      setUsers((current) => {
        if (!current) return current;
        return current.map((u) =>
          u.id === userId ? { ...u, ...patch } : u
        );
      });
      setSaveError(null);

      setTimeout(() => {
        const fail = Math.random() < FAILURE_PROBABILITY;
        if (fail) {
          setUsers(snapshot);
          setSaveError('Save failed. Changes have been reverted.');
        } else {
          setSaveError(null);
        }
      }, SAVE_DELAY_MS);
    },
    [users]
  );

  const setSortField = useCallback((field: SortField) => {
    setSort((s) => ({
      field,
      direction:
        s.field === field && s.direction === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  return {
    users,
    loading,
    loadError,
    loadUsers,
    searchRaw,
    setSearchRaw,
    roleFilter,
    setRoleFilter,
    sort,
    setSortField,
    derivedList,
    selectedUser,
    setSelectedUser,
    saveError,
    setSaveError,
    onSave,
  };
}
