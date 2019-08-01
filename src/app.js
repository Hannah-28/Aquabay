import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';
import db from './db/index';

// import routes
import routes from './routes';

dotenv.config();

// initialize the app
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// serving static files
app.use(express.static(path.join(__dirname, '../public')));

// setup body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.locals.user = res.user;
  next();
});

app.use('/', routes);

export default app;
