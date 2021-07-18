import styled from "styled-components";

/**
 * Criando um componente chamado 'Box' com a sintaxe do style-components
 * que será uma div com a estilização passada entres as crases
 */
const Box = styled.div`
  background: #fff;
  border-radius: 8px;
`;

const MainGrid = styled.main`
  display: grid;
  grid-gap: 10px; // Espaçamento entre os elementos do grid
  padding: 16px;
  border: 2px solid;

  // Quando a tela for de 860px pra cima
  @media (min-width: 860px) {
    // Definindo as 3 áreas(colunas)
    grid-template-areas: "profileArea welcomeArea profileRelationsArea";
    /**
      São 3 colunas -> 1º - 160px, 2º 1fr, 3º 312px
      1fr -> pegando uma fração da sobra de espaço, para que o layout não quebre
    */
    grid-template-columns: 160px 1fr 312px;
  }
`;

export default function Home() {
  return (
    <MainGrid>
      <div style={{ gridArea: "profileArea" }}>
        <Box>Imagem</Box>
      </div>
      <div style={{ gridArea: "welcomeArea" }}>
        <Box>Bem Vindo</Box>
      </div>
      <div style={{ gridArea: "profileRelationsArea" }}>
        <Box>Pessoas da comunidade</Box>
      </div>
    </MainGrid>
  );
}
