import { useEffect,useState } from "react";
import api from '../../services/api';
import { Link } from "react-router-dom";
import './Home.css'

function Home(){

  const [filmes,setFilmes] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(() =>{
    async function loadFilmes(){
      const response = await api.get("movie/now_playing", {
        params:{
          api_key: "e6733bcde99017099c4ab8b55e49646f",
          language: "pt-BR",
          page: 1
        }
      })
      setFilmes(response.data.results.slice(0,12))
      setLoading(false)
    }

    loadFilmes();
  }, [])

  if(loading){
    return(
      <div className="loading">
        <h2>Carregando filmes...</h2>
      </div>
    )
  }

  return(
    <div className="container">
        <div className="lista-filmes">
          {filmes.map((filme) =>{
            return(
              <article key={filme.id}>
                <strong>{filme.title}</strong>
                <Link to={`/filme/${filme.id}`} style={{backgroundColor: "white"}}><img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt="Imagem dos posteres"/></Link>
                <Link to={`/filme/${filme.id}`}>Acessar</Link>
              </article>
            )
          })}
        </div>
    </div>
  )
}

export default Home;