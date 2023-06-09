---
title: HTML面试题汇总
editLink: true
updated: 2020-12-29 16:56:30
lastUpdated: true
comment: true
---
<post-meta/>


# HTML面试题汇总
## 1、🔥src和href的区别
src和href都是HTML中特定元素的属性，都可以用来引入外部的资源，src用于引用资源，替换当前元素；href用于在当前文档和引用资源之间确立联系。两者区别如下：
- src：全称source，它通常用于img、video、audio、script元素，通过src指向请求外部资源的来源地址，指向的内容会嵌入到文档中当前标签所在位置，在请求src资源时，它会将资源下载并应用到文档内，比如说：js脚本、img图片、frame等元素。当浏览器解析到该元素时，会暂停其它资源下载，直到将该资源加载、编译、执行完毕。这也是为什么将js脚本放在底部而不是头部的原因。
- href：全称hyper reference，意味着超链接，指向网络资源，当浏览器识别到它指向的⽂件时，就会并⾏下载资源，不会停⽌对当前⽂档的处理，通常用于a、link元素。

## 2、🔥对HTML语义化的理解
语义化的优点如下：
- **用正确的标签做正确的事情**；
- html 语义化让页面的**内容结构化**，结构更清晰，便于对浏览器、搜索引擎解析；即使在没有样式 CSS 情况下也以一种文档格式显示，并且是容易阅读的；
- 搜索引擎的爬虫也依赖于 HTML 标记来确定上下文和各个关键字的权重，**利于SEO**；
- 使阅读源代码的人对网站更容易将网站分块，**便于阅读维护理解**；

常见的语义化标签：
```html
<header></header> 头部：定义文档的页眉，通常是一些引导和导航信息
<nav></nav> 导航栏链接：定义导航链接，在页眉页脚等显示一个站点的导航链接、友情链接等。
<section></section> 区块(有语义化的div)：定义文档的某个区域，例如章节、头部、底部或者文档的其他区域。
<main></main> 主要区域：定义文档的主体部分，其内容在文档中是唯一的。它不应包含在文档中重复出现的内容，比如侧栏、导航栏、版权信息、站点标志或搜索表单。
<article></article> 主要内容：定义独立的内容，定义的内容本身必须是有意义的且必须是独立于文档的其余部分，例如论坛帖子、博客文章、新闻股市、评论等。
<aside></aside> 侧边栏：定义文章的侧边栏，例如广告、承租的内容、友情链接等。
<footer></footer> 底部：文档或节的页脚，通用用于定义版权等信息。
<figure></figure> 独立的流内容，例如图像、图表、照片和代码等。
<figcaption></figcaption>  figure元素的标题，通常放置在figure的第一个或最后一个子元素的位置，包含在figure标签内。
```
以上除了`figcaption`外，其余的都是块级元素。注意在一个文档中，`<main>`元素是唯一的，所以不能出现一个以上的`<main>`元素。`<main>`元素不能是以下元素的后代：`<article>`、`<aside>`、`<footer>`、`<header>`或`<nav>`。


## 3、🔥DOCTYPE(⽂档类型)的作⽤
文档声明是为了告诉浏览器，当前`HTML`文档使用什么版本的`HTML`来写的，这样浏览器才能按照声明的版本来正确的解析。

`<!DOCTYPE html>`的作用： `<!DOCTYPE html>`的作用就是让浏览器进入标准模式，使用最新的`HTML5`标准来解析渲染页面；如果不写，浏览器就会进入混杂模式，我们需要避免此类情况发生。

`<!DOCTYPE>`声明位于位于 HTML 文档中的第一行，处于`<html>`标签之前。


## 4、script标签中defer和async的区别
如果没有`defer`或`async`属性，浏览器会立即加载并执行相应的脚本。它不会等待后续加载的文档元素，读取到就会开始加载和执行，这样就阻塞了后续文档的加载。
下图可以直观的看出三者之间的区别:
![202302071528472.png](http://img.itchenliang.club/img/202302071528472.png)
其中蓝色代表js脚本网络加载时间，红色代表js脚本执行时间，绿色代表html解析。
**defer 和 async属性都是去异步加载外部的JS脚本文件，它们都不会阻塞页面的解析**，其区别如下：
- **执行顺序**：多个带async属性的标签，不能保证加载的顺序；多个带defer属性的标签，按照加载顺序执行；
- **脚本是否并行执行**：async属性，表示**后续文档的加载和执行与js脚本的加载和执行是并行进行的**，即异步执行；defer属性，加载后续文档的过程和js脚本的加载(此时仅加载不执行)是并行进行的(异步)，js脚本需要等到文档所有元素解析完成之后才执行，DOMContentLoaded事件触发执行之前。

## 5、⭐常用的meta标签有哪些
`meta`标签由`name`和`content`属性定义，**用来描述网页文档的属性**，比如网页的作业，网页的描述，关键词等，除了HTTP标注固定了一些`name`作为大家使用的共识，开发者还可以自定义name。
常见的meta标签：
### charset
用来描述HTML文档的编码类型
```html
<meta charset="UTF-8">
```

### keywords
用来描述HTML文档的关键词
```html
<meta name="keywords" content="关键词">
```

### description
用来描述HTML文档的描述说明
```html
<meta name="description" content="页面描述内容">
```

### refresh
用来描述HTML文档重定向和刷新
```html
<meta http-equiv="refresh" content="0;url=">
```
例如：
```html
<!-- 5秒后自动跳转到page2.html -->
<meta http-equiv="Refresh" content="5; URL=page2.html">

<!-- 30秒后自动刷新当前页面 -->
<meta http-equiv="Refresh" content="30">
```

### viewport
用来描述HTML文档适配移动端，可以控制视图的大小和比例
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
其中，`content`参数有以下几种：
- `width viewport`: 宽度(数值/device-width)
- `height viewport`: 高度(数值/device-height)
- `initial-scale`: 初始缩放比例
- `maximum-scale`: 最大缩放比例
- `minumum-scale`: 最小缩放比例
- `user-scalable`: 是否允许用户缩放(yes/no)

### robots
搜索引擎索引方式
```html
<meta name="robots" content="index,follow">
```
其中，`content`参数有以下几种：
- `all`: 文件将被检索，且页面上的链接可以被查询
- `none`: 文件将不被检索，且页面上的链接不可以被查询
- `index`: 文件将被检索
- `follow`: 页面上的链接可以被查询
- `noindex`: 文件将不被检索
- `nofollow`: 页面上的链接不可以被查询

### 其他
```html
<meta> 元素可提供有关页面的元信息（meta-information），比如针对搜索引擎和更新频度的描述和关键词。
<meta> 标签位于文档的头部，不包含任何内容。<meta> 标签的属性定义了与文档相关联的名称/值对。

<!DOCTYPE html>  H5标准声明，使用 HTML5 doctype，不区分大小写
<head lang="en"> 标准的 lang 属性写法
<meta charset="utf-8">    声明文档使用的字符编码
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>   优先使用 IE 最新版本和 Chrome
<meta name="description" content="不超过150个字符"/>       页面描述
<meta name="keywords" content=""/>      页面关键词者
<meta name="author" content="name, email@gmail.com"/>    网页作
<meta name="robots" content="index,follow"/>      搜索引擎抓取
<meta name="viewport" content="initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no"> 为移动设备添加 viewport
<meta name="apple-mobile-web-app-title" content="标题"> iOS 设备 begin
<meta name="apple-mobile-web-app-capable" content="yes"/>  添加到主屏后的标题（iOS 6 新增）
是否启用 WebApp 全屏模式，删除苹果默认的工具栏和菜单栏
<meta name="apple-itunes-app" content="app-id=myAppStoreID, affiliate-data=myAffiliateData, app-argument=myURL">
添加智能 App 广告条 Smart App Banner（iOS 6+ Safari）
<meta name="apple-mobile-web-app-status-bar-style" content="black"/>
<meta name="format-detection" content="telphone=no, email=no"/>  设置苹果工具栏颜色
<meta name="renderer" content="webkit">  启用360浏览器的极速模式(webkit)
<meta http-equiv="X-UA-Compatible" content="IE=edge">     避免IE使用兼容模式
<meta http-equiv="Cache-Control" content="no-siteapp" />    不让百度转码
<meta name="HandheldFriendly" content="true">     针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓
<meta name="MobileOptimized" content="320">   微软的老式浏览器
<meta name="screen-orientation" content="portrait">   uc强制竖屏
<meta name="x5-orientation" content="portrait">    QQ强制竖屏
<meta name="full-screen" content="yes">              UC强制全屏
<meta name="x5-fullscreen" content="true">       QQ强制全屏
<meta name="browsermode" content="application">   UC应用模式
<meta name="x5-page-mode" content="app">    QQ应用模式
<meta name="msapplication-tap-highlight" content="no">    windows phone 点击无高光
设置页面不缓存
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
```

## 6、🔥HTML5有哪些更新
### 语义化标签
- header: 定义文档的页眉（头部）；
- nav: 定义导航链接的部分；
- footer: 定义文档或节的页脚（底部）；
- article: 定义文章内容；
- section: 定义文档中的节（区段）；
- aside: 定义其所处内容之外的内容（侧边）；

### 媒体标签
- audio：音频
  ```html
  <audio src="" controls autoplay loop></audio>
  ```
  属性：
    - controls: 控制面板
    - autoplay: 自动播放
    - loop: 循环播放

- video：视频
  ```html
  <video src="" poster="imgs/aa.jpg" controls></video>
  ```
  属性：
  - poster: 指定视频还没有完全下载完毕，或者用户还没有点击播放前显示的封面。默认显示当前视频文件的第一针画面，当然通过poster也可以自己指定。
  - controls: 控制面板
  - width: 宽度
  - height: 高度

- source：视频源
  因为浏览器对视频格式支持程度不一样，为了能够兼容不同的浏览器，可以通过source来指定视频源。
  ```html
  <video>
    <source src="aa.flv" type="video/flv"></source>
    <source src="aa.mp4" type="video/mp4"></source>
  </video>
  ```

### 表单
- 表单类型
  - email: 能够验证当前输入的邮箱地址是否合法
  - url: 验证URL
  - number: 只能输入数字，其他输入不了，而且自带上下增大减小箭头，max属性可以设置为最大值，min可以设置为最小值，value为默认值。
  - search: 输入框后面会给提供一个小叉，可以删除输入的内容，更加人性化。
  - range: 可以提供给一个范围，其中可以设置max和min以及value，其中value属性可以设置为默认值
  - color: 提供了一个颜色拾取器
  - time: 时分秒
  - date: 日期选择，年月日
  - datetime: 时间和日期(目前只有Safari支持)
  - datetime-local: 日期时间控件
  - week: 周控件
  - month: 月控件
- 表单属性
  - placeholder: 提示信息
  - autofocus: 自动获取焦点
  - autocomplete: 自动完成，可选值“on”或“off”，使用该属性需要有两个前提：
    - 表单必须提交过
    - 必须有name属性
  - required: 要求输入框不能为空，必填项
  - pattern: 校验的正则表达式，例如手机号pattern="^(+86)?\d{10}$"
  - multiple: 是否支持多选操作
  - form: form表单的id
- 表单事件
  - oninput: 每当input框的内容发生变化都会触发此事件
  - oninvalid: 当校验不通过时触发此事件

### 进度条、度量器
- progress标签: 用来表示任务的进度（IE、Safari不支持），max用来表示任务的进度，value表示已完成多少
- meter属性: 用来显示剩余容量或剩余库存（IE、Safari不支持）
  - high/low: 规定被视作高/低的范围
  - max/min: 规定最大/小值
  - value: 规定当前度量值
设定规则: min < low < high < max

### DOM查询操作
- document.querySelector()
- document.querySelectorAll()
它们选择的对象可以是标签，可以是类(需要加`.`)，可以是ID(需要加`#`)

### Web存储
HTML5 提供了两种在客户端存储数据的新方法：
- localStorage: 没有时间限制的数据存储
- sessionStorage: 针对一个 session 的数据存储

### 其他
- 拖放：拖放是一种常见的特性，即抓取对象以后拖到另一个位置。设置元素可拖放：
  ```html
  <img draggable src="" />
  ```
- 画布（canvas ）： canvas 元素使用 JavaScript 在网页上绘制图像。画布是一个矩形区域，可以控制其每一像素。canvas 拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法。
  ```html
  <canvas id="myCanvas" width="200" height="100"></canvas>
  ```
- SVG：SVG 指可伸缩矢量图形，用于定义用于网络的基于矢量的图形，使用 XML 格式定义图形，图像在放大或改变尺寸的情况下其图形质量不会有损失，它是万维网联盟的标准
- 地理定位：Geolocation（地理定位）用于定位用户的位置。

### 移除的元素
- 纯表现的元素：basefont、big、center、font、s、strike、tt、u
- 对可用性产生负面影响的元素：frame、frameset、noframes

## 7、🔥img上title、 alt与srcset属性的作用
- alt：全称alternate，切换的意思，如果无法显示图像，浏览器将显示alt指定的内容
- title：当鼠标移动到元素上时显示title的内容

区别：
一般当鼠标滑动到元素身上的时候显示title，而alt是img标签特有的属性，是图片内容的等价描述，用于图片无法加载时显示，这样用户还能看到关于丢失了什么东西的一些信息，相对来说比较友好。

- srcset：响应式页面中经常用到根据屏幕密度设置不同的图片。这时就用到了 img 标签的srcset属性。srcset属性用于设置不同屏幕密度下，img 会自动加载不同的图片。用法如下：
```html
<img src="image-128.png" srcset="image-256.png 2x"/>
```
使用上面的代码，就能实现在屏幕密度为1x的情况下加载image-128.png, 屏幕密度为2x时加载image-256.png。
按照上面的实现，不同的屏幕密度都要设置图片地址，目前的屏幕密度有1x,2x,3x,4x四种，如果每一个图片都设置4张图片，加载就会很慢。所以就有了新的srcset标准。代码如下：
```html
<img src="image-128.png"
     srcset="image-128.png 128w, image-256.png 256w, image-512.png 512w"
     sizes="(max-width: 360px) 340px, 128px"/>
```
其中srcset指定图片的地址和对应的图片质量。sizes用来设置图片的尺寸零界点。对于 srcset 中的 w 单位，可以理解成图片质量。如果可视区域小于这个质量的值，就可以使用。浏览器会自动选择一个最小的可用图片。
sizes语法如下：
```html
sizes="[media query] [length], [media query] [length], ..."
```
sizes就是指默认显示128px，如果宽度大于360px，则显示340px。

**还有哪一个标签能起到跟srcset相似作用？**

`<picture>`元素通过包含零或多个`<source>`元素和一个`<img>`元素来为不同的显示/设备场景提供图像版本。浏览器会选择最匹配的子 `<source>`元素，如果没有匹配的，就选择`<img>`元素的 src 属性中的URL。然后，所选图像呈现在`<img>`元素占据的空间中
> picture同样可以通过不同设备来匹配不同的图像资源

```html
<picture>
  <source srcset="/media/examples/surfer-240-200.jpg" media="(min-width: 800px)">
  <img src="/media/examples/painted-hand-298-332.jpg" />
</picture>
```


## 8、🔥行内元素有哪些？块级元素有哪些？空(void)元素有哪些？有何区别？怎样转换？
- 行内元素：`a b span img input select strong label cite code`
- 块级元素：`div ul ol li dl dt dd h1 h2 h3 h4 h5 h6 p table form pre`
- 空元素：常见的有`br hr img input link meta`，鲜为人知的`area base col colgroup command embed keygen param source track wbr`

**区别**：
- 块级元素：
  - 总是在新行上开始，就是每个块级元素独占一行，默认从上到下排列
  - 宽度缺少时是它的容器的100%，除非设置一个宽度
  - 高度、行高以及外边距和内边距都是可以设置的
  - 块级元素可以容纳其它行级元素和块级元素
- 空元素：
  - 即没有内容的HTML元素
  - 空元素是在开始标签中关闭的，也就是空元素没有闭合标签
- 行内元素：
  - 和其它元素都会在一行显示
  - 高、行高以及外边距和内边距可以设置
  - 宽度就是文字或者图片的宽度，不能改变
  - 行级元素只能容纳文本或者其它行内元素

使用行内元素需要注意的是：
- 行内元素设置宽度width无效
- 行内元素设置height无效，但是可以通过line-height来设置
- 设置margin只有左右有效，上下无效
- 设置padding只有左右有效，上下无效

**转换**：
- 可以通过`display`属性对行内元素和块级元素进行切换(主要看第 2、3、4三个值)：
![202302081532078.png](http://img.itchenliang.club/img/202302081532078.png)

## 9、⭐对web worker的理解
在 HTML 页面中，如果在执行脚本时，页面的状态是不可相应的，直到脚本执行完成后，页面才变成可相应。**web worker是运行在后台的js，独立于其他脚本，不会影响页面的性能。并且通过`postMessage`将结果回传到主线程。这样在进行复杂操作的时候，就不会阻塞主线程了。** 
如何创建web worker：
1. 检测浏览器对于 web worker 的支持性 
2. 创建 web worker 文件（js，回传函数等） 
3. 创建 web worker 对象

## 10、HTML5的离线存储怎么使用，它的工作原理是什么？
离线存储指的是：在用户没有与因特网连接时，可以正常访问站点或应用，在用户与因特网连接时，更新用户机器上的缓存文件。

**原理**：HTML5的离线存储是基于一个新建的`.appcache`文件的缓存机制(不是存储技术)，通过这个文件上的解析清单离线存储资源，这些资源就会像cookie一样被存储了下来。之后当网络在处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示。

使用方法：
- （1）创建一个和 html 同名的 manifest 文件，然后在页面头部加入 manifest 属性：
  ```html
  <html lang="en" manifest="index.manifest">
  ```
- （2）在`cache.manifest`文件中编写需要离线存储的资源：
  ```
  CACHE MANIFEST
    #v0.11
    CACHE:
    js/app.js
    css/style.css
    NETWORK:
    resource/logo.png
    FALLBACK:
    / /offline.html
  ```
  - **CACHE**: 表示需要离线存储的资源列表，由于包含 manifest 文件的页面将被自动离线存储，所以不需要把页面自身也列出来。
  - **NETWORK**: 表示在它下面列出来的资源只有在在线的情况下才能访问，他们不会被离线存储，所以在离线情况下无法使用这些资源。不过，如果在 CACHE 和 NETWORK 中有一个相同的资源，那么这个资源还是会被离线存储，也就是说 CACHE 的优先级更高。
  - **FALLBACK**: 表示如果访问第一个资源失败，那么就使用第二个资源来替换他，比如上面这个文件表示的就是如果访问根目录下任何一个资源失败了，那么就去访问 offline.html 。
- （3）在离线状态时，操作`window.applicationCache`进行离线缓存的操作。

**如何更新缓存**
- （1）更新 manifest 文件
- （2）通过 javascript 操作
- （3）清除浏览器缓存

**注意事项**
- （1）浏览器对缓存数据的容量限制可能不太一样（某些浏览器设置的限制是每个站点 5MB）。
- （2）如果 manifest 文件，或者内部列举的某一个文件不能正常下载，整个更新过程都将失败，浏览器继续全部使用老的缓存。
- （3）引用 manifest 的 html 必须与 manifest 文件同源，在同一个域下。
- （4）FALLBACK 中的资源必须和 manifest 文件同源。
- （5）当一个资源被缓存后，该浏览器直接请求这个绝对路径也会访问缓存中的资源。
- （6）站点中的其他页面即使没有设置 manifest 属性，请求的资源如果在缓存中也从缓存中访问。
- （7）当 manifest 文件发生改变时，资源请求本身也会触发更新。

## 11、浏览器是如何对 HTML5 的离线储存资源进行管理和加载？
- **在线的情况下**，浏览器发现 html 头部有 manifest 属性，它会请求 manifest 文件，如果是第一次访问页面 ，那么浏览器就会根据 manifest 文件的内容下载相应的资源并且进行离线存储。如果已经访问过页面并且资源已经进行离线存储了，那么浏览器就会使用离线的资源加载页面，然后浏览器会对比新的 manifest 文件与旧的 manifest 文件，如果文件没有发生改变，就不做任何操作，如果文件改变了，就会重新下载文件中的资源并进行离线存储。
- **离线的情况下**，浏览器会直接使用离线存储的资源。

## 12、⭐title与h1的区别、b与strong的区别、i与em的区别？
- title 属性表示网页的标题，h1 元素则表示层次明确的页面内容标题，对页面信息的抓取也有很大的影响
- strong 是标明重点内容，有语气加强的含义，使用阅读设备阅读网络时：strong会重读，而b是展示强调内容
- i 是italic(斜体)的简写，是早期的斜体元素，表示内容展示为斜体，而 em 是emphasize（强调）的简写，表示强调的文本

## 13、⭐iframe的作用以及优缺点
iframe也称作嵌入式框架，嵌入式框架和框架网页类似，它可以把一个网页的框架和内容嵌入到现有的网页中。

**优点**
- iframe 能够原封不动的把嵌入的网页展现出来，比如：广告
- 可以使脚本并行下载
- 可以实现跨子域通信
- 如果有多个网页引用 iframe，那么你只需要修改 iframe 的内容，就可以实现调用的每一个页面内容的更改，方便快捷；
- 网页如果为了统一风格，头部和版本都是一样的，就可以写成一个页面，用 iframe 来嵌套，可以增加代码的可重用；

**缺点**
- iframe会阻塞主页面的Onload事件
- 会产生很多页面，不易管理
- 浏览器的后退按钮没有作用
- 无法被一些搜索引擎识别
- iframe 和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载

## 14、⭐label的作用是什么？如何使用？
label 标签来定义表单控制间的关系, **当用户选择该标签时，浏览器会自动将焦点转到和标签相关的表单控件上**。
- 使用方法1：一种是 id 绑定
  ```html
  <label for="mobile">Number:</label>
  <input type="text" id="mobile" />
  ```
- 使用方法2：一种是嵌套
  ```html
  <label>Date:<input type="text" /></label>
  ```

## 15、⭐Canvas 和 SVG 的区别
（1）SVG：
SVG 可缩放矢量图形（Scalable Vector Graphics）是基于可扩展标记语言 XML 描述的 2D 图形的语言，SVG 基于XML 就意味着SVGDOM中的每个元素都是可用的，可以为某个元素附加Javascript 事件处理器。在 SVG 中，每个被绘制的图形均被视为对象。如果SVG对象的属性发生变化，那么浏览器能够自动重现图形。
其特点如下：
- 不依赖分辨率
- 支持事件处理器
- 最适合带有大型渲染区域的应用程序（比如谷歌地图）
- 复杂度高会减慢渲染速度（任何过度使用DOM 的应用都不快）
- 不适合游戏应用

（2）Canvas：
Canvas 是画布，通过 Javascript 来绘制2D 图形，是逐像素进行渲染的。其位置发生改变，就会重新进行绘制。
其特点如下：
- 依赖分辨率
- 不支持事件处理器
- 弱的文本渲染能力
- 能够以 .png 或 .jpg 格式保存结果图像
- 最适合图像密集型的游戏，其中的许多对象会被频繁重绘

注：矢量图，也称为面向对象的图像或绘图图像，在数学上定义为一系列由线连接的点。矢量文件中的图形元素称为对象。每个对象都是一个自成一体的实体，它具有颜色、形状、轮廓、大小和屏幕位置等属性。

## 16、⭐head 标签有什么作用，其中什么标签必不可少？
`<head>`标签用于定义文档的头部，它是所有头部元素的容器。`<head>`中的元素可以引用脚本、指示浏览器在哪里找到样式表、提供元信息等。
文档的头部描述了文档的各种属性和信息，包括文档的标题、在 Web 中的位置以及和其他文档的关系等。绝大多数文档头部包含的数据都不会真正作为内容显示给读者。
下面这些标签可用在 head 部分：`<base>`, `<link>`, `<meta>`, `<script>`, `<style>`, `<title>`。 
其中`<title>`定义文档的标题，它是 head 部分中唯一必需的元素。

## 17、⭐严格模式与混杂模式如何区分？它们有何意义?
**严格模式与混杂模式的区分**：
- **严格模式**：又称为标准模式，指浏览器按照`W3C`标准解析代码，以浏览器支持的最高标准运行；
- **混杂模式**：又称怪异模式、兼容模式，是指浏览器用自己的方式解析代码。混杂模式页面以宽松向下兼容的方式显示，模拟老式浏览器的行为；

> IE8还有一种介乎于上述两者之间的近乎标准的模式，但是基本淘汰了。
### 这三种模式的区别是什么？
- 标准模式(standards mode)：页面按照 HTML 与 CSS 的定义渲染
- 怪异模式(quirks mode)模式： 会模拟更旧的浏览器的行为
- 近乎标准(almost standards)模式： 会实施了一种表单元格尺寸的怪异行为（与IE7之前的单元格布局方式一致），除此之外符合标准定义

**区分**：网页中的`DTD`(Document Type Defination即文档类型定义)，直接影响到使用的是严格模式还是浏览模式，可以说`DTD`的使用与这两种方式的区别息息相关。
- 如果文档包含严格的`DOCTYPE` ，那么它一般以严格模式呈现（**严格 DTD ——严格模式**）；
- 包含过渡`DTD`和`URI`的`DOCTYPE`，也以严格模式呈现，但有过渡`DTD`而没有`URI`（统一资源标识符，就是声明最后的地址）会导致页面已混杂模式呈现（**有URI的过渡DTD——严格模式；没有URI的过渡DTD——混杂模式**）；
- `DOCTYPE`不存在或形式不正确会导致文档以混杂模式呈现(**DTD不存在或者格式不正确——混杂模式**)；
- `HTML5`没有`DTD`，因此也就没有严格模式与混杂模式的区别，`HTML5`有相对宽松的法，实现时已经尽可能大的实现了向后兼容（**HTML5没有严格和混杂之分**）；

总之，**严格模式让各个浏览器统一执行一套规范兼容模式保证了旧网站的正常运行。**

## 18、浏览器乱码的原因是什么？如何解决？
**产生乱码的原因**：
- 网页源代码是`gbk`的编码，而内容中的中文字是`utf-8`编码，这样浏览器打开即会出现`html`乱码，反之也会出现乱码；
- `html`网页编码是`gbk`，而程序从数据库中调出呈现是`utf-8`编码的内容也会造成编码乱码；
- 浏览器不能自动检测网页编码，造成网页编码；

**解决办法**：
- 使用软件编辑HTML网页内容
- 如果网页设置编码是`gbk`，而数据库存储数据编码格式是`utf-8`，此时需要程序查询数据显示数据前进行程序转码
- 如果浏览器浏览时候出现网页乱码，在浏览器中找到转换编码的菜单进行转换

## 19、渐进增强和优雅降级之间的区别
- （1）渐进增强（progressive enhancement）
  主要是针对低版本的浏览器进行页面重构，保证基本的功能情况下，再针对高级浏览器进行效果、交互等方面的改进和追加功能，以达到更好的用户体验（**一开始保证最基本的功能，再改进和追加功能**）。
- （2）优雅降级 graceful degradation
  一开始就构建完整的功能，然后再针对低版本的浏览器进行兼容（**一开始保证最基本的功能，再改进和追加功能**）。

**两者区别**
- 优雅降级是从复杂的现状开始的，并试图减少用户体验的供给；而渐进增强是从一个非常基础的，能够起作用的版本开始的，并在此基础上不断扩充，以适应未来环境的需要；
- 降级（功能衰竭）意味着往回看，而渐进增强则意味着往前看，同时保证其根基处于安全地带。


## 20、说一下 HTML5 drag API 
- dragstart：事件主体是被拖放元素，在开始拖放被拖放元素时触发。
- darg：事件主体是被拖放元素，在正在拖放被拖放元素时触发。
- dragenter：事件主体是目标元素，在被拖放元素进入某元素时触发。
- dragover：事件主体是目标元素，在被拖放在某元素内移动时触发。
- dragleave：事件主体是目标元素，在被拖放元素移出目标元素是触发。
- drop：事件主体是目标元素，在目标元素完全接受被拖放元素时触发。
- dragend：事件主体是被拖放元素，在整个拖放操作结束时触发。
```html
<style>
  .container {
    width: 200px;
    height: 200px;
    background: #ccc;
    position: relative;
  }
  .box {
    width: 50px;
    height: 50px;
    background: blue;
    color: black;
  }
</style>
<body>
  <div class="container"></div>
  <div class="box" draggable="true" id="image">image</div>
  <script>
    const container = document.querySelector('.container')
    const box = document.querySelector('.box')
    // 在拖动目标上触发事件: dragstart、drag、dragend
    // 释放目标时触发的事件: dragenter、dragover、dragleave、drop

    // 用户开始拖动元素时触发
    box.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('Text', JSON.stringify({
        id: event.target.id,
        data: {
          style: {
            color: 'black',
            width: '50px',
            height: '50px',
            background: 'blue'
          }
        }
      }))
      event.target.style.background = 'red'
      console.log('dragstart')
    })
    // 正在拖动时触发
    box.addEventListener('drag', (event) => {
      event.target.style.color = 'white'
      console.log('drag')
    })
    // 完成元素拖动后触发
    box.addEventListener('dragend', (event) => {
      console.log('dragend')
    })
    // 当被鼠标拖动的对象进入其容器范围内时触发此事件
    container.addEventListener('dragenter', (event) => {
      event.target.style.border = '2px dashed yellow'
      console.log('dragenter')
    })
    // 当某被拖动的对象在另一对象容器范围内拖动时触发此事件
    container.addEventListener('dragover', (event) => {
      // 默认情况下，元素不能在其他元素中被拖放，对于drop必须组织元素的默认行为
      event.preventDefault()
      console.log('dragover')
    })
    // 当被鼠标拖动的对象离开其容器范围内时触发此事件
    container.addEventListener('dragleave', (event) => {
      event.target.style.border = 'none'
      console.log('dragleave')
    })
    // 在一个拖动过程中，释放鼠标键时触发此事件
    container.addEventListener('drop', (event) => {
      // 对于drop事件，我们需要阻止默认行为
      event.preventDefault()
      // 复位样式
      box.style.background = 'blue'
      box.style.color = 'black'
      event.target.style.border = 'none'
      // 利用 dataTransfer.getData() 方法获得拖放数据
      const { id, data: { style } } = JSON.parse(event.dataTransfer.getData('Text'))
      const el = document.getElementById(id)
      // 保障原有数据不被删除，否则可以直接将 el 直接appendChild到event.target中即可
      const res = document.createElement('div')
      res.innerHTML = el.innerHTML
      for (let key in style) {
        res.style[key] = style[key]
      }
      event.target.appendChild(res)
      res.style.position = 'absolute'
      // 以box中心点为标准，故需要减去宽度，否则会跳位
      res.style.left = event.pageX - 25 + 'px'
      //  以box中心点为标准，故需要减去宽度，否则会跳位
      res.style.top = event.pageY - 25 + 'px'
      console.log('drop')
    })
  </script>
</body>
```
效果如下所示: 
![202303211016135.gif](http://img.itchenliang.club/img/202303211016135.gif)


## 21、🔥新的 HTML5 文档类型和字符集是？
HTML5 文档类型很简单：
```html
<!DOCTYPE html>
```
HTML5 使用 UTF-8 编码示例：
```html
<meta charset=”UTF-8″>
```
为什么HTML5只需要写一段，而HTML4却需要写很长的一段
```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
```
其实主要是因为HTML5不基于SGML，所以不需要引用DTD。在HTML4中，<!DOCTYPE>声明引用DTD，因为HTML4基于SGML。DTD规定了标记语言的规则，这样浏览器才能正确的呈现内容。

## 22、🔥HTML5 中如何嵌入音频？
HTML5 支持 MP3、Wav 和 Ogg 格式的音频，下面是在网页中嵌入音频的简单示例：
```html
<audio controls>
  <source src=”jamshed.mp3″ type=”audio/mpeg”>
  Your browser does’nt support audio embedding feature.
</audio>
```

## 23、🔥HTML5 中如何嵌入视频？
和音频类似，HTML5 支持 MP4、WebM 和 Ogg 格式的视频，下面是简单示例：
```html
<video width=”450″ height=”340″ controls>
  <source src=”jamshed.mp4″ type=”video/mp4″>
  Your browser does’nt support video embedding feature.
</video>
```

## 24、🔥除了 audio 和 video，HTML5 还有哪些媒体标签？
HTML5 对于多媒体提供了强有力的支持，除了 audio 和 video 标签外，还支持以下标签：
- `<embed>`
  标签定义嵌入的内容，比如插件。
  ```html
  <embed type=”video/quicktime” src=”Fishing.mov”>
  ```
- `<source>`
  对于定义多个数据源很有用
  ```html
  <video width=”450″ height=”340″ controls>
     <source src=”jamshed.mp4″ type=”video/mp4″>
     <source src=”jamshed.ogg” type=”video/ogg”>
  </video>
  ```
- `<track>`
  `<track>`标签为诸如video元素之类的媒介规定外部文本轨道。用于规定字幕文件或其他包含文本的文件，当媒介播放时，这些文件是可见的。
  ```html
  <video width=”450″ height=”340″ controls>
     <source src=”jamshed.mp4″ type=”video/mp4″>
     <source src=”jamshed.ogg” type=”video/ogg”>
     <track kind=”subtitles” label=”English” src=”jamshed_en.vtt” srclang=”en”default></track>
      <track kind=”subtitles” label=”Arabic” src=”jamshed_ar.vtt” srclang=”ar”></track>
  </video>
  ```

## 25、🔥HTML5 Canvas 元素有什么用？
Canvas 元素用于在网页上绘制图形，该元素标签强大之处在于可以直接在 HTML 上进行图形操作，
```html
<canvas id=”canvas1″ width=”300″ height=”100″></canvas>
```

## 26、🔥HTML5 存储类型有什么区别？
HTML5 能够本地存储数据，在之前都是使用 cookies 使用的。HTML5 提供了下面两种本地存储方案：
- **localStorage**用于持久化的本地存储，数据永远不会过期，关闭浏览器也不会丢失;
- **sessionStorage**同一个会话中的页面才能访问并且当会话结束后数据也随之销毁。因此sessionStorage不是一种持久化的本地存储，仅仅是会话级别的存储;

## 27、HTML5 标准提供了哪些新的 API？
HTML5 提供的应用程序 API 主要有：
- Media API
- Text Track API
- Application Cache API
- User Interaction
- Data Transfer API
- Command API
- Constraint Validation API
- History API

## 28、HTML5 应用程序缓存和浏览器缓存有什么区别？
应用程序缓存是 HTML5 的重要特性之一，提供了离线使用的功能，让应用程序可以获取本地的网站内容，例如 HTML、CSS、图片以及 JavaScript。这个特性可以提高网站性能，它的实现借助于 manifest 文件，如下：
```html
<!doctype html>
<html manifest=”example.appcache”>
...
</html>
```
**应用程序缓存优势**：
- 离线浏览：用户可在应用离线时使用它们
- 速度更快：上面的特性加速了网站的性能，因为已缓存资源加载得更快。
- 减少服务器负载：浏览器将只从服务器下载更新过或更改过的资源。

与传统的浏览器缓存比较，该特性并不强制要求用户访问网站。需要注意的是：HTML5 应用缓存已废弃，取而代之是service-worker的标准

## 29、什么是严格模式与混杂模式？
- 严格模式：是以浏览器支持的最高标准运行
- 混杂模式：页面以宽松向下兼容的方式显示，模拟老式浏览器的行为

## 30、🔥前端页面有哪三层构成，分别是什么？
构成：`结构层`、`表示层`、`行为层`
1. 结构层（structural layer）
  结构层类似于盖房子需要打地基以及房子的悬梁框架，它是由HTML超文本标记语言来创建的，也就是页面中的各种标签，在结构层中保存了用户可以看到的所有内容，比如说：一段文字、一张图片、一段视频等等
2. 表示层（presentation layer）
  表示层是由CSS负责创建，它的作用是如何显示有关内容，学名：`层叠样式表`，也就相当于装修房子，看你要什么风格的，田园的、中式的、地中海的，总之CSS都能办妥
3. 行为层（behaviorlayer）
  行为层表示网页内容跟用户之间产生交互性，简单来说就是用户操作了网页，网页给用户一个反馈，这是`JavaScript`和`DOM`主宰的领域


## 31、🔥H5和HTML5区别
- H5是一个产品名词，包含了最新的HTML5、CSS3、ES6等新技术来制作的应用
- HTML5是一个技术名词，指的就是第五代HTML

## 32、🔥对于Web标准以及W3C的理解
`Web标准`简单来说可以分为结构、表现、行为。其中结构是由HTML各种标签组成，简单来说就是body里面写入标签是为了页面的结构。表现指的是CSS层叠样式表，通过CSS可以让我们的页面结构标签更具美感。行为指的是页面和用户具有一定的交互，这部分主要由JS组成

`W3C`，全称：world wide web consortium是一个制定各种标准的非盈利性组织，也叫万维网联盟，标准包括HTML、CSS、ECMAScript等等，web标准的制定有很多好处，比如说：
- 可以统一开发流程，统一使用标准化开发工具（VSCode、WebStorm、Sublime），方便多人协作
- 学习成本降低，只需要学习标准就行，否则就要学习各个浏览器厂商标准
- 跨平台，方便迁移都不同设备
- 降低代码维护成本


## 33、Quirks（怪癖）模式是什么？它和Standards（标准）模式有什么区别？
以 ie6 为例，如果写了 DTD，就意味着这个页面将采用对 CSS 支持更好的布局，而如果没有，则采用兼容之前的布局方式。这就是 Quirks 模式（怪癖模式，诡异模式，怪异模式）。

区别：总体会有布局、样式解析、脚本执行三个方面区别，这里列举一些比较常见的区别：
- `盒模型`：在W3C标准中，如果设置一个元素的宽度和高度，指的是元素内容的宽度和高度，然而在Quirks模式下，IE的宽度和高度还包含了padding和border
- `设置行内元素的高宽`：在Standards模式下，给行内元素设置width和height都不会生效，而在Quriks模式下会生效
- `用margin：0 auto设置水平居中`：在Standards模式下，设置margin：0 auto；可以使元素水平居中，但是在Quriks模式下失效
- `设置百分比高度`：在Standards模式下，元素的高度是由包含的内容决定的，如果父元素没有设置百分比的高度，子元素设置百分比的高度是无效的

## 34、知道什么是微格式吗？谈谈理解，在前端构建中应该考虑微格式吗？
微格式（Microformats）是一种基于 HTML 的数据标准化格式，旨在使 Web 内容更易于理解、处理和重复使用。它使用简单的 HTML 类和属性来表示各种类型的信息，例如人物姓名、地址、评论等。

在前端构建中考虑微格式可以带来多个好处。首先，它可以提高页面的语义化，使搜索引擎和其他应用程序更轻松地读取和处理页面内容。其次，它可以使页面内容更易于管理和维护，因为相关信息被结构化并以一致的方式呈现。最后，它有助于促进 Web 上的数据交换和集成。


## 35、🔥怎么处理HTML5新标签兼容问题？
主要有两种方式：
1. 实现标签被识别：通过`document.createElement(tagName)`方法可以让浏览器识别新的标签，浏览器支持新标签后。还可以为新标签添加CSS样式
2. 用JavaScript解决：使用HTML5的shim框架，在`head`标签中调用以下代码：
  ```html
  <!--[if lt IE 9]>
    <script> src="http://html5shim.googlecode.com/svn/trunk/html5.js"</script>
  <![endif]-->
  ```

## 36、⭐如何实现在一张图片上的某个区域做到点击事件
我们可以通过图片热区技术：
1. 插入一张图片，并设置好图像的有关参数，在`<img>`标记中设置参数`usemap="#Map"`，以表示对图像地图的引用。
2. 用`<map>`标记设定图像地图的作用区域，并取名：`Map`；
3. 分别用`<area>`标记针对相应位置互粉出多个矩形作用区域，并设定好链接参数`href`
例：
```html
<img src="http://img.itchenliang.club/img/202302081532078.png" alt="" usemap="#Map" width="400" height="600" />
<map name="Map" id="Map">
  <area alt="" title="" href="#" shape="poly"
    coords="65,71,98,58,114,90,108,112,79,130,56,116,38,100,41,76,52,53,83,34,110,33,139,46,141,75,145,101,127,115,113,133,85,132,82,131,159,117" />
  <area alt="" title="" href="#" shape="poly" coords="28,22,57,20,36,39,27,61" />
</map>
```
注意：上面代码中可以点击的区域是有👆手势，如下图所示
![202302090916219.png](http://img.itchenliang.club/img/202302090916219.png)

## 37、🔥a元素除了用于导航外，还有什么作用？
href属性中的url可以是浏览器支持的任何协议，所以a标签可以用来手机拨号`<a href="tel:110">110</a>`，也可以用来发送短信`<a href="sms:110">110</a>`，还有邮件等等。

当然，a元素最常见的就是用来做锚点和 下载文件。
```html
<a href="/images/logo.png" download="logo.png">下载</a>
```
锚点可以在点击时快速定位到一个页面的某个位置，而下载的原理在于a标签所对应的资源浏览器无法解析，于是浏览器会选择将其下载下来。

## 38、🔥你知道SEO中的TDK吗？
在SEO中，TDK其实就是`title`、`description`、`keywords`这三个标签，`title`表示标题标签，`description`是描述标签，`keywords`是关键词标签。

## 39、什么是data-属性？
HTML的数据属性，用于将数据储存于标准的HTML元素中作为额外信息,我们可以通过js访问并操作它，来达到操作数据的目的。
```html
<div data-id="12" data-name="张三" id="user-info">hahhaha</div>
<script>
  const info = document.querySelector('#user-info')
  console.log(info.dataset) // DOMStringMap {id: '12', name: '张三'}
</script>
```

## 40、SGML、HTML、XHTML、XML有什么区别
- SGML(标准通用标记语言): `Standard Generalized Markup language`是一种定义电子文档结构和描述其内容的国际标准语言，是所有电子文档标记语言的起源。
- HTML(超文本标记语言): `Hyper Text Markup Language`主要用于规定怎么显示网页，在html4.0之前HTML先有实现再有标准，导致HTML非常混乱和松散
- XML(可扩展标记语言): `Extensible Markup Language`主要用于存储数据和结构，可扩展，大家熟悉的JSON也是相似的作用，但是更加轻量高效，所以XML现在市场越来越小了
- XHTML(可扩展超文本标记语言): `Extensible HyperText Markup Language`基于上面两者而来，W3C为了解决HTML混乱问题而生，并基于此诞生了HTML5，开头加入`<!DOCTYPE html>`的做法因此而来，如果不加就是兼容混乱的HTML，加了就是标准模式。

## 41、从浏览器输入 URL 到页面展示过程发生了什么？
大致可以分为如下6步：
- **1、输入网址**；
- **2、DNS解析**: 发送到DNS服务器，将域名解析成对应服务器的IP地址；
- **3、建立TCP连接**: 与web服务器建立TCP连接；
- **4、发送HTTP请求**: 浏览器向web服务器发送http请求；
- **5、响应请求**: web服务器响应请求，并返回指定url的数据（或错误信息，或重定向的新的url地址）；
- **6、浏览器解析渲染**: 浏览器拿到请求页面的代码，将其解析渲染出来。解析和渲染的过程主要由浏览器的渲染引擎实现；


## 42、浏览器是如何渲染页面的
- 渲染引擎首先通过网络获得所请求文档的内容
- 解析HTML文件，构建 DOM Tree
- 解析CSS，构建 CSSOM Tree(CSS规则树)
- 将 DOM Tree 和 CSSOM Tree合并，构建Render tree(渲染树)
- reflow(重排)：根据Render tree进行节点信息计算（Layout）
- repaint(重绘)：根据计算好的信息绘制整个页面（Painting）

## 43、写一个选择器，完成从 DOM 中获取所有`<a>`中包含`163.com`的链接筛选出来
```html
<a href="www.163.com">163</a>
<a href="http://163.com">163</a>
<a href="www.baidu.com">baidu</a>
<script>
  const els = document.querySelectorAll('a[href*="163.com"]')
  console.log(els)
</script>
```

## 44、CDN 了解吗？
CDN的全称是Content Delivery Network，即内容分发网络。<br>
CDN是构建在现有网络基础之上的智能虚拟网络，依靠部署在各地的边缘服务器，通过中心平台的负载均衡、内容分发、调度等功能模块，使用户就近获取所需内容，降低网络拥塞，提高用户访问响应速度和命中率。

CDN的关键技术主要有**内容存储**和**分发技术**

**基本原理**：CDN的基本原理是广泛采用各种缓存服务器，将这些缓存服务器分布到用户访问相对集中的地区或网络中，在用户访问网站时，利用全局负载技术将用户的访问指向距离最近的工作正常的缓存服务器上，由缓存服务器直接响应用户请求。

## 45、http 和 https 的区别？对 https 有什么了解？
超文本传输协议HTTP协议被用于在Web浏览器和网站服务器之间传递信息，HTTP协议以明文方式发送内容，不提供任何方式的数据加密，如果攻击者截取了Web浏览器和网站服务器之间的传输报文，就可以直接读懂其中的信息，因此，HTTP协议不适合传输一些敏感信息，比如：信用卡号、密码等支付信息。

为了解决HTTP协议的这一缺陷，需要使用另一种协议：安全套接字层超文本传输协议HTTPS，为了数据传输的安全，HTTPS在HTTP的基础上加入了SSL/TLS协议，SSL/TLS依靠证书来验证服务器的身份，并为浏览器和服务器之间的通信加密。
- HTTPS协议是由SSL/TLS+HTTP协议构建的可进行加密传输、身份认证的网络协议，要比http协议安全
- HTTPS协议的主要作用可以分为两种：一种是建立一个信息安全通道，来保证数据传输的安全；另一种就是确认网站的真实性。

HTTPS和HTTP的主要区别
- https协议需要到CA申请证书，一般免费证书较少，因而需要一定费用。
- http是超文本传输协议，信息是明文传输，https则是具有安全性的ssl/tls加密传输协议。
- http和https使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443。
- http的连接很简单，是无状态的；HTTPS协议是由SSL/TLS+HTTP协议构建的可进行加密传输、身份认证的网络协议，比http协议安全。

## 46、HTML5 的 form 如何关闭自动完成/自动填充功能？
将不想要自动完成的`form`或`input`设置为`autocomplete=off`


## 47、列举 IE 与其他浏览器不一样的特性？
- IE 的排版引擎是 Trident （又称为 MSHTML）
- Trident 内核曾经几乎与 W3C 标准脱节（2005 年）
- Trident 内核的大量 Bug 等安全性问题没有得到及时解决
- JS 方面，有很多独立的方法，例如绑定事件的 attachEvent、创建事件的 createEventObject 等
- CSS 方面，也有自己独有的处理方式，例如设置透明，低版本 IE 中使用滤镜的方式


## 48、网页验证码是干嘛的，是为了解决什么安全问题？
- 区分用户是计算机还是人的公共全自动程序。可以防止恶意破解密码、刷票、论坛灌水
- 有效防止黑客对某一个特定注册用户用特定程序暴力破解方式进行不断的登陆尝试


## 49、为什么用多个域名存储网站资源更有效？
- CDN 缓存更方便
- 突破浏览器并发限制
- 节约 cookie 带宽
- 节约主域名的连接数，优化页面响应速度
- 防止不必要的安全问题


## 50、页面可见性（Page Visibility）API 可以有哪些用途？
页面可见性： 就是对于用户来说，页面是显示还是隐藏, 所谓显示的页面，就是我们正在看的页面；隐藏的页面，就是我们没有看的页面。 因为，我们一次可以打开好多标签页面来回切换着，始终只有一个页面在我们眼前，其他页面就是隐藏的，还有一种就是.........，(把浏览器最小化，所有的页面就都不可见了)。

API 很简单，`document.hidden`就返回一个布尔值，如果是`true`, 表示页面可见，`false`则表示，页面隐藏。不同页面之间来回切换，触发 `visibilitychange`事件。 还有一个`document.visibilityState`, 表示页面所处的状态，取值：`visible`, `hidden`等四个。
```js
document.addEventListener("visibilitychange", function() {
  if (document.hidden) {
    document.title = "hidden";
  } else {
    document.title = "visibile";
  }
});
```
我们打开这个页面，然后再打开另一个页面，来回点击这两个页面，当我们看到这个页面时，标题显示`visiable`, 当我们看另一个页面时，标题显示`hidden`;
动画，视频，音频都可以在页面显示时打开，在页面隐藏时关闭。


## 51、div+css 的布局较 table 布局有什么优点？
分离、方便改版、快清晰简洁、seo
1. 改版的时候更方便 只要改 css 文件
2. 页面加载速度更快、结构化清晰、页面显示简洁
3. 表现与结构相分离
4. 易于优化（seo）搜索引擎更友好，排名更容易靠前


## 52、请谈一下你对网页标准和标准制定机构重要性的理解
降低开发难度及开发成本，减少各种 BUG、安全问题， 提高网站易用性


## 53、html 常见兼容性问题？
1. 双边距 BUG float 引起的，解决办法: 使用display解决；
2. 像素问题 使用 float 引起的，解决办法: 使用dislpay:inline -3px；
3. 超链接 hover 点击后失效，解决办法: 使用正确的书写顺序 link visited hover active；
4. z-index 问题，解决办法: 给父级添加 position:relative
5. Png 透明 ，解决办法: 使用 js 代码
6. min-height 最小高度 ，解决办法: ！Important 解决
7. select 在 ie6 下遮盖，解决办法: 使用 iframe 嵌套
8. 为什么没有办法定义 1px 左右的宽度容器，解决办法: （IE6 默认的行高造成的，使用 over:hidden, zoom:0.08 line-height:1px）
9. IE5-8 不支持 opacity，解决办法：
  ```css
  .opacity {
    opacity: 0.4;
    filter: alpha(opacity=60);/_ for IE5-7 _/ -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)";/_ for IE 8_/
  }
  ```
10. IE6 不支持 PNG 透明背景，解决办法: IE6 下使用 gif 图片


## 54、如何在页面上实现一个圆形的可点击区域？
### 方式一：border-radius (css3)
对于圆形，最直接的方法想到的就是 css3 的圆角属性，这个属性可以将 html 元素的形状设置为圆形，这之后你想对该圆形区域设置什么事件就设置什么事件(当然包括点击)。

### 方式二：通过事件坐标来实现（js）
通过 js 来进行一个区域判断，进而简介地的形成可点区域，以下给出主要的 js 测试代码：
```js
// 获取目标元素
var box = document.getElementById("box");

// 对目标元素target的圆形区域进行一个点击事件绑定
function bindClickOnCircleArea(target, callback) {
    target.onclick = function(e) {
        e = e || window.event;

        // target中心点的坐标
        var x1 = 100;
        var y1 = 100;

        // 事件源坐标
        var x2 = e.offsetX;
        var y2 = e.offsetY;

        // 校验是否在圆形点击区，在的话就执行callback回调
        // 计算事件触发点与target中心的位置
        var len = Math.abs(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
        // 通过半径进行校验
        if (len <= 100) {
            callback();
        } else {
            alert("死鬼，跑哪去啊，你老婆我是黄皮肤还是白皮肤都分不清了吗");
        }
    };
}

// 执行
bindClickOnCircleArea(box, function() {
    alert("老婆，你让我好找啊，呜呜呜");
});
```

### 方式三：通过 map 加 area
```html
<img src="../imgs/test.jpg" width="200" border="0" usemap="#Map" />
<map name="Map" id="Map">
  <area shape="circle" coords="100,100,100" href="http://www.baidu.com" target="_blank" />
</map>
```


## 55、前端需要注意哪些 SEO
- 合理的 title、description、keywords：搜索对着三项的权重逐个减小，title 值强调重点即可，重要关键词出现不要超过 2 次，而且要靠前，不同页面 title 要有所不同；description 把页面内容高度概括，长度合适，不可过分堆砌关键词，不同页面 description 有所不同；keywords 列举出重要关键词即可
- 语义化的 HTML 代码，符合 W3C 规范：语义化代码让搜索引擎容易理解网页
- 重要内容 HTML 代码放在最前：搜索引擎抓取 HTML 顺序是从上到下，有的搜索引擎对抓取长度有限制，保证重要内容一定会被抓取
- 重要内容不要用 js 输出：爬虫不会执行 js 获取内容
- 少用 iframe：搜索引擎不会抓取 iframe 中的内容
- 非装饰性图片必须加 alt
- 提高网站速度：网站速度是搜索引擎排序的一个重要指标


## 56、HTML 全局属性(global attribute)有哪些
- accesskey: 设置快捷键，提供快速访问元素如aaa在 windows 下的 firefox 中按 alt + shift + a 可激活元素
- class: 为元素设置类标识，多个类名用空格分开，CSS 和 javascript 可通过 class 属性获取元素
- contenteditable: 指定元素内容是否可编辑
- contextmenu: 自定义鼠标右键弹出菜单内容
- data-*: 为元素增加自定义属性
- dir: 设置元素文本方向
- draggable: 设置元素是否可拖拽
- dropzone: 设置元素拖放类型： copy, move, link
- hidden: 表示一个元素是否与文档。样式上会导致元素不显示，但是不能用这个属性实现样式效果
- id: 元素 id，文档内唯一
- lang: 元素内容的的语言
- spellcheck: 是否启动拼写和语法检查
- style: 行内 css 样式
- tabindex: 设置元素可以获得焦点，通过 tab 可以导航
- title: 元素相关的建议信息
- translate: 元素和子孙节点内容是否需要本地化


## 57、meta viewport 原理是什么？
meta viewport 标签的作用是让当前 viewport 的宽度等于设备的宽度，同时不允许用户进行手动缩放<br>
viewport的原理：移动端浏览器通常都会在一个比移动端屏幕更宽的虚拟窗口中渲染页面，这个虚拟窗口就是 viewport; 目的是正常展示没有做移动端适配的网页，让他们完整的展示给用户；


## 58、对 web 标准、可用性、可访问性的理解
**可用性（Usability）**：产品是否容易上手，用户能否完成任务，效率如何，以及这过程中用户的主观感受可好，是从用户的角度来看产品的质量。可用性好意味着产品质量高，是企业的核心竞争力；<br>
**可访问性（Accessibility）**：Web 内容对于残障用户的可阅读和可理解性；<br>
**可维护性（Maintainability）**：一般包含两个层次，一是当系统出现问题时，快速定位并解决问题的成本，成本低则可维护性好。二是代码是否容易被人理解，是否容易修改和增强功能；


## 60、为什么最好把CSS的`<link>`标签放在`<head></head>`之间？为什么最好把JS的`<script>`标签恰好放在`</body>`之前，有例外情况吗？
把`<link>`标签放在`<head></head>`之间是规范要求的内容。此外，这种做法可以让页面逐步呈现，提高了用户体验。将样式表放在文档底部附近，会使许多浏览器（包括 Internet Explorer）不能逐步呈现页面。一些浏览器会阻止渲染，以避免在页面样式发生变化时，重新绘制页面中的元素。这种做法可以防止呈现给用户空白的页面或没有样式的内容。

把`<script>`标签恰好放在`</body>`之前原因：脚本在下载和执行期间会阻止HTML解析，把`<script>`标签放在底部，保证HTML首先完成解析，将页面尽早呈现给用户。

例外情况是当你的脚本里包含`document.write()`时。但是现在，`document.write()`不推荐使用。同时，将`<script>`标签放在底部，意味着浏览器不能开始下载脚本，直到整个文档（document）被解析。也许，对此比较好的做法是，`<script>`使用`defer`属性，放在`<head>`中。


## 61、什么是渐进式渲染（progressive rendering）？
渐进式渲染是用于提高网页性能（尤其是提高用户感知的加载速度），以尽快呈现页面的技术。在以前互联网带宽较小的时期，这种技术更为普遍。如今，移动终端的盛行，而移动网络往往不稳定，渐进式渲染在现代前端开发中仍然有用武之地。<br>
一些举例：
- 图片懒加载——页面上的图片不会一次性全部加载。当用户滚动页面到图片部分时，JavaScript 将加载并显示图像。
- 确定显示内容的优先级（分层次渲染）——为了尽快将页面呈现给用户，页面只包含基本的最少量的 CSS、脚本和内容，然后可以使用延迟加载脚本或监听`DOMContentLoaded/load`事件加载其他资源和内容。
- 异步加载 HTML 片段——当页面通过后台渲染时，把 HTML 拆分，通过异步请求，分块发送给浏览器。


## 62、DOM和BOM有什么区别
### DOM
Document Object Model，文档对象模型<br>
DOM 是为了操作文档出现的 API，document 是其的一个对象<br>
DOM 和文档有关，这里的文档指的是网页，也就是 html 文档。DOM 和浏览器无关，他关注的是网页本身的内容。

### BOM
Browser Object Model，浏览器对象模型<br>
BOM 是为了操作浏览器出现的 API，window 是其的一个对象<br>
window 对象既为 javascript 访问浏览器提供 API，同时在 ECMAScript 中充当 Global 对象


## 63、一个iframe，内嵌了一个A页面，iframe的宽高不停变化，如何让A页面的宽高实时自适应这个iframe的宽高大小。请说出至少3种方法，越难越好
- css的方案
- onresize
- 监听鼠标动作，鼠标释放后重新定宽


## 64、DOM Tree是如何构建的？
1. HTML 解释器
HTML 解释器的工作就是将网络或者本地磁盘获取的 HTML 网页和资源从字节流解释成 DOM 树结构。
2. JavaScript 的执行
在 HTML 解释器的工作过程中，可能会有 JavaScript 代码需要执行，它发生在将字符串解释成词语之后、创建各种节点的时候。这也是为什么全局执行的 JavaScript 代码不能访问 DOM 的原因——因为 DOM 树还没有被创建完呢。


## 65、100*100的 canvas 占多少内存？
```
100 * 100 canvas占的内存是: 100 * 100 * 4 bytes = 40,000 bytes
```


## 66、`<noscript>`标签的作用
用于在浏览器不支持 JavaScript 或用户禁用 JavaScript 时提供备用内容。
- 当浏览器不支持 JavaScript 时， 标签内的内容会被显示；
- 当用户禁用 JavaScript 时，也会显示 标签内的内容。


## 67、DTD 介绍
DTD（ Document Type Definition 文档类型定义）是一组机器可读的规则，它们定义 XML 或 HTML 的特定版本中所有允许元
素及它们的属性和层次关系的定义。在解析网页时，浏览器将使用这些规则检查页面的有效性并且采取相应的措施。<br>
DTD 是对 HTML 文档的声明，还会影响浏览器的渲染模式（工作模式）。


## 68、页面导入样式时，使用 link 和 @import 有什么区别？
- 从属关系区别。 @import 是 CSS 提供的语法规则，只有导入样式表的作用；link 是 HTML 提供的标签，不仅可以加载 CSS 文件，还可以定义 RSS、rel 连接属性、引入网站图标等。
- 加载顺序区别。加载页面时，link 标签引入的 CSS 被同时加载；@import 引入的 CSS 将在页面加载完毕后被加载。
- 兼容性区别。@import 是 CSS2.1 才有的语法，故只可在 IE5+ 才能识别；link 标签作为 HTML 元素，不存在兼容性问题。
- DOM 可控性区别。可以通过 JS 操作 DOM ，插入 link 标签来改变样式；由于 DOM 方法是基于文档的，无法使用 @import 的方式插入样式。


## 69、什么是文档的预解析？
文档的预解析（Pre-parsing）是浏览器渲染引擎在解析 HTML 文档时的一种优化技术。它实际上是在文档解析之前对 HTML 进行一次扫描，以确定文档的整体结构和特征，然后再进行详细的文档解析过程。

在预解析阶段中，浏览器会查找并处理文档中的一些重要元素，例如文档类型声明、字符集声明、样式表和脚本等，并将它们存储在内部数据结构中。这样可以使得后续文档解析的过程更高效，因为浏览器已经知道了文档的基本结构和相关信息。此外，在预解析过程中还会发现一些错误或警告，例如缺失的标签、属性或值等，从而提供更好的错误处理和调试支持。

**注意**: 文档的预解析只是一种优化技术，并不是 HTML 解析的标准规范，因此不同浏览器的实现方式可能会有所不同。但是大多数主流浏览器都采用了文档的预解析技术来提高页面加载和渲染的性能。


## 70、CSS 如何阻塞文档解析？
css阻塞文档解析的方式有如下两种: 
1. 大量 CSS 文件：如果 HTML 中引用了大量的 CSS 文件，浏览器在解析 HTML 时需要等待所有 CSS 文件加载完成后才能继续解析 HTML，因此这会阻塞文档的解析。
2. 嵌入式 CSS：如果 HTML 中包含了大量的嵌入式 CSS 样式表，也会导致浏览器在解析 HTML 时需要先解析并应用这些样式，从而阻塞文档的解析。

为了避免上述情况造成的性能问题，可以使用以下几种优化策略：
- 合并和压缩 CSS 文件，减少文件大小和数量，从而加快下载和加载速度。
- 将 CSS 文件放到 body 元素底部或使用 defer 属性来延迟加载 CSS，以便让浏览器更早地解析 HTML。
- 减少嵌入式 CSS 的使用，并尽量将其转移到外部样式表中。
- 使用浏览器缓存，减少对相同文件的多次请求。


## 71、渲染页面时常见哪些不良现象？
页面渲染时常见的不良现象有以下几种：
- FOUC（Flash of Unstyled Content）：指页面在加载过程中先展示未经 CSS 样式处理的原始内容，然后再突然变成经过样式处理的页面，这种效果会给用户带来闪烁感和不稳定感。
- 页面卡顿：指页面响应缓慢，无法流畅地滚动、点击或拖拽等，这种效果会影响用户体验，尤其是在移动设备上更为明显。
- 图片模糊：当浏览器调整图片大小或显示位置时，可能会出现模糊或失真的效果，这通常是由于图片的像素密度与设备像素比不匹配所导致的。
- 瀑布流错位：在使用瀑布流布局时，如果页面中的元素高度、宽度等属性不一致，则可能会出现错位的效果，从而影响页面展示效果。
- 引用阻塞：当网页引用的外部资源（如 JavaScript 文件、CSS 文件等）未能及时加载完成时，会导致页面的渲染受到阻碍，从而影响用户的交互体验。

针对以上问题，可以采取以下优化策略来提升页面渲染效果：
- 减少 FOUC 的出现，例如通过内联 CSS 样式表、将脚本放在底部、使用 font-display 属性等方式来控制页面样式的加载。
- 对于页面卡顿问题，可以进行性能优化，例如减少 HTTP 请求、压缩文件、延迟加载等。
- 针对图片模糊问题，可以通过使用 srcset 属性或响应式图片技术来解决。
- 解决瀑布流错位问题，可以通过设置元素的高度和宽度、使用 CSS grid 或 flex 布局等方式来确保页面元素的一致性。
- 解决引用阻塞问题，可以通过使用 defer 和 async 属性、异步加载等方式来避免对页面渲染的阻塞。


## 72、如何优化关键渲染路径？
关键渲染路径（Critical Rendering Path）是指浏览器在处理和渲染页面时所必须经过的一系列步骤。它包括了以下几个阶段：
1. 构建 DOM 树：将 HTML 文档转化为浏览器可理解的 DOM 树结构。
2. 构建 CSSOM 树：将 CSS 样式表转化为浏览器可理解的 CSSOM 树结构。
3. 合并 DOM 和 CSSOM，生成 Render 树：将 DOM 树和 CSSOM 树合并，并生成一个用于绘制的 Render 树。
4. 布局（Layout）：计算 Render 树中所有节点的大小、位置和样式等信息。
5. 绘制（Painting）：根据 Render 树和布局信息，将像素渲染到屏幕上。

以上步骤中，前三个被称作“关键渲染路径的三个阶段”，因为它们对于页面渲染和性能影响最大。

优化关键渲染路径可以提高网站性能，缩短页面加载时间，改善用户体验。以下是一些优化关键渲染路径的方法：
1. 减少 HTTP 请求次数：通过合并、压缩和缓存文件来减少页面所需的 HTTP 请求次数，例如将多个 CSS 或 JavaScript 文件合并成一个文件、使用图像精灵或 SVG 代替多个小图像等。
2. 压缩和缓存静态文件：使用 Gzip 等压缩技术来减少文件大小，并且使用浏览器缓存来避免重复下载静态文件。
3. 将脚本放在底部：将 JavaScript 放在文档底部可以使得页面快速呈现，并避免阻塞其他资源的加载。
4. 使用异步加载脚本：使用 async 或 defer 属性来异步加载脚本，可以避免脚本阻塞其他资源的加载。
5. 最小化样式表和脚本：减少冗余代码、删除未使用的样式和脚本、尽可能使用内联样式和脚本等方式，以减少文件大小和加载时间。
6. 减少关键渲染路径长度：减少关键渲染路径上的节点数量和嵌套层数，可以提高页面的渲染效率和响应速度。
7. 使用 Web 字体：使用 Web 字体可以减少页面下载的字体文件大小，并且提高文本的可读性和美观性。


## 73、什么是重绘和回流(重排)？（浏览器绘制过程）
**重绘**: 当渲染树中的一些元素需要更新属性，而这些属性只是影响元素的外观、风格，而不会影响布局的操作，比如 background-color，我们将这样的操作称为重绘。<br>
**回流**：即重排，当渲染树中的一部分（或全部）因为元素的规模尺寸、布局、隐藏等改变而需要重新构建的操作，会影响到布局的操作，这样的操作我们称为回流。

常见引起回流属性和方法：<br>
任何会改变元素几何信息（元素的位置和尺寸大小）的操作，都会触发回流。
- （1）添加或者删除可见的 DOM 元素；
- （2）元素尺寸改变——边距、填充、边框、宽度和高度
- （3）内容变化，比如用户在`input`框中输入文字
- （4）浏览器窗口尺寸改变——`resize`事件发生时
- （5）计算`offsetWidth`和`offsetHeight`属性
- （6）设置`style`属性的值
- （7）当你修改网页的默认字体时。

回流必定会发生重绘，重绘不一定会引发回流。回流所需的成本比重绘高的多，改变父节点里的子节点很可能会导致父节点的一系列回流。

常见引起重绘属性和方法：
![2023021017252910.png](http://img.itchenliang.club/img/2023021017252910.png)
常见引起回流属性和方法：
![202302101725448.png](http://img.itchenliang.club/img/202302101725448.png)


## 74、如何减少回流(重排)？（浏览器绘制过程）
- （1）使用`transform`替代`top`
- （2）不要把节点的属性值放在一个循环里当成循环里的变量
- （3）不要使用`table`布局，可能很小的一个小改动会造成整个 table 的重新布局
- （4）把 DOM 离线后修改。如：使用`documentFragment`对象在内存里操作 DOM
- （5）不要一条一条地修改 DOM 的样式。与其这样，还不如预先定义好 css 的 class，然后修改 DOM 的 className。


## 75、为什么操作 DOM 慢？（浏览器绘制过程）
一些 DOM 的操作或者属性访问可能会引起页面的回流和重绘，从而引起性能上的消耗。


## 76、DOMContentLoaded 事件和 Load 事件的区别？
1. 触发时间不同：`DOMContentLoaded`事件在`HTML文档`被完全加载和解析后触发，而`Load`事件在`整个页面及其所有资源`（如图片、样式表、脚本等）都加载完成后触发。
2. 意义不同：`DOMContentLoaded`事件表示`DOM树`已经构建完成，可以进行操作，而`Load`事件则表示整个页面及其所有资源都已经完全加载完成，可以进行一些需要所有资源都准备就绪的操作，例如图像尺寸计算等。
3. 响应速度不同：`DOMContentLoaded`事件响应速度较快，因为它只需要等待`HTML文档`加载和解析完毕即可触发，而`Load`事件需要等待整个页面及其所有资源加载完成后才能触发，因此响应速度较慢。
4. 兼容性不同：`DOMContentLoaded`事件在大多数现代浏览器中都得到支持，而`Load`事件也具有广泛的兼容性，但在某些旧版本浏览器中可能存在兼容性问题。
```html
<h1>DOMContentLoaded和load事件演示</h1>
<p>这是一个简单的演示，展示了在DOM树构建完成和所有资源加载完成时DOMContentLoaded和load事件的触发时间。</p>
<img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg" alt="一棵树">
<script>
  document.addEventListener("DOMContentLoaded", function() {
    console.log("DOMContentLoaded事件: DOMContentLoaded事件触发时间为 " + new Date().getTime());
  });

  window.addEventListener("load", function() {
    console.log("load事件: load事件触发时间为 " + new Date().getTime());
  });
</script>
```
输出结果如下：
```
DOMContentLoaded事件: DOMContentLoaded事件触发时间为 1679649014340
load事件: load事件触发时间为 1679649024547
```


## 77、如何实现浏览器内多个标签页之间的通信?
- （1）使用 WebSocket，通信的标签页连接同一个服务器，发送消息到服务器后，服务器推送消息给所有连接的客户端。
- （2）使用 SharedWorker （只在 chrome 浏览器实现了），两个页面共享同一个线程，通过向线程发送数据和接收数据来实现标签页之间的双向通行。
- （3）可以调用 localStorage、cookies 等本地存储方式，localStorge 另一个浏览上下文里被添加、修改或删除时，它都会触发一个 storage 事件，我们通过监听 storage 事件，控制它的值来进行页面信息通信；
- （4）如果我们能够获得对应标签页的引用，通过 postMessage 方法也是可以实现多个标签页通信的。

实现多个标签页之间的通信，本质上都是通过中介者模式来实现的。因为标签页之间没有办法直接通信，因此我们可以找一个中介者，让标签页和中介者进行通信，然后让这个中介者来进行消息的转发。
- 第一种实现的方式是使用 websocket 协议，因为 websocket 协议可以实现服务器推送，所以服务器就可以用来当做这个中介者。标签页通过向服务器发送数据，然后由服务器向其他标签页推送转发。
- 第二种是使用 ShareWorker 的方式，shareWorker 会在页面存在的生命周期内创建一个唯一的线程，并且开启多个页面也只会使用同一个线程。这个时候共享线程就可以充当中介者的角色。标签页间通过共享一个线程，然后通过这个共享的线程来实现数据的交换。
- 第三种方式是使用 localStorage 的方式，我们可以在一个标签页对 localStorage 的变化事件进行监听，然后当另一个标签修改数据的时候，我们就可以通过这个监听事件来获取到数据。这个时候 localStorage 对象就是充当的中介者的角色。
- 还有一种方式是使用 postMessage 方法，如果我们能够获得对应标签页的引用，我们就可以使用 postMessage 方法，进行通信。


## 78、webSocket如何兼容低版本浏览器？
- Adobe Flash Socket 、
- ActiveX HTMLFile (IE) 、
- 基于 multipart 编码发送 XHR 、
- 基于长轮询的 XHR


## 79、实现不使用 border 画出 1 px 高的线，在不同浏览器的标准模式与怪异模式下都能保持一致的效果
```html
<div style="height:1px;overflow:hidden;background:red"></div>
```


## 80、attribute 和 property 的区别是什么？
- attribute 是 dom 元素在文档中作为 html 标签拥有的属性；
- property 就是 dom 元素在 js 中作为对象拥有的属性。

对于 html 的标准属性来说，attribute 和 property 是同步的，是会自动更新的，但是对于自定义的属性来说，他们是不同步的。


## 81、IE 各版本和 Chrome 可以并行下载多少个资源？
- IE6 2 个并发
- iE7 升级之后的 6 个并发，之后版本也是 6 个
- Firefox，chrome 也是6个


## 82、Flash、Ajax 各自的优缺点，在使用中如何取舍？
Flash：
- Flash 适合处理多媒体、矢量图形、访问机器
- 对 CSS、处理文本上不足，不容易被搜索

Ajax：
- Ajax 对 CSS、文本支持很好，支持搜索
- 多媒体、矢量图形、机器访问不足

共同点：
- 与服务器的无刷新传递消息
- 可以检测用户离线和在线状态
- 操作 DOM


## 83、怎么重构页面？
重构页面通常需要遵循以下步骤：
1. 分析和评估：先了解页面的设计目的、用户需求以及所要达成的业务目标，对页面进行全面分析和评估。
2. 备份和清理代码：备份现有代码，删除不必要的代码和样式，提高整体代码质量，优化性能。
3. 修改HTML结构：根据新的设计要求，修改HTML结构，使其更加合理、语义化。
4. 重构CSS样式：通过修改CSS样式来改变页面外观和布局，去除冗余的CSS，简化CSS选择器，减少CSS文件大小，提高页面性能。
5. 添加交互效果：根据用户需求和业务目标，添加必要的JavaScript交互效果，如表单验证、动态加载数据等。
6. 测试和调试：在完成重构后，进行全面测试和调试，确保页面在各种设备和浏览器上均能正常显示和运行。

总之，重构页面需要仔细分析、理性评估、精心设计和细致实现，才能让页面功能更加完善、性能更加优秀，并为用户带来更好的使用体验。


## 84、浏览器架构
浏览器通常由以下几个主要组件构成：
1. 用户界面(User Interface)：包括浏览器的地址栏、前进/后退按钮、书签菜单等。用户通过界面与浏览器进行交互。
2. 渲染引擎(Rendering Engine)：解析HTML、CSS等文档，将其渲染成可视化的网页。常用的渲染引擎有WebKit、Blink和Gecko等。
3. JavaScript解释器(JavaScript Interpreter)：负责解析和执行JavaScript代码。
4. 呈现引擎(Layout Engine)：负责将渲染引擎输出的内容显示在屏幕上，处理页面布局、绘制等操作。常见的呈现引擎有Blink、Gecko和Trident等。
5. 数据存储(Data Storage)：浏览器需要保存一些用户数据，如cookie、本地存储等。不同的浏览器采用不同的存储方式，如localStorage、sessionStorage、IndexedDB等。
6. 网络(Networking)：负责网络请求和响应，实现HTTP协议等。

这些组件可以协同工作，完成浏览器的基本功能。


## 85、用于预格式化文本的标签是？
预格式化就是保留文字在源码中的格式，最后显示出来样式与源码中的样式一致，所见即所得。
> 用于预格式化文本的标签是`<pre>`


## 86、DHTML 是什么？
DHTML是指动态 HTML（Dynamic Hypertext Markup Language），是一种在网页中实现动态效果的技术。它结合了 HTML、CSS 和 JavaScript，可以让网页元素在页面加载后进行修改和交互，从而增强用户体验。DHTML 技术被广泛应用于制作动态菜单、动画效果、表单验证等方面。


## 87、在 HTML5 中，哪个方法用于获得用户的当前位置？
使用Geolocation API可以通过以下方法来获取用户的当前位置：
```js
navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
```
其中，`successCallback`和`errorCallback`是两个回调函数，分别用于处理获取位置成功和失败的情况。`options`是一个可选参数对象，可以指定获取位置的精度、超时时间等配置。


## 88、disabled 和 readonly 的区别？
- `disabled`指当 input 元素加载时禁用此元素。`input`内容不会随着表单提交。
- `readonly`规定输入字段为只读。`input`内容会随着表单提交。

无论设置`readonly`还是`disabled`，通过js脚本都能更改`input`的`value`


## 89、主流浏览器内核私有属性 css 前缀？
- mozilla内核(firefox,flock等): `-moz-`
- webkit内核(safari,chrome等): `-webkit-`
- opera内核(opera浏览器): `-o-`
- trident内核(ie浏览器): `-ms-`


## 90、前端性能优化？
1. 压缩和合并文件：将多个CSS或JavaScript文件压缩并合并到一个文件中可以减少页面加载时间。
2. 缓存：利用浏览器缓存来减少页面加载时间。
3. 图片优化：使用适当的格式和大小来减少图像的大小，从而减少加载时间。
4. 资源延迟加载：只在需要时加载资源（例如图片、视频等）。
5. 减少DOM操作：频繁的DOM操作会导致性能下降，应该尽量避免。
6. 懒加载：将长页面分成多个部分，只有滚动到相应部分时再去加载其中的内容。
7. 使用CDN：使用Content Delivery Network（CDN）可以提高静态资源的加载速度。
8. 代码优化：优化JavaScript代码可以提高页面性能。例如，避免使用全局变量和尽量减少循环嵌套等。


## 91、Chrome 中的 Waterfall？
Chrome中的Waterfall是指网络面板(Network Panel)中的一个图形化展示工具，用于显示页面上所有资源的加载时间和顺序。它以时间轴为横轴，以请求开始时间和结束时间为纵轴，将每个资源的请求和响应过程以条形图的形式展示出来。
> 通过Waterfall，开发人员可以很容易地了解到每个资源在页面加载过程中所需的时间、是否存在阻塞问题以及如何进一步优化页面的性能。例如，在Waterfall中，可以看到浏览器请求HTML文档后需要等待服务器返回后才能继续请求其他资源，这可能会导致网页加载时间延长。开发人员可以通过Waterfall找到这些瓶颈并进行优化，从而提高页面的性能和用户体验。
![202303241708088.png](http://img.itchenliang.club/img/202303241708088.png)
 

## 92、扫描二维码登录网页是什么原理，前后两个事件是如何联系的？
核心过程应该是：浏览器获得一个临时 id，通过长连接等待客户端扫描带有此 id 的二维码后，从长连接中获得客户端上报给 server的帐号信息进行展示。并在客户端点击确认后，获得服务器授信的令牌，进行随后的信息交互过程。在超时、网络断开、其他设备上登录后，此前获得的令牌或丢失、或失效，对授权过程形成有效的安全防护。


## 93、Html 规范中为什么要求引用资源不加协议头http或者https？
HTML规范中要求在引用资源时不加协议头（`http://`或`https://`）
> 是为了避免浏览器在请求资源时出现不必要的重定向。如果不加协议头，则浏览器会默认使用与当前页面相同的协议来请求资源。这样可以提高网页加载速度和性能，并且还有助于避免因HTTPS混合内容而导致的安全问题。

安全问题: 
> 如果用户当前访问的页面是通过HTTPS协议来浏览的，那么网页中的资源也只能通过HTTPS协议来引用，否则浏览器会出现警告信息，不同浏览器警告信息展现形式不同。


## 94、Data URI scheme 是什么 ？
Data URI scheme(数据统一资源标识符方案)是一种用于在 URL 中嵌入小型数据的方法，可以将数据直接放到 URL 中，而无需单独请求一个外部文件。这些数据可以包括文本、图像、音频、视频等任何类型的文件。

Data URI 的一般格式如下：
```js
data:[<media type>][;base64],<data>
```
- `<media type>`: 表示媒体类型，例如文本、图片、音频等，可以指定为MIME类型或者简写形式（例如`text/plain`或`image/png`）;
  - `data:text/plain`: 文本数据
  - `data:text/html`: HTML代码
  - `data:text/html`: base64编码的HTML代码
  - `data:text/css`: CSS代码
  - `data:text/javascript`: Javascript代码
  - `data:image/gif`: base64编码的gif图片数据
  - `data:image/png`: base64编码的png图片数据
  - `data:image/jpeg`: base64编码的jpeg图片数据
  - `data:image/x-icon`: base64编码的icon图片数据
- `;base64`: 如果要将数据编码成`base64`格式，则需要在媒体类型后面添加`;base64`标志;
- `<data>`: 实际的数据内容，可以直接插入到 URL 中;

假设你有的图像：A.jpg ，把它在网页上显示出来的标准方法是：
```html
<img src="http://sjolzy.cn/images/A.jpg"/>
```
这种取得数据的方法称为`http URI scheme`。
```html
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAAGElEQVQIW2P4DwcMDAxAfBvMAhEQMYgcACEHG8ELxtbPAAAAAElFTkSuQmCC" />
```
这种取得数据的方法称为`Data URI scheme`。


## 96、Data URI scheme 的优缺点
**优点**
- 减少 HTTP 请求次数，降低网页加载时间；
- 可以方便地将小型文件嵌入到 HTML、CSS、JavaScript 等文件中，减少对外部资源的依赖；
- 可以使用 base64 编码来加密敏感数据，增强安全性。

**缺点**：
- Data URI 会增加 HTML、CSS、JavaScript 文件的大小，导致文件传输时间变长；
- 不同浏览器对 Data URI 的支持程度不同，可能存在兼容性问题；
- 由于 Data URI 中包含了完整的数据内容，因此不适合用于大型文件的传输，否则可能影响网页性能。


## 97、你有使用过MediaRecorder吗？说说它的运用场景有哪些？
**运用场景**:
1. 视频会议：通过`MediaRecorder`可以实现对视频会议的录制功能，以便于对会议内容进行回放和共享。
2. 在线教育：通过`MediaRecorder`可以实现对在线教育课程的录制，以便于学生们随时复习和学习。
3. 视频直播：通过`MediaRecorder`可以实现对实时视频直播内容的录制，以便于后期编辑和分享。
4. 视频监控：通过`MediaRecorder`可以实现对视频监控数据的录制，以便于对安全事件进行调查和分析。

**注意**: 由于浏览器对于音视频数据流的格式支持有限，因此在使用MediaRecorder时需要选择适当的编码格式和参数，以确保生成的音视频文件能够被常见的媒体播放器所识别和播放。另外，在浏览器兼容性方面也需要进行相应的测试和处理。


## 98、H5的哪些特性需要https支持呢？
H5（HTML5）中需要使用HTTPS支持的特性主要包括：
1. Geolocation API：获取用户地理位置信息时需要使用HTTPS协议。
2. DeviceMotion 和 DeviceOrientation API：获取设备运动和方向信息时需要使用HTTPS协议。
3. getUserMedia API：访问用户摄像头和麦克风时需要使用HTTPS协议。
4. Service Workers：用于实现离线缓存、推送通知等功能时需要使用HTTPS协议。
5. Web App Manifest：用于定义Web应用程序元数据时需要使用HTTPS协议。
6. WebGL：3D绘图技术，对安全性有一定要求，通常在HTTPS环境下使用。
7. Payment Request API：用于处理电子商务支付时需要使用HTTPS协议。

除了上述特性外，使用HTTPS可以提高网站的安全性和保护用户隐私。因此，在开发H5应用时，建议尽可能采用HTTPS协议来保障应用安全。


## 99、你知道短链接的生成原理吗？
目的将长度较长的链接压缩成较短的链接，并通过跳转的方式，将用户请求由短链接重定向到长链接上去

二种方式生成短链
- hash-可能会重复
- 发号器发号压缩 URL

短链跳转方式
- 301 - 用户第一次访问某个短链接后，如果服务器返回301状态码，则这个用户在后续多次访问统一短链接，浏览器会直接请求跳转地址，而不是短链接地址，这样一来服务器端就无法收到用户的请求
  缺点：有缓存情况下直接跳转原地址，无法记录准确的访问
- 302 - 浏览器不缓存短链接请求，那么用户每次访问短链接，都会先去短链接服务端取回长链接地址，然后在跳转。
  缺点：服务器压力大


## 100、使用svg画一个微信的logo
```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <!-- 绿色大椭圆下的小尾巴 -->
  <polygon points="70,92 85,97 65,107"
  style="fill:#84d845;" />
  <!-- 绿色大椭圆 -->
  <ellipse cx="100" cy="60" rx="50" ry="42" style="fill:#84d845;" />
  <!-- 灰色小椭圆下的小尾巴 -->
  <polygon points="150,115 160,110 165,120"
  style="fill:#f1f2f4;"/>
  <!-- 灰色小椭圆 -->
  <ellipse cx="135" cy="85" rx="40" ry="32" style="fill:#f1f2f4;" />
  <!-- 两只大眼睛 -->
  <ellipse cx="82" cy="45" rx="5" ry="5" style="fill:#136f1a;" />
  <ellipse cx="115" cy="45" rx="5" ry="5" style="fill:#136f1a;" />
  <!-- 两只小眼睛 -->
  <ellipse cx="120" cy="75" rx="4" ry="4" style="fill:#797d7e;" />
  <ellipse cx="145" cy="75" rx="4" ry="4" style="fill:#797d7e;" />
</svg>
```


## 101、如何在不同的端口间共享cookie？
根据同源策略，cookie是区分端口的，但是浏览器实现来说，“cookie区分域，而不区分端口，也就是说，同一个ip下的多个端口下的cookie是共享的。



<!-- ======================================== 评论区 ======================================== -->
<!-- <valine-comment/> -->