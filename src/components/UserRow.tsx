import { memo, useMemo } from 'react';
import type { User } from '../types/user.js';

const ROW_ITERATIONS = 8000;

function computeActivityScore(user: User): number {
  let score = 0;
  const str = `${user.id}-${user.name}-${user.email}-${user.age}`;
  for (let i = 0; i < ROW_ITERATIONS; i++) {
    for (let j = 0; j < str.length; j++) {
      score = (score + str.charCodeAt(j) * (i + 1)) % 10000;
    }
  }
  return score % 100;
}

interface UserRowProps {
  user: User;
  onSelect: (user: User) => void;
  style: React.CSSProperties;
}

function UserRowComponent({ user, onSelect, style }: UserRowProps) {
  const activityScore = useMemo(
    () => computeActivityScore(user),
    [user.id, user.name, user.email, user.age]
  );

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(user)}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(user)}
      style={style}
      className="user-row"
    >
      <span className="user-cell">{user.name}</span>
      <span className="user-cell">{user.email}</span>
      <span className="user-cell">{user.age}</span>
      <span className="user-cell">{user.role}</span>
      <span className="user-cell">{activityScore}</span>
    </div>
  );
}

export const UserRow = memo(UserRowComponent);
