import styled from 'styled-components';

interface Props {
    imagem?: string,
    children?: React.ReactNode
}

interface IImagens {
    avaliacao: string,
    grafico: string,
    consulta: string
}

const SpanEstilizado = styled.span<Props>`
background-repeat: no-repeat;
background-position: center;
background-size: cover;
width: 25px;
height: 25px;
background-image: ${props => props.imagem ? `url(${props.imagem})` : 'none'}
`

const TituloEstilizado = styled.h2`
 color: #808080;
`

const ContainerEstilizado = styled.div`
 display: flex;
 align-items: center;
`

function Titulo({ imagem, children }: Props) {

   

    return (
        <ContainerEstilizado>
          <TituloEstilizado>{children}</TituloEstilizado>
        </ContainerEstilizado>
    )
}

export default Titulo;