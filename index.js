const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');
const socketIo = require("socket.io");
const http = require("http");

const app = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());
app.use(cors());

// Middleware para compartir `io` con los routers
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Rutas
routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

server.listen(port, () => {
  console.log("Servidor corriendo en el puerto " + port);
});
