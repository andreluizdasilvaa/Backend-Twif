const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

// Importando as rotas
const feedRoutes = require('./routes/feedRoutes');
const commentRoutes = require('./routes/commentRoutes')
const authRoutes = require('./routes/authRoutes');
const perfilRoutes = require('./routes/perfilRoutes');

const relatorioRoutes = require('./routes/relatorioRoutes')
const editUserRoutes = require('./routes/editUserRoutes');


// Importando middlewares
const logger = require('./middlewares/logger');
const errorHandler = require('./utils/errorHandler');
const cookieParser = require('cookie-parser');

dotenv.config();  // Carrega as variáveis de ambiente
const app = express();  // Criação do aplicativo Express

// Configuração de CORS (Cross-Origin Resource Sharing)
const corsOptions = {
  origin: process.env.CLIENT_ORIGIN_URL, // URL do cliente permitida
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
};

// Usando o middleware CORS
app.use(cors(corsOptions)); 
app.use(logger);  // Middleware de log
app.use(express.json());  // Middleware para parsear JSON
app.use(express.urlencoded({ extended: true }));  // Middleware para lidar com dados URL-encoded
app.use(cookieParser());  // Middleware para manipulação de cookies

// Configuração do diretório estático (para arquivos como imagens, CSS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Configuração das rotas
app.use('/auth', authRoutes);
app.use('/user', perfilRoutes);
app.use('/feed', feedRoutes);
app.use('/comments', commentRoutes);
app.use('/editar', editUserRoutes);


// Tratamento de erros (middleware)
app.use(errorHandler);

module.exports = app;  // Exporta o app para ser usado no servidor
