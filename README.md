# Avaliação Code Front

Este README fornece uma visão geral das tecnologias utilizadas na aplicação e instruções sobre como configurar e executar a aplicação localmente.

## Tecnologias Utilizadas

A aplicação é construída utilizando uma pilha de tecnologias JavaScript, incluindo:

- **React**: Uma biblioteca JavaScript para construir interfaces de usuário.
- **TypeScript**: Um superconjunto tipado de JavaScript que compila para JavaScript puro.
- **@emotion/react e @emotion/styled**: Bibliotecas para escrever estilos CSS com JavaScript.
- **@mui/material**: Um framework de UI do React que segue o Material Design do Google.
- **styled-components**: Uma biblioteca para estilizar componentes React usando literais de modelo marcados.
- **recharts**: Uma biblioteca de gráficos construída com componentes React.
- **react-scripts**: Um conjunto de scripts do conjunto de ferramentas Create React App.
- **web-vitals**: Uma biblioteca para medir todas as métricas Web Vitals em usuários reais.

## Pré-requisitos

Antes de executar a aplicação, é necessário ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (que vem com [npm](http://npmjs.com/))
- Opcionalmente, [Yarn](https://yarnpkg.com/) como alternativa ao npm

## Configurando a Aplicação

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/rdgalves/avaliacao-code-front.git
   cd avaliacao-code-front
   ```

2. **Instale as dependências**:

   Usando npm:

   ```bash
   npm install
   ```

   Ou usando Yarn:

   ```bash
   yarn install
   ```

3. **Inicie o servidor JSON local** (se sua aplicação usa uma API de simulação):

   ```bash
   npm run api
   ```

   Ou usando Yarn:

   ```bash
   yarn api
   ```

   Isso iniciará um servidor de API local na porta 8080.

4. **Execute a aplicação**:

   No modo de desenvolvimento:

   ```bash
   npm start
   ```

   Ou usando Yarn:

   ```bash
   yarn start
   ```

   Isso rodará a aplicação em modo de desenvolvimento. Abra [http://localhost:3000](http://localhost:3000) para visualizá-la no navegador.

5. **Construa a aplicação** (para produção):

   ```bash
   npm run build
   ```

   Ou usando Yarn:

   ```bash
   yarn build
   ```

   Isso construirá a aplicação para produção na pasta `build`.

## Executando Testes

Para iniciar o executor de teste no modo de observação interativo, use:

```bash
npm test
```

Ou com Yarn:

```bash
yarn test
```