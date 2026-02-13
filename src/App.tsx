import { useCallback } from 'react';
import { TableToolbar } from './components/TableToolbar.js';
import { UserDetailsModal } from './components/UserDetailsModal.js';
import { UsersTable } from './components/UsersTable/index.js';
import { EmptyState, ErrorState, LoadingState } from './components/UIStates.js';
import { useUsersTable } from './hooks/useUsersTable.js';
import './App.css';

function App() {
  const {
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
  } = useUsersTable();

  const handleSelectUser = useCallback(
    (user: import('./types/user.js').User) => setSelectedUser(user),
    [setSelectedUser],
  );

  const handleCloseModal = useCallback(() => {
    setSelectedUser(null);
    setSaveError(null);
  }, [setSelectedUser, setSaveError]);

  const clearSaveError = useCallback(() => setSaveError(null), [setSaveError]);

  return (
    <div className="app">
      <div className="app-header">
        <h1>Users Dashboard</h1>
      </div>
      <TableToolbar
        searchRaw={searchRaw}
        onSearchChange={setSearchRaw}
        roleFilter={roleFilter}
        onRoleFilterChange={setRoleFilter}
        sort={sort}
        onSortField={setSortField}
      />
      <div className="app-main">
        {loading && <LoadingState />}
        {!loading && loadError && (
          <ErrorState message={loadError} onRetry={loadUsers} />
        )}
        {!loading && !loadError && users !== null &&
          (derivedList.length === 0 ? (
            <EmptyState />
          ) : (
            <UsersTable users={derivedList} onSelectUser={handleSelectUser} />
          ))}
      </div>
      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={handleCloseModal}
          onSave={onSave}
          saveError={saveError}
          onClearSaveError={clearSaveError}
        />
      )}
    </div>
  );
}

export default App;
