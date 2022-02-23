import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { getGenres, postGame } from '../actions';
import {Link} from 'react-router-dom';
import style from '../style/VideoGameCreate.module.css';

import Nombre from './comp_Form/Nombre'
import Descripcion from './comp_Form/Descripcion'
import Imagen from './comp_Form/Imagen'
import Rating from './comp_Form/Rating'
import Lanzamiento from './comp_Form/Lanzamiento'
import Generos from './comp_Form/Generos'
import Plataformas from './comp_Form/Plataformas'



function validation(input){
    let error = {}
    if(!input.name){
        error.name = "Se requiere un nombre para el juego!"
    }
    else if(!input.description){
        error.description = "Se requiere una descripcion del juego!"
    }
    else if(input.rating < 0){
        error.rating = "El rating tiene que ser un numero positivo"
    }
    else if(input.rating > 5){
        error.rating = "El rating tiene que ser un menor o igual que 5"
    }
    else if(input.genres.length === 0){
        error.genres = "Tiene que seleccionar al menos un genero para el juego"
    }
    else if(input.plataform.length === 0){
        error.plataform = "Tiene que seleccionar al menos una plataforma para el juego"
    }
    Object.keys(error).length === 0 ? error.status = 'ok' : error.status = 'No ok'
    return error;
}



export default function VideoGameCreate(){

    const dispatch = useDispatch();
    const [game, setGame] = useState({
        imageURL: 'https://i.pinimg.com/originals/42/49/2b/42492b92df29c9e36dc0058bfc37dd09.jpg',
        name: '',
        released: '--/--/----',
        description: '',
        rating: 0,
        genres: [],
        plataform : []
    })
    
    useEffect(() => {
        dispatch(getGenres())
    },[])
    
    
    const [error, setError] = useState({});
    const genres = useSelector(data => data.genres);
    let [generos, setGeneros] = useState([])
    let [selectPlat, setSelectPlat] = useState([])
    let [plat, setPlat] = useState(["PC",
                                    "Xbox","PlayStation",
                                    "PlayStation 2", "PlayStation 3",
                                    "PlayStation 5", "Wii",
                                    "Nintendo DS", "Nintendo 64",
                                    "Game Boy"])

    function handleChange(e){
        e.preventDefault();
        if(e.target.name === 'plataform'){
                let aux = selectPlat.find(elem => elem === e.target.value);
                if(!aux){
                    setGame({
                        ...game,
                        [e.target.name]: [...game[e.target.name], e.target.value]
                    })    
                    setError(validation({
                        ...game,
                        [e.target.name]: e.target.value
                    }))
                    setSelectPlat([...selectPlat, e.target.value])
                    e.target.value = 'All';
                }
        }
        else if(e.target.name === 'genres'){
            let aux = generos.find(elem => elem === e.target.value);
                if(!aux){
                    setGame({
                        ...game,
                        [e.target.name]: [...game[e.target.name], e.target.value]
                    })    
                    setError(validation({
                        ...game,
                        [e.target.name]: e.target.value
                    }))
                    setGeneros([...generos, e.target.value])
                    e.target.value = 'All';
                }
        }
        else if(e.target.name === 'rating'){
            setGame({
                ...game,
                rating: parseFloat(e.target.value)
            })
            setError(validation({
                ...game,
                rating: parseFloat(e.target.value)
            }))
        }
        else{
            setGame({
                ...game,
                [e.target.name]: e.target.value
            })
            setError(validation({
                ...game,
                [e.target.name]: e.target.value
            }))
        }
    }

    function handleEliminar(e){
        e.preventDefault();
        if(e.target.name === 'generos'){
            generos = generos.filter(el => el !== e.target.value)
            setGeneros(generos);
            setGame({
                ...game,
                genres: generos
            })
        }
        else{
            selectPlat = selectPlat.filter(el => el !== e.target.value)
            setSelectPlat(selectPlat);
            setGame({
                ...game,
                plataform: selectPlat
            })
        }
    }
    function handleSubmit(e){
        e.preventDefault();
        if (error.status === 'ok') {
            dispatch(postGame(game));
            alert("Juego creado Correctamente!!");
            setGame({
                imageURL: 'https://i.pinimg.com/originals/42/49/2b/42492b92df29c9e36dc0058bfc37dd09.jpg',
                name: '',
                released: '--/--/----',
                description: '',
                rating: 0,
                genres: [],
                plataform : []
            })
            setSelectPlat([])
            setGeneros([])
            setError({})
        }
        else alert("Error");
    }
    console.log(game);
    return (
        <div>
            <Link to = '/home'>
                <button className={style.btn}>Back</button>
            </Link>
            <form onSubmit={e => handleSubmit(e)}>
                <div className={style.containerForm}>
                    <h2>Creacion de Video Juegos</h2>
                    <div className={style.containerCampos}>
                        <label>Nombre:</label>
                        <Nombre 
                            game={game}
                            error={error}
                            handleChange={handleChange}
                        />
                    </div>
                    <div className={style.containerCampos}>
                        <label>Rating:</label>
                        <Rating 
                            game={game}
                            error={error}
                            handleChange={handleChange}
                        />
                    </div>
                    <div className={style.containerCampos}>
                        <label>URL Imagen:</label>
                        <Imagen 
                            game={game}
                            error={error}
                            handleChange={handleChange}
                        />
                    </div>
                    <div className={style.containerCampos}>
                        <label>Fecha de lanzamiento:</label>
                        <Lanzamiento 
                            game={game}
                            error={error}
                            handleChange={handleChange}
                        />
                    </div>
                    <div className={style.containerCampos}>
                        <label>Generos:</label>
                        <Generos 
                            genres={genres}
                            generos={generos}
                            handleEliminar={handleEliminar}
                            error={error}
                            handleChange={handleChange}
                        />
                    </div>
                    <div className={style.containerCampos}>
                        <label>Plataformas:</label>
                        <Plataformas 
                            plat={plat}
                            selectPlat={selectPlat}
                            handleEliminar={handleEliminar}
                            error={error}
                            handleChange={handleChange}
                        />
                    </div>
                    <div className={style.containerCampos}>
                        <label>Descripción:</label>
                        <Descripcion
                            game={game}
                            error={error}
                            handleChange={handleChange}
                        />
                    </div>
                </div>
                {
                    <button className={style.btn} disabled = {error.status === 'ok'? false : true}>Crear</button>
                }
            </form>
        </div>
    )
}