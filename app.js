const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Carrega variáveis de ambiente
dotenv.config();

const app = express();

// Configuração do CORS
const corsOptions = {
  origin: process.env.CLIENT_ORIGIN_URL || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Diretório público (se tiver)
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
const feedRoutes = require('./routes/feedRoutes');
const commentRoutes = require('./routes/commentRoutes');
const authRoutes = require('./routes/authRoutes');
const perfilRoutes = require('./routes/perfilRoutes');
const relatorioRoutes = require('./routes/relatorioRoutes');
const imageRoutes = require('./routes/imageRoutes');
const fixProblemRoutes = require('./routes/fixProblemRoutes');
const editUserRoutes = require('./routes/editUserRoutes');
const postRoutes = require('./routes/postRoutes'); // rota para criação de posts

// Usando as rotas
app.use('/auth', authRoutes);
app.use('/user', perfilRoutes);
app.use('/feed', feedRoutes);
app.use('/comments', commentRoutes);
app.use('/editar', editUserRoutes);
app.use('/', postRoutes);

// Tratamento genérico de erros
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Erro desconhecido' });
});

module.exports = app;
