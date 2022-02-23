import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getDetails, vaciarDetails } from '../actions/index';
import {Link} from 'react-router-dom';
import style from '../style/Detail.module.css';

export default function Detail(){
    const dispatch = useDispatch();
    const params = useParams();
    
    useEffect(() => {
        dispatch(getDetails(params.idGame))
        return () => {
            dispatch(vaciarDetails())
        }
    },[])
    const game = useSelector(data => data.detailsGame);
    console.log(game);
    return (
        <div className={style.container_Details}>
            <div>
                <h1>{game.name}</h1>
                <div className={style.container_Image}><img src= {game.background_image || game.imageURL} alt="Imagen de VideoGame" /></div>
            </div>
            <div>
                <div className={style.lanRT}>
                    <div className={style.lanz}>
                        <h4> <span>Lanzamiento:</span>  {game.released}</h4>
                    </div>
                    <div className={style.rt}>
                        <h4><span>Rating: </span> {game.rating}</h4>
                    </div>
                </div>
                <div className={style.container_GenPlat}>
                    <div className={style.genPlat}>
                        <div className={style.genContainer}>
                            <h4><span>Generos:</span> </h4>
                            {
                                game?.genres?.map(data => <p>* {data}.</p>)
                            }
                        </div>
                    </div>
                    <div className={style.genPlat}>
                        <div className={style.genContainer}>
                            <h4><span>Plataformas:</span> </h4>
                            {
                                game?.platforms?.map(data => <p> * {data}.</p>)
                            }

                        </div>
                    </div>
                </div>
                
                <div>
                    <h4><span>Description:</span> </h4>
                    {game.description}
                </div>
            </div>
            <Link to = '/home'>
                <button className={style.btn}>Volver</button>
            </Link>
        </div>
    )
}