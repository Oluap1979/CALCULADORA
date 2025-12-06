import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { getUsers, saveUser, deleteUser } from '../utils/auth';

interface AdminDashboardProps {
  currentUser: User;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ currentUser, onLogout }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setIsLoading(true);
    const data = await getUsers();
    setUsers(data);
    setIsLoading(false);
  };

  const handleOpenModal = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setName(user.name);
      setEmail(user.email);
      setPassword(user.password);
      setIsAdmin(user.isAdmin);
    } else {
      setEditingUser(null);
      setName('');
      setEmail('');
      setPassword('');
      setIsAdmin(false);
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (id === currentUser.id) {
      alert("Você não pode excluir sua própria conta.");
      return;
    }
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      setIsLoading(true);
      await deleteUser(id);
      await loadUsers();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const newUser: User = {
      id: editingUser ? editingUser.id : crypto.randomUUID(),
      name,
      email,
      password,
      isAdmin,
    };

    await saveUser(newUser);
    await loadUsers();
    setIsLoading(false);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 bg-gradient-to-br from-slate-900 via-slate-900 to-rose-900/40 p-4 font-sans text-slate-300">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/50 p-6 backdrop-blur-sm">
          <div>
            <h1 className="text-2xl font-bold text-white">Painel Administrativo</h1>
            <p className="text-sm text-slate-400">Bem-vindo, {currentUser.name}</p>
          </div>
          <button
            onClick={onLogout}
            className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-600"
          >
            Sair
          </button>
        </header>

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Gerenciar Usuários</h2>
          <button
            onClick={() => handleOpenModal()}
            disabled={isLoading}
            className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition-transform hover:scale-105 hover:bg-rose-500 disabled:opacity-50"
          >
            + Novo Usuário
          </button>
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-700 bg-slate-800/50 shadow-2xl">
          {isLoading && users.length === 0 ? (
             <div className="p-8 text-center text-slate-400">Carregando usuários...</div>
          ) : (
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400">Senha</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400">Tipo</th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-400">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700 bg-slate-900/50">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-800/70">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="font-medium text-white">{user.name}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-slate-300">{user.email}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-slate-500 font-mono">••••••</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {user.isAdmin ? (
                      <span className="inline-flex rounded-full bg-rose-900/50 px-2 text-xs font-semibold leading-5 text-rose-300">
                        Admin
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full bg-slate-700/50 px-2 text-xs font-semibold leading-5 text-slate-300">
                        Usuário
                      </span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <button
                      onClick={() => handleOpenModal(user)}
                      className="mr-4 text-rose-400 hover:text-rose-300 disabled:opacity-50"
                      disabled={isLoading}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-slate-500 hover:text-red-400 disabled:opacity-50"
                      disabled={user.id === currentUser.id || isLoading}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>
      </div>

      {/* Modal for Create/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-2xl">
            <h3 className="mb-4 text-xl font-bold text-white">
              {editingUser ? 'Editar Usuário' : 'Novo Usuário'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-400">Nome</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-400">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-400">Senha</label>
                <input
                  type="text"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-white placeholder-slate-400 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>
              <div className="flex items-center">
                <input
                  id="isAdmin"
                  type="checkbox"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-600 bg-slate-700 text-rose-600 focus:ring-rose-500"
                />
                <label htmlFor="isAdmin" className="ml-2 text-sm text-slate-300">
                  Acesso de Administrador
                </label>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isLoading}
                  className="rounded-md bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-600 disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-500 disabled:opacity-50"
                >
                  {isLoading ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};