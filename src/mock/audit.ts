import Mock from 'mockjs';

export function auditApplyList() {
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

export function auditApply() {
  return {
    code: 200,
    message: 'success'
  };
}

export function auditPurchaseList() {
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

export function auditPurchase() {
  return {
    code: 200,
    message: 'success'
  };
}
