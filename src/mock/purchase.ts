import Mock from 'mockjs';

export function purchaseList() {
  const data = Mock.mock({
    'purchaseList|10': [
      {
        'purchaseId|1': '@id',
        'purchaseState|1-3': 1,
        'purchaseDeviceId|1': '@string',
        'purchaseDeviceName|1': '@string',
        'purchaseDeviceTypeId|1': '@string',
        'purchaseDeviceTypeName|1': '@string',
        'purchaseDeviceDescribe|1': '@string',
        'purchaseDeviceSupplier|1': '@string',
        'purchaseDeviceNum|1-3': 1
      }
    ]
  });
  return {
    code: 200,
    message: 'success',
    data: {
      total: data.purchaseList.length,
      purchaseList: data.purchaseList
    }
  };
}

export function purchaseDelete() {
  return {
    code: 200,
    message: 'success'
  };
}

export function purchaseAdd() {
  return {
    code: 200,
    message: 'success'
  };
}
