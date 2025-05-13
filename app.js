const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const createHttpError = require('http-errors'); // Importando aqui

// Importando as rotas
const feedRoutes = require('./routes/feedRoutes');
const commentRoutes = require('./routes/commentRoutes');
const authRoutes = require('./routes/authRoutes');
const perfilRoutes = require('./routes/perfilRoutes');

// Middlewares
const logger = require('./middlewares/logger');
const errorHandler = require('./utils/errorHandler');

dotenv.config();
const app = express();

// Configuração do CORS
const corsOptions = {
  origin: process.env.CLIENT_ORIGIN_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
};

app.use(cors(corsOptions));
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.use('/auth', authRoutes);
app.use('/feed', feedRoutes);
app.use('/comments', commentRoutes);
app.use('/user', perfilRoutes);

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
  console.error(err); // Para logar o erro
  const status = err.status || 500;  // Se não tiver status, utiliza 500
  res.status(status).json({ message: err.message || 'Erro desconhecido' });
});

module.exports = app;
