import pkg from 'pg';
import 'dotenv/config'
const { Pool } = pkg;
const connection = new Pool({
  user: process.env.user ,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: parseInt(process.env.porta)
})
//DATABASE_URL=postgres://postgres:123456@localhost:5432/valex

export default connection;