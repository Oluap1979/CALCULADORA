import React, { useState } from 'react';
import { validateLogin } from '../utils/auth';
import { User } from '../types';

interface AuthPageProps {
  onLogin: (user: User) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));

    const user = validateLogin(email, password);

    if (user) {
      onLogin(user);
    } else {
      setError('Email ou senha inválidos.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 bg-gradient-to-br from-slate-900 via-slate-900 to-rose-900/40 p-4 font-sans text-slate-300">
      <div className="w-full max-w-md space-y-8 rounded-xl border border-slate-700 bg-slate-800/50 p-8 shadow-2xl backdrop-blur-sm">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">Login</h2>
          <p className="mt-2 text-sm text-slate-400">Entre para acessar o sistema</p>
        </div>
        
        {error && (
          <div className="rounded-md bg-red-900/50 p-3 text-center text-sm text-red-200 border border-red-800">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">Email</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-t-md border border-slate-700 bg-slate-800 px-3 py-3 text-white placeholder-slate-500 focus:z-10 focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm"
                placeholder="Seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Senha</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full rounded-b-md border border-slate-700 bg-slate-800 px-3 py-3 text-white placeholder-slate-500 focus:z-10 focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-rose-600 focus:ring-rose-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-400">
                Lembrar-me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-rose-500 hover:text-rose-400">
                Esqueceu a senha?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                 <svg className="-ml-1 mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
              ) : (
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-rose-300 group-hover:text-rose-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
        </form>
         <div className="mt-4 text-center text-xs text-slate-500">
            <p>Admin Padrão: admin@admin.com / admin123</p>
        </div>
      </div>
    </div>
  );
};
