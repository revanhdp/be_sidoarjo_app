require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { Sequelize } = require('sequelize');

const app = express();
const port = 3000;

app.set('trust proxy', 1);

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Routing
const indexRouter = require('./routes/index');
const articleRoutes = require('./routes/articleRoutes');
const authRoutes = require('./routes/authRoutes'); 

app.use('/', indexRouter);
app.use('/articles', articleRoutes);
app.use('/auth', authRoutes); 

// Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

// Test DB connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('Unable to connect to DB:', err));

// Default Route
app.get('/', (req, res) => {
  res.send('Welcome to Lifestyle Sidoarjo API');
});

// Global error handler (opsional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
