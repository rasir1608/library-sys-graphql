exports.login = async (ctx) => {
  const createRule = {
    name: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  };
  // 校验参数
  ctx.validate(createRule);

  const user = await ctx.model.User.findOne({
    where: ctx.request.body,
  });
  if (!user) {
    ctx.body = {
      ok: false,
      status: 404,
      message: '用户不存在',
    };
  }

  ctx.session.user = user;
  ctx.body = {
    ok: true,
    status: 200,
    message: null,
    data: user,
  };
};

exports.register = async (ctx) => {
  const createRule = {
    name: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  };
  // 校验参数
  ctx.validate(createRule);

  const user = await ctx.model.User.create(ctx.request.body);
  delete user.password;
  ctx.body = {
    status: 200,
    ok: true,
    message: null,
    data: user,
  };
};

exports.getUser = async (ctx) => {
  const user = ctx.session.user;
  if (user) {
    ctx.body = {
      status: 200,
      ok: true,
      data: user,
    };
  } else {
    ctx.body = {
      status: 302,
      ok: false,
      message: '请先登录',
      data: null,
    };
  }
};
// 修改密码
exports.updatePwd = async (ctx) => {
  const updatePwdRule = {
    empId: {
      type: 'string',
    },
    oldPwd: {
      type: 'string',
    },
    newPwd: {
      type: 'string',
    },
  };
  // 校验参数
  ctx.validate(updatePwdRule);
  const body = ctx.request.body;
  const user = await ctx.model.User.findOne({ where: { empId: body.empId } });
  if (user) {
    if (user.password !== body.oldPwd) {
      ctx.body = {
        ok: false,
        message: '用户密码错误',
        status: 200,
        data: null,
      };
    } else {
      user.password = body.newPwd;
      try {
        await user.save();
        ctx.body = {
          ok: true,
          message: null,
          status: 200,
          data: user,
        };
      } catch (err) {
        ctx.body = {
          ok: false,
          message: err.toString(),
          status: 404,
          data: null,
        };
      }
    }
  } else {
    ctx.body = {
      ok: false,
      message: '用户账号错误',
      status: 200,
      data: null,
    };
  }
};

