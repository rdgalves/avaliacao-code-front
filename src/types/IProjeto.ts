import IPessoa from "./IPessoa"; 
export default interface IProjeto {
    id: number,
    nome: string,
    dataInicio: Date,
    dataPrevisaoFim: Date, 
    dataFim: Date, 
    descricao?: string, 
    status: string, 
    orcamento?: number, 
    risco: string,
    gerente: IPessoa,
    membros: Array<IPessoa>
}
