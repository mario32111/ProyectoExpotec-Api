const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
/* const { checkApiKey } = require('./middlewares/auth.handler');
 */const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler')

const app = express();
//con esto el puerto es dinamico, se asigna segun el puerto que heroku diga
const port = process.env.PORT || 3000;

app.use(express.json());



app.use(cors());


app.get('/', (req, res) => {
  res.send('Hola mi server en express API EXPOTEC');
});


app.get('/nueva-ruta', (req, res) => {
  res.send('Hola soy un nuevo endpoint');
});

routerApi(app)

//se ejecutan en este orden
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log("Mi port " + port)
});
