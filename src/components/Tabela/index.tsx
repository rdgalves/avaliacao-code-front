import styled from "@emotion/styled";
import { Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IConsulta from "../../types/IProjeto";

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


function Tabela({ consultas }: { consultas: IConsulta[] | null }) {
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
                                    <CelulaEstilizada>{projeto.orcamento}</CelulaEstilizada>
                                </LinhaEstilizada>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Tabela;