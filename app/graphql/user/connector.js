'use strict';

const DataLoader = require('dataloader');

class UserConnector {
  constructor(ctx) {
    this.ctx = ctx;
    this.loader = new DataLoader(this.fetch.bind(this));
  }

  queryUserRecoders({ user, recoder, book, page }) {
    const { offset, limit } = page || {};
    const condition = `SELECT 
    ${[...this.ctx.helper.formatTableKeys('users'),
    ...this.ctx.helper.formatTableKeys('recoders'),
    ...this.ctx.helper.formatTableKeys('books')]
    .join(',')}
    FROM users
    LEFT JOIN recoders
    ON users.id = recoders.user_id
    LEFT JOIN books
    ON books.id = recoders.book_id
    ${(user || recoder || book) ? `WHERE 
    ${[...this.ctx.helper.formatTableCondition('users', user),
    ...this.ctx.helper.formatTableCondition('recoders', recoder),
    ...this.ctx.helper.formatTableCondition('books', book)]
    .join(' AND ')}
    `
    : ''}`;
    const users = this.ctx.app.model.query(`
    ${condition || ''}
    ${typeof limit === 'number' ? `limit ${limit}` : ''}
    ${typeof offset === 'number' ? `offset ${offset}` : ''}
    `,
    { type: this.ctx.app.Sequelize.QueryTypes.SELECT },
    );
    return users;
  }

  async countUserRecoders({ user, recoder, book }) {
    const condition = `SELECT 
    count(*)
    FROM users
    LEFT JOIN recoders
    ON users.id = recoders.user_id
    LEFT JOIN books
    ON books.id = recoders.book_id
    ${(user || recoder || book) ? `WHERE 
    ${[...this.ctx.helper.formatTableCondition('users', user),
    ...this.ctx.helper.formatTableCondition('recoders', recoder),
    ...this.ctx.helper.formatTableCondition('books', book)]
    .join(' AND ')}
    `
    : ''}`;
    const count = await this.ctx.app.model.query(`${condition || ''}`,
      { type: this.ctx.app.Sequelize.QueryTypes.SELECT },
    );
    return count[0]['count(*)'];
  }

  fetch(ids) {
    const users = this.ctx.app.model.User.findAll({
      where: {
        id: {
          $in: ids,
        },
      },
    }).then(us => us.map(u => u.toJSON()));
    return users;
  }

  fetchByIds(ids) {
    return this.loader.loadMany(ids);
  }

  fetchById(id) {
    return this.loader.load(id);
  }
}

module.exports = UserConnector;

