# axios面试题汇总
## 1、axios的特点有哪些？
1. Axios 是一个基于 promise 的 HTTP 库，支持promise所有的API
2. 它可以拦截请求和响应
3. 它可以转换请求数据和响应数据，并对响应回来的内容自动转换成 JSON类型的数据
4. 安全性更高，客户端支持防御 XSRF
5. 客户端支持防御 CSRF 攻击；
6. 同时支持浏览器和 Node.js 环境；
7. 能够取消请求及自动转换 JSON 数据。


## 2、axios有哪些常用方法？
```js
axios.get(url[, config])   //get请求用于列表和信息查询
axios.delete(url[, config])  //删除
axios.post(url[, data[, config]])  //post请求用于信息的添加
axios.put(url[, data[, config]])  //更新操作
```


## 3、说下你了解的axios相关配置属性？
```js
url: 是用于请求的服务器URL
method: 是创建请求时使用的方法,默认是get
baseURL: 将自动加在 `url` 前面，除非 `url` 是一个绝对URL。它可以通过设置一个 `baseURL` 便于为axios实例的方法传递相对URL
`transformRequest` 允许在向服务器发送前，修改请求数据，只能用在'PUT','POST'和'PATCH'这几个请求方法

`headers` 是即将被发送的自定义请求头
headers:{'X-Requested-With':'XMLHttpRequest'},

`params` 是即将与请求一起发送的URL参数，必须是一个无格式对象(plainobject)或URLSearchParams对象
  params:{
  ID:12345
},

`auth` 表示应该使用HTTP基础验证，并提供凭据
这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization` 头
auth:{
  username:'janedoe',
  password:'s00pers3cret'
},

'proxy'定义代理服务器的主机名称和端口
`auth` 表示HTTP基础验证应当用于连接代理，并提供凭据
这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
proxy:{
  host:'127.0.0.1',
  port:9000,
  auth::{
    username:'mikeymike',
    password:'rapunz3l'
  }
},
```


## 4、如何将axios异步请求同步化处理？
async await
```js
// 统一处理axios请求
async getHistoryData (data) {
  try {
    let res = await axios.get('/api/survey/list/', {
      params: data
    })
    this.tableData = res.data.result
    this.totalData = res.data.count
  } catch (err) {
    console.log(err)
    alert('请求出错！')
  }
}
```


## 5、ajax、fetch、axios这三都有什么区别？


## 6、你了解axios的原理吗？有看过它的源码吗？


## 7、你有封装过axios吗？主要是封装哪方面的？


## 8、如何中断axios的请求？


## 9、axios是什么？怎样使用它？怎么解决跨域的问题？