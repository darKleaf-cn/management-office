import Mock from 'mockjs';

export function applyList() {
  const data = Mock.mock({
    'applyList|10': [
      {
        'applyId|1': '@id',
        'applyPeople|1': '@ctitle',
        'applyPhone|1': '@string',
        'applyDeviceName|1': '@string',
        'applyDeviceId|1': '@string',
        'applyDeviceNum|1-10': 1,
        'applyReason|1': '@string',
        'applyTime|1': '@time',
        'applyState|1-3': 1
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
