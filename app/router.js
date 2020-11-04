'use strict';

module.exports = (app) => {
  app.get('/', 'home.index');
  app.post('/auth/login', 'auth.login');
  app.post('/auth/register', 'auth.register');
  app.post('/auth/updatePwd', 'auth.updatePwd');
  app.get('/auth/getUser', 'auth.getUser');
  app.resources('users', '/libs/users', app.controller.user);
};
