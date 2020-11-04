
function toLowerLine(str) {
  let temp = str.replace(/[A-Z]/g, match => `_${match.toLowerCase()}`);
  if (temp.slice(0, 1) === '_') {
    temp = temp.slice(1);
  }
  return temp;
}


function formatCondition(params, tableMap) {
  return Object.keys(params || {}).map((key) => {
    let condition;
    if ((params || {})[key]) {
      const lowerLineKey = toLowerLine(key);
      const value = params[key];
      condition = tableMap[lowerLineKey].handler(value);
    }
    return condition;
  }).filter(t => !!t);
}

function formatKeys(tableName, map) {
  return Object.keys(map || {}).map((key) => {
    let keyword;
    if ((map || {})[key]) {
      keyword = `${tableName}.${key} as ${map[key].nikeName}`;
    }
    return keyword;
  }).filter(t => !!t);
}

const userMap = {
  id: {
    nikeName: 'userId',
    handler: value => `users.id = ${value}`,
  },
  emp_id: {
    nikeName: 'userEmpId',
    handler: value => `users.emp_id LIKE "%${value}%"`,
  },
  name: {
    nikeName: 'userName',
    handler: value => `users.name LIKE "%${value}%"`,
  },
  department: {
    nikeName: 'userDepartment',
    handler: value => `users.department LIKE "%${value}%"`,
  },
  phone_num: {
    nikeName: 'userPhone',
    handler: value => `users.phone_num LIKE "%${value}%"`,
  },
  role: {
    nikeName: 'userRole',
    handler: value => `users.role = ${value}`,
  },
  created_at: {
    nikeName: 'userCreateAt',
    handler: (value) => {
      if (Array.isArray(value) && value.length) {
        if (value.length >= 2) {
          return `users.created_at >= ${value[0]} AND users.created_at < ${value[1]}`;
        }
        return `users.created_at = ${value[0]}`;
      } else if (value) {
        return `users.created_at = ${value}`;
      }
      return undefined;
    },
  },
  updated_at: {
    nikeName: 'userUpdateAt',
    handler: (value) => {
      if (Array.isArray(value) && value.length) {
        if (value.length >= 2) {
          return `users.updated_at >= ${value[0]} AND users.updated_at < ${value[1]}`;
        }
        return `users.updated_at = ${value[0]}`;
      } else if (value) {
        return `users.updated_at = ${value}`;
      }
      return undefined;
    },
  },
};
const recoderMap = {
  status: {
    nikeName: 'recoderStatus',
    handler: value => `recoders.status = ${value}`,
  },
  created_at: {
    nikeName: 'recoderCreateAt',
    handler: (value) => {
      if (Array.isArray(value) && value.length) {
        if (value.length >= 2) {
          return `recoders.created_at >= ${value[0]} AND recoders.created_at < ${value[1]}`;
        }
        return `recoders.created_at = ${value[0]}`;
      } else if (value) {
        return `recoders.created_at = ${value}`;
      }
      return undefined;
    },
  },
  updated_at: {
    nikeName: 'recoderUpdateAt',
    handler: (value) => {
      if (Array.isArray(value) && value.length) {
        if (value.length >= 2) {
          return `recoders.updated_at >= ${value[0]} AND recoders.updated_at < ${value[1]}`;
        }
        return `recoders.updated_at = ${value[0]}`;
      } else if (value) {
        return `recoders.updated_at = ${value}`;
      }
      return undefined;
    },
  },
};
const bookMap = {
  id: {
    nikeName: 'bookId',
    handler: value => `books.id = ${value}`,
  },
  name: {
    nikeName: 'bookName',
    handler: value => `books.name LIKE "%${value}%"`,
  },
  auth: {
    nikeName: 'bookAuth',
    handler: value => `books.auth LIKE "%${value}%"`,
  },
  identifier: {
    nikeName: 'bookIdentifier',
    handler: value => `books.identifier LIKE "%${value}%"`,
  },
  isbn: {
    nikeName: 'bookIsbn',
    handler: value => `books.isbn LIKE "%${value}%"`,
  },
  category: {
    nikeName: 'bookCategory',
    handler: value => `books.category = ${value}`,
  },
  summary: {
    nikeName: 'bookSummary',
    handler: value => `books.summary LIKE "%${value}%"`,
  },
  status: {
    nikeName: 'bookStatus',
    handler: value => `books.status = ${value}`,
  },
  published_time: {
    nikeName: 'bookPublishedTime',
    handler: (value) => {
      if (Array.isArray(value) && value.length) {
        if (value.length >= 2) {
          return `books.published_time >= ${value[0]} AND books.published_time < ${value[1]}`;
        }
        return `books.published_time = ${value[0]}`;
      } else if (value) {
        return `books.published_time = ${value}`;
      }
      return undefined;
    },
  },
  printed_time: {
    nikeName: 'bookPrintedTime',
    handler: (value) => {
      if (Array.isArray(value) && value.length) {
        if (value.length >= 2) {
          return `books.printed_time >= ${value[0]} AND books.printed_time < ${value[1]}`;
        }
        return `books.printed_time = ${value[0]}`;
      } else if (value) {
        return `books.printed_time = ${value}`;
      }
      return undefined;
    },
  },
  created_at: {
    nikeName: 'bookCreatedAt',
    handler: (value) => {
      if (Array.isArray(value) && value.length) {
        if (value.length >= 2) {
          return `books.created_at >= ${value[0]} AND books.created_at < ${value[1]}`;
        }
        return `books.created_at = ${value[0]}`;
      } else if (value) {
        return `books.created_at = ${value}`;
      }
      return undefined;
    },
  },
  updated_at: {
    nikeName: 'bookUpdatedAt',
    handler: (value) => {
      if (Array.isArray(value) && value.length) {
        if (value.length >= 2) {
          return `books.updated_at >= ${value[0]} AND books.updated_at < ${value[1]}`;
        }
        return `books.updated_at = ${value[0]}`;
      } else if (value) {
        return `books.updated_at = ${value}`;
      }
      return undefined;
    },
  },
};

const tableMap = {
  users: userMap,
  recoders: recoderMap,
  books: bookMap,

};


module.exports = {
  formatTableKeys(tableName) {
    return formatKeys(tableName, tableMap[tableName]);
  },
  formatTableCondition(tableName, data) {
    return formatCondition(data, tableMap[tableName]);
  },
};
