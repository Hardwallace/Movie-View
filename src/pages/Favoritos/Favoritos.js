import './Favoritos.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { FiX } from 'react-icons/fi';

function Favoritos(){

    const [filmes,setFilmes] = useState([]);

    useEffect(() => {
        const minhaLista = localStorage.getItem("@primeflix");
        setFilmes(JSON.parse(minhaLista) || [])
    }, [])

    function excluirFilme(id){
        let filtroFilmes = filmes.filter((item) => {
            return (item.id !== id)
        })

        setFilmes(filtroFilmes);
        localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes) )
        toast.success("Filme removido com sucesso")
    }

    return(
        <div className='meus-filmes'>
            <strong className='titulo'>Filmes Salvos</strong>

            {filmes.length === 0 && <span>Você não tem nenhum filme salvo</span>}

            <div className="containerFavorite">
                <div className="lista-filmes">
                    {filmes.map((filme) =>{
                        return(
                            <article key={filme.id} className='imagens'>
                                <FiX size={24} color="#ff0000" onClick={() => excluirFilme(filme.id)} className='excluir'/>
                                <Link to={`/filme/${filme.id}`} style={{backgroundColor: "white"}}><img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt="Imagem dos posteres"/></Link>
                                <Link to={`/filme/${filme.id}`} className='acess'>Acessar</Link>                            
                            </article>
                            
                            )
                    })}
                </div>
            </div>
            <button className='voltar'><Link to="/">Menu principal</Link></button>
        </div>
    )
}


export default Favoritos;