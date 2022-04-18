"use strict";
require("dotenv/config");
const enums_1 = require("./shared/enums");
const config = {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: false,
    migrationsRun: false,
    logging: process.env.ENV === enums_1.NODE_ENV.DEVELOPMENT ? true : false,
    logger: 'file',
    migrations: [__dirname + '/database/migrations/**/*{.ts,.js}'],
    cli: {
        migrationsDir: 'src/database/migrations',
    },
};
module.exports = config;
//# sourceMappingURL=ormconfig.js.map