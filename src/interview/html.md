# HTML面试题汇总
参考：https://www.yuque.com/cuggz/interview/gme0bw

## 1、🔥src和href的区别
src 用于替换当前元素，href 用于在当前文档和引用资源之间确立联系。 
### src
src 是`source`的缩写，指向外部资源的位置，指向的内容将会嵌入到文档中当前标签所在位置；在请求 src 资源时会将其指向的资源下载并应用到文档内，例如： js 脚本，img 图片和 frame 等元素。 
```html
<script src="demo.js"></script>
```
当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等元素也如此，类似于将所指向资源嵌入当前标签内。这也是为什么将js 脚本放在底部而不是头部。 

### href
href 是`Hypertext Reference`的缩写，指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接，如果在文档中添加
```html
<link href="style.css" rel="stylesheet"/>
```
那么浏览器会识别该文档为 css 文件，就会并行下载资源并且不会停止对当前文档的处理。 这也是为什么建议使用 link 方式来加载 css，而不是使用@import 方式。

## 2、🔥对HTML语义化的理解
语义化是指**根据内容的结构化（内容语义化），选择合适的标签（代码语义化）**。通俗来讲就是用正确的标签做正确的事情。
语义化的优点如下：
- 对机器友好，带有语义的文字表现力丰富，更适合搜索引擎的爬虫爬取有效信息，有利于SEO。除此之外，语义类还支持读屏软件，根据文章可以自动生成目录；
- 对开发者友好，使用语义类标签增强了可读性，结构更加清晰，开发者能清晰的看出网页的结构，便于团队的开发与维护；

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

## 3、🔥DOCTYPE(⽂档类型) 的作⽤
DOCTYPE是HTML5中一种标准通用标记语言的文档类型声明，它的目的是**告诉浏览器（解析器）应该以什么样（html或xhtml）的文档类型定义来解析文档**，不同的渲染模式会影响浏览器对 CSS 代码甚⾄ JavaScript 脚本的解析。它必须声明在HTML⽂档的第⼀⾏。
浏览器渲染页面的两种模式（可通过document.compatMode获取）：
- **CSS1Compat**：标准模式（Strick mode）默认模式，浏览器使用W3C的标准解析渲染页面。在标准模式中，浏览器以其支持的最高标准呈现页面。
- **BackCompat**：怪异模式(混杂模式)(Quick mode)，浏览器使用自己的怪异模式解析渲染页面。在怪异模式中，页面以一种比较宽松的向后兼容的方式显示。

## 4、script标签中defer和async的区别
如果没有`defer`或`async`属性，浏览器会立即加载并执行相应的脚本。它不会等待后续加载的文档元素，读取到就会开始加载和执行，这样就阻塞了后续文档的加载。
下图可以直观的看出三者之间的区别:
![202302071528472.png](https://imgs.itchenliang.club/img/202302071528472.png)
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
<meta charset="HTF-8">
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

## 7、img的srcset属性的作用
响应式页面中经常用到根据屏幕密度设置不同的图片。这时就用到了 img 标签的srcset属性。srcset属性用于设置不同屏幕密度下，img 会自动加载不同的图片。用法如下：
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

## 8、🔥行内元素有哪些？块级元素有哪些？空(void)元素有哪些？
- 行内元素：`a b span img input select strong label cite code`
- 块级元素：`div ul ol li dl dt dd h1 h2 h3 h4 h5 h6 p table form pre`

空元素：即没有内容的HTML元素。空元素是在开始标签中关闭的，也就是空元素没有闭合标签。
- 常见的：`br hr img input link meta`
- 鲜为人知的：`area base col colgroup command embed keygen param source track wbr`

## 9、⭐对web worker的理解
在 HTML 页面中，如果在执行脚本时，页面的状态是不可相应的，直到脚本执行完成后，页面才变成可相应。web worker 是运行在后台的 js，独立于其他脚本，不会影响页面的性能。 并且通过 postMessage 将结果回传到主线程。这样在进行复杂操作的时候，就不会阻塞主线程了。 
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
  ```manifest
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
- strong标签有语义，是起到加重语气的效果，而b标签是没有的，b标签只是一个简单加粗标签。b标签之间的字符都设为粗体，strong标签加强字符的语气都是通过粗体来实现的，而搜索引擎更侧重strong标签。
- title属性没有明确意义只表示是个标题，H1则表示层次明确的标题，对页面信息的抓取有很大的影响
- i内容展示为斜体，em表示强调的文本

## 13、iframe 有那些优点和缺点？
iframe 元素会创建包含另外一个文档的内联框架（即行内框架）。
**优点**
- 用来加载速度较慢的内容（如广告）
- 可以使脚本可以并行下载
- 可以实现跨子域通信

**缺点**
- iframe 会阻塞主页面的 onload 事件
- 无法被一些搜索引擎索识别
- 会产生很多页面，不容易管理

## 14、label 的作用是什么？如何使用？
label标签来定义表单控件的关系：当用户选择label标签时，浏览器会自动将焦点转到和label标签相关的表单控件上。
- 使用方法1
  ```html
  <label for="mobile">Number:</label>
  <input type="text" id="mobile" />
  ```
- 使用方法2
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

## 17、⭐文档声明（Doctype）和`<!DOCTYPE html>`有何作用? 严格模式与混杂模式如何区分？它们有何意义?
**文档声明的作用**：文档声明是为了告诉浏览器，当前`HTML`文档使用什么版本的`HTML`来写的，这样浏览器才能按照声明的版本来正确的解析。

**`<!DOCTYPE html>`的作用**： `<!DOCTYPE html>`的作用就是让浏览器进入标准模式，使用最新的`HTML5`标准来解析渲染页面；如果不写，浏览器就会进入混杂模式，我们需要避免此类情况发生。

**严格模式与混杂模式的区分**：
- **严格模式**： 又称为标准模式，指浏览器按照`W3C`标准解析代码；
- **混杂模式**： 又称怪异模式、兼容模式，是指浏览器用自己的方式解析代码。混杂模式通常模拟老式浏览器的行为，以防止老站点无法工作；

**区分**：网页中的`DTD`，直接影响到使用的是严格模式还是浏览模式，可以说`DTD`的使用与这两种方式的区别息息相关。
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
  主要是针对低版本的浏览器进行页面重构，保证基本的功能情况下，再针对高级浏览器进行效果、交互等方面的改进和追加功能，以达到更好的用户体验。
- （2）优雅降级 graceful degradation
  一开始就构建完整的功能，然后再针对低版本的浏览器进行兼容。

**两者区别**
- 优雅降级是从复杂的现状开始的，并试图减少用户体验的供给；而渐进增强是从一个非常基础的，能够起作用的版本开始的，并在此基础上不断扩充，以适应未来环境的需要；
- 降级（功能衰竭）意味着往回看，而渐进增强则意味着往前看，同时保证其根基处于安全地带。

“优雅降级”观点认为应该针对那些最高级、最完善的浏览器来设计网站。而将那些被认为“过时”或有功能缺失的浏览器下的测试工作安排在开发周期的最后阶段，并把测试对象限定为主流浏览器（如 IE、Mozilla 等）的前一个版本。 在这种设计范例下，旧版的浏览器被认为仅能提供“简陋却无妨 (poor, but passable)” 的浏览体验。可以做一些小的调整来适应某个特定的浏览器。但由于它们并非我们所关注的焦点，因此除了修复较大的错误之外，其它的差异将被直接忽略。 

“渐进增强”观点则认为应关注于内容本身。内容是建立网站的诱因，有的网站展示它，有的则收集它，有的寻求，有的操作，还有的网站甚至会包含以上的种种，但相同点是它们全都涉及到内容。这使得“渐进增强”成为一种更为合理的设计范例。这也是它立即被 Yahoo 所采纳并用以构建其“分级式浏览器支持 (Graded Browser Support)”策略的原因所在。 

## 20、说一下 HTML5 drag API 
- dragstart：事件主体是被拖放元素，在开始拖放被拖放元素时触发。
- darg：事件主体是被拖放元素，在正在拖放被拖放元素时触发。
- dragenter：事件主体是目标元素，在被拖放元素进入某元素时触发。
- dragover：事件主体是目标元素，在被拖放在某元素内移动时触发。
- dragleave：事件主体是目标元素，在被拖放元素移出目标元素是触发。
- drop：事件主体是目标元素，在目标元素完全接受被拖放元素时触发。
- dragend：事件主体是被拖放元素，在整个拖放操作结束时触发。

## 21、🔥新的 HTML5 文档类型和字符集是？
HTML5 文档类型很简单：
```html
<!DOCTYPE html>
```
HTML5 使用 UTF-8 编码示例：
```html
<meta charset=”UTF-8″>
```

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


<git-talk/> 