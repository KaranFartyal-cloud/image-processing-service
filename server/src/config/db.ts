import mysql2 from "mysql2/promise";
import dotenv from "dotenv"

dotenv.config()

const db = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
  queueLimit: 0,
  waitForConnections: true,
});

const checkConnection = async () => {
  try {
    const connection = await db.getConnection();
    console.log("database connection successful");
    connection.release();
  } catch (error) {
    console.log(`error connecting to database`);
    throw error;
  }
};



export { db, checkConnection };
