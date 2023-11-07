import React, { useState, useEffect } from 'react';
import './App.css';
import Botao from './components/Botao';
import Cabecalho from './components/Cabecalho';
import Container from './components/Container';
import Tabela from './components/Tabela';
import Titulo from './components/Titulo';
import Modal from './components/Modal';
import Formulario from './components/Formulario';
import { listarTodosProjetos } from './components/Services/projetoService';
import IProjeto from './types/IProjeto';
import { Alert, AlertColor, Snackbar } from '@mui/material';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projetos, setProjetos] = useState([]);
  const [error, setError] = useState(null);
  const [projetoParaEditar, setProjetoParaEditar] = useState<IProjeto | undefined>(undefined);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');

  useEffect(() => {
    atualizarProjetos()
  }, []);

  const atualizarProjetos = async () => {
    const carregarDados = async () => {
      try {
        const resProjetos = await listarTodosProjetos();
        setProjetos(resProjetos.data);
      } catch (erro: any) {
        setSnackbarMessage((erro.response?.data?.message || erro.message));
        setSnackbarSeverity('error');
      }
    };
    carregarDados();
  };


  const handleProjectDeletion = () => {
    atualizarProjetos();
    setSnackbarMessage('Projeto excluído com sucesso!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  const handleProjectSave = () => {
    atualizarProjetos();
    setSnackbarMessage('Projeto salvo com sucesso!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    atualizarProjetos();
  };

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <Cabecalho />
      <Container>
        <Botao onClick={() => setIsModalOpen(true)}>Cadastrar Projeto</Botao>
        <Titulo>Projetos</Titulo>
        <Tabela consultas={projetos} onDeleteSuccess={handleProjectDeletion} setProjetoParaEditar={setProjetoParaEditar} setIsModalOpen={setIsModalOpen} />
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <Formulario onSaveSuccess={handleProjectSave} projetoEdit={projetoParaEditar} onClose={handleCloseModal} />
        </Modal>
      </Container>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
