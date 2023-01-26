

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;

const db = require('./queries');

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Api Lotes' });
});

app.get('/lotes', db.getLotes);
app.get('/lotes/:id', db.getLoteById);
app.post('/lotes', db.createLote);
//app.put('/users/:id', db.updateUser);
app.delete('/lotes/:id', db.deleteLote);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});