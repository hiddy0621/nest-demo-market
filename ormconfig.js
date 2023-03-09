module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  autoLoadEntities: true,
  // コンパイル後のマイグレーションファイルの読み込み指定
  entities: ['dist/entities/**.entity.js'],
  migrations: ['dist/migrations/**.js'],
  //　CLIによって EntityファイルやMigrationファイルが出力された時の指定
  cli: {
    entitiesDir: '../entities',
    migrationsDir: '../migrations',
  },
};
