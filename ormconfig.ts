
import { DataSource } from 'typeorm';

async function loadDatabaseConfig(): Promise<DataSource> {
  return new DataSource({
    type: 'postgres',
    host: 'database-1.clg6qey44795.eu-north-1.rds.amazonaws.com',
    port: 5432,
    username: 'postgres',
    password: 'E|vBFNBN.R27_s?rW?A?z4F5SQWU',
    database: 'database-1',
    // ssl: {
    //   rejectUnauthorized: false,
    // },

    entities: [__dirname + '/src/**/entities/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    migrationsRun: false,
    synchronize: false,
  });
}

export default loadDatabaseConfig();
