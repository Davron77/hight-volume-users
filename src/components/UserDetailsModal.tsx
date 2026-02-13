import { useEffect, useState } from 'react';
import type { User, UserPatch } from '../types/user.js';

interface UserDetailsModalProps {
  user: User | null;
  onClose: () => void;
  onSave: (userId: string, patch: UserPatch) => void;
  saveError: string | null;
  onClearSaveError: () => void;
}

export function UserDetailsModal({
  user,
  onClose,
  onSave,
  saveError,
  onClearSaveError,
}: UserDetailsModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAge(String(user.age));
      onClearSaveError();
    }
  }, [user, onClearSaveError]);

  if (!user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ageNum = parseInt(age, 10);
    if (Number.isNaN(ageNum) || ageNum < 0 || ageNum > 150) return;
    onSave(user.id, { name, email, age: ageNum });
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="modal-backdrop"
      onClick={handleBackdropClick}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h2 id="modal-title">Edit user</h2>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {saveError && (
            <div className="modal-error" role="alert">
              {saveError}
            </div>
          )}
          <div className="modal-field">
            <label htmlFor="modal-name">Name</label>
            <input
              id="modal-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="modal-field">
            <label htmlFor="modal-email">Email</label>
            <input
              id="modal-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="modal-field">
            <label htmlFor="modal-age">Age</label>
            <input
              id="modal-age"
              type="number"
              min={0}
              max={150}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div className="modal-footer">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
