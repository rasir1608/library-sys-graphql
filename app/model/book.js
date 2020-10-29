module.exports = (app) => {
  const { STRING, DATE, TEXT, INTEGER } = app.Sequelize;

  const Item = app.model.define('book', {
    name: STRING(64),
    auth: STRING(32),
    identifier: STRING(30),
    isbn: STRING(30),
    publishedTime: {
      type: DATE,
      field: 'published_time',
    },
    printedTime: {
      type: DATE,
      field: 'printed_time',
    },
    createdAt: {
      type: DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DATE,
      field: 'updated_at',
    },
    category: STRING(10),
    summary: STRING(255),
    content: TEXT,
    status: { type: INTEGER, defaultValue: 0 },
  }, {
    timestamp: true,
    underscored: true,
    created_at: 'createdAt',
    updated_at: 'updatedAt',
  });

  return Item;
};

