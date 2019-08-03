import config from './config/config';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const envConfig = config[env];
const url = `mongodb://${envConfig.username}:${envConfig.password}@${envConfig.host}/${envConfig.database}`
// mongodb://username:password@host:port/database

mongoose.connect(url, { useNewUrlParser: true })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

const db = mongoose.connection;


export default db;