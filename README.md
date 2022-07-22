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
| &emsp;permission | string | 必要 | 用户权限（枚举值：1，最高权限；2、管理权限；3、审核权限） |

请求实例：

```
{
	code: 200,
	message: "成功",
	data: {
		userId: "1231312",
		username: "qianye",
		token: "MIICXQIBAAKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6k"，
		permission: '1'
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
| &emsp;&emsp;userPermission | string | 必要 | 用户权限                 |

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
				userPermission: "2",
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
| &emsp;userPermission | string | 必要 | 用户权限                                 |

请求实例：

```
{
	username: "admin",
	password： "MIICXQIBAAKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6k",
	userPermission: "2",
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
| &emsp;userPermission | string | 必要 | 用户权限                                 |

请求实例：

```
{
	userId: "121212",
	username: "admin",
	password： "MIICXQIBAAKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6k",
	userPermission: "2",
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

- **用户相关接口地址统一前缀：** /apply

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

| 参数名称                  | 类型   | 必要 | 描述         |
| :------------------------ | :----- | :--- | :----------- |
| code                      | int    | 必要 | 状态码       |
| message                   | string | 必要 |
| data                      | object | 必要 | &nbsp;       |
| &emsp;total               | number | 必要 | 申领记录总数 |
| &emsp;applyList           | array  | 必要 | 申领记录数组 |
| &emsp;&emsp;applyId       | string | 必要 | 申领记录 id  |
| &emsp;&emsp;applyPeople   | string | 必要 | 申领人       |
| &emsp;&emsp;applyPhone    | string | 必要 | 申领人电话   |
| &emsp;&emsp;applyDeviceId | string | 必要 | 申领物品 Id  |
| &emsp;&emsp;applyDevice   | string | 必要 | 申领物品     |
| &emsp;&emsp;applyNum      | int    | 必要 | 申领物品数量 |
| &emsp;&emsp;applyReason   | string | 必要 | 申领理由     |

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
				applyDevice: "办公桌",
				applyNum: 1,
				applyReason: "理由"
			}
		]
	}
}
```

### 2.2 申领添加

- **地址：** /add

#### 2.2.1 请求参数

| 参数名称            | 类型   | 必要 | 描述                                     |
| :------------------ | :----- | :--- | :--------------------------------------- |
| Header              | &nbsp; | 必要 | 请求报文头                               |
| &emsp;Authorization | string | 必要 | 验证用户登录后 token，没有登录则无该字段 |
| body                | &nbsp; | 必要 | &nbsp;                                   |
| &emsp;applyPeople   | string | 必要 | 申领人                                   |
| &emsp;applyPhone    | string | 必要 | 申领人电话                               |
| &emsp;applyDeviceId | string | 必要 | 申领物品 Id                              |
| &emsp;applyNum      | int    | 必要 | 申领物品数量                             |
| &emsp;applyReason   | string | 必要 | 申领理由                                 |

请求实例：

```
{
	applyPeople: "张三",
	applyPhone "123123",
	applyDeviceId： "231232"
	applyNum: 1,
	applyReason: "理由"
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

### 2.3 用户删除

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

### 2.4 用户修改

- **地址：** /update

#### 2.4.1 请求参数

| 参数名称            | 类型   | 必要 | 描述                                     |
| :------------------ | :----- | :--- | :--------------------------------------- |
| Header              | &nbsp; | 必要 | 请求报文头                               |
| &emsp;Authorization | string | 必要 | 验证用户登录后 token，没有登录则无该字段 |
| body                | &nbsp; | 必要 | &nbsp;                                   |
| &emsp;applyId       | string | 必要 | 申领记录 id                              |
| &emsp;applyPeople   | string | 必要 | 申领人                                   |
| &emsp;applyPhone    | string | 必要 | 申领人电话                               |
| &emsp;applyDeviceId | string | 必要 | 申领物品 Id                              |
| &emsp;applyNum      | int    | 必要 | 申领物品数量                             |
| &emsp;applyReason   | string | 必要 | 申领理由                                 |

请求实例：

```
{
	applyId: "12312312",
	applyPeople: "张三",
	applyPhone "123123",
	applyDeviceId： "231232",
	applyNum: 1,
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
