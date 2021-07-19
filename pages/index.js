import { useState, useEffect } from "react";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";

function ProfileSidebar(props) {
  return (
    // Transformando a div(que é a tag principal do componente Box) em aside para se comportar melhor semânticamente
    <Box as="aside">
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
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    fetch(`https://api.github.com/users/peas/followers`)
      .then((resp) => resp.json())
      .then((result) => setFollowers(result));
  }, []);

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // Armazenando/tratando os dados vindos do formuário
                const dataForm = new FormData(e.target);
                const newCommunity = {
                  title: dataForm.get("title"), // Pegando o valor do input com nome 'title'
                  image: dataForm.get("image"), // Pegando o valor do input com nome 'image'
                };
                const updatedCommunities = [...communities, newCommunity];
                setCommunities(updatedCommunities);
                e.target.reset();
              }}
            >
              <input
                placeholder="Qual vai ser o nome da sua comunidade?"
                name="title"
                aria-label="Qual vai ser o nome da sua comunidade?"
                type="text"
                required
              />
              <input
                placeholder="Coloque uma ERL para usarmos de capa"
                name="image"
                aria-label="Coloque uma ERL para usarmos de capa"
                required
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
            <h2 className="smallTitle">
              Pessoas da comunidade ({followers.length})
            </h2>
            <ul>
              {followers.map((follower) => {
                return (
                  <li key={follower.login}>
                    <a href={follower.html_url}>
                      <img src={follower.avatar_url} />
                      <span>{follower.login}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            {communities.length > 0 ? (
              <>
                <h2 className="smallTitle">
                  Minhas comunidades ({communities.length})
                </h2>
                <ul>
                  {communities.map((community, index) => {
                    return (
                      <li key={`key-element__${index}`}>
                        <a href="#">
                          <img src={community.image} />
                          <span>{community.title}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </>  
            ) : (
              <p style={{ color: '#308BC5', fontWeight: 'bold' }}>Nenhuma comunidade</p>
            )
          }
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
