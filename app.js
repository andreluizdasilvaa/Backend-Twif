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
const imageRoutes = require('./routes/imageRoutes');
const fixProblemRoutes = require('./routes/fixProblemRoutes');

// Importando o middlewares
const logger = require('./middlewares/logger');
const errorHandler = require('./utils/errorHandler');
const cookieParser = require('cookie-parser');

dotenv.config();
const app = express();

// Cors - config
const corsOptions = {
  origin: process.env.CLIENT_ORIGIN_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
};

// Remova o cors config apenas em desenv
app.use(cors(corsOptions));
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rotas
app.use('/auth', authRoutes);
app.use('/relatorios', relatorioRoutes);
app.use('/user', perfilRoutes);
app.use('/feed', feedRoutes);
app.use('/image', imageRoutes);
app.use('/image/default', express.static(path.join(__dirname, 'uploads/defaults')));
app.use('/suport', fixProblemRoutes);
app.use('/comments', commentRoutes);

// app.use('/', perfilRoutes, commentRoutes, feedRoutes);

// Tratamento de erros
app.use(errorHandler);

module.exports = app;