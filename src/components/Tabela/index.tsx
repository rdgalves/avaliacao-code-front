import styled from "@emotion/styled";
import { IconButton, Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IConsulta from "../../types/IProjeto";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { useState } from "react";
import { deletarProjeto } from "../Services/projetoService";
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';


const CelulaEstilizada = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        color: "var(--azul-escuro)",
        fontSize: 18,
        fontWeight: 700,
        fontFamily: "var(--fonte-principal)"
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
        fontFamily: "var(--fonte-principal)"
    }
}))

const LinhaEstilizada = styled(TableRow)(() => ({
    [`&:nth-of-type(odd)`]: {
        backgroundColor: "var(--cinza-claro)",
        align: "right"
    }
}))
function Tabela({ consultas, onDeleteSuccess, setProjetoParaEditar, setIsModalOpen}: { consultas: IConsulta[] | null, onDeleteSuccess: Function, setProjetoParaEditar: Function, setIsModalOpen: Function  }) {
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');

    const handleDeleteClick = (projetoId: any) => {
        setSelectedProjectId(projetoId);
        setOpenConfirmDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenConfirmDialog(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await deletarProjeto(selectedProjectId);
            setSnackbarMessage('Projeto excluído com sucesso!');
            setSnackbarSeverity('success');
            onDeleteSuccess();
        } catch (erro: any) {
            setSnackbarMessage('Erro ao excluir o projeto: ' + (erro.response?.data?.message || erro.message));
            console.error('Erro ao buscar dados: ', erro.response.data.message);
            setSnackbarSeverity('error');
        } finally {
            setSnackbarOpen(true);
            setOpenConfirmDialog(false);
        }
        setOpenConfirmDialog(false);
    };

    const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleEdit = (projetoId: any) => {
        const projetoSelecionado = consultas?.find(projeto => projeto.id === projetoId);
        setProjetoParaEditar(projetoSelecionado);
        if(projetoSelecionado) {
          setIsModalOpen(true); 
        }
      };

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="tabela-customizada">
                    <TableHead>
                        <TableRow>
                            <CelulaEstilizada>Nome</CelulaEstilizada>
                            <CelulaEstilizada>Gerente</CelulaEstilizada>
                            <CelulaEstilizada>Data Inicio</CelulaEstilizada>
                            <CelulaEstilizada>Data Fim</CelulaEstilizada>
                            <CelulaEstilizada>Data Previsão Fim</CelulaEstilizada>
                            <CelulaEstilizada>Quantidade de Membros</CelulaEstilizada>
                            <CelulaEstilizada>Orçamento</CelulaEstilizada>
                            <CelulaEstilizada>Status</CelulaEstilizada>
                            <CelulaEstilizada>Risco</CelulaEstilizada>
                            <CelulaEstilizada>Ações</CelulaEstilizada>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {consultas?.map((projeto) => {
                            return (
                                <LinhaEstilizada>
                                    <CelulaEstilizada>{projeto.nome}</CelulaEstilizada>
                                    <CelulaEstilizada>{projeto.gerente.nome}</CelulaEstilizada>
                                    <CelulaEstilizada component="th" scope="row">{new Date(projeto.dataInicio).toLocaleDateString()}</CelulaEstilizada>
                                    <CelulaEstilizada component="th" scope="row">{new Date(projeto.dataFim).toLocaleDateString()}</CelulaEstilizada>
                                    <CelulaEstilizada component="th" scope="row">{new Date(projeto.dataPrevisaoFim).toLocaleDateString()}</CelulaEstilizada>
                                    <CelulaEstilizada>{projeto.membros.length}</CelulaEstilizada>
                                    <CelulaEstilizada>
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(projeto.orcamento))}
                                    </CelulaEstilizada>
                                    <CelulaEstilizada>{projeto.status}</CelulaEstilizada>
                                    <CelulaEstilizada>{projeto.risco}</CelulaEstilizada>

                                    <CelulaEstilizada>
                                        <IconButton onClick={() => handleEdit(projeto.id)}><EditIcon /></IconButton>
                                        <IconButton onClick={() => handleDeleteClick(projeto.id)}><DeleteIcon /></IconButton>
                                    </CelulaEstilizada>
                                </LinhaEstilizada>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                open={openConfirmDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    {"Confirmação de Exclusão"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Tem certeza de que deseja excluir este projeto?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Não</Button>
                    <Button onClick={handleConfirmDelete} autoFocus>
                        Sim
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    )
}

export default Tabela;