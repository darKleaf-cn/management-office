import Mock from 'mockjs';

export function applyList() {
  const data = Mock.mock({
    'applyList|10': [
      {
        'applyId|1': '@id',
        'applyPeople|1': '@ctitle',
        'applyPhone|1': '@string',
        'applyDevice|1': '@string',
        'applyDeviceId|1': '@string',
        'applyNum|1-10': 1,
        'applyReason|1': '@string'
      }
    ]
  });
  return {
    code: 200,
    message: 'success',
    data: {
      total: data.applyList.length,
      applyList: data.applyList
    }
  };
}

export function applyDelete() {
  return {
    code: 200,
    message: 'success'
  };
}

export function applyUpdate() {
  return {
    code: 200,
    message: 'success'
  };
}

export function applyAdd() {
  return {
    code: 200,
    message: 'success'
  };
}
