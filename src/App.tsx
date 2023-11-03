import './App.css';
import Botao from './components/Botao';
import Cabecalho from './components/Cabecalho';
import Container from './components/Container';
import Tabela from './components/Tabela';
import Titulo from './components/Titulo';
import useDadosConsulta from './useDadosConsulta';

function App() {
  const { dados: consultas, erro: consultasErro } = useDadosConsulta();

  if (consultasErro) {
    console.log("Ocorreu um erro na requisição")
  }

  return (
    <>
      <Cabecalho />
      <Container>
        <Botao>Cadastrar Projeto</Botao>
        <Titulo>Projetos</Titulo>
        <Tabela consultas={consultas} />
      </Container>
    </>
  );
}

export default App;
