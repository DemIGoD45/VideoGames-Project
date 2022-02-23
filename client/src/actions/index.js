import axios from 'axios';

export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const GET_GENRES = 'GET_GENRES';
export const FILTER_GENRE = 'FILTER_GENRE';
export const FILTER_DB_API = 'FILTER_DB_API';
export const FILTER_ORDER = 'FILTER_ORDER';
export const SEARCH_GAME = 'SEARCH_GAME';
export const REFRESH = 'REFRESH';
export const GET_DETAILS = 'GET_DETAILS';
export const VACIAR_DETAILS = 'VACIAR_DETAILS';

export function getVideogames(){
    return function(dispatch){
        return axios.get('http://localhost:3002/videogames')
            .then(resp => {
                return dispatch({
                    type: GET_VIDEOGAMES,
                    payload: resp.data
                })
            })
    }
}

export function getGenres(){
    return function(dispatch){
        return axios.get('http://localhost:3002/genres')
        .then(resp => {
            return dispatch({
                type: GET_GENRES,
                payload: resp.data
            })
        })
    }
}

export function filterGenre(payload){
    return {
        type: FILTER_GENRE,
        payload: payload
    }
}

export function filterDB_API(payload){
    return {
        type: FILTER_DB_API,
        payload: payload
    }
}

export function filterOrder(payload){
    return {
        type: FILTER_ORDER,
        payload: payload
    }
}

export function searchGame(payload){
    return function(dispatch){
        return axios.get(`http://localhost:3002/videogames?name=${payload}`)
            .then(resp => {
                return dispatch({
                    type: SEARCH_GAME,
                    payload: resp.data
                })
            })
    }
}

export function refreshGames(payload){
    return {
        type: REFRESH,
        payload: payload
    }
}

export function getDetails(payload){
    return function(dispatch){
        return axios.get(`http://localhost:3002/videogame/${payload}`)
        .then(resp => {
            return dispatch({
                type: GET_DETAILS,
                payload: resp.data
            })
        })
    }
}

export function postGame(payload){
    return async function(dispatch){
        const info = await axios.post('http://localhost:3002/videogame',payload)
        return info;
    }
}

export function vaciarDetails(){
    return {
        type: VACIAR_DETAILS
    }
}