import { Link } from 'react-router-dom';
import './Erro.css'

function Erro(){
    return(
        <div className='not-found'>
            <h1>404</h1>
            <h2>Não encontrada</h2>
            <Link to="/">Veja os filmes em lançamento</Link>
        </div>
    )
}

export default Erro;