'use strict';

module.exports = () => {
  const config = {
    sequelize: {
      dialect: 'mysql',
      database: 'library',
      host: '203.195.193.125',
      port: '3306',
      username: 'rasir',
      password: '123456',
    },
    proxyworker: {
      port: 10086,
    },
    middleware: ['graphql', 'auth'],
    security: {
      csrf: {
        ignore: () => true,
      },
    },
  };

  // should change to your own
  config.keys = 'egg-graphql';

  return config;
};
