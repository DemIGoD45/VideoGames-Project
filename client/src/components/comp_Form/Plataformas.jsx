import React from 'react';
import style from '../../style/VideoGameCreate.module.css';

export default function Plataformas({plat, selectPlat, handleEliminar, error, handleChange}){
    return (
        <div>
                    
                    <select className={style.inputCampos} onChange={(e) => {handleChange(e)}} name='plataform'>
                        <option value='All' disabled selected>-- Select platforms --</option>
                        {
                            plat.map((data) => {                            
                                return ( <option value={data}>
                                    {data}
                                </option> )
                            })
                        }

                    </select>
                    {
                        error.plataform && (
                            <p className = {style.error}>{error.plataform}</p>
                        )
                    }
                    <div className = {style.platGen}>
                        {
                            selectPlat?.map((data, index) => {
                                return <button className= {style.seleccion} name='plataform' value = {data} onClick = {e => handleEliminar(e)}>{data}</button>
                                 
                               
                            })
                        }
                    </div>
                </div>
    )
}