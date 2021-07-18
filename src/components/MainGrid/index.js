import styled from "styled-components";

const MainGrid = styled.main`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  grid-gap: 10px; // Espaçamento entre os elementos do grid
  padding: 16px;
  border: 2px solid;

  .profileArea {
    display: none;
    @media (min-width: 860px) {
      display: block;
    }
  }

  // Quando a tela for de 860px pra cima
  @media (min-width: 860px) {
    display: grid;
    // Definindo as 3 áreas(colunas)
    grid-template-areas: "profileArea welcomeArea profileRelationsArea";
    /**
      São 3 colunas -> 1º - 160px, 2º 1fr, 3º 312px
      1fr -> pegando uma fração da sobra de espaço, para que o layout não quebre
    */
    grid-template-columns: 160px 1fr 312px;
    max-width: 1110px;
  }
`;

export default MainGrid;
