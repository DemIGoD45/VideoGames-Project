import React from 'react';
import style from '../../style/VideoGameCreate.module.css';

export default function Nombre({game, error, handleChange}){
    return (<div>
                    <input className={style.inputCampos}
                        type="text"
                        value={game.name}
                        name='name'
                        onChange={(e)=> handleChange(e)}
                    />
                    {
                        error.name && (
                            <p className = {style.error}>{error.name}</p>
                        )
                    }
            </div>);
}