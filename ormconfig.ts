import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const config: MysqlConnectionOptions = {
  type: 'mariadb',
  database: 'learn_type_orm',
  entities: ['dist/src/**/*.entity.js'],
  synchronize: true,
  username: 'root',
  password: '',
  // synchronize: false,
  // migrations: ['dist/src/db/migrations/*.js'],
  // cli: {
  //   migrationsDir: 'src/db/migrations',
  // },
};

export default config;
