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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transition-all duration-300 hover:shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Cadastro</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nome</label>
            <input
              type="text"
              {...register('nome', { 
                required: 'Nome é obrigatório' 
              })}
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Digite seu nome completo"
            />
            {errors.nome && (
              <p className="text-red-500 text-xs mt-1 font-medium">{errors.nome.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nome de Usuário</label>
            <input
              type="text"
              {...register('nomeUsuario', { 
                required: 'Nome de usuário é obrigatório' 
              })}
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Escolha um nome de usuário único"
            />
            {errors.nomeUsuario && (
              <p className="text-red-500 text-xs mt-1 font-medium">{errors.nomeUsuario.message}</p>
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
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="seu@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>
            )}
          </div>
          
          {cadastroError && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-sm" role="alert">
              <p className="font-medium">{cadastroError}</p>
            </div>
          )}
          
          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:-translate-y-1"
            >
              Criar Conta
            </button>
          </div>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Já tem uma conta?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-800 transition-colors">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}