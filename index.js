require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize } = require('sequelize'); 

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routing
const indexRouter = require('./routes/index');
app.use('/', indexRouter); 
const articleRoutes = require('./routes/articleRoutes');
app.use('/article', articleRoutes);

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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
