'use strict';

module.exports = {
  Query: {
    userRecoders(root, { user, recoder, book, page }, ctx) {
      // return ctx.connector.user.fetchById(id);
      return ctx.connector.user.queryUserRecoders({ user, recoder, book, page });
    },
    userRecodersCount(root, { user, recoder, book }, ctx) {
      return ctx.connector.user.countUserRecoders({ user, recoder, book });
    },
    user(root, { id }, ctx) {
      return ctx.connector.user.fetchById(id);
    },
    users(root, { ids }, ctx) {
      return ctx.connector.user.fetch(ids);
    },
  },
};
