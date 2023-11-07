import React, { useEffect, useState } from 'react';
import './Formulario.css';
import Botao from '../Botao';
import { atualizarProjeto, criarProjeto, listarStatusesProjeto } from '../Services/projetoService';
import { listarFuncionarios, listarPessoas } from '../Services/pessoaService';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';
import IProjeto from '../../types/IProjeto';
import Select from 'react-select';
import IPessoa from '../../types/IPessoa';
import { Paper, Table, TableContainer, TableHead, TableRow, TableBody, TableCell, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

type FormularioProps = {
    projetoEdit?: IProjeto;
    onSaveSuccess: () => void;
    onClose: () => void;
};



function Formulario({ projetoEdit, onClose, onSaveSuccess }: FormularioProps) {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');

    const [id, setId] = useState<number | null>(null);
    const [nome, setNome] = useState('');
    const [dataInicio, setDataInicio] = useState<Date | null>(null);
    const [dataPrevisaoFim, setPrevisaoTermino] = useState<Date | null>(null);
    const [dataFim, setDataRealTermino] = useState<Date | null>(null);
    const [orcamento, setOrcamentoTotal] = useState<number | undefined>(undefined);
    const [descricao, setDescricao] = useState<string | undefined>(undefined);
    const [status, setStatus] = useState('');
    const [idGerente, setGerenteResponsavel] = useState<number | null | 0>(null);
    const [idFuncionario, setFuncionario] = useState<number | null | 0>(null);
    const [orcamentoFormatado, setOrcamentoFormatado] = useState('');
    const [statusProjeto, setStatusProjeto] = useState([]);

    
    const [membros, setMembros] = useState<IPessoa[]>([]);
    const [gerenteProjeto, setGerenteProjeto] = useState<IPessoa[]>([]);
    const [funcionarios, setFuncionarios] = useState<IPessoa[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (projetoEdit) {
            setId(projetoEdit.id)
            setNome(projetoEdit.nome);
            setDataInicio(projetoEdit.dataInicio ? new Date(projetoEdit.dataInicio) : null);
            setDataRealTermino(projetoEdit.dataFim ? new Date(projetoEdit.dataFim) : null)
            setPrevisaoTermino(projetoEdit.dataPrevisaoFim ? new Date(projetoEdit.dataPrevisaoFim) : null)

            setOrcamentoTotal(projetoEdit.orcamento)
            setDescricao(projetoEdit.descricao)
            setStatus(projetoEdit.status)
            setGerenteResponsavel(projetoEdit.gerente.id);
            setMembros(projetoEdit.membros)

            const valorFormatado = projetoEdit.orcamento ? formatarValor(projetoEdit.orcamento) : '';
            setOrcamentoTotal(projetoEdit.orcamento);
            setOrcamentoFormatado(valorFormatado);
        }

        const carregarDados = async () => {
            try {
                const resProjetos = await listarStatusesProjeto();
                const resPessoas = await listarPessoas();
                const resFuncionarios = await listarFuncionarios();
                
                setGerenteProjeto(resPessoas.data as IPessoa[]);
                setFuncionarios(resFuncionarios.data as IPessoa[]);
                setStatusProjeto(resProjetos.data);
            } catch (erro: any) {
                setSnackbarMessage((erro.response?.data?.message || erro.message));
                setSnackbarSeverity('error');
            }
        };
        carregarDados();
    }, [projetoEdit]);

    function formatarValor(valor: any) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
        }).format(valor);
    }

    const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleOrcamentoChange = (e: any) => {
        const value = e.target.value.replace(/\D/g, '');
        const numero = value ? parseInt(value, 10) : 0;
        setOrcamentoTotal(numero / 100);
        setOrcamentoFormatado(formatarValor(numero / 100));
    };

    const handleAddMembro = () => {
        const membroSelecionado = funcionarios.find(pessoa => pessoa.id === Number(idFuncionario));
        if (membroSelecionado && !membros.some(membro => membro.id === membroSelecionado.id)) {
            setMembros([...membros, membroSelecionado]);
        }
    };

    const handleRemoveMembro = (idMembro: number) => {
        setMembros(membros.filter(membro => membro.id !== idMembro));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!nome.trim()) {
            setError('O campo Nome do Projeto é obrigatório.');
            setSnackbarMessage('O campo Nome do Projeto é obrigatório.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }
        if (idGerente && !idGerente) {
            setError('O campo Gerente Responsável é obrigatório.');
            setSnackbarMessage('O campo Gerente Responsável é obrigatório.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }
        if (!status.trim()) {
            setError('O campo Status é obrigatório.');
            setSnackbarMessage('O campo Status é obrigatório.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        const projeto = {
            id: id,
            nome: nome,
            dataInicio,
            idGerente,
            dataPrevisaoFim,
            dataFim,
            orcamento,
            descricao,
            status,
            membros
        };
        projeto.membros = membros;

        try {
            if (projeto.id) {
                await atualizarProjeto(projeto.id, projeto);
            } else {
                await criarProjeto(projeto);
            }
            onClose();
            onSaveSuccess();
        } catch (erro: any) {
            setSnackbarMessage('Erro ao salvar projeto: ' + (erro.response?.data?.message || erro.message));
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <label className="form-field">
                        Nome do Projeto:
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                        {error && <div className="error-message">{error}</div>}
                    </label>
                    <label className="form-field">
                        Data de Início:
                        <input
                            type="date"
                            value={dataInicio ? dataInicio.toISOString().split('T')[0] : ''}
                            onChange={(e) => setDataInicio(e.target.value ? new Date(e.target.value) : null)} />
                    </label>
                </div>
                <div className="form-row">
                    <label className="form-field">
                        Previsão de Término:
                        <input
                            type="date"
                            value={dataPrevisaoFim ? dataPrevisaoFim.toISOString().split('T')[0] : ''}
                            onChange={(e) => setPrevisaoTermino(e.target.value ? new Date(e.target.value) : null)}
                        />
                    </label>
                    <label className="form-field">
                        Data Real de Término:
                        <input
                            type="date"
                            value={dataFim ? dataFim.toISOString().split('T')[0] : ''}
                            onChange={(e) => setDataRealTermino(e.target.value ? new Date(e.target.value) : null)}
                        />
                    </label>
                </div>
                <div className="form-row">
                    <label className="form-field">
                        Gerente Responsável:
                        <Select
                            value={gerenteProjeto.find((pessoa) => pessoa.id === Number(idGerente))
                                ? { value: Number(idGerente), label: gerenteProjeto.find((pessoa) => pessoa.id === Number(idGerente))?.nome }
                                : null}
                            onChange={(option) => setGerenteResponsavel(option ? Number(option.value) : null)}
                            options={gerenteProjeto.map((pessoa) => ({
                                value: pessoa.id,
                                label: pessoa.nome
                            }))}
                            isClearable
                            isSearchable
                            placeholder="Selecione o Gerente Responsável"
                        />

                        {error && <div className="error-message">{error}</div>}
                    </label>
                    <label className="form-field">
                        Orçamento Total:
                        <input type="text" value={orcamentoFormatado} onChange={handleOrcamentoChange} />
                    </label>
                </div>
                <div className="form-row">
                    <label>
                        Status:
                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                            { }
                            <option value="" disabled>
                                Selecione
                            </option>
                            { }
                            {statusProjeto.map((statusItem: any) => (
                                <option key={statusItem.id} value={statusItem.id}>
                                    {statusItem.descricao}
                                </option>
                            ))}
                        </select>
                        {error && <div className="error-message">{error}</div>}
                    </label>
                </div>
                <label>
                    Descrição:
                    <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                </label>
                <h3>Membros</h3>
                <div>
                    <Select
                        value={funcionarios.find((pessoa) => pessoa.id === Number(idFuncionario))
                            ? { value: Number(idFuncionario), label: funcionarios.find((pessoa) => pessoa.id === Number(idFuncionario))?.nome }
                            : null}
                        onChange={(option) => setFuncionario(option ? Number(option.value) : null)}
                        options={funcionarios.map((pessoa) => ({
                            value: pessoa.id,
                            label: pessoa.nome,
                        }))}
                        isClearable
                        isSearchable
                        placeholder="Selecione um Funcionário"
                    />
                    <Botao type="button" onClick={handleAddMembro}>Adicionar Membro</Botao>
                    <br></br>
                </div>

                <TableContainer component={Paper}>
                    <Table aria-label="tabela simples">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Nome</TableCell>
                                <TableCell align="left">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {membros.map((linha) => (
                                <TableRow key={linha.id}>
                                    <TableCell align="left">{linha.nome}</TableCell>
                                    <TableCell align="left">
                                        <IconButton onClick={() => handleRemoveMembro(linha.id)}><DeleteIcon /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Botao type="submit">Salvar Projeto</Botao>

            </form>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}

export default Formulario;