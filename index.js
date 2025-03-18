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
if (process.env.NODE_ENV === 'production') {
  app.use(
    cors({
      origin: 'https://pagina-expotec.onrender.com', // Cambia esto por tu dominio
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );
} else {
  app.use(cors()); // En desarrollo, permite todos los orígenes
}
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
