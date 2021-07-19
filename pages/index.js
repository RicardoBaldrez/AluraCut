import { useState, useEffect } from 'react';
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from "../src/lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(props) {
  return (
    <Box>
      <img
        src={`https://github.com/${props.githubUser}.png`}
        style={{ borderRadius: "8px" }}
      />
      <hr />
      <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
        @{props.githubUser}
      </a>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

export default function Home() {
  const githubUser = "RicardoBaldrez";
  const [followers, setFollowers] = useState([]);
  const [communities, setCommunities] = useState(['Valor inicial']);

  useEffect(() => {
    fetch(`https://api.github.com/users/peas/followers`)
      .then((resp) => resp.json())
      .then((result) => setFollowers(result));
  }, []);

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div 
          className="welcomeArea" 
          style={{ gridArea: "welcomeArea" }}
        >
          <Box>
            <h1 className="title">Bem Vindo(a)</h1>
            <OrkutNostalgicIconSet 
              recados="5"
              fotos="16"
              fas="182"
              mensagens="9"
              confiavel="3"
              legal="3"
              sexy="3"
            />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const updatedCommunities = [...communities, 'alura React'];
              setCommunities(updatedCommunities);
            }}>
              {console.log(communities)}
              <input 
                placeholder="Qual vai ser o nome da sua comunidade?" 
                name="title"
                aria-label="Qual vai ser o nome da sua comunidade?"
                type="text"
              />
              <input 
                placeholder="Coloque uma ERL para usarmos de capa" 
                name="image"
                aria-label="Coloque uma ERL para usarmos de capa"
              />
              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Pessoas da comunidade ({ followers.length })</h2>
            <ul>
              {followers.map((follower) => {
                return(
                  <li key={follower.login}>
                    <a href={follower.html_url}>
                      <img src={follower.avatar_url} />
                      <span>{follower.login}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <ul>
              {communities.map((community, index) => {
                return(
                  <li key={community}>
                    <a href={community.html_url}>
                      <img src={`http://placehold.it/300x300`} />
                      <span>{community} {index}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
