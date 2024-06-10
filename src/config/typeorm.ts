import { DataSource } from "typeorm"
import { config } from "dotenv"
config()

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT || '3306'),
    username: process.env.MYSQL_USER_NAME,
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE,
    logging: false,
    synchronize: true,
    entities: ['src/entities/*.ts']
})