module.exports = (app) => {
  const { STRING, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    name: STRING(30),
    password: STRING(32),
    empId: {
      type: STRING(10),
      field: 'emp_id',
    },
    department: {
      type: STRING(255),
    },
    phoneNum: {
      type: STRING(13),
      field: 'phone_num',
    },
    role: STRING(10),
    avatar: STRING(255),
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

  return User;
};
