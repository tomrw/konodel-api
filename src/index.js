import bodyParser from 'body-parser';
import express from 'express';
import login from './routes/login';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/login/', login);

app.listen(3000);
