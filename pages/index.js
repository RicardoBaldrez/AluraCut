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

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {props.title} <span style={{ color: '#2E7BB4' }}>({props.items.length})</span>
      </h2>
      <ul>
        {props.items.map((item) => {
          return (
            <li key={item.login}>
              <a href={item.html_url}>
                <img src={item.avatar_url} />
                <span>{item.login}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const githubUser = "RicardoBaldrez";
  const [followers, setFollowers] = useState([]);
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    fetch(`https://api.github.com/users/peas/followers`)
      .then((resp) => resp.json())
      .then((result) => setFollowers(result))
      .catch((error) => console.error(error));

    // Dato -> API GraphQl -> Trazendo todas as comunidades
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '86359e846f40f3ec96a118ef4adbcc', // Retirado de dentro do Dato na sessão 'Permissões' -> 'Tokens da API'
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          id
          title
          imageUrl
          creatorSlug
        }
      }` })
    })
    .then((res) => res.json())
    .then((finalRes) => {
      setCommunities(finalRes.data.allCommunities);
    })
    .catch((error) => console.error(error));
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
                  imageUrl: dataForm.get("image"), // Pegando o valor do input com nome 'image'
                  creatorSlug: githubUser,
                };

                fetch('/api/community', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(newCommunity)
                })
                .then(async (res) => {
                  const data = await res.json();
                  const updatedCommunities = [...communities, data.registerCreated];
                  setCommunities(updatedCommunities);
                  e.target.reset();
                })
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
          <ProfileRelationsBox title="Pessoas da comunidade" items={followers} />
          <ProfileRelationsBoxWrapper>
            {communities.length > 0 ? (
              <>
                <h2 className="smallTitle">
                  Minhas comunidades <span style={{ color: '#2E7BB4' }}>({communities.length})</span>
                </h2>
                <ul>
                  {communities.map((community) => {
                    return (
                      <li key={community.id}>
                        <a href="#">
                          <img src={community.imageUrl} />
                          <span>{community.title}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </>  
            ) : (
              <p style={{ color: '#308BC5', fontWeight: 'bold' }}>Nenhuma comunidade</p>
            )}
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
