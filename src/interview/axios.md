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
| 网络请求 | 特点 |
| ------- | ----- |
| Ajax  | 一种技术统称，主要利用XHR实现网络请求 |
| Fetch | 具体API，基于promise，实现网络请求 |
| Axios | 一个封装库，基于XHR封装，较为推荐使用 |

::: tip ajax
它的全称是：`Asynchronous JavaScript And XML`，翻译过来就是“异步的 Javascript 和 XML”。
> Ajax 是一个技术统称，是一个概念模型，它囊括了很多技术，并不特指某一技术，它很重要的特性之一就是让页面实现局部刷新。

Ajax是一种思想，`XMLHttpRequest`只是实现`Ajax`的一种方式。其中`XMLHttpRequest`模块就是实现`Ajax`的一种很好的方式。
:::
::: tip fetch
`Fetch`是在 ES6 出现的，它使用了ES6提出的`promise`对象。它是`XMLHttpRequest`的替代品。
> `Fetch`是一个 API，它是真实存在的，它是基于`promise`的。

我们通常所说的`Ajax`是指使用`XMLHttpRequest`实现的`Ajax`，所以真正应该和`XMLHttpRequest`作比较。
```js
function ajaxFetch(url) {
  fetch(url).then(res => res.json()).then(data => {
    console.info(data)
  })
}
ajaxFetch('https://smallpig.site/api/category/getCategory')
```
:::
::: tip axios
Axios 是随着 Vue 的兴起而被广泛使用的，目前来说，绝大多数的 Vue 项目中的网络请求都是利用 Axios 发起的。当然它并不是一个思想，或者一个原生 API，**它是一个封装库**。
> Axios 是一个基于 promise 封装的网络请求库，它是基于 XHR 进行二次封装。
:::


## 6、你了解axios的原理吗？有看过它的源码吗？


## 7、你有封装过axios吗？主要是封装哪方面的？


## 8、如何中断axios的请求？
- **方式一**: 从 v0.22.0 开始，Axios 支持以`fetch`API 方式—— `AbortController`取消请求。
  ```js
  const controller = new AbortController();
  axios.get('/foo/bar', {
    signal: controller.signal
  }).then(function(response) {
    //...
  });
  // 取消请求
  controller.abort()
  ```
- **方式二**: 我们借助于其提供的`CancelToken`构造函数同样实现了请求中断。
  > 可以使用`CancelToken.source`工厂方法创建一个`cancel token`，如下所示：
  ```js
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  axios.get('/user/12345', {
    cancelToken: source.token
  }).catch(function (thrown) {
    if (axios.isCancel(thrown)) {
      console.log('Request canceled', thrown.message);
    } else {
      // 处理错误
    }
  });

  axios.post('/user/12345', {
    name: 'new name'
  }, {
    cancelToken: source.token
  })

  // 取消请求（message 参数是可选的）
  source.cancel('Operation canceled by the user.');
  ```


## 9、axios是什么？怎样使用它？怎么解决跨域的问题？
`axios`的是一种异步请求，用法和`ajax`类似。

安装: `npm install axios --save`即可使用，请求中包括`get, post, put, patch, delete`等五种请求方式。

解决跨域
- 后端在请求头中添加`Access-Control-Allow-Origin`
- 在`vue.config.js`文件中更改`devServer.proxy`配置等解决跨域问题。