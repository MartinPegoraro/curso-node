const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.authRoutePath = '/api/auth';
        this.userRoutePath = '/api/user';

        //Conectar a base de datos
        this.conectionDb();


        //Middlewares
        this.middlewares()


        //Rutas de mi app
        this.routes();
    }

    async conectionDb() {
        await dbConnection()
    }

    middlewares() {
        //cors
        this.app.use(cors());

        //Lectura y Parseo del body
        this.app.use(express.json())

        //Directorio publico
        this.app.use(express.static('public'))
    }

    routes() {

        this.app.use(this.authRoutePath, require('../routes/auth.routes'))

        this.app.use(this.userRoutePath, require('../routes/user.routes'))
    }

    listen() {

        this.app.listen(this.port, () => {
            console.log('El servidor se encuentra corriendo en el puerto: ', this.port)
        })
    }

}

module.exports = Server;