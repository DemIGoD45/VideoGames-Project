import React from "react";
import {Link} from 'react-router-dom';
import st from '../style/Landing.module.css'

export default function LandingPage(){
    return (
        <div className={st.container}>
            <h1 className={st.titulo}>¡Bienvenidos!</h1>
            <Link to ='/home' >
                <button className = {st.btn}>Ingresar</button>
            </Link>
        </div>
    )
}