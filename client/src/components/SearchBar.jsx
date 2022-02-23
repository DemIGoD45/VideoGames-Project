import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {searchGame} from '../actions';
import style from '../style/SearchBar.module.css'


export default function SearchBar(){

    const [name, setName] = useState('');

    const dispatch = useDispatch();


    function handleChange(e){
        e.preventDefault();
        setName(e.target.value)
    }
    function handleSearch(e){
        e.preventDefault();
        dispatch(searchGame(name));
        setName(' ');
        
    }

    return (
        <div>
            <h2 className={style.titulo_buscar}>Buscar Video Games</h2>
            <input className={style.search} onChange = {(e) => {handleChange(e)}} type="search" name= "search" pattern=".*\S.*" required />
            <button className={style.btn_Search} onClick = {(e) => {handleSearch(e)}}  type= "submit">
                Buscar
            </button>
        </div>
    )
}
