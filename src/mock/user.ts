import Mock from 'mockjs';
export function login() {
  return {
    code: 200,
    message: 'success',
    data: {
      userId: '1212',
      username: '12121',
      token: '123213213',
      permission: 1
    }
  };
}

export function logout() {
  return {
    code: 200,
    message: 'success'
  };
}

export function userList() {
  const data = Mock.mock({
    'userList|10': [
      {
        'userId|1': '@id',
        'username|1': '@ctitle',
        'password|1': '@string',
        'userPermission|2-3': 0
      }
    ]
  });
  return {
    code: 200,
    message: 'success',
    data: {
      total: data.userList.length,
      userList: data.userList
    }
  };
}

export function userDelete() {
  return {
    code: 200,
    message: 'success'
  };
}

export function userUpdate() {
  return {
    code: 200,
    message: 'success'
  };
}

export function userAdd() {
  return {
    code: 200,
    message: 'success'
  };
}
