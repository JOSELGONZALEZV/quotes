// utliza express y debe cargarse en el teminal como npm install express
const express = require("express");
const session = require("express-session");
const flash = require('connect-flash');
const app = express();
// se llama con el localhost:8000
const port = 8000;

//app.use(session({secret: 'codingdojorocks'})); 
app.use(session({secret: 'mipropiaclave'}));
app.use(flash());
// se emplea solo para post, push, delete, en el caso de get no se utiliza
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// permite qie el servisdor acceda a las carpetas de vistas (views)
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


// pwermite que el servidor lea las carpetas estarticas de acceso publico
app.use(express.static(__dirname + "public"));

//accedemos al sistema de rutas definidos en la carpeta de rutas (servicio en este caso) 
app.use(require('./router/servicios'));

app.listen(port, () => console.log(`Listening on port: ${port}`));