import { DataSource } from "typeorm"
import { config } from "dotenv"
config()

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '1234',
    database: '3team',
    logging: true,
    synchronize: true,
    entities: ['src/entities/*.ts']
})