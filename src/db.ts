import { DataSource } from 'typeorm';
import { User } from './entities/User';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: '123',
    database: 'typeorm',
    port: 5434,
    entities: [User],
    logging: true,
    synchronize: true,
});
