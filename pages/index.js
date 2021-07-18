import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';

export default function Home() {
  const githubUser = 'RicardoBaldrez';

  return (
    <MainGrid>
      <div className="profileArea" style={{ gridArea: "profileArea" }}>
        <Box>
          <img src={`https://github.com/${githubUser}.png`} style={{ borderRadius: '8px' }} />
        </Box>
      </div>
      <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
        <Box>Bem Vindo</Box>
      </div>
      <div className="profileRelationsArea" style={{ gridArea: "profileRelationsArea" }}>
        <Box>Pessoas da comunidade</Box>
      </div>
    </MainGrid>
  );
}
