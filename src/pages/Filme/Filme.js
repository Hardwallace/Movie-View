import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './Filme.css';
import { Link } from "react-router-dom";

import api from '../../services/api';
import { toast } from 'react-toastify';

function Filme() {
  const { id } = useParams();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);
  const navigation = useNavigate();

  useEffect(() => {
    async function loadFilme() {
      await api.get(`/movie/${id}`, {
        params: {
          api_key: "e6733bcde99017099c4ab8b55e49646f",
          language: "pt-BR",
          append_to_response: "videos",
        }
      })
      .then((response) => {
        setFilme(response.data);
        setLoading(false);
      })
      .catch(() => {
        console.log("Filme não encontrado");
        navigation("/", { replace: true });
        return;
      });
    }

    loadFilme();

    return () => {
      console.log("O componente foi desmontado");
    };
  }, [navigation, id]);

  function salvarFilme() {
    const minhaLista = localStorage.getItem("@primeflix");
    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id);

    if (hasFilme) {
      toast.warn("Esse filme já está na lista");
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com sucesso");
  }

  const trailer = filme.videos?.results?.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  ) || filme.videos?.results?.[0];

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
      </div>
    );
  }

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>

      {trailer ? (
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title={`Trailer ${filme.title}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ borderRadius: "8px", marginBottom: "14px" }}
        ></iframe>
      ) : (
        <img
          src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
          alt={filme.title}
        />
      )}

      <h3>Sinopse</h3>
      <span style={{ textAlign: 'justify',lineHeight: '1.3', padding: '15px', borderRadius: '10px', fontSize: '20px', borderStyle: "solid"}}>{filme.overview}</span>

      
      <span><strong>Gênero: </strong>{filme.genres?.map(genre => genre.name).join(' / ')}</span>
      
      <span><strong>Avaliação: </strong>{filme.vote_average?.toFixed(1)} / 10</span>

      <span><strong>Data de lançamento:</strong> {filme.release_date?.split('-').reverse().join('/')}</span>
      
      <div className="area-buttons">
        <button onClick={salvarFilme} className="salvar">Salvar</button>
        <button className='voltar'><Link to="/">Menu principal</Link></button>
      </div>

    </div>
  );
}

export default Filme;