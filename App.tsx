import React, { useState, useEffect } from 'react';
import { AuthPage } from './components/AuthPage';
import { Dashboard } from './components/Dashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { User } from './types';
import { initializeAuth } from './utils/auth';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Ensure default admin exists
    initializeAuth();
  }, []);

  if (!currentUser) {
    return <AuthPage onLogin={(user) => setCurrentUser(user)} />;
  }

  if (currentUser.isAdmin) {
    return <AdminDashboard currentUser={currentUser} onLogout={() => setCurrentUser(null)} />;
  }

  return <Dashboard onLogout={() => setCurrentUser(null)} />;
};

export default App;