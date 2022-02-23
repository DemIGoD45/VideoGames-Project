import {GET_VIDEOGAMES, GET_GENRES, FILTER_GENRE, FILTER_DB_API, FILTER_ORDER, SEARCH_GAME, REFRESH, GET_DETAILS, VACIAR_DETAILS } from '../actions/index'

const inititalState = {
    videogames : [],
    filterGames : [],
    gamesDataBase: [],
    detailsGame: {},
    genres: []
}

function rootReducer(state = inititalState, {type, payload}){
    switch(type){
        case GET_VIDEOGAMES:
            let auxPayload = []
            let dataBase = []
            payload.forEach((elem, index) => {
                if(index === payload.length-1){
                    elem = elem.map(data => {
                        return {
                            ...data,
                            genres: data.genres.map(genero => genero.name)
                        }
                    })
                    auxPayload = auxPayload.concat(elem);
                    dataBase = dataBase.concat(elem);
                }
                else auxPayload = auxPayload.concat(elem);
            })
            return {
                ...state,
                videogames: auxPayload,
                filterGames : auxPayload,
                gamesDataBase: dataBase
            }
        case GET_GENRES: 
            return {
                ...state,
                genres : payload
            }
        case FILTER_GENRE:
            let filt = state.videogames;
            filt = payload === 'All'? filt : filt.filter(el => {
                let gen = el.genres.filter(gen => gen === payload)  
                return gen.length !== 0
            } )
            return {
                ...state,
                filterGames : filt
            }

        case FILTER_DB_API:
            let games = state.videogames;
            let db = state.gamesDataBase;
            let api = games.slice(0, games.length - db.length)
            games = payload === 'All'? games : payload === 'createdDB' ? db : api;
            console.log(api);
            return {
                ...state,
                filterGames: games
            }
        
        case FILTER_ORDER:
            let orderGames = state.filterGames.map(el => el);
            orderGames = payload === 'All'? state.videogames: payload === 'ASC' ?
                orderGames.sort(function(a, b){
                    if(a.name > b.name){
                        return 1;
                    }
                    if(b.name > a.name){
                        return -1;
                    }
                    return 0;
                }) : payload === 'DESC' ?
                orderGames.sort(function(a, b){
                    if(a.name < b.name){
                        return 1;
                    }
                    if(b.name < a.name){
                        return -1;
                    }
                    return 0;
                }) : payload === 'ratingMax' ?
                orderGames.sort(function(a, b){
                    if(a.rating < b.rating){
                        return 1;
                    }
                    if(b.rating < a.rating){
                        return -1;
                    }
                    return 0;
                }): orderGames.sort(function(a, b){
                    if(a.rating > b.rating){
                        return 1;
                    }
                    if(b.rating > a.rating){
                        return -1;
                    }
                    return 0;
                })

            return {
                ...state,
                filterGames: orderGames
            }

        case SEARCH_GAME:
            return {
                ...state,
                filterGames: payload.length? payload: 'Juego no encontrado'  
            }

        case REFRESH: 
            return {
                ...state,
                filterGames: payload
            }

        case GET_DETAILS:
            
            return {
                ...state,
                detailsGame: payload
            }
        case VACIAR_DETAILS:
            return {
                ...state,
                detailsGame: {}
            }

        default: return state
    }
}

export default rootReducer;