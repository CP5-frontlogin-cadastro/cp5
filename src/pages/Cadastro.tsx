import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

type CadastroFormData = {
  nome: string;
  nomeUsuario: string;
  email: string;
};

export default function Cadastro() {
  const navigate = useNavigate();
  const [cadastroError, setCadastroError] = useState('');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CadastroFormData>();

  const onSubmit = async (data: CadastroFormData) => {
    try {
      // Verificar se já existe usuário com mesmo nome ou email
      const response = await fetch('http://localhost:3001/usuarios');
      const usuarios = await response.json();
      
      const usuarioExistente = usuarios.find(
        (user: any) => 
          user.nomeUsuario === data.nomeUsuario || 
          user.email === data.email
      );
      
      if (usuarioExistente) {
        setCadastroError('Nome de usuário ou email já cadastrado');
        return;
      }
      
      // Cadastrar novo usuário
      const cadastroResponse = await fetch('http://localhost:3001/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: Date.now(),
          nome: data.nome,
          nomeUsuario: data.nomeUsuario,
          email: data.email,
        }),
      });
      
      if (cadastroResponse.ok) {
        navigate('/login');
      } else {
        setCadastroError('Erro ao cadastrar usuário');
      }
    } catch (error) {
      setCadastroError('Erro ao tentar cadastrar');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Cadastro</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              {...register('nome', { 
                required: 'Nome é obrigatório' 
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            />
            {errors.nome && (
              <p className="text-red-500 text-xs mt-1">{errors.nome.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome de Usuário</label>
            <input
              type="text"
              {...register('nomeUsuario', { 
                required: 'Nome de usuário é obrigatório' 
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            />
            {errors.nomeUsuario && (
              <p className="text-red-500 text-xs mt-1">{errors.nomeUsuario.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register('email', { 
                required: 'Email é obrigatório',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email inválido'
                }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>
          
          {cadastroError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{cadastroError}</span>
            </div>
          )}
          
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cadastrar
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Já tem uma conta?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}