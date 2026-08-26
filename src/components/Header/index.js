import './header.css';
import { Link } from 'react-router-dom'




function Header(){

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    return(
        <header>
            <Link to='/' className='logo' onClick={scrollToTop}>Info filmes</Link>
            <Link to='/favoritos' className='favoritos'>Filmes Salvos</Link>
        </header>
    )
}

export default Header;