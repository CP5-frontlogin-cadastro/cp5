import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Usuario = {
  id: number;
  nome: string;
  nomeUsuario: string;
  email: string;
};

export default function Home() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    
    if (!usuarioLogado) {
      navigate('/login');
      return;
    }
    
    setUsuario(JSON.parse(usuarioLogado));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado');
    navigate('/login');
  };

  if (!usuario) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Bem-vindo, {usuario.nome}!</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-white text-indigo-700 rounded-lg shadow hover:bg-gray-100 transition-all duration-300 font-medium"
          >
            Sair
          </button>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 transition-all duration-300 hover:shadow-xl">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">Informações do Usuário</h2>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-lg"><span className="font-semibold text-blue-700">Nome:</span> <span className="text-gray-800">{usuario.nome}</span></p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <p className="text-lg"><span className="font-semibold text-indigo-700">Nome de Usuário:</span> <span className="text-gray-800">{usuario.nomeUsuario}</span></p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-lg"><span className="font-semibold text-purple-700">Email:</span> <span className="text-gray-800">{usuario.email}</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}