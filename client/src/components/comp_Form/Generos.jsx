import React, {useState, useEffect} from 'react';
import style from '../../style/VideoGameCreate.module.css';

export default function Generos({genres, generos, handleEliminar, error, handleChange}){

    
    //console.log(gen);
    return (
        <div>
                    
                    <select className={style.inputCampos} onChange={(e) => {handleChange(e)}} name='genres'>
                        <option value='All' selected disabled>-- Select genres --</option>
                        {
                            genres?.map((data) => {                            
                                return ( <option value={data.name}>
                                    {data.name}
                                </option> )
                            })
                        }

                    </select>
                    {
                        error.genres && (
                            <p className = {style.error}>{error.genres}</p>
                        )
                    }
                    <div className = {style.platGen}>
                        {
                            generos?.map((data, index) => {
                                return <button className= {style.seleccion} name='generos' value = {data} onClick = {e => handleEliminar(e)}>{data}</button> 
                            } )
                        }
                    </div>
                </div>
    )
}