import IPessoa from "./IProjeto";  // Assumindo que você tem uma interface IPessoa para a classe Pessoa

export default interface IProjeto {
    id: number,
    nome: string,
    dataInicio: Date,
    dataPrevisaoFim: Date, // tornando opcional, pois pode ou não ter uma data de previsão de término
    dataFim: Date, // tornando opcional, pois pode ou não ter uma data de término
    descricao?: string, // tornando opcional, pois pode ou não ter uma descrição
   // status: StatusProjetoEnum, // Supondo que você tenha um enum correspondente em TypeScript
    orcamento?: number, // tornando opcional, pois pode ou não ter um orçamento
   // risco: RiscoProjetoEnum, // Supondo que você tenha um enum correspondente em TypeScript
    gerente: IPessoa,
    membros: Array<IPessoa>
}
