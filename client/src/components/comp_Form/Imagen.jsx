import React from 'react';
import style from '../../style/VideoGameCreate.module.css';

export default function Imagen({game, handleChange}){
    return (
        <div>
                    
                    <input className={style.inputCampos}
                        type="text"
                        value={game.imageURL}
                        name='imageURL'
                        onChange={(e)=> handleChange(e)}
                    />
                </div>
    )
}