import IConsulta from "./types/IProjeto";
import useFetch from "./useFetch";

const useDadosConsulta = () => {
    return useFetch<IConsulta[]>({ url: 'api/projetos' });
}

export default useDadosConsulta;