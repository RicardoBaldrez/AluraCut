import styled from 'styled-components'

/**
 * Criando um componente chamado 'Box' com a sintaxe do style-components
 * que será uma div com a estilização passada entres as crases
 */
const Box = styled.div`
  background: #fff;
  border-radius: 8px;
`

export default function Home() {
  return (
    <main>
      <Box>
        Imagem
      </Box>
      <Box>
        Bem Vindo
      </Box>
      <Box>
        Comunidades
      </Box>
    </main>
  )
}
