import { apiInstance } from './apiConfig';

export const criarProjeto = (projeto) => {
  return apiInstance.post('/api/projetos', projeto);
};

export const listarTodosProjetos = () => {
  return apiInstance.get('/api/projetos');
};

export const buscarProjetoPorId = (id) => {
  return apiInstance.get(`/api/projetos/${id}`);
};

export const atualizarProjeto = (id, projeto) => {
  return apiInstance.put(`/api/projetos/${id}`, projeto);
};

export const deletarProjeto = (id) => {
  return apiInstance.delete(`/api/projetos/${id}`);
};

export const listarStatusesProjeto = () => {
  return apiInstance.get('/api/projetos/status');
};

export const listarRiscosProjeto = () => {
  return apiInstance.get('/api/projetos/riscos');
};
