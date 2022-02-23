import React from 'react'
import style from '../style/Card.module.css'


export default function Card(prop){
    return (
        <div className={style.div_Cards} key={prop.index}>
            <div className={style.div_rt} ><h3 className={style.h3_rt}>RT: {prop.rating}</h3></div>
            <div className={style.tit_img}>
                <img src={prop.image} alt="imagen de Videogame" width="200px" height="200px"/>
                <h3 >{prop.name}</h3>
            </div>
            <hr />
            <div className={style.div_contenido}>
                <div>
                    <h4>Generos:</h4>
                    {
                        prop.genres?.map((elem, i) => <p key= {i}>{elem},</p>)
                    }
                </div>
            </div>
        </div>    
    )



}