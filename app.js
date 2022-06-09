const express = require('express');
const webhookRoute = require('./routes/webhooks')
const cors = require('cors');
const { requestLogger } = require('./middlewares/logger');
const centalizedErrHandler = require('./middlewares/centralizedHandler');
require('dotenv').config();

const app = express();


const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(cors());
app.use(requestLogger);
app.use(webhookRoute)
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});
app.use(centalizedErrHandler);
app.use((req, res, next) => {
  res.status(404).send('Error 404 - Path not found on the server');
});

app.listen(PORT);


