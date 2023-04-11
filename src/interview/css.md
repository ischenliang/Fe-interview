---
title: CSS面试题汇总
editLink: true
updated: 2023-02-09 14:47:30
lastUpdated: true
comment: true
---
<post-meta/>

# CSS面试题汇总
## 1、🔥px、rem、em、vw的区别？
- px是相对于显示器屏幕分辨率而言的，固定的一种单位
- em是相对于自身元素的字体大小而言的，譬如自身元素字体大小为16px，那么1em=16px，2em=32px
- rem是相对于根元素(`html`)字体大小而言的，浏览器默认的字体大小都是16px，那么1rem=16px，2rem=32px，可以根据设备的宽度，结合媒体查询（@media）来进行自适应的布局。
- vw是窗口的实际宽度，`1vw=1%`窗口的实际宽度。

- 对于只需要适配少部分手机设备，且分辨率对页面影响不大的，使用px即可 。
- 对于需要适配各种移动设备，使用rem，例如只需要适配iPhone和iPad等分辨率差别比较挺大的设备。

## 2、🔥vw、vh是什么？
`vw`和`vh`是 CSS3 新单位，即 view width 可视窗口宽度 和 view height 可视窗口高度。1vw 就等于可视窗口宽度的百分之一，1vh 就等于可视窗口高度的百分之一。

## 3、🔥介绍下BFC及其应用
所谓`BFC`，指的是一个独立的布局环境，`BFC`内部的元素布局与外部互不影响。

触发BFC的条件: 满足下面任意一个条件，这个元素都会被当做一个`BFC`
- body根元素
- 设置浮动`float`，不包括`none`
- 设置定位，`absoulte`或者`fixed`
- 行内块显示模式，`inline-block`
- 设置`overflow`，即`hidden，auto，scroll`
- 表格单元格，`table-cell`
- 弹性布局，`flex`

**注意**
- 并不是所有的元素都是BFC, 只有满足了上面的任意1个条件之后，这个元素才成为1个BFC。
- 一个BFC区域，只包含其所有子元素，不包含子元素的子元素.

**利用BFC解决问题**
> BFC有一个特点: **每一个BFC区域都是相互独立，互不影响的。**
- 1、解决外边距的塌陷问题(垂直塌陷)
  > 开发中，前端的布局手段，离不开外边距margin，那么，也会遇到一些问题，例如外边距的垂直塌陷问题。
  ![202303161021217.png](http://img.itchenliang.club/img/202303161021217.png)
  通过上面的例子，我们会发现，我们分别为两个`HM`都设置了四个方向的`margin`，按照正常情况来看，本应该两个`HM`垂直方向的间距是`100px + 100px = 200px`，但是现在确是`100px`，出现了`margin`的塌陷即，两段`margin`重叠了。
  > 利用BFC解决塌陷问题：可以将这两个盒子，放到两个BFC区域中，即可解决这个问题。
  ![202303161024381.png](http://img.itchenliang.club/img/202303161024381.png)
- 2、解决包含塌陷
  > 当父子关系的盒子，给子元素添加`margin-top`，有可能会把父元素一起带跑
  ![202303161025495.png](http://img.itchenliang.club/img/202303161025495.png)
  理想状态下，应该是`son`元素在`father`元素的顶部间距是`50px`，而此时是`fater`距离`body`的顶部间距是`50px`。
  > 利用BFC解决塌陷问题: 将父盒子变成一个独立的区域
  ![202303161029416.png](http://img.itchenliang.club/img/202303161029416.png)
- 3、当浮动产生影响的时候，可以利用BFC来清除浮动的影响
  ![202303161032186.png](http://img.itchenliang.club/img/202303161032186.png)
  上面例子中，一个没有设置高度的父盒子，包含了几个子元素，此时父元素的高度会被子元素撑开。如果为子元素都设置浮动的话效果会怎样呢
  ![2023031610341810.png](http://img.itchenliang.club/img/2023031610341810.png)
  从上面效果就能看出，当为子元素设置了浮动后，父盒子失去了原有的高度了。
  > 利用BFC解决高度丢失问题: 将父盒子变成一个独立的区域
  ![202303161036308.png](http://img.itchenliang.club/img/202303161036308.png)
- 4、BFC可以阻止标准流元素被浮动元素覆盖
  ![202303161038348.png](http://img.itchenliang.club/img/202303161038348.png)
  上面例子中，红色盒子设置了浮动，灰色盒子是标准流，默认情况下，浮动盒子覆盖了标准流盒子。
  > 利用BFC解决覆盖问题: 将灰色盒子的BFC触发
  ![202303161041181.png](http://img.itchenliang.club/img/202303161041181.png)
  


## 4、🔥介绍下 BFC、IFC、GFC 和 FFC
BFC、IFC、GFC 和 FFC 是 CSS 盒模型中的四种容器，用于控制盒子之间的排布和尺寸。
- **BFC(块级格式化上下文)**是一种独立的渲染区域，其中的元素按照特定规则进行排布。BFC 中的元素不会与外部元素重叠，而是在垂直方向上一个接一个地排列。
  - 使用场景: 
    - 清除浮动：当父元素包含浮动元素时，BFC可以防止父元素高度塌陷。
    - 防止`margin`合并：当相邻两个元素都设置了外边距时，BFC可以防止这些边距发生合并，从而避免产生意料之外的空白或布局问题。
    - 垂直居中：当一个元素垂直居中对其另一个元素时，可以使用BFC来实现。
  - 使用案例: 
    > 在一个包含浮动元素的父元素中，添加一个`overflow:hidden`属性，就可以创建一个新的BFC，并防止父元素高度塌陷。
    ```css
    .parent {
      overflow: hidden;
    }
    ```
- **IFC(行内格式化上下文)**是指一行文本或者一组行内元素所构成的渲染区域，IFC 中的元素会按照特定规则排列，并且会在水平方向上紧密排列，形成一行。
  - 使用场景: 
    - 实现文字和图标的对齐：通过使用 IFC 中的`vertical-align`属性，可以让行内元素垂直方向上对齐，从而实现图标和文字的对齐。
    - 创建水平菜单：通过设置列表项为行内元素，并设置其间距和边框，即可创建水平菜单。
  - 使用案例: 
    > 实现文字和图标的对齐：可以通过设置行内元素的`vertical-align`属性，将它们在垂直方向上对齐，从而实现图标和文字的对齐。
    ```html
    <div class="parent">
      <span class="icon"></span>
      <span class="text">Some text.</span>
    </div>
    <style>
      .icon {
        display: inline-block;
        width: 20px;
        height: 20px;
        background-image: url(icon.png);
        background-size: cover;
        vertical-align: middle; /* 对齐方式 */
      }
      .text {
        display: inline-block;
        vertical-align: middle; /* 对齐方式 */
      }
    </style>
    ```
- **GFC(网格格式化上下文)**是指使用 CSS 网格布局时，生成的渲染区域，其中的元素按照行和列进行排列，形成一个网格布局。
  - 使用场景: 
    - 创建复杂的网格布局：通过使用网格布局，可以将页面分割成网格，然后在这些网格中排列内容，从而实现复杂的布局结构。
    - 实现自适应布局：通过使用响应式的网格布局，可以让页面在不同的屏幕尺寸下自适应地调整布局。
  - 使用案例: 
    > 创建复杂的网格布局：可以使用网格布局，将页面分割成网格，并在这些网格中排列内容，从而实现复杂的布局结构。
    ```html
    <div class="grid-container">
      <div class="item item-1"></div>
      <div class="item item-2"></div>
      <div class="item item-3"></div>
      <div class="item item-4"></div>
    </div>
    <style>
      .grid-container {
        display: grid; /* 触发 GFC */
        grid-template-columns: repeat(2, 1fr); /* 定义两列等宽 */
        grid-gap: 20px; /* 设置网格之间的间隙 */
      }
      .item {
        background-color: #ccc;
        padding: 20px;
      }
      .item-1 {
        grid-row: 1 / 3; /* 占用两行 */
      }
      .item-2 {
        grid-column: 2 / 3; /* 占用一列 */
      }
      .item-3 {
        grid-row: 2 / 4; /* 占用两行 */
      }
      .item-4 {
        grid-column: 1 / 2; /* 占用一列 */
      }
    </style>
    ```
- **FFC(自适应/弹性盒子格式化上下文)**是指不需要开启特定属性就可以自动形成的格式化上下文，FFC 中的元素会根据父元素的尺寸自动调整大小和位置。
  - 使用场景: 
    - 实现弹性布局：通过使用 flexbox 布局，可以让元素在容器内自适应调整大小和位置，从而实现弹性布局。
    - 创建响应式设计：通过使用 FFC，可以让元素在容器内自动根据容器大小进行调整，从而实现响应式设计。
  - 使用案例: 
    > 实现弹性布局：可以通过使用`flexbox`布局，让元素在容器内自适应调整大小和位置，从而实现弹性布局。
    ```html
    <div class="container">
      <div class="item item-1"></div>
      <div class="item item-2"></div>
      <div class="item item-3"></div>
    </div>
    <style>
      .container {
        display: flex; /* 触发 FFC */
        justify-content: space-between; /* 沿主轴方向平均分布元素 */
      }
      .item {
        background-color: #ccc;
        padding: 20px;
      }
      .item-1 {
        flex-basis: 30%; /* 设置元素基础尺寸为30% */
      }
      .item-2 {
        flex-grow: 1; /* 自动扩展，占据剩余空间 */
      }
      .item-3 {
        flex-basis: 200px; /* 固定宽度为200px */
      }
    </style>
    ```


## 5、🔥flex布局如何使用？
`flex`是`Flexible Box`的缩写，意为"弹性布局"。指定容器`display: flex`或`inline-flex`即可。
- 容器属性: 
  - `display`：指定容器使用Flex布局。
  - `flex-direction`：指定项目排列方向，包括`row、row-reverse、column 和 column-reverse`四个值。
  - `flex-wrap`：指定项目是否换行，并且如何换行，包括`nowrap、wrap 和 wrap-reverse`三个值。
  - `justify-content`：指定主轴上项目的对齐方式，包括`flex-start、flex-end、center、space-between、space-around 和 space-evenly`六个值。
  - `align-items`：指定交叉轴上项目的对齐方式，包括`flex-start、flex-end、center、baseline 和 stretch`五个值。
  - `align-content`：指定多根轴线的对齐方式，只有在存在多根轴线时才会生效，包括`flex-start、flex-end、center、space-between、space-around 和 stretch`六个值。
- 项目(子元素)属性:
  - `order`：指定项目的排列顺序。
  - `flex-grow`：指定项目在空间充足时，放大比例的大小。
  - `flex-shrink`：指定项目在空间不足时，缩小比例的大小。
  - `flex-basis`：指定项目在分配多余空间之前的初始大小。
  - `flex`：是`flex-grow, flex-shrink 和 flex-basis`的缩写属性。
  - `align-self`：指定单个项目的对齐方式，覆盖容器的`align-items`属性。


## 6、🔥grid布局如何使用？
Grid布局是一种二维网格布局模型，指定容器`display: grid`或`inline-grid`即可。
- 容器属性:
  - `grid-template-columns`：定义列的数量和大小。
  - `grid-template-rows`：定义行的数量和大小。
  - `grid-template-areas`：定义网格区域的名称和排列方式。
  - `grid-template`：是`grid-template-rows, grid-template-columns 和 grid-template-areas`的缩写属性。
  - `grid-column-gap`：定义列之间的间隔大小。
  - `grid-row-gap`：定义行之间的间隔大小。
  - `grid-gap`：是`grid-row-gap 和 grid-column-gap`的缩写属性。
  - `justify-items`：定义单元格内容在列方向上的对齐方式。
  - `align-items`：定义单元格内容在行方向上的对齐方式。
  - `justify-content`：定义整个网格沿着列方向上的对齐方式。
  - `align-content`：定义整个网格沿着行方向上的对齐方式。
- 项目(子元素)属性: 
  - `grid-column-start`和`grid-column-end`：定义单元格跨越的列区域。
  - `grid-row-start`和`grid-row-end`：定义单元格跨越的行区域。
  - `grid-column`和`grid-row`：是`grid-column-start, grid-column-end, grid-row-start 和 grid-row-end`的缩写属性。
  - `grid-area`：定义单元格所占据的全部区域。
  - `justify-self`：定义单元格内容在列方向上的对齐方式，覆盖容器的`justify-items`属性。
  - `align-self`：定义单元格内容在行方向上的对齐方式，覆盖容器的`align-items`属性。


## 7、⭐分析比较 opacity: 0、visibility: hidden、display: none区别、优劣和适用场景
`opacity:0`、`visibility:hidden`和`display:none`都可以隐藏元素，但它们的实现方式不同，适用的场景也不同。
- `opacity: 0`：元素依然占据屏幕空间，但变得完全透明。该属性可以通过动画效果实现淡入淡出等过渡效果，同时仍会影响页面布局，同时也会响应绑定的监听事件。
- `visibility: hidden`：元素被隐藏，但它仍占据它原来的位置和空间。该属性通常用于需要在用户交互后显示/隐藏的元素，例如下拉菜单或弹出框，但是不会响应绑定的监听事件。
- `display: none`：元素从页面中移除，并且不占据任何屏幕空间。该属性可以完全移除元素，同时避免对页面布局的影响，但也意味着该元素无法再次被检索到，也不会响应绑定的监听事件。

使用场景:
- `opacity: 0`：适用于需要在当前位置播放动画或过渡效果的元素，如图片轮播、页面滚动等。
- `visibility: hidden`：适用于需要在用户操作后显示的元素，如下拉菜单、输入框等。
- `display: none`：适用于需要完全隐藏元素且不影响页面布局的场景，如模态框、某个状态下不需要显示的元素等。


## 8、🔥如何用 css 或 js 实现多行文本溢出省略效果，考虑兼容性
CSS 实现方式
- 单行
  ```css
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  ```
- 多行
  ```css
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; //行数
  overflow: hidden;
  ```
- 兼容
  ```css
  p{
    position: relative;
    line-height: 20px;
    max-height: 40px;
    overflow: hidden;
  }
  p::after{
    content: "...";
    position: absolute;
    bottom: 0;
    right: 0;
    padding-left: 40px;
    background: -webkit-linear-gradient(left, transparent, #fff 55%);
    background: -o-linear-gradient(right, transparent, #fff 55%);
    background: -moz-linear-gradient(right, transparent, #fff 55%);
    background: linear-gradient(to right, transparent, #fff 55%);
  }
  ```

JS 实现方式:
- 使用`split` + `正则表达式`将单词与单个文字切割出来存入words
- 加上 '...'
- 判断`scrollHeight`与`clientHeight`，超出的话就从`words`中`pop`一个出来


## 9、居中为什么要使用 transform（为什么不使用 marginLeft/Top）
在实现元素居中时，使用`transform`属性进行平移的优点在于它可以实现更加灵活和精准的位置控制。相比于使用`margin-left`和`margin-top`来控制元素居中，使用`transform`有以下优势：
1. `transform`可以使用小数值来调整元素的位置，而`margin`只能使用整数值。这意味着，使用`transform`可以更加精确地控制元素的位置。
2. 使用`transform`不会影响文档流和元素的盒模型，而使用`margin`可能会影响页面布局和其他元素的位置。这意味着，使用`transform`更加可靠且不容易出现不良的副作用。
3. 由于`transform`是通过 GPU 加速实现的，因此它通常比`margin`更加高效和快速。这意味着，在需要频繁更新或动画的场景下，使用`transform`可以提高性能和用户体验。
4. 使用`transform`还可以允许我们使用其他的`transform`属性（如旋转、缩放、斜切等），从而实现更加复杂和丰富的视觉效果。


## 10、🔥介绍下粘性布局（sticky）
`position`中的`sticky`值是 CSS3 新增的，设置了 `sticky` 值后，在屏幕范围（viewport）时该元素的位置并不受到定位影响（设置使`top`、`left`等属性无效），当该元素的位置将要移出偏移范围时，定位又会变成`fixed`，根据设置的`left`、`top`等属性成固定位置的效果。
::: tip 注意
`position: sticky`必须结合`top`、`left`、`right`、`bottom`使用，否则无效
- 当同时设置`top`和`bottom`时，`top`优先级高；
- 当同时设置`left`和`right`时，`left`优先级高；
```html
<style>
  .tips {
    height: 100px;
    background: #ccc;
  }
  header {
    height: 60px;
    background: blue;
    position: sticky; /* 必须结合top，left，right，bottom四个属性使用 */
    top: 0;
  }
  main {
    height: 1000px;
    background: #eee;
  }
</style>
<body>
  <div class="tips">tips</div>
  <header>header</header>
  <main>content</main>
</body>
```
演示效果
![2023031610081310.gif](http://img.itchenliang.club/img/2023031610081310.gif)
:::
sticky 属性值有以下几个特点：
- 该元素并不脱离文档流，仍然保留元素原本在文档流中的位置。
- 当元素在容器中被滚动超过指定的偏移值时，元素在容器内固定在指定位置。亦即如果你设置了top: 50px，那么在sticky元素到达距离相对定位的元素顶部50px的位置时固定，不再向上移动。
- 元素固定的相对偏移是相对于离它最近的具有滚动框的祖先元素，如果祖先元素都不可以滚动，那么是相对于viewport来计算元素的偏移量


## 11、⭐说出 space-between 和 space-around 的区别？
这个是`flex`布局的内容，其实就是一个边距的区别，按水平布局来说:
- `space-between`是两端对齐，在左右两侧没有边距，元素中间间距相等；
  ![202303160953243.png](http://img.itchenliang.club/img/202303160953243.png)
- `space-around`是每个子项目左右方向的`margin`相等，所以子项目之间的间隔比项目与边缘的间隔大一倍；
  ![202303160953469.png](http://img.itchenliang.club/img/202303160953469.png)
- `space-evenly`是每个子项目和两端间距相等；
  ![202303160954084.png](http://img.itchenliang.club/img/202303160954084.png)


## 12、⭐CSS3 中transition和animation的区别，属性分别有哪些
**区别**：
- `transition`: 是过渡属性，强调过渡，它的实现需要触发一个事件(比如鼠标移入移出、焦点、点击等)才执行动画；
  - `transition-property`：指定过渡的css属性的name
  - `transition-duration`：指定过渡所需的完成时间
  - `transition-timing-function`：指定过渡函数
  - `transition-delay`：指定过渡的延迟时间
  ```css
  div{
    width:100px;
    height:100px;
    background:red;
    transition: width 2s ease-out 1s;
  }
  div:hover{
    width: 300px;
  }
  ```
  ![202303171625518.gif](http://img.itchenliang.club/img/202303171625518.gif)
- `animation`: 是动画属性，它的实现不需要触发事件，设定好时间之后可以自己执行，且可以循环一个动画；
  - `animation-name`：指定要绑定到选择器的关键帧的名称
  - `animation-duration`：动画指定需要多少秒或毫秒完成
  - `animation-timing-function`：设置动画将如何完成一个周期
  - `animation-delay`：设置动画在启动前的延迟间隔
  - `animation-iteration-count`：定义动画的播放次数
  - `animation-direction`：指定是否应该轮流反向播放动画
  - `animation-fill-mode`：规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式
  - `animation-play-state`：指定动画是否正在运行或已暂停
  ```js
  div {
    width:100px;
    height:100px;
    background:red;
    position:relative;
    animation: mymove 5s linear infinite;
  }
  @keyframes mymove {
    from { left: 0px; }
    to { left: 200px; }
  }
  ```
  ![202303171630317.gif](http://img.itchenliang.club/img/202303171630317.gif)


## 13、⭐讲一下png8、png16、png32的区别，并简单讲讲 png 的压缩原理
PNG（Portable Network Graphics）是一种无损压缩的图像格式，与 JPEG 和 GIF 不同，它不会丢失图像质量。PNG 格式支持多种颜色深度和透明度，其中包括 PNG8、PNG16 和 PNG32。
> 在 PNG 图像中，像素是由一个 RGB 或 RGBA 值组成的。RGB 指红绿蓝三个颜色通道，而 RGBA 则是加上了一个 alpha 通道，用于控制透明度。在 PNG8 中，每个像素的颜色值只能由调色板中的一个颜色来表示，而在 PNG16 和 PNG32 中，则可以使用更多的颜色值进行表示。
1. PNG8 是 8 位（256 色）调色板模式，它可以最大限度地减小文件大小，并提供了透明度控制，但是它只能显示有限的颜色数目。
2. PNG16 是 16 位模式，它可以显示更多的颜色，但是不能提供透明度控制。
3. PNG32 是 32 位模式，它可以显示数百万种颜色并提供完全透明度控制，但其文件大小通常较大。

**压缩原理**
> 是使用 DEFLATE 算法进行无损压缩。该算法首先通过 LZ77 算法找到重复的数据块，然后使用 Huffman 编码算法对这些重复块进行压缩，并将结果保存在 PNG 文件中。由于 DEFLATE 算法是无损压缩，因此可以保证 PNG 图像的质量不受影响。


## 14、🔥如何用 CSS 实现一个三角形
可以利用 border 属性
利用盒模型的`border`属性上下左右边框交界处会呈现出平滑的斜线这个特点，通过设置不同的上下左右边框宽度或者颜色即可得到三角形或者梯形。

如果想实现其中的任一个三角形，把其他方向上的`border-color`都设置成透明即可。
```html
<div></div>
<style>
  div {
    width: 0;
    height: 0;
    border: 10px solid red;
    border-top-color: transparent;
    border-left-color: transparent;
    border-right-color: transparent;
  }
</style>
```

## 15、⭐如何实现一个自适应的正方形
### 方法1：利用 CSS3 的 vw 单位
`vw`会把视口的宽度平均分为 100 份
```css
.square {
 width: 10vw;
 height: 10vw;
 background: red;
}
```

### 方法2：利用 margin 或者 padding 的百分比计算是参照父元素的 width 属性
```css
.square {
 width: 10%;
 padding-bottom: 10%; 
 height: 0; // 防止内容撑开多余的高度
 background: red;
}
```


## 16、🔥清除浮动的方法
- **浮动的原理**: 使当前元素脱离普通流，相当于浮动起来一样，浮动的框可以左右移动。
- **浮动的设置**: css属性的`float`设置，可选值:
  - left: 左浮动
  - right: 右浮动
  - none: 默认值，不浮动
- **浮动的影响**: 对附近的元素布局造成改变，使得布局混乱
- **清除浮动的几种方法**:
  - 1、为父元素设置`overflow`属性，可以是`auto`和`hidden`
    > 解决高度塌陷问题
    ```html
    <style>
      .div1{
        background: #000080;
        border: 1px solid red;
        overflow: hidden; /* 不设置会导致div1高度不撑开 */
      }
      .left{
        float: left;
        width: 20%;
        height: 200px;
        background: #DDD;
      }
    </style>
    <div class="div1">
      <div class="left">Left</div>
    </div>
    ```
  - 2、`clear: both`清除浮动
    > 在父元素的末尾添加一个空div标签，并设置`clear: both`属性
    ```html
    <style>
      .div1{
        background: #000080;
        border: 1px solid red;
      }
      .left{
        float: left;
        width: 20%;
        height: 200px;
        background: #DDD;
      }
    </style>
    <div class="div1">
      <div class="left">Left</div>
      <div style="clear: both;"></div>
    </div>
    ```
  - 3、为父级元素设置`height`高度
    ```html
    <style>
      .div1{
        background: #000080;
        border: 1px solid red;
        height: 200px;
      }
      .left{
        float: left;
        width: 20%;
        height: 200px;
        background: #DDD;
      }
    </style>
    <div class="div1">
      <div class="left">Left</div>
    </div>
    ```
  - 4、为父级设置`after`伪类，万能法(<font color=red>推荐使用</font>)
    ```html
    <style>
      .div1 {
        background: #000080;
        border: 1px solid red;
        *zoom: 1; /* ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行 */
      }
      .div1::after {
        content: "";
        display: block;
        height: 0;
        clear: both;
      }
      .left{
        float: left;
        width: 20%;
        height: 200px;
        background: #DDD;
      }
    </style>
    <div class="div1">
      <div class="left">Left</div>
    </div>
    ```
- 5、使用`flexbox`布局清除浮动：将浮动元素的父元素设置为`display: flex`，并使用`flex-wrap`属性来控制换行。例如：
  ```css
  .parent {
    display: flex;
    flex-wrap: wrap;
  }
  ```


## 17、🔥说说两种盒模型以及区别
盒模型也称为框模型，就是从盒子顶部俯视所得的一张平面图，用于描述元素所占用的空间。它有两种盒模型，W3C盒模型和IE盒模型（IE6以下，不包括IE6以及怪异模式下的IE5.5+）。
![202302091538234.png](http://img.itchenliang.club/img/202302091538234.png)
![2023020915383510.png](http://img.itchenliang.club/img/2023020915383510.png)

盒模型都是由四个部分组成：margin、border、padding、content

标准盒模型的IE盒模型的区别在于设置`width`和`height`时，所对应的范围不同：
- 标准盒模型：`width和height`属性的范围只包含`content`
- IE盒模型：`width和height`的范围包含了`border`、`padding`和`content`

可以通过修改元素的`box-sizing`属性来改变元素的盒模型：
- `box-sizing: content-box;`表示标准盒模型(默认值)
- `box-sizing: border-box;`表示IE模型(怪异盒模型)


## 18、🔥如何触发重排和重绘？
任何改变用来构建渲染树的信息都会导致一次重排或重绘：
- 添加、删除、更新DOM节点 - `重排和重绘`
- 通过display: none隐藏一个DOM节点 - `重排和重绘`
- 通过visibility: hidden隐藏一个DOM节点 - `只重绘`，因为没有几何变化
- 移动或者给页面中的DOM节点添加动画 - `重排和重绘`
- 添加一个样式表，调整样式属性 - `重排和重绘`
- 用户行为，例如调整窗口大小，改变字号，或者滚动 - `重排和重绘`

## 19、🔥重绘与重排的区别？
- **重排(reflow)**：指的是元素在页面中的位置和布局发生了变化，例如添加、删除或修改了元素的尺寸、位置、内容等。重排会触发浏览器重新计算元素的位置和大小，并且重新布局整个页面，因此代价较高，应该尽量避免频繁发生。
- **重绘(repaint)**：指的是元素外观的更新，例如颜色、背景等样式属性的变化，但元素在页面中的位置和布局不会发生改变。

单单改变元素的外观，肯定不会引起网页重新生成布局，但当浏览器完成重排之后，将会重新绘制受到此次重排影响的部分

重排和重绘代价是高昂的，它们会破坏用户体验，并且让UI展示非常迟缓，而相比之下重排的性能影响更大，在两者无法避免的情况下，一般我们宁可选择代价更小的重绘。

**『重绘』不一定会出现『重排』，『重排』必然会出现『重绘』**


## 20、⭐如何优化图片
1. 对于很多装饰类图片，尽量不用图片，因为这类修饰图片完全可以用 CSS 去代替。
2. 对于移动端来说，屏幕宽度就那么点，完全没有必要去加载原图浪费带宽。一般图片都用 CDN 加载，可以计算出适配屏幕的宽度，然后去请求相应裁剪好的图片。
3. 小图使用 base64 格式
4. 将多个图标文件整合到一张图片中（雪碧图）
5. 选择正确的图片格式：

- 对于能够显示 WebP 格式的浏览器尽量使用 WebP 格式。因为 WebP 格式具有更好的图像数据压缩算法，能带来更小的图片体积，而且拥有肉眼识别无差异的图像质量，缺点就是兼容性并不好
- 小图使用 PNG，其实对于大部分图标这类图片，完全可以使用 SVG 代替
- 照片使用 JPEG

## 21、你能描述一下渐进增强和优雅降级之间的不同吗?
**渐进增强 （progressive enhancement）**：针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。

**优雅降级 （graceful degradation）**：一开始就构建完整的功能，然后再针对低版本浏览器进行兼容。

**<p><font color=red>区别</font></p>**
优雅降级是从复杂的现状开始，并试图减少用户体验的供给，而渐进增强则是从一个非常基础的，能够起作用的版本开始，并不断扩充，以适应未来环境的需要。降级（功能衰减）意味着往回看；而渐进增强则意味着朝前看，同时保证其根基处于安全地带。


## 22、🔥CSS3 新增了那些东西？
CSS3 新增东西众多，这里列举出一些关键的新增内容：
- 选择器: :not(.input)
- 盒子模型属性：border-radius、box-shadow、border-image
- 背景：background-size、background-origin、background-clip
- 文本效果：text-shadow、word-wrap
- 颜色：新增 RGBA，HSLA 模式
- 渐变：线性渐变(linear-gradient)、径向渐变(radial-gradient)
- 字体：@font-face
- 2D/3D转换：transform、transform-origin
- 过渡与动画：transition、@keyframes、animation
- 多列布局
- 媒体查询


## 23、🔥隐藏页面中的某个元素的方法有哪些？
**<p>隐藏类型</p>**
屏幕并不是唯一的输出机制，比如说屏幕上看不见的元素（隐藏的元素），其中一些依然能够被读屏软件阅读出来（因为读屏软件依赖于可访问性树来阐述）。为了消除它们之间的歧义，我们将其归为三大类：
- 完全隐藏：元素从渲染树中消失，不占据空间。
- 视觉上的隐藏：屏幕中不可见，占据空间。
- 语义上的隐藏：读屏软件不可读，但正常占据空。

**完全隐藏**
- display 属性
  ```css
  display: none;
  ```
- hidden 属性 HTML5 新增属性，相当于 display: none
  ```html
  <div hidden></div>
  ```

**视觉上的隐藏**
- 设置 posoition 为 absolute 或 fixed，通过设置 top、left 等值，将其移出可视区域。
  ```css
  position:absolute;
  left: -99999px;
  ```
- 设置 position 为 relative，通过设置 top、left 等值，将其移出可视区域。
  ```css
  margin-left: -99999px;
  height: 0;
  ```

**语义上隐藏**
- aria-hidden 属性：读屏软件不可读，占据空间，可见。
  ```html
  <div aria-hidden="true"></div>
  ```

## 24、🔥css选择器及其优先级
![202302081749272.png](http://img.itchenliang.club/img/202302081749272.png)

对于选择器的优先级：
- 通用选择器(`*`)、子选择器(`>`)、相邻选择器(`+`)、同胞选择器(`~`): 0
- 标签选择器、伪元素选择器：1
- 类选择器、伪类选择器、属性选择器：10
- id选择器：100
- 内联样式：1000
- `!important`: 10000

总结: **`!important` > `内联选择器` > `id选择器` > `类选择器` > `标签选择器` > `通配选择器`**

**权重值计算**
```js
div#app.child[name="appName"] = 标签选择器 + id选择器 + 类选择器 + 属性选择器
权重 = 1 + 100 + 10 + 10 = 121

.class p[type="text"] = 类选择器 + 标签选择器 + 属性选择择器
权重 = 10 + 1 + 10 = 21
```

**同胞选择器`~`演示**
```html
<style>
	.box1 { width: 200px;height: 200px;background: #ddd; }
	.box2 { width: 200px;height: 200px;background: red; }
	.box1 ~ div {
	 border: 1px solid blue;
	}
</style>
<div class="box1">
  <div></div>
</div>
<div class="box2"></div>
```
![202303171730108.png](http://img.itchenliang.club/img/202303171730108.png)


## 25、CSS中可继承与不可继承属性有哪些？
### 不可继承属性
- display：规定元素应该生成的框的类型
- 文本属性：vertical-align(文本垂直对齐)、text-decoration(文本的装饰)、tex-shadow(文本阴影)、white-space(空白符的处理)、unicode-bidi(文本的方向)
- 盒子模型的属性：width、height、margin、border、padding
- 背景属性：background、background-color、background-image、background-repeat、background-position、background-attachment
- 定位属性：float、clear、position、top、right、left、bottom、min-width、min-height、max-width、max-height、overflow、clip、z-index
- 生成内容属性：content、counter-reset、counter-increment
- 轮廓样式属性：outline、outline-style、outline-width、outline-color
- 页面样式属性：size、page-break-before、page-break-after
- 声音样式属性：pause-before、pause-after、pause、cue-before、cue-after、cue、play-during

### 可继承属性
- 字体系列属性：font-family(字体系列)、font-weight(字体粗细)、font-size(字体大小)、font-style(字体风格)
- 文本系列属性：text-indent(文本缩进)、text-align(文本水平对齐)、line-height(文本行高)、word-spacing(单词间距)、letter-spacing(中文或者字母间距)、text-transform(文本大小写，uppercase、lowercase、capitalize)、color(字体颜色)
- 元素可见属性：visibility(元素显示隐藏)
- 列表布局属性：list-style(列表风格)、list-style-type、list-style-image、list-style-position
- 光标属性：cursor(光标显示状态)

## 26、display的属性值及其作用
- none：隐藏对象。与`visibility`属性的`hidden`值不同，其不为被隐藏的对象保留其物理空间
- inline：指定对象为内联元素。
- block：指定对象为块元素。
- list-item：指定对象为列表项目。
- inline-block：指定对象为内联块元素。(CSS2)
- table：指定对象作为块元素级的表格。类同于html标签`<table>`(CSS2)
- inline-table：指定对象作为内联元素级的表格。类同于html标签`<table>`(CSS2)
- table-caption：指定对象作为表格标题。类同于html标签`<caption>`(CSS2)
- table-cell：指定对象作为表格单元格。类同于html标签`<td>`(CSS2)
- table-row：指定对象作为表格行。类同于html标签`<tr>`(CSS2)
- table-row-group：指定对象作为表格行组。类同于html标签`<tbody>`(CSS2)
- table-column：指定对象作为表格列。类同于html标签`<col>`(CSS2)
- table-column-group：指定对象作为表格列组显示。类同于html标签`<colgroup>`(CSS2)
- table-header-group：指定对象作为表格标题组。类同于html标签`<thead>`(CSS2)
- table-footer-group：指定对象作为表格脚注组。类同于html标签`<tfoot>`(CSS2)
- run-in：根据上下文决定对象是内联对象还是块级对象。(CSS3)
- box：将对象作为弹性伸缩盒显示。（伸缩盒最老版本）(CSS3)
- inline-box：将对象作为内联块级弹性伸缩盒显示。（伸缩盒最老版本）(CSS3)
- flexbox：将对象作为弹性伸缩盒显示。（伸缩盒过渡版本）(CSS3)
- inline-flexbox：将对象作为内联块级弹性伸缩盒显示。（伸缩盒过渡版本）(CSS3)
- flex：将对象作为弹性伸缩盒显示。（伸缩盒最新版本）(CSS3)
- inline-flex：将对象作为内联块级弹性伸缩盒显示。（伸缩盒最新版本）(CSS3)


## 27、display的block、inline和inline-block的区别
- **block**：元素会独占一行，多个元素会令其一行，可以设置width、height、margin和padding属性；
- **inline**：元素不会独占一行，设置width、height属性无效，但可以设置水平方向的margin和padding属性，垂直方向设置无效；
- **inline-block**：允许元素像`inline`元素一样被定位，但同时也可以设置高度、宽度、内边距和外边距，就像`block`元素一样。
  ```html
  <style>
    .container {
      display: inline-block;
      height: 100px;
      background: red;
    }
  </style>
  <span class="container">
    <span>item1</span>
    <span>item2</span>
    <span>item3</span>
  </span>
  ```

对于行内元素和块级元素，特点如下：
- **行内元素**
  - 设置宽高无效
  - 可以设置水平方向的margin和padding，垂直方向设置则无效
  - 不会自动换行
- **块级元素**
  - 可以设置宽高
  - 设置margin和padding都有效
  - 会自动换行
  - 多个块状，排列方式从上往下

## 27、隐藏元素的方法有哪些？
- `display: none`：渲染树不会包含该渲染对象，因此该元素不会在页面中占据位置，也不会响应绑定的监听事件
- `visibility: hidden`：元素在页面中仍占据空间，但是不会响应绑定的监听事件
- `opacity: 0`：将元素的透明度设置为0，以此隐藏元素，元素在页面中仍占据空间，同时也会响应绑定的监听事件
- `z-index: 负值`：通过调整元素的层级，使其被其他元素遮盖
- `position: absolute`：通过使用绝对定位将元素移除可视区域内
- `clip/clip-path`：使用元素裁剪的方式，元素仍在页面中占据空间，但是不会响应绑定的监听事件
- `transform: scale(0, 0)`：将元素缩放为0，元素仍在页面中占据空间，但是不会响应绑定的监听事件

## 28、link和@import的区别
两者都可以用来引入外部样式表文件，但是有以下几点区别：
1. **加载顺序**：在页面加载时，`link`标签引入的CSS会同时被加载，而`@import`引入的CSS会等到页面加载完毕后再加载。
2. **兼容性**：`@import`只能被IE5及以上版本的浏览器识别，而`link`标签没有这个限制。
3. **DOM可控性**：`link`标签可以通过JavaScript操作DOM动态地改变样式，而`@import`不支持。
4. **权重**：当存在相同选择器时，`link`引入的样式优先级更高，而`@import`引入的样式优先级较低。

因此，在实际使用中，尽量使用`link`标签引入外部样式表。只有在某些特殊情况下（如需要在某些条件下才引入样式），才考虑使用`@import`。


## 29、伪元素和伪类的区别和作用？
- 伪元素使用 2 个冒号，伪类使用1个冒号；
- **伪元素添加了一个页面中没有的元素（只是从视觉效果上添加了，不是在文档树中添加）， 伪类是给页面中已经存在的元素添加一个类**；

### 伪元素
用于创建一些不在文档树中的元素，并为其添加样式，例如：
```css
p::before { content: '第一章' }
p::after { content: '第一章' }
p::first-line { background: red; }
p::first-letter { font-size: 20px; }
p::selection { color: #ccc; }
```

### 伪类
用于当已有元素处于某个状态的时候，我们为其添加对应的样式，例如：
```css
a:hover { color: red }
p:first-child { color: blue; }
```
CSS3新增伪类：
- `p:first-of-type`: 选择属于其父元素的首个`<p>`元素的每个`<p>`元素。
- `p:last-of-type`: 选择属于其父元素的最后`<p>`元素的每个`<p>`元素。
- `p:only-of-type`: 选择属于其父元素唯一的`<p>`元素的每个`<p>`元素。
- `p:only-child `: 选择属于其父元素的唯一子元素的每个`<p>`元素。
- `p:nth-child(2)`: 选择属于其父元素的第二个子元素的每个`<p>`元素。
- `:enabled、:disabled`: 控制表单控件的禁用状态。
- `:checked`: 单选框或复选框被选中。

**总结**：伪类的操作对象是文档树中已有的元素，而伪元素则创建了一个文档树外的元素。因此，伪类和伪元素的区别在于：有没有创建一个文档树之外的元素。
[参考](https://blog.csdn.net/weixin_51610980/article/details/128553661)


## 30、对requestAnimation的理解
`requestAnimationFrame`是浏览器提供的一种API，它允许开发者在下一次页面重绘之前执行指定的函数，通常用于实现动画效果。相比使用`setTimeout`或`setInterval`来实现动画，`requestAnimationFrame`的优势在于它可以避免掉帧的问题，并且能够更好地利用系统资源，提高动画的性能和流畅度。
```js
const element = document.getElementById('box');
let position = 0;
function animate() {
  position += 1;
  element.style.transform = `translateX(${position}px)`;
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
```
这段代码会让一个`id`为`"box"`的元素向右移动，每次移动一个像素。通过调用`requestAnimationFrame`函数，浏览器会在下一次页面重绘之前执行`animate`函数，实现了动画效果。由于`requestAnimationFrame`的使用方式较为简单，因此它经常被用于实现各种网页动画。


## 31、为什么有时候用translate来改变位置而不是定位？
`translate`是`transform`属性的一个值，改变`transform`或`opacity`不会触发浏览器重排(reflow)或重绘(repaint)，只会触发复合(compositions)，而改变绝对定位会触发重排，进而触发重绘和复合。

`transform`使浏览器为元素创建一个GPU图层，但改变绝对定位会使用到CPU，因此`translate`更高效，可以缩短平滑动画的绘制时间，而translate改变位置时，元素依然会占据原始空间，绝对定位就不会发生这种情况。


## 32、li与li之间有看不见的空白间隔是什么原因引起？如何解决？
浏览器会把inline内联元素间的空白字符(空格、换行、tab等)渲染成一个空格，为了美观，通常是一个`<li>`放在一行，如下面所示：
```html
<ul>
  <li>
    哈哈
  </li>
</ul>
```
这样就导致产生了换行字符，它变成了一个空格，占用了一个字符的宽度。

**解决方法**：
- 为所有`<li>`设置`float: left`。不足：有些容器是不能设置浮动的，如左右切换的焦点图等
- 将所有`<li>写在同一行`。不足：代码不美观
  ```html
  <ul>
    <li>哈哈</li>
  </ul>
  ```
- 将`<ul>`内的字符尺寸设为0，即`font-size: 0`。不足：`<ul>`中的其他字符尺寸也被设为0，需要额外重新设定其他字符尺寸，且在Safari浏览器依然会出现空白间隔
  ```css
  ul {
    font-size: 0px;
  }
  ```
- 消除`<ul>`的字符间隔`letter-spacing: -8px`。不足：这也设置了`<li>`内的字符间隔，一次需要将`<li>`内的字符间隔设置为默认`letter-spacing: normal`
  ```css
  ul {
    letter-spacing: -8px;
  }
  ul li {
    letter-spacing: normal;
  }
  ```


## 33、替换元素的概念及计算规则
替换元素指的是在渲染过程中，由浏览器根据元素的标签和属性生成的具有固定大小和内容的元素。例如，`img`、`video`、`iframe`等元素就是替换元素。

CSS计算替换元素的尺寸时，会根据以下规则进行计算：
1. 如果元素有明确的尺寸（如width和height属性），则使用这些值作为尺寸。
2. 如果元素没有明确的尺寸，但有默认的尺寸（如img元素的默认宽度为实际图片宽度），则使用默认尺寸。
3. 如果元素既没有明确的尺寸也没有默认的尺寸，则按照其父元素的尺寸或其他相关因素来计算尺寸。
4. 如果元素的尺寸无法确定，则视情况而定，可能会显示为空白或者以默认尺寸渲染。


## 34、常见的图片格式及使用场景
常见的图片格式有：
1. JPEG(.jpg/.jpeg)：适用于照片和图像，支持高压缩比，但是可能会损失一些细节和质量。
2. PNG(.png)：适用于图标、透明图片以及需要无损压缩的图片，支持透明度，文件大小相对较大。
3. GIF(.gif)：适用于动画和简单图形，支持动画和透明度，但是色彩表现力较差。
4. SVG(.svg)：矢量图形格式，支持无限放大而不失真，适用于图标和简单图形。
5. WebP(.webp)：由谷歌开发的图片格式，支持高压缩比和透明度，文件大小相对较小。

使用场景如下：
1. 如果需要在网页上显示照片或图像，通常使用JPEG格式。
2. 如果需要显示透明图片或者图片需要无损压缩，通常使用PNG格式。
3. 如果需要制作动画，通常使用GIF格式。
4. 如果需要制作图标或简单图形，通常使用SVG格式。
5. 如果需要提高网页加载速度或者需要在移动设备上显示图片，可以考虑使用WebP格式。


## 34、对 CSSSprites 的理解
CSSSprites（精灵图或雪碧图），将一个页面涉及到的所有图片都包含到一张大图中去，然后利用CSS的 background-image，background-repeat，background-position属性的组合进行背景定位。

实践：以[JD首页最底部版权栏](https://www.jd.com/)为例
```html
<div class="box1"></div>
<div class="box2"></div>
<div class="box3"></div>
<div class="box4"></div>
<div class="box5"></div>
<div class="box6"></div>
```
```css
div {
  width: 103px;
  height: 32px;
  float: left;
  margin: 10px;
  background-image: url(http://img.itchenliang.club/img/202302141017007.png);
}
.box1{background-position: -205px -111px;}  /*第一个图的位置,从图片的左上角开始计算*/
.box2{background-position:-205px  -74px;}
.box3{background-position: -205px -37px;}
.box4{background-position: -205px -0px;}
.box5{background-position: 0px 79px;}
.box6{background-position:-205px 86px;}
```
效果如下：
- 原图
  ![202302141015522.png](http://img.itchenliang.club/img/202302141017007.png)
- 效果图
  ![202302141018594.png](http://img.itchenliang.club/img/202302141018594.png)

优点：
- 减少 HTTP 请求数，极大地提高页面加载速度。
- 增加图片信息重复度，提高压缩比，减少图片大小。
- css sprites 能减少图片的字节，把3张图片合并成1张图片的字节总是小于这3张图片的字节总和
- 更换风格方便，只需在一张或几张图片上修改颜色或样式即可实现。

缺点：
- 在图片合并时，要把多张图片有序的、合理的合并成一张图片，还要留好足够的空间，防止板块内出现不必要的背景。在宽屏及高分辨率下的自适应页面，如果背景不够宽，很容易出现背景断裂；
- 在开发的时候相对来说有点麻烦，需要借助 photoshop或其他工具来对每个背景单元测量其准确的位置；
- 在维护的时候比较麻烦，页面背景有少许改动时，就要改这张合并的图片，无需改的地方尽量不要动，这样避免改动更多的 css，如果在原来的地方放不下，又只能（最好）往下加图片，这样图片的字节就增加了，还要改动css；


## 35、什么是物理像素，逻辑像素和像素密度，为什么在移动端开发时需要用到@3x, @2x这种图片？
物理像素是显示屏幕上的实际像素点，逻辑像素则是开发者在代码中使用的抽象单位，通常与物理像素一一对应。像素密度是指每英寸显示屏幕上的物理像素数量。

在移动端开发中，由于不同设备的像素密度差异较大，为了保证图片在不同设备上显示的清晰度，需要提供不同分辨率的图片，比如@3x,@2x等。这些后缀表示图片的分辨率或者说像素密度，@3x的图片分辨率要比@2x的高3倍，因此在高像素密度的设备上能够得到更清晰的显示效果。通过正确地使用不同分辨率的图片来适应不同的设备像素密度，可以提高应用程序的视觉效果和用户体验。
> 可以使用 CSS 媒体查询来判断不同的像素密度，从而选择不同的图片：
```css
@media only screen and (-webkit-min-device-pixel-ratio: 2),
       only screen and (min--moz-device-pixel-ratio: 2),
       only screen and (-o-min-device-pixel-ratio: 2/1),
       only screen and (min-device-pixel-ratio: 2),
       only screen and (min-resolution: 192dpi),
       only screen and (min-resolution: 2dppx) {
   /* 针对高像素密度设备的样式和图片 */
   background-image: url('example@2x.png');
}
```
这里的`@2x`表示该图片是针对高像素密度设备的，浏览器会自动选择正确的图片。如果需要针对其他像素密度或不同屏幕尺寸做出不同的样式和图片选择，可以根据需要修改媒体查询的条件。


## 36、margin和padding的使用场景
- 需要在border外侧添加空白，且空白处不需要背景（色）时，使用 margin；
- 需要在border内测添加空白，且空白处需要背景（色）时，使用 padding；


## 37、对 line-height 的理解及其赋值方式
line-height的概念：
- line-height指一行文本的高度，包含了字间距，实际上是下一行基线到上一行基线距离；
- 如果一个标签没有定义 height 属性，那么其最终表现的高度由 line-height 决定；
- 把 line-height 值设置为 height 一样大小的值可以实现单行文字的垂直居中；
- line-height 和 height 都能撑开一个高度；

line-height的赋值方式：
- 带单位：px 是固定值，而 em 会参考自身元素 font-size 值计算自身的行高
- 纯数字：会把比例传递给后代。例如，父级行高为 1.5，子元素字体为 18px，则子元素行高为 1.5 * 18 = 27px
- 百分比：将计算后的值传递给后代


## 38、实现三列布局，side1 和 side2 左右两列宽度固定（200px）,main 中间宽度自适应（不能用弹性盒）
```html
<style>
  * {
    margin: 0;
    padding: 0;
    font-size: 50px;
  }

  .main {
    position: relative;
    width: 100%;
    height: 500px;
  }

  .left {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 100%;
    background-color: #3898b1;
  }

  .right {
    position: absolute;
    top: 0;
    right: 0;
    width: 200px;
    height: 100%;
    background-color: #ce7486;
  }

  .middle {
    margin: 0 200px;
    height: 100%;
    background-color: #cbaf91;
  }
</style>
<div class="main">
  <div class="left">left</div>
  <div class="middle">middle</div>
  <div class="right">right</div>
</div>
```
效果如下：
![202302091635511.png](http://img.itchenliang.club/img/202302091635511.png)


## 39、使用 CSS3 设计一个立起的圆形，并围绕自身中轴线做 360° 持续旋转
https://blog.csdn.net/qq_48085286/article/details/126534588


## 40、要求实现以下效果：字体颜色在 IE6 下为黑色（#000000）；IE7下为红色（#ff0000）; 而其他浏览器下为绿色（#00ff00）
```html
<style>
p{
color: green;
}
</style>
<!-- 参考：https://blog.csdn.net/weixin_33704234/article/details/92419637 -->
<!--[if lte IE6]>
<style>
p{
color: black;
}
</style>
<![endif] -->

<!--[if IE 7]>
<style>
p{
color: red;
}
</style>
<![endif]-->
```
或者
```css
p {
  color: green;
  *color: red;
  _color: black;
}
```


## 41、position 属性有哪些值，分别代表什么意思？ 使用与什么场景？
- `static`: 正常文档流定位，此时 top, right, bottom, left 和 z-index 属性无效，块级元素从上往下纵向排布，行级元素从左向右排列。
- `relative`：相对定位，此时的『相对』是相对于正常文档流的位置。
- `absolute`：相对于最近的非 static 定位祖先元素的偏移，来确定元素位置，比如一个绝对定位元素它的父级、和祖父级元素都为relative，它会相对他的父级而产生偏移。
- `fixed`：指定元素相对于屏幕视口（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变，比如那种回到顶部的按钮一般都是用此定位方式。
- `sticky`：粘性定位，特性近似于relative和fixed的合体，其在实际应用中的近似效果就是IOS通讯录滚动的时候的『顶屁股』。


## 42、style 标签写在 body 后和 body 前有什么区别？
> 将`<style>`标签放置在`<head>`元素内，可以更好地优化页面性能和用户体验。
- 将样式表放置在`<head>`元素中的`<style>`标签内，可以让页面更快地呈现出来。因为浏览器会先加载和渲染页面的基础结构，然后才会处理样式信息。
- 如果将`<style>`标签放置在`<body>`元素后面，浏览器需要等到整个文档都被解析和加载之后才能开始渲染页面，这会导致页面显示延迟，用户可能会感到不舒服。


## 43、::bofore 和 :after 中双冒号和单冒号有什么区别？
实则是考伪类和伪元素的区别，[参考](#_29、伪元素和伪类的区别和作用)


## 44、有哪些手段可以优化 CSS, 提高性能
1. 首推的是合并css文件，如果页面加载10个css文件，每个文件1k，那么也要比只加载一个100k的css文件慢。
2. 减少css嵌套，最好不要套三层以上。
3. 不要在ID选择器前面进行嵌套，ID本来就是唯一的而且人家权值那么大，嵌套完全是浪费性能。
4. 建立公共样式类，把相同样式提取出来作为公共类使用，比如我们常用的清除浮动等。
5. 减少通配符*或者类似[hidden="true"]这类选择器的使用，挨个查找所有... 这性能能好吗？当然重置样式这些必须 的东西是不能少的。
6. 巧妙运用css的继承机制，如果父节点定义了，子节点就无需定义。
7. 拆分出公共css文件，对于比较大的项目我们可以将大部分页面的公共结构的样式提取出来放到单独css文件里，这样一次下载后就放到缓存里，当然这种做法会增加请求，具体做法应以实际情况而定。
8. 不用css表达式，表达式只是让你的代码显得更加炫酷，但是他对性能的浪费可能是超乎你的想象的。
9. 少用css rest，可能你会觉得重置样式是规范，但是其实其中有很多的操作是不必要不友好的，有需求有兴趣的 朋友可以选择normolize. css
10. cssSprite，合成所有icon图片，用宽高加上bacgroud-position的背景图方式显现出我们要的icon图，这是一种 十分实用的技巧，极大减少了http请求。
11. 当然我们还需要一些善后工作，CSS压缩(这里提供一个在线压缩 YUI Compressor ，当然你会用其他工具来压缩是十 分好的)，
12. GZIP压缩，Gzip是一种流行的文件压缩算法，详细做法可以谷歌或者百度。


## 45、说下 CSS3 中一些样式的兼容，分别指兼容哪些浏览器
浏览器前缀
```css
IE9：-ms-
Firfox: -moz-
Chrome and Safari: -webkit-
Opera: -o-
```
1. border-image、 border-radius 和 box-shadow 属性兼容性
  - IE不支持border-image
  - IE9+支持 border-radius 和 box-shadow 属性
  - 对于 border-image，Safari 5 以及更老的版本需要前缀 -webkit-。
  - Opera 支持 border-radius 和 box-shadow 属性，但是对于 border-image 需要前缀 -o-
2. 文本效果属性
  - IE9以及更早的版本，不支持 text-shadow 属性。其他浏览器均支持。
3. transform 属性
  - IE10、Firefox 以及 Opera 支持 transform 属性。
  - Chrome 和 Safari 需要前缀 -webkit-
  - IE9 需要前缀 -ms-
4. 过渡效果transtion属性
  - IE10、Firefox、Chrome 以及 Opera 支持 transition 属性。
  - Safari 需要前缀 -webkit-
  - IE9以及更早的版本，不支持 transition 属性
  - Chrome25 以及更早的版本，需要前缀 -webkit-。
5. 动画效果@keyframes属性
  - IE10、Firefox 以及 Opera 支持 @keyframes 规则和 animation 属性。
  - Chrome 和 Safari 需要前缀 -webkit-。
  - IE9，以及更早的版本，不支持 @keyframe 规则或 animation 属性。


## 46、怎么样实现边框0.5个像素？
```html
<div class="box box1"></div>
```
- **方法一： 伪元素+scale**
  - 原理：将容器设置伪元素，设置绝对定位，宽高设置200%，边框设置为1px，然后用transform：scale（0.5），使伪元素缩小到原来的一半，此时伪元素的边框会和容器的边缘重合。
  - 优点：兼容性好
  ```css
  .box {
    width: 360px;
    height: 50px;
    border-radius: 5px;
    margin-top: 20px;
    line-height: 50px;
  }
  .box1 {
    position: relative;
  }
  .box1::after {
    position: absolute;
    bottom: 0;
    z-index: -1;
    width: 200%;
    height: 200%;
    content: "";
    display: block;
    border: 1px solid red;
    border-radius: 5px;
    transform: scale(0.5);
    transform-origin: left bottom;
  }
  ```
- **方法二：背景渐变**
  - 原理：给容器设置伪元素，设置绝对定位，高度1px，背景图设置线性渐变，一半设置颜色，一半设置透明，就可以实现0.5px边框了。但是不能展示圆角
  - 优点：简单，适合一根线的边框
  ```css
  .box {
    width: 360px;
    height: 50px;
    border-radius: 5px;
    margin-top: 20px;
    line-height: 50px;
  }
  .box1 {
    position: relative;
  }
  .box1::after {
    position: absolute;
    content: "";
    width: 100%;
    height: 1px;
    bottom: 0px;
    background-color: red;
    background: linear-gradient(to bottom, transparent 50%, red 50%);
  }
  ```
- **方法三：利用阴影代替边框**
  - 原理：利用盒子阴影设置
  - 优点：可以实现更细的边框
  ```css
  .box {
    width: 360px;
    height: 50px;
    border-radius: 5px;
    margin-top: 20px;
    line-height: 50px;
  }
  .box1 {
    box-shadow: 0 0 0 0.5px red;
  }
  ```


## 47、如何理解z-index？
CSS 中的`z-index`属性控制重叠元素的垂直叠加顺序，默认元素的`z-index`为`0`，我们可以修改`z-index`来控制元素的图层位置，而且`z-index`只能影响设置了`position`值的元素。


## 48、如何理解层叠上下文？
在CSS2.1规范中，每个盒模型的位置是三维的，分别是平面画布上的x轴，y轴以及表示层叠的z轴。**层叠上下文即元素在某个层级上z轴方向的排列关系**。
> 可以想象一张桌子，上面有一堆物品，这张桌子就代表着一个层叠上下文。如果在第一张桌子旁还有第二张桌子，那第二张桌子就代表着另一个层叠上下文。

**产生条件**
- 根元素 (HTML),
- `position`值为`absolute|relative`，且`z-index`值不为`auto`
- `position值为`fixed|sticky`
- `z-index`值不为`auto`的`flex`元素，即：父元素`display:flex|inline-flex`
- `opacity`属性值小于`1`的元素
- `transform`属性值不为`none`的元素
- `mix-blend-mode`属性值不为`normal`的元素
- `filter`、`perspective`、`clip-path`、`mask`、`mask-image`、`mask-border`、`motion-path`值不为`none`的元素
- `isolation`属性被设置为`isolate`的元素
- `will-change`中指定了任意 CSS 属性，即便你没有直接指定这些属性的值
- `-webkit-overflow-scrolling`属性被设置`touch`的元素


## 49、你对媒体查询的理解？
媒体查询是自 CSS3 开始加入的一个功能。它可以进行响应式适配展示。
- 使用`@media`查询，可以针对不同的媒体类型定义不同的样式
- `@media`可以针对不同的屏幕尺寸设置不同的样式
- 当你重置浏览器大小的过程中，页面也会根据浏览器的宽度和高度重新渲染页面
- 目前针对很多苹果手机、Android手机，平板等设备都用得到媒体查询

**语法规范**
```css
@media mediatype and|not|only (media feature){
  css-code;
}
```
- mediatype: 媒体类型，`all`(所有设备)、`print`(打印机和打印预览)、`screen`(电脑屏幕、平板电脑、智能手机等)
- 关键字: 关键字将媒体类型或多个特性连接到一起做为媒体查询的条件
  - and: 可以将多个媒体特性连接到一起，相当"且"于的意思
  - not: 排除某个媒体类型，相当于"非"的意思，可以省略
  - only: 指定某个特定的媒体类型，可省略
- media feature: 媒体特性，他们要加小括号包含
  - width: 定义输出设备中页面可见区域的宽度
  - min-width: 定义输出设备中最小页面可见区域的宽度
  - max-width: 定义输出设备中最大页面可见区域的宽度

**如何使用**
```html
<!-- link元素中的CSS媒体查询 -->
<link rel="stylesheet" media="(max-width: 800px)" href="example.css" />
<!-- 样式表中的CSS媒体查询 -->
<style>
@media screen and (max-width: 600px) {
  .facet_sidebar {
    display: none;
  }
}
</style>
```


## 50、实现不使用 border 画出 1px 高的线，在不同浏览器的标准模式与怪异模式下都能保持一致的效果。
```html
<div style="height:1px;overflow:hidden;background:red"></div>
```


## 51、什么是外边距重叠？重叠的结果是什么？
外边距重叠就是`margin-collapse`，在 CSS 当中，相邻的两个盒子（可能是兄弟关系也可能是祖先关系）的外边距可以结合成一个单独的外边距。这种合并外边距的方式被称为折叠，并且因而所结合成的外边距称为折叠外边距。

折叠结果遵循下列计算规则：
- 两个相邻的外边距都是正数时，折叠结果是它们两者之间较大的值。
- 两个相邻的外边距都是负数时，折叠结果是两者绝对值的较大值。
- 两个外边距一正一负时，折叠结果是两者的相加的和。


## 52、rgba()和opacity的透明效果有什么不同？
`rgba()`和`opacity`都能实现透明效果，但最大的不同：
- `opacity`作用于元素，以及元素内的所有内容的透明度，
- `rgba()`只作用于元素的颜色或其背景色。（设置`rgba`透明的元素的子元素不会继承透明效果！）


## 53、css 中可以让文字在垂直和水平方向上重叠的两个属性是什么？
- 垂直方向：`line-height`
- 水平方向：`letter-spacing`

那么问题来了，关于`letter-spacing`的妙用知道有哪些么？
> 可以用于消除`inline-block`元素间的换行符空格间隙问题。


## 54、如何水平垂直居中一个元素？
```html
<!-- 基础布局代码 -->
<div class="box">
  <div class="center"></div>
</div>
```
- 1、**margin:auto**
  ```css
  .box {
    width: 200px;
    height: 200px;
    background-color: #eee;
    position: relative;
    margin-top: 20px;
  }
  .center {
    width: 50px;
    height: 50px;
    background-color: #00ACED;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  ```
- 2、**position:absolute**
  ```css
  .box {
    width: 200px;
    height: 200px;
    background-color: #eee;
    position: relative;
    margin-top: 20px;
  }
  /** 结合margin */
  .center {
    width: 50px;
    height: 50px;
    background-color: #00ACED;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -25px;
    margin-left: -25px;
  }
  /** 使用calc */
  .center {
    width: 50px;
    height: 50px;
    background-color: #00ACED;
    position: absolute;
    left: calc(50% - 25px);
    top: calc(50% - 25px);
  }
  /** 结合 transform */
  .center {
    width: 50px;
    height: 50px;
    background-color: #00ACED;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  ```
- 3、**line-height = height**
  ```html
  <style>
    .box {
      width: 200px;
      height: 200px;
      background-color: #eee;
      position: relative;
      margin-top: 20px;
    }
    .center {
      line-height: 200px;
      text-align: center;
    }
  </style>
  <div class="box">
    <div class="center">文字居中</div>
  </div>
  ```
- 4、**弹性布局**
  ```css
  .box {
    width: 200px;
    height: 200px;
    background-color: #eee;
    position: relative;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .center {
    width: 50px;
    height: 50px;
    background-color: #00ACED;
  }
  ```
- 5、**网格布局**
  ```css
  /** 第一种: 对元素本身属性进行设置 */
  .box {
    width: 200px;
    height: 200px;
    background-color: #eee;
    position: relative;
    margin-top: 20px;
    display: grid;
  }
  .center {
    width: 50px;
    height: 50px;
    background: #00ACED;
    align-self: center;
    justify-content: center;
    margin: auto;
  }

  /** 第二种: 在元素的父级元素中设置 */
  .box {
    width: 200px;
    height: 200px;
    background-color: #eee;
    position: relative;
    margin-top: 20px;
    display: grid;
    display: grid;
    align-items: center;
    justify-content: center;
  }
  .center {
    width: 50px;
    height: 50px;
    background: #00ACED;
  }
  ```
- 6、**table-cell布局**
  ```css
  .box {
    width: 200px;
    height: 200px;
    background-color: #eee;
    position: relative;
    margin-top: 20px;
    display: table-cell;
    text-align: center;
    vertical-align: middle;
  }
  .center {
    width: 50px;
    height: 50px;
    background: #00ACED;
    display: inline-block;
  }
  ```
  > 那么问题来了，如何垂直居中一个`img`(用更简便的方法)
  ```css
  .content {
    /** img的容器设置如下 */
    display: table-cell;
    text-align: center;
    vertical-align: middle;
  }
  ```


## 55、Sass、Less、Stylus 是什么？大家为什么要使用他们？
是 CSS 预处理器。他是 CSS 上的一种抽象层。他们是一种特殊的语法/语言编译成 CSS。
- Less 是一种动态样式语言. 将 CSS 赋予了动态语言的特性，如变量，继承，运算， 函数. LESS 既可以在客户端上运行 (支持 IE 6+, Webkit, Firefox)，也可一在服务端运行 (借助 Node.js)。
- Sass 是一种 CSS 的预编译语言。它提供了 变量（variables）、嵌套（nested rules）、 混合（mixins）、 函数（functions）等功能，并且完全兼容 CSS 语法。Sass 能够帮助复杂的样式表更有条理， 并且易于在项目内部或跨项目共享设计。
- Stylus 是一款 CSS 的预处理器，也就是我们常说的 CSS 框架。

为什么要使用它们？
- 结构清晰，便于扩展。
- 可以方便地屏蔽浏览器私有语法差异。这个不用多说，封装对浏览器语法差异的重复处理，减少无意义的机械劳动。
- 可以轻松实现多重继承。
- 完全兼容 CSS 代码，可以方便地应用到老项目中。LESS 只是在 CSS 语法上做了扩展，所以老的 CSS 代码也可以与 LESS 代码一同编译。

### 使用 CSS 预处理的优缺点分别是什么？
**优点**：
- 提高 CSS 可维护性。
- 易于编写嵌套选择器。
- 引入变量，增添主题功能。可以在不同的项目中共享主题文件。
- 通过混合（Mixins）生成重复的 CSS。
- Splitting your code into multiple files. CSS files can be split up too but doing so will require a HTTP request to - - download each CSS file.
- 将代码分割成多个文件。不进行预处理的 CSS，虽然也可以分割成多个文件，但需要建立多个 HTTP 请求加载这些文件。

**缺点**：
- 需要预处理工具。
- 重新编译的时间可能会很慢。

## 56、移动端 1px 问题的解决办法
推荐解决方法：媒体查询 + transfrom
```css
/* 2倍屏 */
@media only screen and (-webkit-min-device-pixel-ratio: 2.0) {
    .border-bottom::after {
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
    }
}
/* 3倍屏 */
@media only screen and (-webkit-min-device-pixel-ratio: 3.0) {
    .border-bottom::after {
        -webkit-transform: scaleY(0.33);
        transform: scaleY(0.33);
    }
}
```


## 57、几种常见的 CSS 布局
[参考](https://juejin.cn/post/6844903710070407182#heading-12)
### 单列布局
![202302251608595.png](http://img.itchenliang.club/img/202302251608595.png)
常见的单列布局有两种：
- header,content和footer等宽的单列布局<br>
  先通过对header,content,footer统一设置width：1000px;或者max-width：1000px(这两者的区别是当屏幕小于1000px时，前者会出现滚动条，后者则不会，显示出实际宽度);然后设置margin:auto实现居中即可得到。
  ```html
  <div class="header"></div>
  <div class="content"></div>
  <div class="footer"></div>
  ```
  ```css
  .header{
    margin:0 auto; 
    max-width: 960px;
    height:100px;
    background-color: blue;
  }
  .content{
    margin: 0 auto;
    max-width: 960px;
    height: 400px;
    background-color: aquamarine;
  }
  .footer{
    margin: 0 auto;
    max-width: 960px;
    height: 100px;
    background-color: aqua;
  }
  ```
- header与footer等宽,content略窄的单列布局<br>
  header、footer的内容宽度不设置，块级元素充满整个屏幕，但header、content和footer的内容区设置同一个width，并通过margin:auto实现居中。
  ```html
  <div class="header">
    <div class="nav"></div>
  </div>
  <div class="content"></div>
  <div class="footer"></div>
  ```
  ```css
  .header{
    margin:0 auto;
    max-width: 960px;
    height:100px;
    background-color: blue;
  }
  .nav{
    margin: 0 auto;
    max-width: 800px;
    background-color: darkgray;
    height: 50px;
  }
  .content{
    margin: 0 auto;
    max-width: 800px;
    height: 400px;
    background-color: aquamarine;
  }
  .footer{
    margin: 0 auto;
    max-width: 960px;
    height: 100px;
    background-color: aqua;
  }
  ```

### 两列自适应布局
两列自适应布局是指一列由内容撑开，另一列撑满剩余宽度的布局方式。实现方式主要有如下几种：
1. `float+overflow:hidden`<br>
  如果是普通的两列布局，**浮动+普通元素的margin**便可以实现，但如果是自适应的两列布局，利用**float+overflow:hidden**便可以实现，这种办法主要通过overflow触发BFC,而BFC不会重叠浮动元素。由于设置overflow:hidden并不会触发IE6-浏览器的haslayout属性，所以需要设置zoom:1来兼容IE6-浏览器。具体代码如下：
  ```html
  <div class="parent" style="background-color: lightgrey;">
    <div class="left" style="background-color: lightblue;">
      <p>left</p>
    </div>
    <div class="right"  style="background-color: lightgreen;">
      <p>right</p>
      <p>right</p>
    </div>        
  </div>
  ```
  ```css
  .parent {
    overflow: hidden;
    zoom: 1;
  }
  .left {
    float: left;
    margin-right: 20px;
  }
  .right {
    overflow: hidden;
    zoom: 1;
  }
  ```
  **注意**: 如果侧边栏在右边时，注意渲染顺序。即在HTML中，先写侧边栏后写主内容。
2. Flex布局<br>
  Flex布局，也叫弹性盒子布局，区区简单几行代码就可以实现各种页面的的布局。
  ```css
  // html部分同上
  .parent {
    display:flex;
  }  
  .right {
    margin-left:20px; 
    flex:1;
  }
  ```
3. grid布局<br>
  Grid布局，是一个基于网格的二维布局系统，目的是用来优化用户界面设计。
  ```css
  // html部分同上
  .parent {
    display:grid;
    grid-template-columns:auto 1fr;
    grid-gap:20px
  } 
  ```

### 三栏布局(圣杯布局、双飞翼布局)
特征：**中间列自适应宽度，旁边两侧固定宽度**，主要实现方式有如下几种：
#### 圣杯布局
> 比较特殊的三栏布局，圣杯布局使用了相对定位和负边距的技巧，中间栏通过设置`padding`来让内容占满整个空间，实现自适应宽度，两侧栏设置固定宽度并通过相对定位脱离文档流和使用负边距向中间栏释放空间。该布局的优点是可以完全兼容所有浏览器，但是实现过程比较复杂。
```html
<div class="container">
  <div class="left"></div>
  <div class="main"></div>
  <div class="right"></div>
</div>
```
```css
.container {
  padding: 0 150px;
  margin: 0 auto;
}

.left, .main, .right {
  float: left;
  height: 200px;
}

.left {
  width: 150px;
  margin-left: -100%;
  position: relative;
  right: 150px;
}

.main {
  width: 100%;
  padding: 0 200px;
}

.right {
  width: 150px;
  margin-right: -150px;
  position: relative;
  left: -150px;
}
```

#### 双飞翼布局
> 同样也是三栏布局，双飞翼布局使用了 CSS 的盒子模型和浮动布局，中间栏和两侧栏都使用`div`元素实现，中间栏宽度为`100%`，包含左右两个自定义的`div`元素，作为内容容器。两侧栏使用负边距、相对定位和 div 元素设置边框实现宽度为固定宽度的效果。该布局的优点是实现比较简单，但不兼容 IE6 及以下版本。
```html
<div class="container clearfix">
  <div class="main"></div>
</div>
<div class="left"></div>
<div class="right"></div>
```
```css
.container {
  margin: 0 150px;
}

.main {
  float: left;
  width: 100%;
}

.left, .right {
  float: left;
  position: relative;
  width: 150px;
  height: 200px;
}

.left {
  margin-left: -100%;
  right: 150px;
  border: 1px solid #ccc;
}

.right {
  margin-right: -150px;
  left: -150px;
  border: 1px solid #ccc;
}
```

**两种布局实现方式对比**:
- 两种布局方式都是把主列放在文档流最前面，使主列优先加载。
- 两种布局方式在实现上也有相同之处，都是让三列浮动，然后通过负外边距形成三列布局。
- 两种布局方式的不同之处在于如何处理中间主列的位置：
  - 圣杯布局是利用父容器的左、右内边距+两个从列相对定位；
  - 双飞翼布局是把主列嵌套在一个新的父级块中利用主列的左、右外边距进行布局调整

### 等高布局
等高布局是指子元素在父元素中高度相等的布局方式，主要实现方式有如下几种：
- **利用正padding+负margin**<br>
  我们通过等布局便可解决圣杯布局的第二点缺点，因为背景是在 padding 区域显示的，**设置一个大数值的 padding-bottom，再设置相同数值的负的 margin-bottom，并在所有列外面加上一个容器，并设置 overflow:hidden 把溢出背景切掉**。这种可能实现多列等高布局，并且也能实现列与列之间分隔线效果，结构简单，兼容所有浏览器。新增代码如下：
  ```css
  .center,
  .left,
  .right {
    padding-bottom: 10000px;
    margin-bottom: -10000px;
  }
  .container {
    padding-left: 220px;
    padding-right: 220px;
    overflow: hidden;//把溢出背景切掉
  }
  ```
  ![202302251617099.png](http://img.itchenliang.club/img/202302251617099.png)
- **利用背景图片**<br>
  这种方法是我们实现等高列最早使用的一种方法，就是使用背景图片，在列的父元素上使用这个背景图进行Y轴的铺放，从而实现一种等高列的假象。实现方法简单，兼容性强，不需要太多的css样式就可以轻松实现,但此方法不适合流体布局等高列的布局。<br>
  在制作样式之前需要一张类似下面的背景图：
  ![202302251617448.png](http://img.itchenliang.club/img/202302251617448.png)
  ```html
  <div class=”container clearfix”>
    <div class=”left”></div>
    <div  class=”content”></div>
    <div class=”right”></div>
  </div>
  ```
  ```css
  .container {
    background: url("column.png") repeat-y;
    width: 960px;
    margin: 0 auto;
  }
  .left {
    float: left;
    width: 220px;
  }
  .content {
    float: left;
    width: 480px;
  }
  .right {
    float: left;
    width: 220px;
  }
  ```
- **模仿表格布局**<br>
  这是一种非常简单，易于实现的方法。不过兼容性不好，在ie6-7无法正常运行。
  ```html
    <div class="container table">
    <div class="containerInner tableRow">
      <div class="column tableCell cell1">
        <div class="left aside">
          ....
        </div>
      </div>
      <div class="column tableCell cell2">
        <div class="content section">
          ...
        </div>
      </div>
      <div class="column tableCell cell3">
        <div class="right aside">
          ...
        </div>
      </div>
    </div>
  </div>
  ```
  ```css
  .table {
    width: auto;
    min-width: 1000px;
    margin: 0 auto;
    padding: 0;
    display: table;
  }
  .tableRow {
    display: table-row;
  }
  .tableCell {
    display: table-cell;
    width: 33%;
  }
  .cell1 {
    background: #f00;
    height: 800px;
  }
  .cell2 {
    background: #0f0;
  }
  .cell3 {
    background: #00f;
  }
  ```
- **使用边框和定位**<br>
  这种方法是使用边框和绝对定位来实现一个假的高度相等列的效果。结构简单，兼容各浏览器，容易掌握。假设你需要实现一个两列等高布局，侧栏高度要和主内容高度相等。
  ```html
  <div id="wrapper">
    <div id="mainContent">...</div>
    <div id="sidebar">...</div>
  </div>
  ```
  ```css
  #wrapper {
    width: 960px;
    margin: 0 auto;
  }
  #mainContent {
    border-right: 220px solid #dfdfdf;
    position: absolute;
    width: 740px;
    height: 800px;  
    background: green;
  }
  #sidebar {
    background: #dfdfdf;
    margin-left: 740px;
    position: absolute;
    height: 800px;
    width: 220px;
  }
  ```

### 粘连布局
所谓粘连布局（也可以叫做 sticky footer 布局），就是当内容区域元素没有超出容器时，网页底部 footer 紧贴在网页底部，当内容区域超长时，底部 footer 就会紧跟在内容区域底部，而不是紧贴在网页底部。

粘连布局示意图：
![202302251620482.png](http://img.itchenliang.club/img/202302251620482.png)

- **特点**: 
  - 有一块内容`<main>`，当`<main>`的高康足够长的时候，紧跟在`<main>`后面的元素`<footer>`会跟在`<main>`元素的后面。
  - 当`<main>`元素比较短的时候(比如小于屏幕的高度),我们期望这个`<footer>`元素能够“粘连”在屏幕的底部
  ![202302251621176.png](http://img.itchenliang.club/img/202302251621176.png)
  ```html
  <div id="wrap">
    <div class="main">
      main <br />
      main <br />
      main <br />
    </div>
  </div>
  <div id="footer">footer</div>
  ```
  ```css
  * {
    margin: 0;
    padding: 0;
  }
  html,
  body {
    height: 100%;//高度一层层继承下来
  }
  #wrap {
    min-height: 100%;
    background: pink;
    text-align: center;
    overflow: hidden;
  }
  #wrap .main {
    padding-bottom: 50px;
  }
  #footer {
    height: 50px;
    line-height: 50px;
    background: deeppink;
    text-align: center;
    margin-top: -50px;
  }
  ```
- **实现步骤**
  - (1) footer必须是一个独立的结构，与wrap没有任何嵌套关系
  - (2) wrap区域的高度通过设置min-height，变为视口高度
  - (3) footer要使用margin为负来确定自己的位置
  - (4) 在main区域需要设置 padding-bottom。这也是为了防止负 margin 导致 footer 覆盖任何实际内容。

### 瀑布流布局
瀑布流（Waterfall Flow），也称为瀑布式布局、瀑布流布局等，是一种常见的网页设计布局。它的特点是将不同大小和高度的元素按照一定规则排列在一起，呈现出像瀑布一样流动的效果。
> 通常，瀑布流布局会将页面内容分成多列，在每列中依次排列元素。由于元素的高度不同，因此每列的高度也会不同，但它们都紧贴着上方元素的底部排列。瀑布流布局最早被应用于图片展示和商品展示等领域，由于其独特的视觉效果和较好的用户体验，目前已经广泛应用于各种类型的网站和应用程序中，如社交网络、新闻聚合网站、电子商务平台等。



## 58、设置元素浮动后，该元素的 display 值是多少？
自动变成`display: block`


## 59、怎么让 Chrome 支持小于 12px 的文字？
1. 使用`-webkit-text-size-adjust`属性：将其设置为`none`可以禁用 Chrome 的字体大小调整机制，这样可以使得小于`12px`的字体正常显示。例如：
  ```css
  body {
    -webkit-text-size-adjust: none;
  }
  ```
2. 使用`transform`缩放：将父元素的`font-size`设置为大于等于`12px`的值，然后再对子元素使用`transform`缩放来达到小于`12px`的效果。例如：
  ```css
  .parent {
    font-size: 12px;
  }
  .child {
    transform: scale(0.8);
  }
  ```
  上面代码中，`parent`元素的`font-size`被设置为`12px`，然后`child`元素使用`transform`缩放为原来的`80%`，从而实现了小于`12px`的效果。需要注意的是，这种方法可能会导致模糊和锯齿效果，因此不适合用在大段文本中。


## 60、display:inline-block 什么时候会显示间隙？
间隙产生的原因是因为，换行或空格会占据一定的位置

**解决办法**：父元素中设置`font-size:0; letter-spaceing:-4px;`


## 61、超链接访问过后 hover 样式就不出现的问题是什么？如何解决？
被点击访问过的超链接样式不在具有 hover 和 active 了, 解决方法是改变 CSS 属性的排列顺序: L-V-H-A（link, visited, hover, active）


## 62、什么是 Css Hack？ie6, 7, 8 的 hack 分别是什么？
针对不同的浏览器写不同的 CSS code 的过程，就是 CSS hack。示例如下：
```css
#test       {  
  width:300px;  
  height:300px;  
  background-color:blue;      /*firefox*/
  background-color:red\9;      /*all ie*/
  background-color:yellow;    /*ie8*/
  +background-color:pink;        /*ie7*/
  _background-color:orange;       /*ie6*/    } 
  :root #test {
    background-color:purple\9;
  }/*ie9*/
  @media all and (min-width:0px){ #test {background-color:black;} } /*opera*/
  @media screen and (-webkit-min-device-pixel-ratio:0){ #test {background-color:gray;} } /*chrome and safari*/
```


## 63、重置（resetting）CSS 和 标准化（normalizing）CSS 的区别是什么？你会选择哪种方式，为什么？
- **重置（Resetting）**： 重置意味着除去所有的浏览器默认样式。对于页面所有的元素，像 margin 、 padding 、 font-size 这些样式全部置成一样。你将必须重新定义各种元素的样式。
- **标准化（Normalizing）**： 标准化没有去掉所有的默认样式，而是保留了有用的一部分，同时还纠正了一些常见错误。

当需要实现非常个性化的网页设计时，我会选择重置的方式，因为我要写很多自定义的样式以满足设计需求，这时候就不再需要标准化的默认样式了。


## 64、什么是 FOUC? 如何避免
什么是 Fouc(文档样式短暂失效)？
> 在引用 css 的过程中，如果方法不当或者位置引用不对，会导致某些页面在 windows 下的 ie 出现一些奇怪的现象，以无样式显示页面内容的瞬间闪烁，这种现象称之为文档样式短暂失效，简称 FOCU。

原因大致为：
- 使用`import`方法导入样式表
  ```html
  <link rel="stylesheet" href="./style.css">
  <!-- style.css -->
  @import url('./other-style.css');
  .container {
    display: inline-block;
    height: 100px;
    background: red;
  }
  ```
- 将样式表放在页面底部
  ```html
  <span class="container">
    <span>item1</span>
    <span>item2</span>
    <span>item3</span>
  </span>
  <style>
    @import url('./style.css');
  </style>
  ```
- 有几个样式表，放在 html 结构的不同位置。

原理很清楚：当样式表晚于结构性 html 加载，当加载到此样式表时，页面将停止之前的渲染。此样式表被下载和解析后，将重新渲染页面，也就出现了短暂的花屏现象。

解决方法：
> 使用 link 标签将样式表放在文档 head 中。


## 65、行内元素 float:left 后是否变为块级元素？
- 行内元素设置成浮动之后变得更加像是 inline-block
- 行内块级元素，设置成这个属性的元素会同时拥有行内和块级的特性，最明显的不同是它的默认宽度不是 100%，行内元素默认 100%宽度占据一行
- 这时候给行内元素设置 padding-top 和 padding-bottom 或者 width、height 都是有效果的


## 66、在网页中的应该使用奇数还是偶数的字体？为什么呢？
在网页中，应该使用偶数像素值的字体。
> 因为当使用奇数像素值的字体时，如`13px`、`15px`等，在某些设备上可能会出现模糊和不清晰的问题，这是由于这些设备的屏幕分辨率与像素之间的对应关系导致的。而选择偶数像素值的字体，则可以避免这样的问题，并且能够在不同的设备上保持更加一致的显示效果。


## 67、CSS 合并方法
```css
@import url(css 文件地址)
```


## 68、列出你所知道可以改变页面布局的属性
`display`、`position`、`float`、`clear`、`flexbox`、`grid`、`columns`、`width`、`height`、`margin`、`padding`、`overflow`、`visibility`、`z-index`、`transform`、`transition`、`animation`


## 69、CSS 在性能优化方面的实践
- 1、压缩CSS文件，减小文件大小，可以使用压缩工具或者Webpack等打包工具自带的压缩功能。
- 2、避免使用`@import`加载CSS文件，因为每个`@import`都会增加HTTP请求。
- 3、使用CSS Sprites技术来减少图片请求，将多张小图标合并成一张大图，并通过`background-position`属性和定位来显示不同的图标。
- 4、避免使用过多的CSS选择器，因为选择器越复杂，匹配元素所需的时间就越长。如果可能的话，尽量缩短选择器的层级。
- 5、尽量避免使用`!important`，因为它会增加样式计算的复杂度，使得浏览器更难进行优化。
- 6、使用类代替标签选择器，因为类的查找速度比标签要快。
- 7、使用CSS前缀来支持不同浏览器的特性，但要避免使用过多的前缀。
- 8、使用`flexbox`和`grid`布局来代替传统的布局方法，因为它们的性能更好。
- 9、避免使用大量的阴影、边框和渐变效果等CSS3特性，因为它们对性能有一定的影响。
- 10、使用媒体查询和响应式设计来减少不必要的CSS代码和布局计算。


## 70、CSS3 动画（简单动画的实现，如旋转等）
让一个 div 元素旋转 360 度示例
1. div 的样式结构:
  ```css
  div {
    margin: 50px auto;
    width: 200px;
    height: 200px;
    background-color: pink;
  }
  ```
2. 设置旋转属性的类名:
  ```css
  div.rotate {
    /* 旋转360度 */
    transform: rotate(360deg);
    /* all表示所有属性,1s表示在一秒的时间完成动画 */
    transition: all 1s;
  }
  ```

transition 有四个属性:
- property: 规定应用过渡的 CSS 属性的名称。
- duration: 定义过渡效果花费的时间。默认是 0,单位是 s。
- timing-function: 规定过渡效果的时间曲线。默认是 "ease"。匀速'linear',加速'ease-in',减速'ease-out',先快后慢'ease-in-out'。
- delay: 规定过渡效果何时开始。默认是 0。单位 s。
可以连写: `transition: property duration timing-function delay`;
3. 给 div 元素设置鼠标移入时旋转, 也就是给它加上. rotate 类名. 鼠标移出时移除类名
  ```js
   $(function() {
    $("div")
        .mouseenter(function() {
            $(this).addClass("rotate");
        })
        .mouseleave(function() {
            $(this).removeClass("rotate");
        });
  }); 
  ```


## 71、base64 的原理及优缺点
Base64是一种将二进制数据编码成ASCII字符的编码方式。它由64个字符组成，包括`A-Z、a-z、0-9`和`两个额外的字符（通常是“+”和“/”）`。Base64编码通过将3个字节的二进制数据划分为四组6位，并将每组6位转换为相应的Base64字符来实现。


## 72、position 的值， relative 和 absolute 分别是相对于谁进行定位的？
- absolute : 生成绝对定位的元素， 相对于最近一级的 定位不是 static 的父元素来进行定位。
- fixed （老 IE 不支持）生成绝对定位的元素，通常相对于浏览器窗口或 frame 进行定位。
- relative 生成相对定位的元素，相对于其在普通流中的位置进行定位。
- static 默认值。没有定位，元素出现在正常的流中
- sticky 生成粘性定位的元素，容器的位置根据正常文档流计算得出


## 73、对偏移、卷曲、可视的理解
- 偏移(Offset): 指元素相对于某个参照物的位置。通常指元素相对于其父级元素或文档的位置
  > offset包含`width`、`padding`和`border`
  - offsetWidth、offsetHeight、offsetLeft、offsetTop、offsetParent，注意：没有offsetRight和offsetBottom
- 卷曲(Scroll): 指当页面内容超出可视区域时，通过滚动条进行上下左右滚动，以便查看被遮挡的部分内容。
  > scroll包含`width`和`padding`
  - scrollWidth、scrollHeight、scrollLeft、scrollTop
- 可视(Visible): 指在当前浏览器窗口可见的部分。
  > client包含`width`和`padding`
  - clientWidth、clientHeight、clientLeft、clientTop

注意: 上面所说的只是基于标准盒模型情况，如果是怪异盒模型时，则需要去除`padding`的宽高。
```html
<style>
  .father {
    width: 300px;
    height: 300px;
    padding: 20px;
    border: 2px solid #ddd;
    overflow: auto;
  }
  .child {
    width: 100px;
    height: 300px;
    background: red;
    padding: 10px;
    overflow: auto;
    border: 1px solid #ddd;
  }
</style>
<div class="father">
  <div class="child">
    <div style="height: 500px;background: #ccc;"></div>
  </div>
</div>
<script>
const box = document.querySelector('.father')
console.log('offset:', box.offsetHeight) // 344 = 300 + 20*2 + 2*2
console.log('client:', box.clientHeight) // 340 = 300 + 20*2
console.log('scroll:', box.scrollHeight) // 362 = 300 + 20*2 + 10*2 + 1*2

const child = document.querySelector('.child')
console.log('offset:', child.offsetHeight) // 322 = 300 + 20*2 + 1*2
console.log('client:', child.clientHeight) // 320 = 300 + 20*2
console.log('scroll:', child.scrollHeight) // 520 = 500 + 10*2
</script>
```


## 74、如果设计中使用了非标准的字体，你该如何去实现？
使用 `@font-face` 并为不同的 `font-weight` 定义 `font-family` 。
```css
@font-face {
  font-family: 'CustomFont';
  src: url('path/to/custom-font.woff2') format('woff2'),
       url('path/to/custom-font.woff') format('woff');
}

h1 {
  font-family: 'CustomFont', sans-serif;
}
```


## 75、知道 css 有个 content 属性吗？有什么作用？有什么应用？
`content`属性用于在文档中插入生成的内容或样式化标记。该属性通常与`:before`和`:after`伪元素一起使用，这两个伪元素可以添加在选定元素的前面和后面，并允许开发人员通过 CSS 将样式添加到这些虚拟的元素上。

`content`属性可以设置如下值：
- 字符串：将一个字符串作为元素内容插入文档中，需要用双引号或单引号括起来。
- URL：指向要插入的资源，例如图像。
- 普通计数器：可以用于自动生成序列号。
- 特殊字符：可以用于插入 Unicode 编码字符。

使用场景:
1. `:before`伪元素插入文本
  ```html
  <style>
  p:before {
    content: "注意：";
    font-weight: bold;
    color: red;
  }
  </style>
  <p>哈哈哈哈</p>
  ```
  ![202303241728367.png](http://img.itchenliang.club/img/202303241728367.png)
2. `attr()`函数：用于将 HTML 元素的属性值映射到CSS属性的值上
  ```html
  <style>
    div:before {
      content: attr(data-tooltip);
    }
  </style>
  <div data-tooltip="这里是提示信息">Hover me</div>
  ```
  ![202303241729533.png](http://img.itchenliang.club/img/202303241729533.png)
3. `counter()`, `counters()`函数：用于生成自动编号的序列。
  ```html
  <style>
    body {
      counter-reset: section; /* 设置计数器初始值 */
    }

    h2:before {
      content: counter(section) ". "; /* 显示当前计数器的值 */
      counter-increment: section; /* 计数器自增1 */
    }
  </style>
  <body>
    <h2>第一章</h2>
    <h2>第二章</h2>
  </body>
  ```


## 76、请阐述 float 定位的工作原理
浮动（float）是 CSS 定位属性。浮动元素从网页的正常流动中移出，但是保持了部分的流动性，会影响其他元素的定位（比如文字会围绕着浮动元素）。这一点与绝对定位不同，绝对定位的元素完全从文档流中脱离。

float定位的工作原理如下：
1. 浮动元素会从正常的文档流中脱离出来，不再占据原先在文档流中所占的位置，而是被视为一层覆盖在文档流之上。
2. 如果浮动元素前面有非浮动元素，那么浮动元素会尽可能地靠近前面的元素，直到不能再靠近为止。
3. 如果浮动元素前面也是浮动元素，则会按照源代码中的顺序依次排序，尽量靠近前面的浮动元素。
4. 在浮动元素后面的文本和行内元素会环绕在浮动元素周围，形成文字环绕效果。
5. 父元素的高度会因为浮动元素的脱离而发生塌陷，需要使用清除浮动的方法来避免这种情况。

**注意**: 在使用float定位时，可能会出现浮动元素重叠、对齐问题等，需要通过设置`clear`和使用其他布局技巧进行解决。


## 77、请阐述 z-index 属性，并说明如何形成层叠上下文（stacking context）
`z-index`是CSS中的一个属性，用于控制元素在层叠上下文中的显示顺序。层叠上下文是一种概念，它定义了元素如何在三维空间中堆叠，并影响元素的可见性。
> 具体来说，当一个元素的`z-index`属性值为正数时，在同一个层叠上下文中，它会覆盖在`z-index`值较小的元素之上；如果z-index值相同，则后出现的元素会覆盖先出现的元素。当一个元素的`z-index`属性值为负数时，会将该元素放置到当前层叠上下文的下方。

层叠上下文的形成有以下几种方式：
1. 根元素(标签)是最初的层叠上下文，所有其他元素默认位于这个上下文中。
2. 每个定位元素(`position`属性值为`absolute、relative、fixed`)和flex项(`display：flex或inline-flex`)都会创建一个新的层叠上下文。
3. `z-index`不为`auto`的元素创建层叠上下文。（注意：`z-index`属性只能应用于定位元素）
4. 元素的`opacity`小于1时，会创建一个新的层叠上下文。


## 78、如何解决不同浏览器的样式兼容性问题？
- 在确定问题原因和有问题的浏览器后，使用单独的样式表，仅供出现问题的浏览器加载。这种方法需要使用服务器端渲染。
- 使用已经处理好此类问题的库，比如 Bootstrap。
- 使用 autoprefixer 自动生成 CSS 属性前缀。
- 使用 Reset CSS 或 Normalize. css。


## 79、如何为功能受限的浏览器提供页面？ 使用什么样的技术和流程？
- 优雅的降级：为现代浏览器构建应用，同时确保它在旧版浏览器中正常运行。
- 渐进式增强：在旧的或较少功能的浏览器中提供基本的功能，为现代浏览器提供更高级的功能。
- 特性检测：使用特性检测来检查浏览器是否支持所需功能。如果不支持，则提供另一种方法或替代方案。
  > 利用`caniuse.com`检查特性支持。
- Polyfills或Shims: Polyfills或Shims可以补充浏览器缺失的API或功能，以确保网站在所有浏览器上都可以正常运行。
- 使用`autoprefixer`自动生成 CSS 属性前缀。


## 80、除了 screen ，你还能说出一个 @media 属性的例子吗？
- all：适用于所有设备。
- print：用于打印机和打印预览。
- screen：用于电脑屏幕，平板电脑，智能手机等。
- speech：应用于屏幕阅读器等发声设备。


## 81、对于你使用过的 CSS 预处理，说说喜欢和不喜欢的地方？
**优点**
- 在CSS的语法基础上增加了变量（variable）、嵌套（nested rules）、混合（mixins)、导入（inline imports）、继承（extend）等高级功能，这些拓展令CSS更加强大与优雅。
- 让你的CSS更加简洁、适应性更强、可读性更佳，更易于代码的维护等诸多好处。
- 提高开发效率

**缺点**
- 需要多一个编译器来重新编译一次你的CSS代码，也就是给浏览器多了一道工序，网页显示的速度会减慢
- 需要一个学习的过程，用之不当反而弄巧反拙


## 82、`* { box-sizing: border-box; } `会产生怎样的效果？
浏览器默认值是`box-sizing: content-box`。
在如下所示css代码中，不同的`box-sizing`会导致元素实际宽高
```css
.page {
  width: 200px;
  height: 200px;
  padding: 10px;
  border: 2px solid red;
}
```
- `box-sizing: content-box`元素的宽高只会决定内容（`content`）的大小，如下所示：
  元素实际宽度：**width = content的宽 + 水平方向padding的宽度(左右) + 水平方向border的宽度(左右) = 200px + 10px * 2 + 2px * 2 = 224px**
- `box-sizing: border-box`改变计算元素`width`和`height`的方式，`border`和`padding`的大小也将计算在内，如下所示:
  元素实际宽度：width = 200px


## 83、你使用过哪些现有的 CSS 框架？你是如何改进它们的？
- Bootstrap：更新周期缓慢。Bootstrap 4 已经处于 alpha 版本将近两年了。添加了在页面中广泛使用的微调按钮组件。
- Semantic UI：源代码结构使得自定义主题很难理解。非常规主题系统的使用体验很差。外部库的路径需要硬编码（hard code）配置。变量重新赋值没有 Bootstrap 设计得好。
- Bulma：需要很多非语义的类和标记，显得很多余。不向后兼容，以至于升级版本后，会破坏应用的正常运行。
- tailwind.css: 通过提供大量预定义的样式类来帮助开发人员快速构建网站和应用程序。


## 84、响应式设计与自适应设计有何不同？
响应式设计和自适应设计都是为了使网站或应用程序能够在不同设备和屏幕尺寸上呈现出更好的用户体验，但它们有着不同的实现方式。
- 响应式设计是一种通过使用`CSS媒体查询`和`弹性布局`等技术，使页面能够根据浏览器窗口大小和设备类型动态地调整布局和样式的设计方法。
- 自适应设计是一种通过使用`不同版本的网站`或`应用程序`来适应不同设备和屏幕尺寸的设计方法。

虽然这两种方法都旨在提供更好的用户体验，但响应式设计通常是更常见和更灵活的做法，因为它只需要维护一个代码库，并且可以适应新设备的出现。与此相比，自适应设计需要为每个设备类型维护单独的代码库，这可能会变得难以管理。


## 85、你有没有使用过视网膜分辨率的图形？当中使用什么技术？
> 视网膜分辨率的图形是指在视网膜屏幕上显示的图像，它们通常具有比普通屏幕更高的像素密度。由于物理尺寸和像素密度之间的关系，视网膜屏幕可以在相同的物理尺寸下显示更多的像素，从而提供更清晰、更锐利的图像。

我倾向于使用更高分辨率的图形（显示尺寸的两倍）来处理视网膜显示。更好的方法是使用媒体查询，像`@media only screen and (min-device-pixel-ratio: 2) { ... }`，然后改变`background-image`。
> 对于图标类的图形，我会尽可能使用`svg`和`图标字体`，因为它们在任何分辨率下，都能被渲染得十分清晰。

还有一种方法是，在检查了`window.devicePixelRatio`的值后，利用 JavaScript 将`<img>`的`src`属性修改，用更高分辨率的版本进行替换。


## 86、一边固定宽度一边宽度自适应
可以使用 flex 布局 复制下面的 HTML 和 CSS 代码 用浏览器打开可以看到效果
```html
<div class="wrap">
    <div class="div1"></div>
    <div class="div2"></div>
</div>
```
```css
html, body, div {
  height: 100%;
  margin: 0;
}
.wrap {
  display: flex;
  justify-content: space-between;
}

.div1 {
  min-width: 200px;
}
.div2 {
  width: 100%; /** 或者 flex: 1; */
  background: #e6e6e6;
}
```


## 87、为什么要初始化 CSS 样式
- 初始化 CSS 样式是为了确保网页在不同浏览器和设备上呈现的效果一致，并且避免浏览器的默认样式对页面造成干扰。
- 不同的浏览器对于相同的标签和属性可能会有不同的默认样式，这可能会导致网页在不同浏览器上呈现出不同的外观。另外，浏览器的默认样式也可能会影响网页的布局和性能。
- 通过初始化 CSS 样式，可以清除掉浏览器的默认样式，从而避免以上问题的出现，同时也提供了更好的可定制性和维护性，使得网页开发更加方便和高效。


## 88、transform translate transition 的区别
- translate：移动，transform的一个方法；
  通过 translate() 方法，元素从其当前位置移动，根据给定的 left（x 坐标） 和 top（y 坐标） 位置参数，用法如下：
  ```css
  transform: translate(50px, 100px);
  -ms-transform: translate(50px,100px);
  -webkit-transform: translate(50px,100px);
  -o-transform: translate(50px,100px);
  -moz-transform: translate(50px,100px);
  ```
- transform：变形，CSS3中主要包括
  - 旋转：`rotate()`顺时针旋转给定的角度，允许负值`rotate(30deg)`
  -  扭曲：`skew()`元素翻转给定的角度,根据给定的水平线（X 轴）和垂直线（Y 轴）参数：`skew(30deg,20deg)`
  - 缩放：`scale()`放大或缩小，根据给定的宽度（X 轴）和高度（Y 轴）参数：`scale(2,4)`
  - 移动：`translate()`平移，传进 x,y值，代表沿x轴和y轴平移的距离
  - 所有的2D转换方法组合在一起：`matrix()`旋转、缩放、移动以及倾斜元素`matrix(scale.x ,, , scale.y , translate.x, translate.y)`
  - 改变起点位置`transform-origin: bottom left;`
  综合起来使用：`transform: 30deg 1.5 30deg 20deg 100px 200px;`
- transition: 允许CSS属性值在一定的时间区间内平滑的过渡，  需要**事件的触发**，例如单击、获取焦点、失去焦点等`transition:property duration timing-function delay;`
  - property：CSS的属性，例如：width height 为none时停止所有的运动，可以为transform
  - duration：持续时间
  - timing-function：ease等
  - delay：延迟
  例子：`transition:width 2s ease 0s;`<br>
  注意：当property为all的时候所有动画。


## 89、全屏滚动的原理是什么？用到了 CSS 的那些属性？
全屏滚动的原理是通过 JavaScript 监听鼠标滚轮事件或者触摸事件，根据用户的操作来切换显示区域，从而实现页面的滚动效果。
> 一般来说，全屏滚动会将整个页面分为多个区块，每个区块占据一屏的高度，并且使用 CSS 的定位和过渡属性来实现页面滑动的效果。在切换不同的区块时，会通过 JavaScript 来修改 CSS 中的 transform 属性，从而改变页面的位置。

具体来说，在实现全屏滚动的过程中，通常会用到以下 CSS 属性：
- `position: absolute/fixed`：用于控制页面元素的定位方式。
- `top/bottom/left/right`：用于控制页面元素的位置。
- `width/height`：用于控制页面元素的尺寸大小。
- `transform`：用于控制页面元素的平移、旋转、缩放等变换效果。
- `transition`：用于控制页面元素的过渡动画效果。

例子:
```html
<style>
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
}
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
x.section {
  position: absolute;
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease;
}
.section1 {
  background-color: red;
}
.section2 {
  background-color: green;
  top: 100%;
}
.section3 {
  background-color: blue;
  top: 200%;
}
</style>
<div class="wrapper">
  <div class="section section1"></div>
  <div class="section section2"></div>
  <div class="section section3"></div>
</div>
<script>
var sections = document.querySelectorAll(".section");
var currentSectionIndex = 0;

function scrollToSection(index) {
  if (index < 0 || index > sections.length - 1) {
    return;
  }
  var translateY = index * -100;
  for (var i = 0; i < sections.length; i++) {
    sections[i].style.transform = "translateY(" + translateY + "%)";
  }
  currentSectionIndex = index;
}
document.addEventListener("wheel", function(event) {
  event.preventDefault();
  var delta = event.deltaY;
  var direction = delta > 0 ? 1 : -1;
  scrollToSection(currentSectionIndex + direction);
});
document.addEventListener("touchstart", function(event) {
  touchStartY = event.touches[0].clientY;
});
document.addEventListener("touchmove", function(event) {
  event.preventDefault();
  var touchMoveY = event.touches[0].clientY;
  var delta = touchMoveY - touchStartY;
  var direction = delta > 0 ? -1 : 1;
  scrollToSection(currentSectionIndex + direction);
});
</script>
```
以上代码实现了一个简单的全屏滚动页面，当用户通过鼠标滚轮或者触摸屏幕时，会自动滑动到下一个或上一个区块，并且使用 CSS 的`transform`属性来实现平移效果。


## 90、什么是响应式设计？响应式设计的基本原理是什么？如何兼容低版本的IE？
- 概念：响应式设计就是网站能够兼容多个终端，而不是为每个终端做一个特定的版本。
- 基本原理：是利用CSS3媒体查询，为不同尺寸的设备适配不同样式。
- 兼容：对于低版本的IE，可采用JS获取屏幕宽度，然后通过resize方法来实现兼容：
  ```js
  $(window).resize(function () {
    screenRespond();
  });
  screenRespond();

  function screenRespond(){
    var screenWidth = $(window).width();
    if(screenWidth <= 1800){
      $("body").attr("class", "w1800");
    }
    if(screenWidth <= 1400){
      $("body").attr("class", "w1400");
    }
    if(screenWidth > 1800){
      $("body").attr("class", "");
    }
  }
  ```

## 91、如何修改 chrome 记住密码后自动填充表单的黄色背景？
**方法一：阴影覆盖**：由于是设置颜色覆盖，所以只对非透明的纯色背景有效；
```css
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px white inset !important;
}
```
**方法二：设置表单属性`autocomplete="off/on"`关闭自动填充表单，自己实现记住密码**。如下：
```html
<!-- 对整个表单设置 -->
<form autocomplete="off" method=".." action="..">
<!-- 或对单一元素设置 -->
<input type="text" name="textboxname" autocomplete="off">
```

## 92、用 css 分别实现某个 div 元素上下居中和左右居中
```html
<style>
  * {
    padding: 0;
    margin: 0;
  }
  html, body {
    width: 100vw;
    height: 100vh;
  }
  .container {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
<div class="container">
  <div class="box"></div>
</div>
```
- 方式一：子元素定宽高，绝对定位4个方向值为0 + margin: auto
  ```css
  .box {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: red;
  }
  ```
- 方式二：子元素定宽高，绝对定位，上和 左偏50%，margin负宽度和负高度的一半
  ```css
  .box {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -50px;
    margin-left: -50px;
    background: red;
  }
  ```
- 方式三：子元素定宽高、不定宽高有内容均可
  ```css
  .box {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: red;
  }
  ```
- 方式四：flex布局，父元素必须有宽高，子元素宽高没有限制
  ```css
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .box {
    width: 100px;
    height: 100px;
    background: red;
  }
  ```
- 方式五：grid布局，父元素必须有宽高，子元素宽高没有限制
  ```css
  .container {
    width: 100%;
    height: 100%;
    display: grid;
    justify-content: center;
    align-items: center;
  }
  .box {
    width: 100px;
    height: 100px;
    background: red;
  }
  ```
- 方式六：table + vertical-align （主要针对多行文本垂直居中）
  ```css
  .container {
    display: table;
    width: 100%;
    height: 100%;
  }
  .box {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
  }
  <div class="container">
    <div class="box">多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文</div>
  </div>
  ```


## 93、让页面里的字体变清晰，变细用 CSS 怎么做？
要让页面上的字体变得更清晰和更细，可以使用CSS的`font-weight`和`font-smoothing`属性来实现。例如：
```css
/* 让字体变细 */
body {
  font-weight: 300;
}
/* 让字体更清晰 */
html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```
- `font-weight`属性用于设置字体的粗细程度，值越大表示越粗，值越小表示越细。常见的取值包括100-900之间的整数值，以及“normal”（默认）、“bold”（加粗）等关键字。
- `font-smoothing`属性则用于控制字体的平滑度，即是否启用反锯齿技术来使字体显示更加平滑。不同浏览器支持的取值可能有所差异，常见的取值包括“antialiased”（启用反锯齿，Webkit浏览器），“subpixel-antialiased”（启用亚像素级反锯齿，Webkit浏览器）、“grayscale”（启用灰阶反锯齿，Firefox浏览器）等。


## 94、font-style属性的Oblique和Italic的区别
`font-style`属性用于设置字体的风格，可以取值为`normal`、`italic`和`oblique`。
- `normal`表示正常的字体风格，没有任何倾斜或扭曲。
- `italic`表示斜体字(英文)，通常是对原始字体进行倾斜变形以产生视觉上的斜体效果。Italic字体通常具有一些特殊设计，如较窄的字母间距和弯曲的字母形状等，以使其在斜体状态下更加易读。
- `oblique`也是表示斜体字，但它是通过向右倾斜原始字体来实现，而非使用专门设计的斜体字体。因此，Oblique 字体通常与 Normal 字体相比略微变形，并且可能会导致一些字母看起来不太自然。


## 95、position:fixed; 在 android 下无效怎么处理？
在Android下，可能会遇到`position: fixed`无法生效的问题。这是因为某些Android浏览器（例如低版本的Android默认浏览器）对于fixed定位的支持存在一定的兼容性问题。

解决这个问题的方法之一是使用JavaScript实现fixed效果，具体步骤如下：
1. 监听`scroll`事件，当页面滚动时执行相应的操作；
2. 获取需要固定的元素和页面滚动的距离；
3. 判断页面滚动的距离是否超过了需要固定的元素的位置，如果超过了，则将元素的`position`属性设为`fixed`，否则设置为`static`；
4. 设置元素的`top`和`left`值，使其固定在页面的指定位置。
```html
<style>
#fixed-element {
  position: static; /* 初始状态 */
  width: 100%;
  height: 50px;
  background-color: #ccc;
}

.fixed {
  /* 加上 !important 的原因，在于id选择器的优先级高于类选择器*/
  position: sticky !important; /* 粘性定位 */
  top: 0;
  left: 0;
}
</style>
<div id="fixed-element">我是需要固定的元素</div>
<div style="height: 1000px;"></div>
<script>
// 获取需要固定的元素和页面滚动的距离
var fixedElement = document.getElementById("fixed-element");
// 监听scroll事件
window.addEventListener("scroll", function() {
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  // 判断页面滚动的距离是否超过了需要固定的元素的位置
  if (scrollTop > 50) { // 假设元素需要固定的位置距离页面顶部50px
    fixedElement.classList.add("fixed"); // 添加固定样式
  } else {
    fixedElement.classList.remove("fixed"); // 移除固定样式
  }
});
</script>
```


## 96、如果需要手动写动画，你认为最小时间间隔是多久，为什么？
16.7ms。多数显示器默认频率是60Hz，即1秒刷新60次，所以理论上最小间隔为1/60*1000ms ＝ 16.7ms


## 97、overflow: scroll 时不能平滑滚动的问题怎么处理？
```css
-webkit-overflow-scrolling: touch;
scroll-behavior: smooth;
```

## 98、如何美化 CheckBox
实现思路：
1. 首先让原来的`input`不可见
2. 利用`label for`设置替代`input`的样式
3. 设置`input:checked + label:before`的样式
```html
<input id="check1" type="checkbox"/>
<label  for="check1"></label>
```
```css
/*lable标签的大小、位置、背景颜色更改，在css选择时，“+”代表相邻元素，即当前元素的下一元素*/
#check1 + label{
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  border:1px solid grey;
}
/*当input框为选中状态时，lable标签的样式，其中在css选择时，“：”表示当前input框的值，即checked； \2714 代表对号*/
#check1:checked + label::before{ 
  display: block;
  content: "\2714";
  text-align: center;
  font-size: 16px;
  background: blue;
  color: white;
}
#check1{
  display:none;
}
```


## 99、float 和 display:inline-block 的区别是什么？
- 对元素设置`display：inline-block`，元素不会脱离文本流
- `float`就会使得元素脱离文本流，且还有父元素高度坍塌的效果。


## 100、rem 布局字体太大怎么处理?
getComputedStyle方法能够获取到计算后的样式、大小。
```js
(function(doc, win) {

    var isAndroid = win.navigator.appVersion.match(/android/gi);
    var isIPhone = win.navigator.appVersion.match(/iphone/gi);

    var scale = 1.0;
    var ratio = 1;
    if (isIPhone) {
        if (window.devicePixelRatio == 2) {
            scale *= 0.5;
            ratio *= 2;
        }
        if (window.devicePixelRatio == 3) {
            scale *= (1 / 3);
            ratio *= 3;
        }
    }
    var text = '<meta name="viewport" content="initial-scale=' + scale + ', maximum-scale=' + scale + ',' + ' minimum-scale=' + scale + ', width=device-width,' + ' user-scalable=no" />';
    document.write(text);

    var docEl = doc.documentElement
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
    var recalc = function() {
        var clientWidth = docEl.clientWidth
        if (!clientWidth) return
        docEl.style.fontSize = 100 * (clientWidth / 750) + 'px'

        // 解决部分rem特别大的问题
        var docElFontSize = docEl.style.fontSize.replace(/px/gi, '')
        var computedFontSize = win.getComputedStyle(docEl)['font-size'].replace(/px/gi, '')
        docElFontSize != computedFontSize && (docEl.style.fontSize = docElFontSize * docElFontSize / computedFontSize + 'px')
    }
    if (!doc.addEventListener) return
    recalc()
    win.addEventListener(resizeEvt, recalc, false)
})(document, window);
```


## 101、介绍css3中position:sticky
`position:sticky`是一个新的css3属性，它的表现类似`position:relative`和`position:fixed`的合体，在目标区域在屏幕中可见时，它的行为就像`position:relative;` 而当页面滚动超出目标区域时，它的表现就像`position:fixed`，它会固定在目标位置。


## 102、使用css实现一个持续的动画效果
```css
animation:mymove 5s infinite;
@keyframes mymove {
  from {
    top: 0px;
  }

  to {
    top: 200px;
  }
}
```


## 103、什么是包含块，对于包含块的理解?
在 CSS 中，"包含块"（containing block）是指用于计算元素的定位、大小和边距的父容器。在确定一个元素的位置时，CSS 会将该元素相对于其包含块进行定位。
- 祖先元素的内容区域：如果一个元素没有指定`position`属性，则其包含块通常为最近的祖先元素的内容区域，也就是祖先元素的`padding box`。
- 祖先元素的定位元素：如果一个元素的`position`属性为`absolute`或`fixed`，则其包含块为最近的祖先元素的定位元素，即满足下列条件之一的元素：
  - `position`属性为`absolute`或`fixed`。
  - `transform`, `perspective`, `filter`不是`none`的元素。
  - `overflow`不是`visible`的元素。
- 初始包含块：根元素（HTML文档中的`<html>`元素）的大小就是初始包含块，它是浏览器窗口的大小（viewport），并且不能通过CSS修改。


## 104、CSS 里的 visibility 属性有个 collapse 属性值是干嘛用的？在不同浏览器下以后什么区别？
- （1）对于一般的元素，它的表现跟`visibility：hidden;`是一样的。元素是不可见的，但此时仍占用页面空间。
- （2）但例外的是，如果这个元素是`table`相关的元素，例如`table行，table group，table列，table column group`，它的表现却跟`display:none`一样，也就是说，它们占用的空间也会释放。

在不同浏览器下的区别：
- 在谷歌浏览器里，使用`collapse`值和使用`hidden`值没有什么区别。
- 在火狐浏览器、Opera和IE11里，使用collapse值的效果就如它的字面意思：table的行会消失，它的下面一行会补充它的位
置。


## 105、width:auto 和 width:100%的区别
一般而言
- `width:100%`会使元素box的宽度等于父元素的content box的宽度。
- `width:auto`会使元素撑满整个父元素，`margin`、`border`、`padding`、`content`区域会自动分配水平空间。


## 106、使用 clear 属性清除浮动的原理？
在 CSS 中，`clear`属性用于控制一个元素如何清除其上方浮动元素的影响。当一个元素设置了`clear`属性时，它将会被移动至浮动元素下方，并且不允许出现在浮动元素旁边。

通常，在一个元素内部包含浮动元素时，该元素的高度无法正确计算，从而导致布局混乱。这时候可以用`clear`属性来清除浮动，确保父容器能够正确包裹所有子元素。

例如，想要清除某个`div`元素上方的所有浮动元素的影响，可以使用以下 CSS 代码：
```css
div {
  clear: both;
}
```
这样设置之后，该`div`元素就会被移动至浮动元素的下方，并且不再受到浮动元素的影响。


## 108、简单说一下 css3 的 all 属性。
all属性实际上是所有CSS属性的缩写，表示，所有的CSS属性都怎样怎样，但是，不包括unicode-bidi和direction这两个CSS属性。支持三个CSS通用属性值，initial,inherit,unset。
- initial是初始值的意思，也就是该元素元素都除了unicode-bidi和direction以外的CSS属性都使用属性的默认初始
值。
- inherit是继承的意思，也就是该元素除了unicode-bidi和direction以外的CSS属性都继承父元素的属性值。
- unset是取消设置的意思，也就是当前元素浏览器或用户设置的CSS忽略，然后如果是具有继承特性的CSS，如color，则
使用继承值；如果是没有继承特性的CSS属性，如background-color，则使用初始值。


## 109、absolute 的 containingblock（包含块）计算方式跟正常流有什么不同？
- （1）内联元素也可以作为“包含块”所在的元素；
- （2）“包含块”所在的元素不是父块级元素，而是最近的position不为static的祖先元素或根元素；
- （3）边界是padding box而不是content box。


## 111、视差滚动效果，如何给每页做不同的动画？（回到顶部，向下滑动要再次出现，和只出现一次分别怎么做？
视差滚动是指多层背景以不同的速度移动，形成立体的运动效果，带来非常出色的视觉体验。


## 112、layout viewport、visual viewport 和 ideal viewport 的区别？
- Layout viewport（布局视口）是网页在移动设备上默认的视口大小，它通常等于设备的物理分辨率。在 Layout viewport 中，网页中的元素按照默认的布局和尺寸进行排列和显示。
- Visual viewport（视觉视口）是用户实际看到的网页区域，也就是屏幕上实际可见的部分。Visual viewport 的大小可以根据用户缩放或旋转设备等操作而改变。
- Ideal viewport（理想视口）是为了适应移动设备而提出的一个概念，它是指网页在移动设备上最佳的视口大小。Ideal viewport 能够确保在各种不同尺寸的移动设备上都能够以最佳的显示效果呈现。通常情况下，Ideal viewport 的大小会大于 Layout viewport 的大小，以便在 Visual viewport 中正确显示网页内容。

为了实现 Ideal viewport，可以使用 meta 标签来设置 Viewport，例如：
``html
<meta name="viewport" content="width=device-width, initial-scale=1">
```
这个 meta 标签将视口的宽度设置为设备的宽度，同时把初始缩放比例设置为 1，从而让 Ideal viewport 等于设备的宽度。


## 113、浏览器如何判断是否支持 webp 格式图片
- （1）宽高判断法。
  > 通过创建image对象，将其src属性设置为webp格式的图片，然后在onload事件中获取图片的宽高，如果能够获取，则说明浏览器支持webp格式图片。如果不能获取或者触发了onerror函数，那么就说明浏览器不支持webp格式的图片。
- （2）canvas判断方法。
  > 我们可以动态的创建一个canvas对象，通过canvas的toDataURL将设置为webp格式，然后判断返回值中是否含有image/webp字段，如果包含则说明支持WebP，反之则不支持。


## 114、什么是CSS后处理器？
CSS后处理器是对CSS进行处理，并最终生成CSS的预处理器，它属于广义上的CSS预处理器。我们很久以前就在用CSS后处理器了，最典型的例子是CSS压缩工具（如clean-css），只不过以前没单独拿出来说过。还有最近比较火的Autoprefixer，以CanIUse上的浏览器支持数据为基础，自动处理兼容性问题。

后处理器例如：PostCSS，通常被视为在完成的样式表中根据CSS规范处理CSS，让其更有效；目前最常做的是给CSS属性添加浏览器私有前缀，实现跨浏览器兼容性的问题。


## 115、使用 rem 布局的优缺点？
**优点**：
- 在屏幕分辨率千差万别的时代，只要将rem与屏幕分辨率关联起来就可以实现页面的整体缩放，使得在设备上的展现都统一起来了。
- 而且现在浏览器基本都已经支持rem了，兼容性也非常的好。

**缺点**：
- 在奇葩的dpr设备上表现效果不太好，比如一些华为的高端机型用rem布局会出现错乱。
- 使用iframe引用也会出现问题。
- rem在多屏幕尺寸适配上与当前两大平台的设计哲学不一致。即大屏的出现到底是为了看得又大又清楚，还是为了看的更多的问题。


## 116、什么是首选最小宽度？
“首选最小宽度”，指的是元素最适合的最小宽度。
- “内部尺寸”的意思是，元素的尺寸由内部的元素决定，不由外部的容器决定。假如一个元素里面没有内容，宽度就是 0，那么就是应用的 “内部尺寸” 。
- “内部尺寸”有 3 种表现形式，包裹性、首选最小宽度和最大宽度。

如果外部容器宽度为 0 ，元素尺寸表现的就是首选最小宽度，东亚文字最小宽度为每个汉字的宽度，西方文字一般会终止于空格、短横线、问号以及其它非英文字符。举个例子：

**利用首选最小宽度这个表现形式，实现一个“凸”字**：
- 原理：外部容器宽度设置为 0，显示为块级-行内元素，通过 :before 添加文字，设置轮廓，文字颜色设置为白色。
  ```html
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
      <style>
        .ao{
          display: inline-block;
          width: 0;
        }
        .ao:before{
          outline: 2px solid red;
          content: '我aaaa你';
          color: #fff;
        }
      </style>
    </head>
    <body>
      <div class="ao"></div>
    </body>
  </html>
  ```
  效果如图所示：
  ![2023021410320010.png](http://img.itchenliang.club/img/2023021410320010.png)



## 117、为什么 height:100%会无效？
对于普通文档流中的元素，百分比高度值要想起作用，其父级必须有一个可以生效的高度值。

原因是如果包含块的高度没有显式指定（即高度由内容决定），并且该元素不是绝对定位，则计算值为auto，因为解释成了auto，所以无法参与计算。

使用绝对定位的元素会有计算值，即使祖先元素的height计算为auto也是如此。


## 118、min-width/max-width 和 min-height/max-height 属性间的覆盖规则？
- 如果一个元素同时指定了 min-width 和 max-width 属性（或者 min-height 和 max-height 属性），那么它们之间的关系由更限制元素的属性来确定。
- 如果一个元素只指定了其中一个属性，那么另一个属性将默认为 none。
- 如果一个元素同时包含多个约束条件，并且这些条件具有相同的级别，那么按照以下顺序解决冲突：max-width、min-width、max-height、min-height。也就是说，如果 max-width 和 min-width 之间存在冲突，那么 max-width 将优先于 min-width 生效；如果 max-height 和 min-height 之间存在冲突，那么 max-height 将优先于 min-height 生效。


## 119、内联盒模型基本概念
- （1）内容区域（content area）。内容区域指一种围绕文字看不见的盒子，其大小仅受字符本身特性控制，本质上是一个字符盒子
- （character box）；但是有些元素，如图片这样的替换元素，其内容显然不是文字，不存在字符盒子之类的，因此，对于这些元素，内容区域可以看成元素自身。
- （2）内联盒子（inline box）。“内联盒子”不会让内容成块显示，而是排成一行，这里的“内联盒子”实际指的就是元素的“外在盒子”，用来决定元素是内联还是块级。该盒子又可以细分为“内联盒子”和“匿名内联盒子”两类。
- （3）行框盒子（line box），每一行就是一个“行框盒子”（实线框标注），每个“行框盒子”又是由一个一个“内联盒子”组成的。
- （4）包含块（containing box），由一行一行的“行框盒子”组成。


## 120、什么是幽灵空白节点？
幽灵空白节点（Ghost Empty Element）指的是HTML标记语言中的一种元素，它是一个自闭合标签，没有任何内容或子元素，并且没有结束标记。它在HTML5规范中被称为“void元素”，包括常见的标记如`<br>、<img>和<input>`等。这些元素是用来插入特定类型的内容而不需要任何文本或元素包裹的情况下使用的。例如，`<br>`用于在段落中创建换行符。


## 121、什么是替换元素？
在 HTML 中，替换元素指的是浏览器根据元素的标签和属性值，自行决定如何渲染该元素内容的元素。替换元素通常具有内在尺寸、基于其标记及属性而确定的外观、以及浏览器中预定义的默认尺寸等特征。

常见的替换元素包括`img、input、video、audio、canvas 和 object`等。这些元素都有一个占位符，用来显示元素在文档流中的位置，并且元素本身的内容会被浏览器根据元素的属性值进行替换。


## 122、替换元素的计算规则？
替换元素的尺寸从内而外分为3类：固有尺寸、HTML尺寸和CSS尺寸。
- （1）固有尺寸指的是替换内容原本的尺寸。例如，图片、视频作为一个独立文件存在的时候，都是有着自己的宽度和高度的。
- （2）HTML尺寸只能通过HTML原生属性改变，这些HTML原生属性包括`<img>`的width和height属性、`<input>`的size属性、`<textarea>`的cols和rows属性等。
- （3）CSS尺寸特指可以通过CSS的width和height或者max-width/min-width和max-height/min-height设置的尺寸，对应盒尺寸中的content box。

这3层结构的计算规则具体如下
- （1）如果没有CSS尺寸和HTML尺寸，则使用固有尺寸作为最终的宽高。
- （2）如果没有CSS尺寸，则使用HTML尺寸作为最终的宽高。
- （3）如果有CSS尺寸，则最终尺寸由CSS属性决定。
- （4）如果“固有尺寸”含有固有的宽高比例，同时仅设置了宽度或仅设置了高度，则元素依然按照固有的宽高比例显示。
- （5）如果上面的条件都不符合，则最终宽度表现为300像素，高度为150像素。
- （6）内联替换元素和块级替换元素使用上面同一套尺寸计算规则。


## 123、content 与替换元素的关系？
content属性生成的对象称为“匿名替换元素”。
- （1）我们使用content生成的文本是无法选中、无法复制的，好像设置了user select:none声明一般，但是普通元素的文本却可以被轻松选中。同时，content生成的文本无法被屏幕阅读设备读取，也无法被搜索引擎抓取，因此，千万不要自以为是地把重要的文本信息使用content属性生成，因为这对可访问性和SEO都很不友好。
- （2）content生成的内容不能左右:empty伪类。
- （3）content动态生成值无法获取。


## 124、margin:auto 的填充规则？
margin的'auto'可不是摆设，是具有强烈的计算意味的关键字，用来计算元素对应方向应该获得的剩余间距大小。但是触发margin:auto计算有一个前提条件，就是width或height为auto时，元素是具有对应方向的自动填充特性的。
- （1）如果一侧定值，一侧auto，则auto为剩余空间大小。
- （2）如果两侧均是auto，则平分剩余空间。


## 125、margin 无效的情形
- （1）display计算值inline的非替换元素的垂直margin是无效的。对于内联替换元素，垂直margin有效，并且没有margin合并的问题。
- （2）表格中的`<tr>`和`<td>`元素或者设置display计算值是table-cell或table-row的元素的margin都是无效的。
- （3）绝对定位元素非定位方位的margin值“无效”。
- （4）定高容器的子元素的margin-bottom或者宽度定死的子元素的margin-right的定位“失效”。


## 126、border 的特殊性？
- （1）border-width却不支持百分比。
- （2）border-style的默认值是none，有一部分人可能会误以为是solid。这也是单纯设置border-width或border-color没有边框显示的原因。
- （3）border-style:double的表现规则：双线宽度永远相等，中间间隔±1。
- （4）border-color默认颜色就是color色值。
- （5）默认background背景图片是相对于padding box定位的。


## 127、什么是基线和 x-height？
字母x的下边缘（线）就是我们的基线。

x-height指的就是小写字母x的高度，术语描述就是基线和等分线（meanline）（也称作中线，midline）之间的距离。在CSS世界中，middle指的是基线往上1/2x-height高度。我们可以近似理解为字母x交叉点那个位置。

ex是CSS中的一个相对单位，指的是小写字母x的高度，没错，就是指x-height。ex的价值就在其副业上不受字体和字号影响的内联元素的垂直居中对齐效果。内联元素默认是基线对齐的，而基线就是x的底部，而1ex就是一个x的高度。


## 128、line-height 的特殊性？
- （1）对于非替换元素的纯内联元素，其可视高度完全由line-height决定。对于文本这样的纯内联元素，line-height就是高度计算的基石，用专业说法就是指定了用来计算行框盒子高度的基础高度。
- （2）内联元素的高度由固定高度和不固定高度组成，这个不固定的部分就是这里的“行距”。换句话说，line-height之所以起作用，就是通过改变“行距”来实现的。在CSS中，“行距”分散在当前文字的上方和下方，也就是即使是第一行文字，其上方也是有“行距”的，只不过这个“行距”的高度仅仅是完整“行距”高度的一半，因此，也被称为“半行距”。
- （3）行距=line-height-font-size。
- （4）border以及line-height等传统CSS属性并没有小数像素的概念。如果标注的是文字上边距，则向下取整；如果是文字下边距，则向上取整。
- （5）对于纯文本元素，line-height直接决定了最终的高度。但是，如果同时有替换元素，则line-height只能决定最小高度。
- （6）对于块级元素，line-height对其本身是没有任何作用的，我们平时改变line-height，块级元素的高度跟着变化实际上是通过改变块级元素里面内联级别元素占据的高度实现的。
- （7）line-height的默认值是normal，还支持数值、百分比值以及长度值。为数值类型时，其最终的计算值是和当前font-size相乘后的值。为百分比值时，其最终的计算值是和当前font-size相乘后的值。为长度值时原意不变。
- （8）如果使用数值作为line-height的属性值，那么所有的子元素继承的都是这个值；但是，如果使用百分比值或者长度值作为属性值，那么所有的子元素继承的是最终的计算值。
- （9）无论内联元素line-height如何设置，最终父级元素的高度都是由数值大的那个line-height决定的。
- （10）只要有“内联盒子”在，就一定会有“行框盒子”，就是每一行内联元素外面包裹的一层看不见的盒子。然后，重点来了，在每个“行框盒子”前面有一个宽度为0的具有该元素的字体和行高属性的看不见的“幽灵空白节点”。


## 129、vertical-align 的特殊性？
- （1）vertical-align的默认值是baseline，即基线对齐，而基线的定义是字母x的下边缘。因此，内联元素默认都是沿着字母x的下边缘对齐的。对于图片等替换元素，往往使用元素本身的下边缘作为基线。：一个inline-block元素，如果里面没有内联元素，或者overflow不是visible，则该元素的基线就是其margin底边缘；否则其基线就是元素里面最后一行内联元素的基线。
- （2）vertical-align:top就是垂直上边缘对齐，如果是内联元素，则和这一行位置最高的内联元素的顶部对齐；如果display计算值是table-cell的元素，我们不妨脑补成`<td>`元素，则和`<tr>`元素上边缘对齐。
- （3）vertical-align:middle是中间对齐，对于内联元素，元素的垂直中心点和行框盒子基线往上1/2x-height处对齐。对于table-cell元素，单元格填充盒子相对于外面的表格行居中对齐。
- （4）vertical-align支持数值属性，根据数值的不同，相对于基线往上或往下偏移，如果是负值，往下偏移，如果是正值，往上偏移。
- （5）vertical-align属性的百分比值则是相对于line-height的计算值计算的。
- （6）vertical-align起作用是有前提条件的，这个前提条件就是：只能应用于内联元素以及display值为table-cell的元素。
- （7）table-cell元素设置vertical-align垂直对齐的是子元素，但是其作用的并不是子元素，而是table-cell元素自身。


## 130、overflow 的特殊性？
- （1）一个设置了overflow:hidden声明的元素，假设同时存在border属性和padding属性，则当子元素内容超出容器宽度高度限制的时候，剪裁的边界是border box的内边缘，而非padding box的内边缘。
- （2）HTML中有两个标签是默认可以产生滚动条的，一个是根元素`<html>`，另一个是文本域`<textarea>`。
- （3）滚动条会占用容器的可用宽度或高度。
- （4）元素设置了overflow:hidden声明，里面内容高度溢出的时候，滚动依然存在，仅仅滚动条不存在！


## 131、无依赖绝对定位是什么？
无依赖绝对定位（"independent absolute positioning"）是一种CSS中的布局技术，它允许元素相对于其最近的已定位祖先元素进行定位，而不考虑其他元素的影响。

无依赖绝对定位是指通过设置元素的top、right、bottom、left属性来精确地定位元素，而不依赖于其他元素或父容器的位置和大小。以下是一个简单的例子：
```html
<style>
  .box {
    position: absolute;
    top: 50px;
    left: 100px;
    width: 200px;
    height: 100px;
    background-color: yellow;
  }
</style>
<div class="box">我是一个绝对定位的元素</div>
```


## 132、clip 裁剪是什么？
CSS `clip`是一种用于裁剪元素的属性。它可以将一个元素裁剪成一个矩形区域，并只显示该区域内的内容，超出区域的部分则被隐藏掉。
- `clip`属性需要指定一个裁剪区域，以左上角和右下角的坐标值表示，具体语法如下：
  ```css
  clip: rect(top, right, bottom, left);
  clip: rect(30px 120px 80px 20px);
  ```
  其中`top、right、bottom、left`四个值分别表示裁剪区域上边界、右边界、下边界和左边界的位置，可以使用像素、百分比等单位来指定。
  > 注意: `clip`属性已经在 CSS3 中被废弃了，推荐使用更加灵活的`clip-path`属性进行裁剪。
- `clip-path`属性是一种用于裁剪元素的属性，它可以指定一个SVG路径或基本形状来定义一个裁剪区域，以将元素的可见部分限制在该区域内。相比于已经被废弃的 `clip`属性，`clip-path`更加灵活和强大。
  ```css
  clip-path: <url>|<basic-shape>|<geometry-box>|none;
  ```
  取值可以为以下三种类型之一：
  - `<url>`：指定 SVG 文件中定义的路径元素（例如`<path>、<circle>`等）；
  - `<basic-shape>`：指定基本几何形状，包括`inset()、circle()、ellipse()、polygon()`等；
  - `<geometry-box>`：指定参考的盒模型，包括`padding-box、border-box、content-box`等。
  例如，要将一个元素裁剪成一个四边形，可以这样设置`clip-path`属性：
  ```css
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  ```
  这会将元素裁剪成一个居中的菱形区域。


## 134、隐藏元素的 background-image 到底加不加载？
根据测试，隐藏元素的方法主要有如下三种:
- `display: none;`: 在这种情况下，设置的背景图片不会加载；
- `visibility: hidden;`: 在这种情况下，设置的背景图片会加载；
- `opacity: 0;`: 在这种情况下，设置的背景图片会加载；


<!-- ======================================== 评论区 ======================================== -->
<!-- <valine-comment/> -->