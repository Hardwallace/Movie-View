import { useEffect,useState } from "react";
import api from '../../services/api';
import { Link } from "react-router-dom";
import './Home.css'

function Home(){

  const [filmes,setFilmes] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(() =>{
    async function loadFilmes(){

      const hoje = new Date();
      const sessentaDiasAtras = new Date();
      sessentaDiasAtras.setDate(hoje.getDate() - 60);

      const dataHoje = hoje.toISOString().split('T')[0];
      const data60DiasAtras = sessentaDiasAtras.toISOString().split('T')[0];
      
      try {
      const response = await api.get("discover/movie", {
        params:{
          api_key: "e6733bcde99017099c4ab8b55e49646f",
          language: "pt-BR",
          region: "BR",
          with_release_type: "3|2",           
          "release_date.gte": data60DiasAtras, 
          "release_date.lte": dataHoje,        
          page: 1
        }
      })
      
      setFilmes(response.data.results.slice(0,20))
      setLoading(false)
    } catch (error) {
        console.error("Erro ao carregar filmes", error);
        setLoading(false);
      }
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