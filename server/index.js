const express = require('express');
const app = express();
const PORT = 8080;

require('dotenv').config()

// client
const client = require("./db/client");
client.connect();

// http
const http = require('http')
const server = http.createServer(app)

// cors
const cors = require('cors');
app.use(cors());

// morgan
const morgan = require('morgan');
app.use(morgan('dev'));

// body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// cookie
const cookieParser = require('cookie-parser')
const { COOKIE_SECRET } = require('./secrets')
app.use(cookieParser(COOKIE_SECRET))

// auth
const { authRequired } = require('./api/utils')
app.get('/test', authRequired, (req, res, next) => {
    res.send('You are authorized')
  })

// Routers
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/', require('./api'));

app.get('*', (req, res, next) => {
    res.status(404).send('Not Found')
  })
  
  app.use((error, req, res, next) => {
    res.status(500).send(error)
  })

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});