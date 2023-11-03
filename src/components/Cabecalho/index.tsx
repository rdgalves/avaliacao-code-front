import styled from 'styled-components';
import logo from './assets/logo-cinza.png';
import Titulo from '../Titulo';

const CabecalhoEstilizado = styled.header`
    display:flex;
    align-items: center;
    justify-content: space-between;
    padding: 2em 4em
`

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-grow: 1;
    
`

const LinkEstilizado = styled.a`
 color: var(--azul-escuro);
 font-weight: 700;
`

function Cabecalho() {
    return (
        <CabecalhoEstilizado>
            <Container>
                <img src={logo} alt="logo da empresa Code Group" />                
            </Container>
        </CabecalhoEstilizado>
    )
}

export default Cabecalho;