const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();

//extrai servidor do express
const server = require('http').Server(app);

// habilita servidor a escutar protocolo AWS (pra entender req real-time)
// este objeto contem a informação de todos os user que estão usando
// a aplicação
const io = require('socket.io')(server);

mongoose.connect(
    'mongodb://goweek:goweek123@ds157383.mlab.com:57383/goweekbackend',
    {
        useNewUrlParser: true
    }
);

// para que eu torne a variavel "io" visivel para toda aplicação
// vou criar um middleware
app.use((req, res, next) => {
    // ao recever req cria esta variavel
    req.io = io;

    // e retorna ao funcionamento normal
    return next();
});


// diz que vou usar json em todas req..
app.use(cors()); // permite outras applicações usarem o server
app.use(express.json());
app.use(require('./routes'));

//com acesso ao protocolo aws
server.listen(3000, () => {
    console.log('Server started on port 3000');
});