import type { User, UserRole } from '../types/user.js';

const FIRST_NAMES = [
  'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
  'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
  'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Lisa', 'Daniel', 'Nancy',
  'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley',
];

const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
  'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker',
];

const ROLES: UserRole[] = ['admin', 'user', 'guest'];

function seededRandom(seed: number): () => number {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

function pick<T>(arr: readonly T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)]!;
}

const TOTAL_USERS = 10_500;

let cachedUsers: User[] | null = null;

export function getUsers(): User[] {
  if (cachedUsers !== null) return cachedUsers;

  const users: User[] = [];
  const rng = seededRandom(12345);

  for (let i = 0; i < TOTAL_USERS; i++) {
    const first = pick(FIRST_NAMES, rng);
    const last = pick(LAST_NAMES, rng);
    const name = `${first} ${last}`;
    const email = `${first.toLowerCase()}.${last.toLowerCase()}${i}@example.com`;
    const age = 18 + Math.floor(rng() * 60);
    const role = pick(ROLES, rng);
    users.push({
      id: `user-${i}`,
      name,
      email,
      age,
      role,
    });
  }

  cachedUsers = users;
  return users;
}

export function getUsersAsync(): Promise<User[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(getUsers()), 400);
  });
}
