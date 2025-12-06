import React, { useState, useEffect } from 'react';
import { AuthPage } from './components/AuthPage';
import { Dashboard } from './components/Dashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { User } from './types';
import { initializeAuth } from './utils/auth';
import { isSupabaseConfigured } from './utils/supabaseClient';

const SetupScreen: React.FC = () => (
  <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4 text-slate-300">
    <div className="max-w-lg rounded-xl border border-slate-700 bg-slate-800 p-8 shadow-2xl text-center">
      <div className="mb-6 flex justify-center">
        <div className="rounded-full bg-rose-900/50 p-4 text-rose-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
          </svg>
        </div>
      </div>
      <h2 className="mb-4 text-2xl font-bold text-white">Configuração do Banco de Dados</h2>
      <p className="mb-6 text-slate-400">
        Para o sistema funcionar, você precisa conectar ao <strong>Supabase</strong>.
      </p>
      <div className="mb-6 rounded-md bg-slate-900 p-4 text-left text-sm font-mono text-slate-400 border border-slate-700">
        <p className="mb-2 text-rose-400">// Me envie estas chaves no chat:</p>
        <p>1. Project URL</p>
        <p>2. Anon / Public Key</p>
      </div>
      <p className="text-sm text-slate-500">
        Você encontra esses dados em: <br/>
        <span className="font-semibold text-slate-300">Supabase Dashboard {'>'} Settings {'>'} API</span>
      </p>
    </div>
  </div>
);

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const init = async () => {
        if (!isSupabaseConfigured()) {
            setIsInitializing(false);
            return;
        }
        // Ensure default admin exists or db is connected
        await initializeAuth();
        setIsInitializing(false);
    };
    init();
  }, []);

  // 1. Check Configuration
  if (!isSupabaseConfigured()) {
    return <SetupScreen />;
  }

  // 2. Loading State
  if (isInitializing) {
      return (
          <div className="flex min-h-screen items-center justify-center bg-slate-900 text-slate-400">
              <svg className="mr-3 h-8 w-8 animate-spin text-rose-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
             </svg>
             Conectando ao banco de dados...
          </div>
      );
  }

  // 3. Auth Flow
  if (!currentUser) {
    return <AuthPage onLogin={(user) => setCurrentUser(user)} />;
  }

  // 4. Authenticated Area
  if (currentUser.isAdmin) {
    return <AdminDashboard currentUser={currentUser} onLogout={() => setCurrentUser(null)} />;
  }

  return <Dashboard onLogout={() => setCurrentUser(null)} />;
};

export default App;