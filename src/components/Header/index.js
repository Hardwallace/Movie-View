import './header.css';
import { Link } from 'react-router-dom'

function Header(){
    return(
        <header>
            <Link to='/' className='logo'>Movie Viewer</Link>
            <Link to='/favoritos' className='favoritos'>Filmes Salvos</Link>
        </header>
    )
}

export default Header;