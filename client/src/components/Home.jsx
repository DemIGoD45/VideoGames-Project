import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch , useSelector} from 'react-redux';
import {getVideogames, getGenres, filterGenre, filterDB_API, filterOrder, refreshGames} from '../actions';
import {Link} from 'react-router-dom';
import Paginado from './Paginado';
import Card from './Card';
import SearchBar from './SearchBar';

/* CSS */
import style from '../style/Home.module.css'
 

export default function Home() {

    const dispatch = useDispatch();
    const allgames = useSelector(data => data.videogames);
    const games = useSelector(data => data.filterGames);
    const genres = useSelector(data => data.genres);
    
    const [orden, setOrden] = useState('');

    const [currentPage, setCurrentPage ] = useState(1);
    const [finishPage, setFinishPage] = useState(1);

    const [gamePerPage, setGamePerPage] = useState(15);
    const lastIndex = currentPage * gamePerPage; 
    const firstIndex = lastIndex - gamePerPage;
    const currentGames = games.slice(firstIndex, lastIndex);
    

    const paginado = (num) => {
        setFinishPage(Math.ceil(games.length/gamePerPage))
        if (num > 0 && num <= finishPage) {
            setCurrentPage(num)
        }
    }
    
    useEffect(() => {
        document.title = 'PI - Video Games'
    },[])
    useEffect(() =>{
        
        dispatch(getVideogames());
        dispatch(getGenres());
        
        
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(refreshGames(allgames));
        setCurrentPage(1);
    }

    function handleOptions(){
        return (
            genres.map(data => <option value={data.name}>{data.name}</option>)
        )
    }
    function handleFilterGen(evento){
        dispatch(filterGenre(evento.target.value));
        setCurrentPage(1);
    }
    function handleFilterDBAPI(evento){
        dispatch(filterDB_API(evento.target.value));
        setCurrentPage(1);
    }
    function handleFilterOrder(evento){
        evento.preventDefault();
        dispatch(filterOrder(evento.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${evento.target.value}`);
    }
    function handleNotFound() {
        alert('Juego no encontrado!');
        dispatch(refreshGames(allgames));
        setCurrentPage(1);
    }

    //console.log(currentPage);

    return (
        <div>
            <header className = {style.header_Search}>
                <SearchBar/>
                <a onClick={e => handleClick(e)}>
                    <div >
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-refresh" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
                            <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
                        </svg>
                    </div>
                </a>

            </header>
            
            <div className={style.containerGrid}>
                <aside>
                    <div className={style.aside_div}>
                        <h2>Filtrados:</h2>
                        <label>* Generos *</label>
                        <select className={style.input_select} onChange={(e) => {handleFilterGen(e)}}>   
                            <option value="All">Todos los generos</option>
                            {
                                handleOptions()
                            }
                        </select>
                        <label>* Almacenados *</label>
                        <select className={style.input_select} onChange={(e) => {handleFilterDBAPI(e)}}>
                            <option value="All">Todos</option>
                            <option value="createdDB">Creados</option>
                            <option value="api">Existentes</option>
                        </select>
                        <br/>
                        <h2>Ordenamientos:</h2>
                        <label>* Alfabetico *</label>
                        <select className={style.input_select} onChange={(e) => {handleFilterOrder(e)}}>
                            <option value="All">Ordenamiento</option>
                            <option value="ASC">A-Z</option>
                            <option value="DESC">Z-A</option>
                        </select>
                        <label>* Por Rating *</label>
                        <select className={style.input_select} onChange={(e) => {handleFilterOrder(e)}}>
                        <option selected disabled>Rating</option>
                            <option value="ratingMin">Menor Rating</option>
                            <option value="ratingMax">Mayor Rating</option>
                        </select>
                        <br />
                        <Link to = '/createVG'>
                            <button className={style.btn}>Crear Videojuego</button>
                        </Link>
                    </div>
                </aside>
                
                <div className={style.container}>
                    <Paginado
                        currentPage={currentPage}
                        gamePerPage={gamePerPage}
                        games={games.length}
                        paginado={paginado}
                    />
                    <div className={style.container_Cards}> 
                        {
                            Array.isArray(currentGames)? currentGames?.map((data, index) => { 
                                return (
                                        <Link to = {`/details/${data.idGame}`} >
                                            <Card key = {index} name = {data.name} image = {data.imageURL} genres = {data.genres} rating = {data.rating}/>
                                        </Link>
                                    )
                            }) : handleNotFound() 
                        }

                    </div>
                </div>
            </div>
        </div>
    )
    
}
