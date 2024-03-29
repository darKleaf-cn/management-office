# 办公设备管理系统接口文档 v0.0.1

## 1 用户模块

- **用户相关接口地址统一前缀：** /user

### 1.1 登录

- **地址：** /login

#### 1.1.1 请求参数

| 参数名称       | 类型   | 必要 | 描述                     |
| :------------- | :----- | :--- | :----------------------- |
| body           | &nbsp; | 必要 | &nbsp;                   |
| &emsp;username | string | 必要 | 用户名                   |
| &emsp;password | string | 必要 | 密码(md5 加密和公钥加密) |

请求实例：

```
{
	username: "qianye",
	password: "12321321321"
}
```

#### 1.1.2 返回结果

| 参数名称         | 类型   | 必要 | 描述                                                      |
| :--------------- | :----- | :--- | :-------------------------------------------------------- |
| code             | number | 必要 | 状态码                                                    |
| message          | string | 必要 |
| data             | object | 必要 | &nbsp;                                                    |
| &emsp;userId     | string | 必要 | 用户 id                                                   |
| &emsp;username   | string | 必要 | 用户名称                                                  |
| &emsp;token      | string | 必要 | 验证登录                                                  |
| &emsp;permission | int    | 必要 | 用户权限（枚举值：1，最高权限；2、管理权限；3、审核权限） |

请求实例：

```
{
	code: 200,
	message: "成功",
	data: {
		userId: "1231312",
		username: "qianye",
		token: "MIICXQIBAAKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6k"，
		permission: 1
	}
}
```

### 1.2 退出登录

- **用户地址：** /logout

#### 1.2.1 请求参数

| 参数名称            | 类型   | 必要 | 描述                                     |
| :------------------ | :----- | :--- | :--------------------------------------- |
| Header              | &nbsp; | 必要 | 请求报文头                               |
| &emsp;Authorization | string | 必要 | 验证用户登录后 token，没有登录则无该字段 |

请求实例：

```
{

}
```

#### 1.2.2 返回结果

| 参数名称 | 类型   | 必要 | 描述   |
| :------- | :----- | :--- | :----- |
| code     | number | 必要 | 状态码 |
| message  | string | 必要 |

请求实例：

```
{
	code: 200,
	message: "成功"
}
```

### 1.3 用户列表

- **地址：** /list

#### 1.3.1 请求参数

| 参数名称            | 类型   | 必要   | 描述                                     |
| :------------------ | :----- | :----- | :--------------------------------------- |
| Header              | &nbsp; | 必要   | 请求报文头                               |
| &emsp;Authorization | string | 必要   | 验证用户登录后 token，没有登录则无该字段 |
| body                | &nbsp; | 必要   | &nbsp;                                   |
| &emsp;page          | int    | 必要   | 页数                                     |
| &emsp;size          | int    | 必要   | 每页条数                                 |
| &emsp;username      | string | 不必要 | 用户名                                   |

请求实例：

```
{
	page:1,
	size:10，
	username:''
}
```

#### 1.3.2 返回结果

| 参数名称                   | 类型   | 必要 | 描述                     |
| :------------------------- | :----- | :--- | :----------------------- |
| code                       | int    | 必要 | 状态码                   |
| message                    | string | 必要 |
| data                       | object | 必要 | &nbsp;                   |
| &emsp;total                | number | 必要 | 用户总数                 |
| &emsp;userList             | array  | 必要 | 用户数组                 |
| &emsp;&emsp;userId         | string | 必要 | 用户 id                  |
| &emsp;&emsp;username       | string | 必要 | 用户名                   |
| &emsp;&emsp;password       | string | 必要 | 密码(md5 加密和公钥加密) |
| &emsp;&emsp;userPermission | int    | 必要 | 用户权限                 |

请求实例：

```
{
	code: 200,
	message: "成功"
	data: {
		total: 1,
		userList: [
			{
				userId: "12312312",
				username: "admin",
				password： "MIICXQIBAAKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6k",
				userPermission: 2
			}
		]
	}
}
```

### 1.4 用户添加

- **地址：** /add

#### 1.4.1 请求参数

| 参数名称             | 类型   | 必要 | 描述                                     |
| :------------------- | :----- | :--- | :--------------------------------------- |
| Header               | &nbsp; | 必要 | 请求报文头                               |
| &emsp;Authorization  | string | 必要 | 验证用户登录后 token，没有登录则无该字段 |
| body                 | &nbsp; | 必要 | &nbsp;                                   |
| &emsp;username       | string | 必要 | 用户名                                   |
| &emsp;password       | string | 必要 | 密码(md5 加密和公钥加密)                 |
| &emsp;userPermission | int    | 必要 | 用户权限                                 |

请求实例：

```
{
	username: "admin",
	password： "MIICXQIBAAKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6k",
	userPermission: 2,
}
```

#### 1.4.2 返回结果

| 参数名称 | 类型   | 必要 | 描述   |
| :------- | :----- | :--- | :----- |
| code     | int    | 必要 | 状态码 |
| message  | string | 必要 |

请求实例：

```
{
	code: 200,
	message: "成功"
}
```

### 1.5 用户删除

- **地址：** /delete

#### 1.5.1 请求参数

| 参数名称            | 类型   | 必要 | 描述                                     |
| :------------------ | :----- | :--- | :--------------------------------------- |
| Header              | &nbsp; | 必要 | 请求报文头                               |
| &emsp;Authorization | string | 必要 | 验证用户登录后 token，没有登录则无该字段 |
| body                | &nbsp; | 必要 | &nbsp;                                   |
| &emsp;userId        | string | 必要 | 用户 id                                  |

请求实例：

```
{
	userId: "121212"
}
```

#### 1.5.2 返回结果

| 参数名称 | 类型   | 必要 | 描述   |
| :------- | :----- | :--- | :----- |
| code     | int    | 必要 | 状态码 |
| message  | string | 必要 |

请求实例：

```
{
	code: 200,
	message: "成功"
}
```

### 1.6 用户修改

- **地址：** /update

#### 1.6.1 请求参数

| 参数名称             | 类型   | 必要 | 描述                                     |
| :------------------- | :----- | :--- | :--------------------------------------- |
| Header               | &nbsp; | 必要 | 请求报文头                               |
| &emsp;Authorization  | string | 必要 | 验证用户登录后 token，没有登录则无该字段 |
| body                 | &nbsp; | 必要 | &nbsp;                                   |
| &emsp;userId         | string | 必要 | 用户 id                                  |
| &emsp;username       | string | 必要 | 用户名                                   |
| &emsp;password       | string | 必要 | 密码(md5 加密和公钥加密)                 |
| &emsp;userPermission | int    | 必要 | 用户权限                                 |

请求实例：

```
{
	userId: "121212",
	username: "admin",
	password： "MIICXQIBAAKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6k",
	userPermission: 2,
}
```

#### 1.6.2 返回结果

| 参数名称 | 类型   | 必要 | 描述   |
| :------- | :----- | :--- | :----- |
| code     | int    | 必要 | 状态码 |
| message  | string | 必要 |

请求实例：

```
{
	code: 200,
	message: "成功"
}
```

## 2 申领模块

- **申领相关接口地址统一前缀：** /apply

### 2.1 申领列表

- **地址：** /list

#### 2.1.1 请求参数

| 参数名称            | 类型   | 必要   | 描述                                     |
| :------------------ | :----- | :----- | :--------------------------------------- |
| Header              | &nbsp; | 必要   | 请求报文头                               |
| &emsp;Authorization | string | 必要   | 验证用户登录后 token，没有登录则无该字段 |
| body                | &nbsp; | 必要   | &nbsp;                                   |
| &emsp;page          | int    | 必要   | 页数                                     |
| &emsp;size          | int    | 必要   | 每页条数                                 |
| &emsp;applyPeople   | string | 不必要 | 申领人                                   |

请求实例：

```
{
	page:1,
	size:10，
	applyPeople:''
}
```

#### 2.1.2 返回结果

| 参数名称                    | 类型   | 必要 | 描述                                          |
| :-------------------------- | :----- | :--- | :-------------------------------------------- |
| code                        | int    | 必要 | 状态码                                        |
| message                     | string | 必要 |
| data                        | object | 必要 | &nbsp;                                        |
| &emsp;total                 | number | 必要 | 申领记录总数                                  |
| &emsp;applyList             | array  | 必要 | 申领记录数组                                  |
| &emsp;&emsp;applyId         | string | 必要 | 申领记录 id                                   |
| &emsp;&emsp;applyPeople     | string | 必要 | 申领人                                        |
| &emsp;&emsp;applyPhone      | string | 必要 | 申领人电话                                    |
| &emsp;&emsp;applyDeviceId   | string | 必要 | 申领物品 Id                                   |
| &emsp;&emsp;applyDeviceName | string | 必要 | 申领物品名称                                  |
| &emsp;&emsp;applyDeviceNum  | int    | 必要 | 申领物品数量                                  |
| &emsp;&emsp;applyReason     | string | 必要 | 申领理由                                      |
| &emsp;&emsp;applyTime       | string | 必要 | 申领时间                                      |
| &emsp;&emsp;applyState      | int    | 必要 | 申领状态：1、审核中；2、审核成功；3、审核失败 |

请求实例：

```
{
	code: 200,
	message: "成功"
	data: {
		total: 1,
		applyList: [
			{
				applyId: "12312312",
				applyPeople: "张三",
				applyPhone "123123",
				applyDeviceId： "231232"
				applyDeviceName: "办公桌",
				applyDeviceNum: 1,
				applyReason: "理由",
				applyTime: "2020-01-03",
				applyState: 1
			}
		]
	}
}
```

### 2.2 申领添加

- **地址：** /add

#### 2.2.1 请求参数

| 参数名称             | 类型   | 必要 | 描述                                     |
| :------------------- | :----- | :--- | :--------------------------------------- |
| Header               | &nbsp; | 必要 | 请求报文头                               |
| &emsp;Authorization  | string | 必要 | 验证用户登录后 token，没有登录则无该字段 |
| body                 | &nbsp; | 必要 | &nbsp;                                   |
| &emsp;applyPeople    | string | 必要 | 申领人                                   |
| &emsp;applyPhone     | string | 必要 | 申领人电话                               |
| &emsp;applyDeviceId  | string | 必要 | 申领物品 Id                              |
| &emsp;applyDeviceNum | int    | 必要 | 申领物品数量                             |
| &emsp;applyReason    | string | 必要 | 申领理由                                 |
| &emsp;applyTime      | string | 必要 | 申领时间                                 |

请求实例：

```
{
	applyPeople: "张三",
	applyPhone "123123",
	applyDeviceId： "231232"
	applyDeviceNum: 1,
	applyReason: "理由"，
	applyTime: "2020-01-03"
}
```

#### 2.2.2 返回结果

| 参数名称 | 类型   | 必要 | 描述   |
| :------- | :----- | :--- | :----- |
| code     | int    | 必要 | 状态码 |
| message  | string | 必要 |

请求实例：

```
{
	code: 200,
	message: "成功"
}
```

### 2.3 申领删除

- **地址：** /delete

#### 2.3.1 请求参数

| 参数名称            | 类型   | 必要 | 描述                                     |
| :------------------ | :----- | :--- | :--------------------------------------- |
| Header              | &nbsp; | 必要 | 请求报文头                               |
| &emsp;Authorization | string | 必要 | 验证用户登录后 token，没有登录则无该字段 |
| body                | &nbsp; | 必要 | &nbsp;                                   |
| &emsp;applyId       | string | 必要 | 申领记录 id                              |

请求实例：

```
{
	userId: "121212"
}
```

#### 2.3.2 返回结果

| 参数名称 | 类型   | 必要 | 描述   |
| :------- | :----- | :--- | :----- |
| code     | int    | 必要 | 状态码 |
| message  | string | 必要 |

请求实例：

```
{
	code: 200,
	message: "成功"
}
```

### 2.4 申领修改

- **地址：** /update

#### 2.4.1 请求参数

| 参数名称             | 类型   | 必要 | 描述                                     |
| :------------------- | :----- | :--- | :--------------------------------------- |
| Header               | &nbsp; | 必要 | 请求报文头                               |
| &emsp;Authorization  | string | 必要 | 验证用户登录后 token，没有登录则无该字段 |
| body                 | &nbsp; | 必要 | &nbsp;                                   |
| &emsp;applyId        | string | 必要 | 申领记录 id                              |
| &emsp;applyPeople    | string | 必要 | 申领人                                   |
| &emsp;applyPhone     | string | 必要 | 申领人电话                               |
| &emsp;applyDeviceId  | string | 必要 | 申领物品 Id                              |
| &emsp;applyDeviceNum | int    | 必要 | 申领物品数量                             |
| &emsp;applyReason    | string | 必要 | 申领理由                                 |

请求实例：

```
{
	applyId: "12312312",
	applyPeople: "张三",
	applyPhone "123123",
	applyDeviceId： "231232",
	applyDeviceNum: 1,
	applyReason: "理由"
}
```

#### 2.4.2 返回结果

| 参数名称 | 类型   | 必要 | 描述   |
| :------- | :----- | :--- | :----- |
| code     | int    | 必要 | 状态码 |
| message  | string | 必要 |

请求实例：

```
{
	code: 200,
	message: "成功"
}
```

### 2.5 统计分析

- **地址：** /statistics

#### 2.5.1 请求参数

| 参数名称            | 类型   | 必要 | 描述                                     |
| :------------------ | :----- | :--- | :--------------------------------------- |
| Header              | &nbsp; | 必要 | 请求报文头                               |
| &emsp;Authorization | string | 必要 | 验证用户登录后 token，没有登录则无该字段 |
| body                | &nbsp; | 必要 | &nbsp;                                   |
| &emsp;section       | int    | 必要 | 1、一周内；2、半月内；3、一个月内        |

请求实例：

```
{
	section: 1
}
```

#### 2.5.2 返回结果

| 参数名称          | 类型   | 必要 | 描述     |
| :---------------- | :----- | :--- | :------- |
| code              | int    | 必要 | 状态码   |
| message           | string | 必要 |
| data              | object | 必要 | &nbsp;   |
| &emsp;total       | int    | 必要 | 类型总数 |
| &emsp;typeList    | array  | 必要 | 类型数组 |
| &emsp;&emsp;name  | string | 必要 | 类型名称 |
| &emsp;&emsp;value | int    | 必要 | 类型数量 |

请求实例：

```
{
	code: 200,
	message: "成功",
	data: {
		total: 1,
		typeList: [
			{
				name: '',
				value: 1
			}
		]
	}
}
```

## 3 库存模块/报废模块

- **设备相关接口地址统一前缀：** /device

### 3.1 列表

- **地址：** /list

#### 3.1.1 请求参数

| 参数名称            | 类型   | 必要   | 描述                                     |
| :------------------ | :----- | :----- | :--------------------------------------- |
| Header              | &nbsp; | 必要   | 请求报文头                               |
| &emsp;Authorization | string | 必要   | 验证用户登录后 token，没有登录则无该字段 |
| body                | &nbsp; | 必要   | &nbsp;                                   |
| &emsp;page          | int    | 必要   | 页数                                     |
| &emsp;size          | int    | 必要   | 每页条数                                 |
| &emsp;deviceName    | string | 不必要 | 设备名称                                 |
| &emsp;deviceTypeId  | string | 不必要 | 设备类型 Id                              |

请求实例：

```
{
	page:1,
	size:10，
	deviceName:'',
	deviceTypeId: ''
}
```

#### 3.1.2 返回结果

| 参数名称                   | 类型   | 必要 | 描述                        |
| :------------------------- | :----- | :--- | :-------------------------- |
| code                       | int    | 必要 | 状态码                      |
| message                    | string | 必要 |
| data                       | object | 必要 | &nbsp;                      |
| &emsp;total                | number | 必要 | 设备总数                    |
| &emsp;deviceList           | array  | 必要 | 设备数组                    |
| &emsp;&emsp;deviceId       | string | 必要 | 设备 id                     |
| &emsp;&emsp;deviceName     | string | 必要 | 设备名称                    |
| &emsp;&emsp;deviceTypeId   | string | 必要 | 设备类型 id                 |
| &emsp;&emsp;deviceTypeName | string | 必要 | 设备类型名称                |
| &emsp;&emsp;deviceNum      | int    | 必要 | 设备库存                    |
| &emsp;&emsp;deviceDescribe | int    | 必要 | 设备描述                    |
| &emsp;&emsp;deviceState    | int    | 必要 | 设备状态： 1、正常；0、报废 |
| &emsp;&emsp;deviceSupplier | string | 必要 | 设备供应商                  |

请求实例：

```
{
	code: 200,
	message: "成功"
	data: {
		total: 1,
		deviceList: [
			{
				deviceId: "12312312",
				deviceName: "张三",
				deviceTypeId： "123123",
				deviceTypeName： "办公桌"
				deviceNum: 1,
				deviceDescribe: "描述",
				deviceState: 1,
				deviceSupplier: '某企业'
			}
		]
	}
}
```

### 3.2 库存修改

- **地址：** /sku

#### 3.2.1 请求参数

| 参数名称            | 类型   | 必要 | 描述                                     |
| :------------------ | :----- | :--- | :--------------------------------------- |
| Header              | &nbsp; | 必要 | 请求报文头                               |
| &emsp;Authorization | string | 必要 | 验证用户登录后 token，没有登录则无该字段 |
| body                | &nbsp; | 必要 | &nbsp;                                   |
| &emsp;deviceId      | string | 必要 | 设备 Id                                  |
| &emsp;deviceNum     | int    | 必要 | 库存数量                                 |

请求实例：

```
{
	deviceId:'2312321',
	deviceNum:10，
}
```

#### 3.2.2 返回结果

| 参数名称 | 类型   | 必要 | 描述   |
| :------- | :----- | :--- | :----- |
| code     | int    | 必要 | 状态码 |
| message  | string | 必要 |

请求实例：

```
{
	code: 200,
	message: "成功"
}
```

### 3.3 报废

- **地址：** /scrap

#### 3.3.1 请求参数

| 参数名称            | 类型   | 必要   | 描述                                               |
| :------------------ | :----- | :----- | :------------------------------------------------- |
| Header              | &nbsp; | 必要   | 请求报文头                                         |
| &emsp;Authorization | string | 必要   | 验证用户登录后 token，没有登录则无该字段           |
| body                | &nbsp; | 必要   | &nbsp;                                             |
| &emsp;deviceId      | string | 必要   | 设备 Id                                            |
| &emsp;time          | string | 不必要 | 报废时间（该字段为空则一键报废，不为空则预约报废） |

请求实例：

```
{
	deviceId:'2312321',
	time:'2022 10:03:17'
}
```

#### 3.3.2 返回结果

| 参数名称 | 类型   | 必要 | 描述   |
| :------- | :----- | :--- | :----- |
| code     | int    | 必要 | 状态码 |
| message  | string | 必要 |

请求实例：

```
{
	code: 200,
	message: "成功"
}
```

## 4 类型模块

- **类型相关接口地址统一前缀：** /type

### 4.1 列表

- **地址：** /list

#### 4.1.1 请求参数

| 参数名称            | 类型   | 必要 | 描述                                     |
| :------------------ | :----- | :--- | :--------------------------------------- |
| Header              | &nbsp; | 必要 | 请求报文头                               |
| &emsp;Authorization | string | 必要 | 验证用户登录后 token，没有登录则无该字段 |
| body                | &nbsp; | 必要 | &nbsp;                                   |

请求实例：

```
{

}
```

#### 4.1.2 返回结果

| 参数名称             | 类型   | 必要 | 描述     |
| :------------------- | :----- | :--- | :------- |
| code                 | int    | 必要 | 状态码   |
| message              | string | 必要 |
| data                 | object | 必要 | &nbsp;   |
| &emsp;total          | number | 必要 | 类型总数 |
| &emsp;typeList       | array  | 必要 | 类型数组 |
| &emsp;&emsp;typeId   | string | 必要 | 类型 id  |
| &emsp;&emsp;typeName | string | 必要 | 类型名称 |

请求实例：

```
{
	code: 200,
	message: "成功"
	data: {
		total: 1,
		typeList: [
			{
				typeId: '212',
				typeName: ''
			}
		]
	}
}
```

## 5 采购模块

- **采购相关接口地址统一前缀：** /purchase

### 5.1 列表

- **地址：** /list

#### 5.1.1 请求参数

| 参数名称            | 类型   | 必要   | 描述                                     |
| :------------------ | :----- | :----- | :--------------------------------------- |
| Header              | &nbsp; | 必要   | 请求报文头                               |
| &emsp;Authorization | string | 必要   | 验证用户登录后 token，没有登录则无该字段 |
| body                | &nbsp; | 必要   | &nbsp;                                   |
| &emsp;page          | int    | 必要   | 页数                                     |
| &emsp;size          | int    | 必要   | 每页条数                                 |
| &emsp;deviceName    | string | 不必要 | 设备名称                                 |
| &emsp;deviceTypeId  | string | 不必要 | 设备类型 Id                              |

请求实例：

```
{
	page:1,
	size:10，
	deviceName:'',
	deviceTypeId: ''
}
```

#### 5.1.2 返回结果

| 参数名称 | 类型 | 必要 | 描述 |
| :-- | :-- | :-- | :-- |
| code | int | 必要 | 状态码 |
| message | string | 必要 |
| data | object | 必要 | &nbsp; |
| &emsp;total | number | 必要 | 采购记录总数 |
| &emsp;purchaseList | array | 必要 | 采购数组 |
| &emsp;&emsp;purchaseId | string | 必要 | 采购 id |
| &emsp;&emsp;purchaseState | int | 必要 | 采购记录状态：1、审核中；2、审核成功；3、审核失败 |
| &emsp;&emsp;purchaseDeviceId | string | 必要 | 采购设备 id |
| &emsp;&emsp;purchaseDeviceName | string | 必要 | 采购设备名称 |
| &emsp;&emsp;purchaseDeviceTypeId | string | 必要 | 采购设备类型 id |
| &emsp;&emsp;purchaseDeviceTypeName | string | 必要 | 采购设备类型名称 |
| &emsp;&emsp;purchaseDeviceDescribe | string | 必要 | 采购设备描述 |
| &emsp;&emsp;purchaseDeviceSupplier | string | 必要 | 采购设备供应商 |
| &emsp;&emsp;purchaseDeviceNum | int | 必要 | 采购设备数量 |

请求实例：

```
{
	code: 200,
	message: "成功"
	data: {
		total: 1,
		purchaseList: [
			{
				purchaseId：'1212'
				purchaseState: 1,
				purchaseDeviceId: '2121',
				purchaseDeviceName: '',
				purchaseDeviceTypeId: '',
				purchaseDeviceTypeName:'',
				purchaseDeviceDescribe: '',
				purchaseDeviceSupplier: '',
				purchaseDeviceNum: 1
			}
		]
	}
}
```

### 5.2 添加

- **地址：** /add

#### 5.2.1 请求参数

| 参数名称                     | 类型   | 必要 | 描述                                     |
| :--------------------------- | :----- | :--- | :--------------------------------------- |
| Header                       | &nbsp; | 必要 | 请求报文头                               |
| &emsp;Authorization          | string | 必要 | 验证用户登录后 token，没有登录则无该字段 |
| body                         | &nbsp; | 必要 | &nbsp;                                   |
| &emsp;purchaseDeviceName     | string | 必要 | 采购设备名称                             |
| &emsp;purchaseDeviceTypeId   | string | 必要 | 采购设备类型 id                          |
| &emsp;purchaseDeviceDescribe | string | 必要 | 采购设备描述                             |
| &emsp;purchaseDeviceSupplier | string | 必要 | 采购设备供应商                           |
| &emsp;purchaseDeviceNum      | int    | 必要 | 采购设备数量                             |

请求实例：

```
{
	purchaseDeviceName: '',
	purchaseDeviceTypeId: '',
	purchaseDeviceDescribe: '',
	purchaseDeviceSupplier: '',
	purchaseDeviceNum: 1
}
```

#### 5.2.2 返回结果

| 参数名称 | 类型   | 必要 | 描述   |
| :------- | :----- | :--- | :----- |
| code     | int    | 必要 | 状态码 |
| message  | string | 必要 |

请求实例：

```
{
	code: 200,
	message: "成功"
}
```

### 5.3 删除

- **地址：** /delete

#### 5.3.1 请求参数

| 参数名称            | 类型   | 必要 | 描述                                     |
| :------------------ | :----- | :--- | :--------------------------------------- |
| Header              | &nbsp; | 必要 | 请求报文头                               |
| &emsp;Authorization | string | 必要 | 验证用户登录后 token，没有登录则无该字段 |
| body                | &nbsp; | 必要 | &nbsp;                                   |
| &emsp;purchaseId    | string | 必要 | 采购记录 id                              |

请求实例：

```
{
	purchaseId: ''
}
```

#### 5.3.2 返回结果

| 参数名称 | 类型   | 必要 | 描述   |
| :------- | :----- | :--- | :----- |
| code     | int    | 必要 | 状态码 |
| message  | string | 必要 |

请求实例：

```
{
	code: 200,
	message: "成功"
}
```

## 6 审核模块

- **审核相关接口地址统一前缀：** /audit

### 6.1 申领审核列表

- **地址：** /apply/list

#### 6.1.1 请求参数

| 参数名称            | 类型   | 必要 | 描述                                     |
| :------------------ | :----- | :--- | :--------------------------------------- |
| Header              | &nbsp; | 必要 | 请求报文头                               |
| &emsp;Authorization | string | 必要 | 验证用户登录后 token，没有登录则无该字段 |
| body                | &nbsp; | 必要 | &nbsp;                                   |
| &emsp;page          | int    | 必要 | 页数                                     |
| &emsp;size          | int    | 必要 | 每页条数                                 |

请求实例：

```
{
	page:1,
	size:10，
}
```

#### 6.1.2 返回结果

| 参数名称                    | 类型   | 必要 | 描述         |
| :-------------------------- | :----- | :--- | :----------- |
| code                        | int    | 必要 | 状态码       |
| message                     | string | 必要 |
| data                        | object | 必要 | &nbsp;       |
| &emsp;total                 | number | 必要 | 申领记录总数 |
| &emsp;applyList             | array  | 必要 | 申领记录数组 |
| &emsp;&emsp;applyId         | string | 必要 | 申领记录 id  |
| &emsp;&emsp;applyPeople     | string | 必要 | 申领人       |
| &emsp;&emsp;applyPhone      | string | 必要 | 申领人电话   |
| &emsp;&emsp;applyDeviceId   | string | 必要 | 申领物品 Id  |
| &emsp;&emsp;applyDeviceName | string | 必要 | 申领物品名称 |
| &emsp;&emsp;applyDeviceNum  | int    | 必要 | 申领物品数量 |
| &emsp;&emsp;applyReason     | string | 必要 | 申领理由     |
| &emsp;&emsp;applyTime       | string | 必要 | 申领时间     |

请求实例：

```
{
	code: 200,
	message: "成功"
	data: {
		total: 1,
		applyList: [
			{
				applyId: "12312312",
				applyPeople: "张三",
				applyPhone "123123",
				applyDeviceId： "231232"
				applyDeviceName: "办公桌",
				applyDeviceNum: 1,
				applyReason: "理由",
				applyTime: "2020-01-03"
			}
		]
	}
}
```

### 6.2 申领审核

- **地址：** /apply/check

#### 6.2.1 请求参数

| 参数名称            | 类型   | 必要   | 描述                                     |
| :------------------ | :----- | :----- | :--------------------------------------- |
| Header              | &nbsp; | 必要   | 请求报文头                               |
| &emsp;Authorization | string | 必要   | 验证用户登录后 token，没有登录则无该字段 |
| body                | &nbsp; | 必要   | &nbsp;                                   |
| &emsp;applyId       | string | 必要   | 申领记录 id                              |
| &emsp;flag          | int    | 必要   | 1、通过；0、不通过                       |
| &emsp;reason        | string | 不必要 | 原因                                     |

请求实例：

```
{
	applyId:'',
	flag:1,
	reason：''
}
```

#### 6.2.2 返回结果

| 参数名称 | 类型   | 必要 | 描述   |
| :------- | :----- | :--- | :----- |
| code     | int    | 必要 | 状态码 |
| message  | string | 必要 |

请求实例：

```
{
	code: 200,
	message: "成功"
}
```

### 6.3 采购审核列表

- **地址：** /purchase/list

#### 6.3.1 请求参数

| 参数名称            | 类型   | 必要 | 描述                                     |
| :------------------ | :----- | :--- | :--------------------------------------- |
| Header              | &nbsp; | 必要 | 请求报文头                               |
| &emsp;Authorization | string | 必要 | 验证用户登录后 token，没有登录则无该字段 |
| body                | &nbsp; | 必要 | &nbsp;                                   |
| &emsp;page          | int    | 必要 | 页数                                     |
| &emsp;size          | int    | 必要 | 每页条数                                 |

请求实例：

```
{
	page:1,
	size:10
}
```

#### 6.3.2 返回结果

| 参数名称                           | 类型   | 必要 | 描述             |
| :--------------------------------- | :----- | :--- | :--------------- |
| code                               | int    | 必要 | 状态码           |
| message                            | string | 必要 |
| data                               | object | 必要 | &nbsp;           |
| &emsp;total                        | number | 必要 | 采购记录总数     |
| &emsp;purchaseList                 | array  | 必要 | 采购数组         |
| &emsp;&emsp;purchaseId             | string | 必要 | 采购 id          |
| &emsp;&emsp;purchaseDeviceId       | string | 必要 | 采购设备 id      |
| &emsp;&emsp;purchaseDeviceName     | string | 必要 | 采购设备名称     |
| &emsp;&emsp;purchaseDeviceTypeId   | string | 必要 | 采购设备类型 id  |
| &emsp;&emsp;purchaseDeviceTypeName | string | 必要 | 采购设备类型名称 |
| &emsp;&emsp;purchaseDeviceDescribe | string | 必要 | 采购设备描述     |
| &emsp;&emsp;purchaseDeviceSupplier | string | 必要 | 采购设备供应商   |
| &emsp;&emsp;purchaseDeviceNum      | int    | 必要 | 采购设备数量     |

请求实例：

```
{
	code: 200,
	message: "成功"
	data: {
		total: 1,
		purchaseList: [
			{
				purchaseId：'1212'
				purchaseDeviceId: '2121',
				purchaseDeviceName: '',
				purchaseDeviceTypeId: '',
				purchaseDeviceTypeName:'',
				purchaseDeviceDescribe: '',
				purchaseDeviceSupplier: '',
				purchaseDeviceNum: 1
			}
		]
	}
}
```

### 6.4 采购审核

- **地址：** /purchase/check

#### 6.4.1 请求参数

| 参数名称            | 类型   | 必要   | 描述                                     |
| :------------------ | :----- | :----- | :--------------------------------------- |
| Header              | &nbsp; | 必要   | 请求报文头                               |
| &emsp;Authorization | string | 必要   | 验证用户登录后 token，没有登录则无该字段 |
| body                | &nbsp; | 必要   | &nbsp;                                   |
| &emsp;purchaseId    | string | 必要   | 采购记录 id                              |
| &emsp;flag          | int    | 必要   | 1、通过；0、不通过                       |
| &emsp;reason        | string | 不必要 | 原因                                     |

请求实例：

```
{
	purchaseId:'',
	flag:1,
	reason:''
}
```

#### 6.4.2 返回结果

| 参数名称 | 类型   | 必要 | 描述   |
| :------- | :----- | :--- | :----- |
| code     | int    | 必要 | 状态码 |
| message  | string | 必要 |

请求实例：

```
{
	code: 200,
	message: "成功"
}
```
