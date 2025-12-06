import { User } from '../types';

const STORAGE_KEY = 'app_users';

// Initialize default admin if no users exist
export const initializeAuth = () => {
  const users = getUsers();
  if (users.length === 0) {
    const defaultAdmin: User = {
      id: 'admin-1',
      name: 'Administrador',
      email: 'admin@admin.com',
      password: 'admin123',
      isAdmin: true,
    };
    saveUser(defaultAdmin);
    console.log('Default admin created: admin@admin.com / admin123');
  }
};

export const getUsers = (): User[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveUser = (user: User) => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === user.id);
  
  if (index >= 0) {
    users[index] = user;
  } else {
    users.push(user);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

export const deleteUser = (id: string) => {
  const users = getUsers().filter(u => u.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

export const validateLogin = (email: string, password: string): User | null => {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  return user || null;
};
