import React from 'react';
import style from '../../style/VideoGameCreate.module.css';

export default function lanzamiento({game, error, handleChange}){
    return (<div>
                    
                    <input className={style.inputCampos}
                        type="date"
                        value={game.released}  
                        name='released'
                        onChange={(e)=> handleChange(e)}
                    />
            </div>
    )
}