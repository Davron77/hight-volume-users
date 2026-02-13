import { useCallback, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import type { User } from '../../types/user.js';
import { UserRow } from '../UserRow.js';

const ROW_HEIGHT = 44;
const OVERSCAN = 5;

interface UsersTableProps {
  users: User[];
  onSelectUser: (user: User) => void;
}

export function UsersTable({ users, onSelectUser }: UsersTableProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: users.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: OVERSCAN,
    getItemKey: (index) => users[index]!.id,
  });

  const virtualItems = virtualizer.getVirtualItems();
  const totalSize = virtualizer.getTotalSize();

  const onSelect = useCallback(
    (user: User) => onSelectUser(user),
    [onSelectUser]
  );

  return (
    <div className="users-table-wrap">
      <div className="users-table-header">
        <span className="user-cell">Name</span>
        <span className="user-cell">Email</span>
        <span className="user-cell">Age</span>
        <span className="user-cell">Role</span>
        <span className="user-cell">Score</span>
      </div>
      <div className="users-table-scroll" ref={parentRef}>
        <div
          className="users-table-inner"
          style={{ height: `${totalSize}px` }}
        >
          {virtualItems.map((virtualRow) => {
            const user = users[virtualRow.index];
            if (!user) return null;
            return (
              <div
                key={virtualRow.key}
                className="users-table-row-wrap"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <UserRow
                  user={user}
                  onSelect={onSelect}
                  style={{ height: ROW_HEIGHT }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
