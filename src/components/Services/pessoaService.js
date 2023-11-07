import { apiInstance } from './apiConfig';

export const listarPessoas = () => {
  return apiInstance.get('/api/pessoas');
};

export const listarFuncionarios = () => {
  return apiInstance.get('/api/pessoas/funcionarios');
};
