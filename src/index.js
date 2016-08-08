import express from 'express';
import login from './routes/login';

const app = express();

app.post('/login/', login);

app.listen(3000);
