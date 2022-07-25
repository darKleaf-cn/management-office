import Mock from 'mockjs';

export function typeList() {
  const data = Mock.mock({
    'typeList|10': [
      {
        'typeId|1': '@id',
        'typeName|1': '@string'
      }
    ]
  });
  return {
    code: 200,
    message: 'success',
    data: {
      total: data.typeList.length,
      typeList: data.typeList
    }
  };
}
