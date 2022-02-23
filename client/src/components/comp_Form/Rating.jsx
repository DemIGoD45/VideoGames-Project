import React from 'react';
import style from '../../style/VideoGameCreate.module.css';

export default function Rating({game, error, handleChange}){
    return (<div>
                
                <input className={style.inputCampos}
                        type="number"
                        value={game.rating}
                        name='rating'
                        onChange={(e)=> handleChange(e)}
                />
                {
                        error.rating && (
                            <p className = {style.error}>{error.rating}</p>
                        )
                }
            </div>
            )
}