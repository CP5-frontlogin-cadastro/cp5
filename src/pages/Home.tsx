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
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Bem-vindo!</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Sair
          </button>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Informações do Usuário</h2>
              <div className="space-y-2">
                <p><span className="font-medium">Nome:</span> {usuario.nome}</p>
                <p><span className="font-medium">Nome de Usuário:</span> {usuario.nomeUsuario}</p>
                <p><span className="font-medium">Email:</span> {usuario.email}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}