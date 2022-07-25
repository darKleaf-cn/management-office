import Mock from 'mockjs';

export function deviceList() {
  const data = Mock.mock({
    'deviceList|10': [
      {
        'deviceId|1': '@id',
        'deviceName|1': '@ctitle',
        'deviceTypeId|1': '@id',
        'deviceTypeName|1': '@string',
        'deviceNum|1-10': 1,
        'deviceDescribe|1': '@string',
        'deviceState|1': 1,
        'deviceSupplier|1': '@string'
      }
    ]
  });
  return {
    code: 200,
    message: 'success',
    data: {
      total: data.deviceList.length,
      deviceList: data.deviceList
    }
  };
}

export function deviceSku() {
  return {
    code: 200,
    message: 'success'
  };
}

export function deviceScrap() {
  return {
    code: 200,
    message: 'success'
  };
}
