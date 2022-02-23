const { Router } = require('express');
const { routeGet, routeGetID, routeGetGenres, routePost} = require('./controller');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

/* ROUTES */

router.get('/videogames?', routeGet)

router.get('/videogame/:idVideogame', routeGetID)

router.get('/genres', routeGetGenres)

router.post('/videogame', routePost)





module.exports = router;
