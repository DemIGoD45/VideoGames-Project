import React from 'react';
import style from '../style/Paginado.module.css'


export default function Paginado({currentPage, gamePerPage, games, paginado}){
    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(games/gamePerPage) ; i++) {
        pageNumber.push(i)
    }

    return (
        <nav className = {style.container_Nav}>
                <a onClick = {() => paginado(currentPage-1)}>
                    <div className = {style.div_Num} >
                        <span className={style.numbers}>Anterior</span>  
                    </div>
                </a>
                {
                    pageNumber?.map(num => (
                        <a onClick = {() => paginado(num)} key={num}>
                                <div className = {style.div_Num} >
                                    <span className={style.numbers}>{num}</span>  
                                </div>
                        </a>
                    ))
                }
                <a onClick = {() => paginado(currentPage+1)} key={currentPage+1}>
                        <div className = {style.div_Num} >
                            <span className={style.numbers}>Siguiente</span>  
                        </div>
                </a>
        </nav>
    )
}