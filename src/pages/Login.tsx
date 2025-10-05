import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

type LoginFormData = {
  nomeUsuario: string;
  email: string;
};

export default function Login() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await fetch('http://localhost:3001/usuarios');
      const usuarios = await response.json();
      
      const usuarioEncontrado = usuarios.find(
        (user: any) => 
          user.nomeUsuario === data.nomeUsuario && 
          user.email === data.email
      );
      
      if (usuarioEncontrado) {
        // Simular autenticação com localStorage
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
        navigate('/');
      } else {
        setLoginError('Usuário ou email incorretos');
      }
    } catch (error) {
      setLoginError('Erro ao tentar fazer login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all hover:scale-105 duration-300">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Acesso ao Sistema</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nome de Usuário</label>
            <input
              type="text"
              {...register('nomeUsuario', { 
                required: 'Nome de usuário é obrigatório' 
              })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Digite seu nome de usuário"
            />
            {errors.nomeUsuario && (
              <p className="text-red-500 text-xs mt-2 font-medium">{errors.nomeUsuario.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              {...register('email', { 
                required: 'Email é obrigatório',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email inválido'
                }
              })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="seu.email@exemplo.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-2 font-medium">{errors.email.message}</p>
            )}
          </div>
          
          {loginError && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-sm" role="alert">
              <div className="flex">
                <div className="py-1">
                  <svg className="w-6 h-6 mr-4 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <span className="font-medium">{loginError}</span>
              </div>
            </div>
          )}
          
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all hover:scale-105 duration-300"
            >
              Entrar
            </button>
          </div>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Não tem uma conta?{' '}
            <Link to="/cadastro" className="font-semibold text-blue-600 hover:text-blue-800 transition-colors">
              Cadastre-se agora
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}