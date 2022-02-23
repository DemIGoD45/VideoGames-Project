const axios = require('axios');
const {Videogame, Genres} = require('../db');
const { API_KEY } = process.env;
const url =  `https://api.rawg.io/api/games?key=${API_KEY}`;

//console.log(url);
//IIFE
(async () => {
    try {
        let resultTable = await Genres.findAll();
        if(!resultTable.length){
            let urlGen = url.split('games');
            let getGenres = await axios.get(`${urlGen[0]}genres${urlGen[1]}`)
            await getGenres.data.results.map(async genero => {
                await Genres.create({name: genero.name})
            })
        }
    } catch (error) {
        throw error.message;
    }
})()
const getVideoGamesAPI = async (url2) => {
        try {
                let api = await axios.get(url2);
                let info = await api.data.results?.map((elem) => {
                    let {
                        id,
                        name, 
                        released, 
                        background_image,
                        rating
                    } = elem
                    return {
                        idGame: id,
                        name: name,
                        released: released,
                        imageURL: background_image,
                        rating: rating,
                        platforms: elem.platforms?.map(plat => plat.platform.name),
                        genres: elem.genres?.map(genero => genero.name)
                    }
            });
            return info;
        } catch (error) {
            throw error.message;
        }
        
}

const get100VideoGames = (page) => {
    return  getVideoGamesAPI(`${url}&page=${page}`)
            .then(resp => {
                return resp
            })
}

const getVideoGamesDB = async () => {
    return await Videogame.findAll({
        include: {
            model: Genres,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    });
}

const getAllVideogames = async() => {
    let infoApi = [];
    for (let i = 2; i < 7; i++) {
        infoApi.push(await get100VideoGames(i, url))
    }
    let infoDB = await getVideoGamesDB();
    let infoTot = infoApi.concat([infoDB]);
    return infoTot;                    
}

const getVideogameByname = async (name) => {
    let str = `?search=${name}&`;
    const str2 = url.split('?');
    str = str2[0].concat(str,str2[1]);
    return await getVideoGamesAPI(str);
        
}
const getVideogameByID_db = async (id) => {
    let game = await Videogame.findOne({
        where: {idGame: id},
        include: Genres
    });
    if(game != null){
        let {idGame, name, imageURL, description, released, rating, genres, plataform} = game.dataValues;
        return {
            idGame: idGame,
            name: name,
            imageURL: imageURL,
            description: description,
            released: released,
            rating: rating,
            genres: genres.map(gen => gen.name),
            platforms: plataform
        }
    }
    else   return [];
}

const getVideogameByID = async (id) => {

    let db = await getVideogameByID_db(id);
    if(Array.isArray(db)){
        let urlID = url.split('?');
        let getinfo = await axios.get(`${urlID[0]}/${id}?${urlID[1]}`)
        let {
                name, 
                released, 
                background_image,
                rating,
                description
            } = getinfo.data
        return {
                name: name,
                released: released,
                background_image: background_image,
                rating: rating,
                platforms: getinfo.data.platforms.map(plat => plat.platform.name),
                genres: getinfo.data.genres.map(genero => genero.name),
                description: description
        }        
    }
    else return db;


}

const getGenres = async () => {
    return await Genres.findAll();
}

const routeGet = (req , res) => {
    const {name} = req.query;
    if (name){
        getVideogameByname(name)
            .then(resp => {
                res.status(200).send(resp)
            })
            .catch(err => {
                res.status(404).send({msj: `El video juego con nombre ${name} no fue encontrado`, error: err})
            })
    }
    else{
        getAllVideogames()
            .then(resp => {
                res.status(200).send(resp);
            })
            .catch((err) => res.status(404).send({msj: err.message}))
    }
}

const routeGetID = (req, res) => {
    const id = req.params.idVideogame
    getVideogameByID(id)
        .then(resp => {
            res.status(200).send(resp)
        })
        .catch((err) => {
            res.status(404).send({msj: "Video Game not found", error: err.message})
        })
        
}

const routeGetGenres = (req , res) => {
    getGenres().then(resp => {
        res.status(200).send(resp)
    })
    .catch(err => res.status(404).send({msj: "Genres not found", error: err.message}))
}

const routePost = async (req , res) => {
    let {name, imageURL, description, released, rating, plataform, genres} = req.body;
    try {
        let newGame = await Videogame.create({
                idGame: name,
                name,
                imageURL,
                description,
                released,
                rating,
                plataform
        });
        let genreDB = await Genres.findAll({
            where: {name: genres}
        });
        await newGame.addGenres(genreDB);
        res.status(201).send("New Game add");
    } catch (error) {
        res.status(401).send({err: error.message})
    }
}

const routerPostGenres = (req , res) => {
    let {name} = req.body;
    Genres.create({
        name: name
    })
    .then(resp => {res.status(201).json(resp)})
    .catch((err) => res.status(400).json({msj: err.message}))
}


module.exports = {
    routeGet,
    routeGetID,
    routeGetGenres,
    routePost
};