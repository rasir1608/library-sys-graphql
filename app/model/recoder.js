module.exports = (app) => {
  const { DATE, INTEGER, BOOLEAN } = app.Sequelize;

  const recoders = app.model.define('recoder', {
    userId: {
      type: INTEGER,
      field: 'user_id',
    },
    bookId: {
      type: INTEGER,
      field: 'book_id',
    },
    status: BOOLEAN,
    createdAt: {
      type: DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DATE,
      field: 'updated_at',
    },
  }, {
    timestamp: true,
    underscored: true,
    created_at: 'createdAt',
    updated_at: 'updatedAt',
  });

  return recoders;
};

