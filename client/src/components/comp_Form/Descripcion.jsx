import React from 'react';
import style from '../../style/VideoGameCreate.module.css';

export default function Descripcion({game, error, handleChange}){
    return (
        <div>
                
                <input className={style.inputCampos}
                        type="text"
                        value={game.description}
                        name='description'
                        onChange={(e)=> handleChange(e)}
                />
                {
                        error.description && (
                            <p className = {style.error}>{error.description}</p>
                        )
                }
        </div>
    )
}