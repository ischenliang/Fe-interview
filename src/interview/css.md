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
- BFC：块级格式上下文(Block Formatting Context)，指的是一个独立的布局环境，BFC 内部的元素布局与外部互不影响。
- IFC：行内格式化上下文(Inline Formatting Context)，值得是一个块级元素中仅包含内联级别元素。
  - 布局规则
    - 子元素水平方向横向排列，并且垂直方向起点为元素顶部。
    - 子元素设置`padding、border、margin`只会计算横向样式空间，垂直方向样式空间不会被计算。
    - 在垂直方向上，子元素会以不同形式来对齐(`vertical-align`)
    - 能把在一行上的框都完全包含进去的一个矩形区域，被称为该行的行框`line box`。行框的宽度是由包含块`containing box`和与其中的浮动来决定。
    - IFC 中的`line box`一般左右边贴紧其包含块，但`float`元素会优先排列。
    - IFC 中的`line box`高度由 CSS 行高计算规则来确定，同个 IFC 下的多个`line box`高度可能会不同。
    - 当一个`inline box`超过父元素的宽度时，它会被分割成多个`boxes`，这些`boxes`分布在多个`line box`中。如果子元素未设置强制换行的情况下，`inline box`将不可被分割，将会溢出父元素。
- GFC：网格布局格式化上下文，将一块区域以`grid`网格的形式来格式化
- FFC：弹性格式化上下文，将一块区域以`flex`弹性盒的形式来格式化

## 5、🔥flex布局如何使用？
`flex`是`Flexible Box`的缩写，意为"弹性布局"。指定容器`display: flex`即可。

容器有以下属性：`flex-direction`，`flex-wrap`，`flex-flow`，`justify-content`，`align-items`，`align-content`。
- `flex-direction`属性决定主轴的方向；
- `flex-wrap`属性定义，如果一条轴线排不下，如何换行；
- `flex-flow`属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap；
- `justify-content`属性定义了项目在主轴上的对齐方式。
- `align-items`属性定义项目在交叉轴上如何对齐。
- `align-content`属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

项目（子元素）也有一些属性：`order`，`flex-grow`，`flex-shrink`，`flex-basis`，`flex`，`align-self`。
- `order`属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
- `flex-grow`属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
- `flex-shrink`属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
- `flex-basis`属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。
- `flex`属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
- `align-self`属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性。默认值为 auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

## 6、🔥grid布局如何使用？


## 7、⭐分析比较 opacity: 0、visibility: hidden、display: none区别、优劣和适用场景
三个属性都是让元素隐藏，不可见，其区别在于：
- `display: none`渲染树不会包含该渲染对象，因此该元素不会在页面中占据位置，也不会响应绑定的监听事件
- `visibility: hidden`元素在页面中仍占据空间，但是不会响应绑定的监听事件
- `opacity: 0`元素在页面中仍占据空间，同时也会响应绑定的监听事件

优缺点：
- 结构：`display:none`会让元素完全从渲染树中消失，渲染的时候不占据任何空间, 不能点击；`visibility: hidden`不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，不能点击；`opacity: 0`不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，可以点击
- 继承：`display: none`和`opacity: 0`是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示。 `visibility: hidden`是继承属性，子孙节点消失由于继承了hidden，通过设置`visibility: visible`;可以让子孙节点显式。
- 性能：`display: none`修改元素会造成文档回流,读屏器不会读取`display: none`元素内容，性能消耗较大`visibility:hidden`修改元素只会造成本元素的重绘,性能消耗较少读屏器读取`visibility: hidden`元素内容`opacity: 0`修改元素会造成重绘，性能消耗较少

适用场景：
- `display: none` (不占空间，不能点击)（场景，显示出原来这里不存在的结构）
- `visibility: hidden`（占据空间，不能点击）（场景：显示不会导致页面结构发生变动，不会撑开）
- `opacity: 0`（占据空间，可以点击）（场景：可以跟transition搭配）

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
`transform`属于合成属性（composite property），对合成属性进行 transition/animation 动画将会创建一个合成层（composite layer），这使得被动画元素在一个独立的层中进行动画。通常情况下，浏览器会将一个层的内容先绘制进一个位图中，然后再作为纹理（texture）上传到 GPU，只要该层的内容不发生改变，就没必要进行重绘（repaint），浏览器会通过重新复合（recomposite）来形成一个新的帧。

`top/left`属于布局属性，该属性的变化会导致重排（reflow/relayout），所谓重排即指对这些节点以及受这些节点影响的其它节点，进行CSS计算->布局->重绘过程，浏览器需要为整个层进行重绘并重新上传到 GPU，造成了极大的性能开销。

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
- transition: 是过渡属性，强调过渡，它的实现需要触发一个事件(比如鼠标移入移出、焦点、点击等)才执行动画；
  - transition-property：指定过渡的css属性的name
  - transition-duration：指定过渡所需的完成时间
  - transition-timing-function：指定过渡函数
  - transition-delay：指定过渡的延迟时间
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
- animation: 是动画属性，它的实现不需要触发事件，设定好时间之后可以自己执行，且可以循环一个动画；
  - animation-name：指定要绑定到选择器的关键帧的名称
  - animation-duration：动画指定需要多少秒或毫秒完成
  - animation-timing-function：设置动画将如何完成一个周期
  - animation-delay：设置动画在启动前的延迟间隔
  - animation-iteration-count：定义动画的播放次数
  - animation-direction：指定是否应该轮流反向播放动画
  - animation-fill-mode：规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式
  - animation-play-state：指定动画是否正在运行或已暂停
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
PNG图片主要有三个类型，分别为 PNG8 / PNG24 / PNG32
- `PNG8`：PNG 8中的8，其实指的是8bits，相当于用2^8（2的8次方）大小来存储一张图片的颜色种类，2^8等于256，也就是说PNG 8能存储256种颜色，一张图片如果颜色种类很少，将它设置成PNG 8得图片类型是非常适合的。
- `PNG24`：PNG 24中的24，相当于3乘以8 等于 24，就是用三个8bits分别去表示 R（红）、G（绿）、B（蓝）。R(0-255),G(0-255),B(0-255)，可以表达256乘以256乘以256=16777216种颜色的图片，这样PNG 24就能比PNG 8表示色彩更丰富的图片。但是所占用的空间相对就更大了。
- `PNG32`：PNG 32中的32，相当于PNG 24 加上 8bits的透明颜色通道，就相当于R（红）、G（绿）、B（蓝）、A（透明）。R(0255),G(0255),B(0255),A(0255)。比PNG 24多了一个A（透明），也就是说PNG 32能表示跟PNG 24一样多的色彩，并且还支持256种透明的颜色，能表示更加丰富的图片颜色类型。

PNG图片的压缩，分两个阶段：
- 预解析（Prediction）：这个阶段就是对png图片进行一个预处理，处理后让它更方便后续的压缩。
- 压缩（Compression）：执行Deflate压缩，该算法结合了 LZ77 算法和 Huffman 算法对图片进行编码。

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


## 17、🔥说说两种盒模型以及区别
盒模型也称为框模型，就是从盒子顶部俯视所得的一张平面图，用于描述元素所占用的空间。它有两种盒模型，W3C盒模型和IE盒模型（IE6以下，不包括IE6以及怪异模式下的IE5.5+）。
![202302091538234.png](http://img.itchenliang.club/img/202302091538234.png)
![2023020915383510.png](http://img.itchenliang.club/img/2023020915383510.png)

盒模型都是由四个部分组成：margin、border、padding、content

标准盒模型的IE盒模型的区别在于设置width和height时，所对应的范围不同：
- 标准盒模型：width和height属性的范围只包含content
- IE盒模型：width和height的范围包含了border、padding和content

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
**重排**：部分渲染树（或者整个渲染树）需要重新分析并且节点尺寸需要重新计算，表现为重新生成布局，重新排列元素

**重绘**：由于节点的几何属性发生改变或者由于样式发生改变，例如改变元素背景色时，屏幕上的部分内容需要更新，表现为某些元素的外观被改变

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
- **inline-block**：将元素设置为inline元素，但元素的内容作为block元素呈现，之后的内联元素会被排在同一行；

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
两者都是引入外部css样式表的方式，区别如下：
- `link`是XHTML标签，除了加载css外，还可以定义RSS等其他事物，`@import`属于css范畴，只能加载css；
- `link`引入css时，在页面载入时同时加载；`@import`需要页面网页完全载入以后加载;
- `link`是XHTML标签，无兼容问题；`@import`是css2.1提出的，低版本的浏览器不支持；
- `link`支持使用JavaScript控制DOM改变样式；`@import`不支持；
- `link`引入样式的权重大于`@import`的引用（`@import`是将引用的样式导入到当前的页面中）;

## 29、伪元素和伪类的区别和作用？
- 伪元素使用 2 个冒号，伪类使用1个冒号；
- 伪元素添加了一个页面中没有的元素（只是从视觉效果上添加了，不是在文档树中添加）， 伪类是给页面中已经存在的元素添加一个类；

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
- p:first-of-type 选择属于其父元素的首个`<p>`元素的每个`<p>`元素。
- p:last-of-type  选择属于其父元素的最后`<p>`元素的每个`<p>`元素。
- p:only-of-type  选择属于其父元素唯一的`<p>`元素的每个`<p>`元素。
- p:only-child    选择属于其父元素的唯一子元素的每个`<p>`元素。
- p:nth-child(2)  选择属于其父元素的第二个子元素的每个`<p>`元素。
- :enabled、:disabled 控制表单控件的禁用状态。
- :checked，单选框或复选框被选中。

**总结**：伪类的操作对象是文档树中已有的元素，而伪元素则创建了一个文档树外的元素。因此，伪类和伪元素的区别在于：有没有创建一个文档树之外的元素。
[参考](https://blog.csdn.net/weixin_51610980/article/details/128553661)

## 30、对requestAnimation的理解
大多数电脑显示器的刷新频率是60Hz，大概相当于每秒钟重绘60次。大多数浏览器都会对重绘操作加以限制，不超过显示器的重绘频率，因为即使超过那个频率用户体验也不会有提升。因此，最平滑动画的最佳循环间隔是1000ms/60，约等于16.6ms。

而setTimeout和setInterval的问题是，它们都不精确。它们的内在运行机制决定了时间间隔参数实际上只是指定了把动画代码添加到浏览器UI线程队列中以等待执行的时间。如果队列前面已经加入了其他任务，那动画代码就要等前面的任务完成后再执行。

requestAnimationFrame采用系统时间间隔，保持最佳绘制效率，不会因为间隔时间过短，造成过度绘制，增加开销；也不会因为间隔时间太长，使用动画卡顿不流畅，让各种网页动画效果能够有一个统一的刷新机制，从而节省系统资源，提高系统性能，改善视觉效果。

特点：
- requestAnimationFrame会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率
- 在隐藏或不可见的元素中，requestAnimationFrame将不会进行重绘或回流，这当然就意味着更少的CPU、GPU和内存使用量
- requestAnimationFrame是由浏览器专门为动画提供的API，在运行时浏览器会自动优化方法的调用，并且如果页面不是激活状态下的话，动画会自动暂停，有效节省了CPU开销

[参考](https://blog.csdn.net/m0_48076809/article/details/122468534)


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
通过修改某个属性值呈现的内容就可以被替换的元素就成为“替换元素”。

替换元素除了内容可替换这一特性以外，还有一下特性：
- 内容的外观不受页面上的css影响：用专业的话讲就是在样式在css作用于之外，如何更改替换元素本身的外观需要类似appearance属性，或者浏览器自身暴露的一些样式接口
- 有自己的尺寸：在web中，很多替换元素在没有明确尺寸设定的情况下，其默认的尺寸(不包含边框)是300px x 150px
- 在css属性上呈现自己的表现规则：比较具有代表性的就是vertical-align属性，对于替换元素和非替换元素，vertical-align属性值的解释是不一样的。比方说vertical-align的默认值的baseline，很简单的属性值，基线之意，被定义为字符x的下边缘，而替换元素的基线却被硬生生定义成了元素的下边缘
- 所有的替换元素都是内联水平元素：也就是替换元素和替换元素、替换元素和文字都是可以在一行显示的。但是，替换元素默认的display值却是不一样的，有的是inline，有的是inline-block

替换元素的尺寸从内而外分为三类：
- 固有尺寸：指的是替换内容原本的尺寸。例如，图片、视频作为一个独立文件存在的时候，都是有着自己的宽度和高度的。
- HTML尺寸：只能通过HTML原生属性改变，这些HTML原生属性包括的width和height属性、的size属性。
- CSS尺寸：特指可以通过CSS的width和height或者max-width/min-width和max-height/min-height设置的尺寸，对应盒尺寸中的content box。

这三层结构的计算规则具体如下：
- （1）如果没有CSS尺寸和HTML尺寸，则使用固有尺寸作为最终的宽高。
- （2）如果没有CSS尺寸，则使用HTML尺寸作为最终的宽高。
- （3）如果有CSS尺寸，则最终尺寸由CSS属性决定。
- （4）如果“固有尺寸”含有固有的宽高比例，同时仅设置了宽度或仅设置了高度，则元素依然按照固有的宽高比例显示。
- （5）如果上面的条件都不符合，则最终宽度表现为300像素，高度为150像素。
- （6）内联替换元素和块级替换元素使用上面同一套尺寸计算规则。

## 34、常见的图片格式及使用场景
1. BMP
  是无损的、既支持索引色也支持直接色的点阵图。这种图片格式几乎没有对数据进行压缩，所以BMP格式的图片通常是较大的文件。
2. GIF
  gif 图形交换格式，索引颜色格式，颜色少的情况下，产生的文件极小，支持背景透明，动画，图形渐进，无损压缩（适合线条，图标等），缺点只有 256 种颜色
3. JPEG
  jpg 支持上百万种颜色，有损压缩，压缩比可达 180：1，而且质量受损不明显，不支持图形渐进与背景透明，不支持动画
4. PNG
  png 为替代 gif 产生的，位图文件，支持透明，半透明，不透明。不支持动画，无损图像格式。Png8 简单说是静态 gif，也只有 256 色，png24 不透明，但不止 256 色。
5. PNG-8
  是无损的、使用索引色的点阵图。PNG是一种比较新的图片格式，PNG-8是非常好的GIF格式替代者，在可能的情况下，应该尽可能的使用PNG-8而不是GIF，因为在相同的图片效果下，PNG-8具有更小的文件体积。除此之外，PNG-8还支持透明度的调节，而GIF并不支持。除非需要动画的支持，否则没有理由使用GIF而不是PNG-8。
6. PNG-24
  是无损的、使用直接色的点阵图。PNG-24的优点在于它压缩了图片的数据，使得同样效果的图片，PNG-24格式的文件大小要比BMP小得多。当然，PNG24的图片还是要比JPEG、GIF、PNG-8大得多。
7. SVG
  是无损的矢量图。SVG是矢量图意味着SVG图片由直线和曲线以及绘制它们的方法组成。当放大SVG图片时，看到的还是线和曲线，而不会出现像素点。SVG图片在放大时，不会失真，所以它适合用来绘制Logo、Icon等。
8. Webp
  是谷歌开发的一种新图片格式，WebP是同时支持有损和无损压缩的、使用直接色的点阵图。从名字就可以看出来它是为Web而生的，什么叫为Web而生呢？就是说相同质量的图片，WebP具有更小的文件体积。现在网站上充满了大量的图片，如果能够降低每一个图片的文件大小，那么将大大减少浏览器和服务器之间的数据传输量，进而降低访问延迟，提升访问体验。
  webp 谷歌开发的旨在加快图片加载速度的图片格式，图片压缩体积是 jpeg 的 2/3，有损压缩。高版本的 W3C 浏览器才支持，google39+，safari7+

  目前只有Chrome浏览器和Opera浏览器支持WebP格式，兼容性不太好。
  - 在无损压缩的情况下，相同质量的WebP图片，文件大小要比PNG小26%；
  - 在有损压缩的情况下，具有相同图片精度的WebP图片，文件大小要比JPEG小25%~34%；
  - WebP图片格式支持图片透明度，一个无损压缩的WebP图片，如果要支持透明度只需要22%的格外文件大小。

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
以 iPhone XS 为例，当写 CSS 代码时，针对于单位 px，其宽度为 414px & 896px，也就是说当赋予一个 DIV元素宽度为 414px，这个 DIV 就会填满手机的宽度；

而如果有一把尺子来实际测量这部手机的物理像素，实际为 1242*2688 物理像素；经过计算可知，1242/414=3，也就是说，在单边上，一个逻辑像素=3个物理像素，就说这个屏幕的像素密度为 3，也就是常说的 3 倍屏。

对于图片来说，为了保证其不失真，1 个图片像素至少要对应一个物理像素，假如原始图片是 500300 像素，那么在 3 倍屏上就要放一个 1500900 像素的图片才能保证 1 个物理像素至少对应一个图片像素，才能不失真。
![202302091615558.png](http://img.itchenliang.club/img/202302091615558.png)

当然，也可以针对所有屏幕，都只提供最高清图片。虽然低密度屏幕用不到那么多图片像素，而且会因为下载多余的像素造成带宽浪费和下载延迟，但从结果上说能保证图片在所有屏幕上都不会失真。

还可以使用 CSS 媒体查询来判断不同的像素密度，从而选择不同的图片：
```css
#my-image { background: (low.png); }
@media only screen and (min-device-pixel-ratio: 1.5) {
  #my-image { background: (high.png); }
}
```

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
- static: 正常文档流定位，此时 top, right, bottom, left 和 z-index 属性无效，块级元素从上往下纵向排布，行级元素从左向右排列。
- relative：相对定位，此时的『相对』是相对于正常文档流的位置。
- absolute：相对于最近的非 static 定位祖先元素的偏移，来确定元素位置，比如一个绝对定位元素它的父级、和祖父级元素都为relative，它会相对他的父级而产生偏移。
- fixed：指定元素相对于屏幕视口（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变，比如那种回到顶部的按钮一般都是用此定位方式。
- sticky：粘性定位，特性近似于relative和fixed的合体，其在实际应用中的近似效果就是IOS通讯录滚动的时候的『顶屁股』。

## 42、style 标签写在 body 后和 body 前有什么区别？
页面加载自上而下当然是先加载样式。写在body标签后由于浏览器以逐行方式对HTML文档进行解析，当解析到写在尾部的样式表（外联或写在style标签）会导致浏览器停止之前的渲染，等待加载且解析样式表完成之后重新渲染，在windows的IE下可能会出现FOUC现象（即样式失效导致的页面闪烁问题）


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
- **特点**: 比较特殊的三栏布局，同样也是两边固定宽度，中间自适应，唯一区别是dom结构必须是先写中间列部分，这样实现中间列可以优先加载。
```html
<article class="container">
  <div class="center">
    <h2>圣杯布局</h2>
  </div>
  <div class="left"></div>
  <div class="right"></div>
</article>
```
```css
.container {
  padding-left: 220px;//为左右栏腾出空间
  padding-right: 220px;
}
.left {
  float: left;
  width: 200px;
  height: 400px;
  background: red;
  margin-left: -100%;
  position: relative;
  left: -220px;
}
.center {
  float: left;
  width: 100%;
  height: 500px;
  background: yellow;
}
.right {
  float: left;
  width: 200px;
  height: 400px;
  background: blue;
  margin-left: -200px;
  position: relative;
  right: -220px;
}
```
- **实现步骤**:
  - 三个部分都设定为左浮动，**否则左右两边内容上不去，就不可能与中间列同一行**。然后设置center的宽度为100%(**实现中间列内容自适应**)，此时，left和right部分会跳到下一行
    ![202302251609287.png](http://img.itchenliang.club/img/202302251609287.png)
  - 通过设置margin-left为负值让left和right部分回到与center部分同一行
    ![2023022516095310.png](http://img.itchenliang.club/img/2023022516095310.png)
  - 通过设置父容器的padding-left和padding-right，让左右两边留出间隙。
    ![202302251610103.png](http://img.itchenliang.club/img/202302251610103.png)
  - 通过设置相对定位，让left和right部分移动到两边。
    ![202302251610255.png](http://img.itchenliang.club/img/202302251610255.png)
- **缺点**: 
  - center部分的最小宽度不能小于left部分的宽度，否则会left部分掉到下一行
  - 如果其中一列内容高度拉长(如下图)，其他两列的背景并不会自动填充。(借助等高布局正padding+负margin可解决，下文会介绍)
  ![202302251612099.png](http://img.itchenliang.club/img/202302251612099.png)

#### 双飞翼布局
- **特点**: 同样也是三栏布局，在圣杯布局基础上进一步优化，解决了圣杯布局错乱问题，实现了内容与布局的分离。而且任何一栏都可以是最高栏，不会出问题。
  ```html
  <article class="container">
    <div class="center">
        <div class="inner">双飞翼布局</div>
    </div>
    <div class="left"></div>
    <div class="right"></div>
  </article>
  ```
  ```css
  .container {
    min-width: 600px;//确保中间内容可以显示出来，两倍left宽+right宽
  }
  .left {
    float: left;
    width: 200px;
    height: 400px;
    background: red;
    margin-left: -100%;
  }
  .center {
    float: left;
    width: 100%;
    height: 500px;
    background: yellow;
  }
  .center .inner {
    margin: 0 200px; //新增部分
  }
  .right {
    float: left;
    width: 200px;
    height: 400px;
    background: blue;
    margin-left: -200px;
  }
  ```
-  **实现步骤**: (前两步与圣杯布局一样)
  - 三个部分都设定为左浮动，然后设置center的宽度为100%，此时，left和right部分会跳到下一行；
  - 通过设置margin-left为负值让left和right部分回到与center部分同一行；
  - center部分增加一个内层div，并设margin: 0 200px；
- **缺点**: 
  - 多加一层 dom 树节点，增加渲染树生成的计算量。

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


## 58、设置元素浮动后，该元素的 display 值是多少？
自动变成`display: block`


## 59、怎么让 Chrome 支持小于 12px 的文字？
使用css3 的`transform`属性，设置值为 `scale(x, y)` 定义 2D 缩放转换
```css
.test {
  font-size: 12px;
  transform: scale(0.50);
}
```
最终字体大小则是`6px`。


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
- 使用 import 方法导入样式表
- 将样式表放在页面底部
- 有几个样式表，放在 html 结构的不同位置。

原理很清楚：当样式表晚于结构性 html 加载，当加载到此样式表时，页面将停止之前的渲染。此样式表被下载和解析后，将重新渲染页面，也就出现了短暂的花屏现象。

解决方法：
> 使用 link 标签将样式表放在文档 head 中。


## 65、行内元素 float:left 后是否变为块级元素？
- 行内元素设置成浮动之后变得更加像是 inline-block
- 行内块级元素，设置成这个属性的元素会同时拥有行内和块级的特性，最明显的不同是它的默认宽度不是 100%，行内元素默认 100%宽度占据一行
- 这时候给行内元素设置 padding-top 和 padding-bottom 或者 width、height 都是有效果的


## 66、在网页中的应该使用奇数还是偶数的字体？为什么呢？
应该使用偶数字体
1. 比例关系
  相对来说偶数字号比较容易和页面中其他部分的字号构成一个比例关系。如我使用 14px 的字体作为正文字号，那么其他部分的字体（如标题）就可以使用 14×1. 5 =21px 的字体，或者在一些地方使用到了 14×0. 5=7px 的 padding 或者 margin，如果你是在用 sass 或者 less 编写 css，这时候用处就凸显出来了。
2. UI 设计师的缘故
  大多数设计师用的软件如 ps 提供的字号是偶数，自然到了   前端那边也是用的是偶数。
3. 浏览器缘故
  - 其一是低版本的浏览器 ie6 会把奇数字体强制转化为偶数，即 13px 渲染为 14px。
  - 其二是为了平分字体。偶数宽的汉字，如 12px 的汉子，去掉 1 像素的字体间距，填充了的字体像素宽度其实就是 11px，这样的汉字中竖线左右是平分的，如“中”子，左右就是 5px 了。
4. 系统差别
  - Windows 自带的点阵宋体（中易宋体）从 Vista 开始只提供 12、14、16 px 这三个大小的点阵，而 13、15、17 px 时用的是小一号的点阵（即每个字占的空间大了 1 px，但点阵没变），于是略显稀疏。
  - 在 Linux 和其他手持设备上，奇数偶数的渲染效果其实相差不大。


## 67、CSS 合并方法
```css
@import url(css 文件地址)
```


## 68、列出你所知道可以改变页面布局的属性
width、height、float、position、display、margin、left、top、right、bottom等


## 69、CSS 在性能优化方面的实践
1. 内联首屏关键 CSS（Critical CSS）
  内联 CSS 能够使浏览器开始页面渲染的时间提前，只将渲染首屏内容所需的关键 CSS 内联到 HTML 中
2. 异步加载 CSS
3. 文件压缩
4. 去除无用 CSS


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
- 什么是 Base64
  Base64 是一种基于 64 个可打印字符来表示二进制数据的编码方式，是从二进制数据到字符的过程。 原则上，计算机中所有内容都是二进制形式存储的，所以所有内容（包括文本、影音、图片等）都可以用 base64 来表示。
- 适用场景
  1. Base64一般用于在HTTP协议下传输二进制数据，由于HTTP协议是文本协议，所以在HTTP写一下传输二进制数据需要将二进制数据转化为字符数据，网络传输只能传输可打印字符，在ASCII码中规定，0-31、128这33个字符属于控制字符，32~127这95个字符属于可打印字符，那么其它字符怎么传输呢，Base64就是其中一种方式，
  2. 将图片等资源文件以Base64编码形式直接放于代码中，使用的时候反Base64后转换成Image对象使用。
  3. 偶尔需要用这条纯文本通道传一张图片之类的情况发生的时候，就会用到Base64，比如多功能Internet 邮件扩充服务（MIME）就是用Base64对邮件的附件进行编码的。
- Base64 编码原理
  Base64 编码之所以称为 Base64，是因为其使用 64 个字符来对任意数据进行编码，同理有 Base32、Base16 编码。标准 Base64 编码使用的 64 个字符为：
- 优缺点
  - 优点: 可以将二进制数据转化为可打印字符，方便传输数据，对数据进行简单的加密，肉眼安全。
  - 缺点：内容编码后体积变大，编码和解码需要额外工作量。


## 72、position 的值， relative 和 absolute 分别是相对于谁进行定位的？
- absolute : 生成绝对定位的元素， 相对于最近一级的 定位不是 static 的父元素来进行定位。
- fixed （老 IE 不支持）生成绝对定位的元素，通常相对于浏览器窗口或 frame 进行定位。
- relative 生成相对定位的元素，相对于其在普通流中的位置进行定位。
- static 默认值。没有定位，元素出现在正常的流中
- sticky 生成粘性定位的元素，容器的位置根据正常文档流计算得出


## 73、对偏移、卷曲、可视的理解
参考：https://www.yht7.com/news/86379
**偏移**
```css
offsetWidth  width + padding + border
offsetHeight height + padding + border
offsetLeft
offsetTop
offsetParent
注意：没有offsetRight和offsetBottom
```
**卷曲**
```css
scrollWidth  width + padding
scrollHeight  当内部的内容溢出盒子的时候， 顶边框的底部，计算到内容的底部；若是内容没有溢出盒子，计算方式为盒子内部的真实高度（边框到边框）
scrollLeft   这个scroll系列属性不是只读的
scrollTop
scroll()

此函数能够获取卷曲的高度和卷曲的宽度
function myScroll() {
  return {
   top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
   left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
  };
}
滚动滚动条的时候触发事件
box（window）.onscroll = function () {}
```
**可视**
```css
clientWidth  获取的是元素内部的真实宽度 width + padding
clientHeight 边框之间的高度
clientLeft  至关于左边框的宽度 若是元素包含了滚动条，而且滚动条显示在元素的左侧。这时，clientLeft属性会包含滚动条的宽度17px
clientTop   至关于顶边框的宽度
client()

此函数能够获取浏览器可视区域的宽高
function myClient() {
  return {
    wid: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
    heit: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
  };
}
\----------------------------------------------------------------------------------------------
@offsetHeight和style.height的区别
demo.style.height只能获取行内样式，若是样式写到了其余地方，甚至根本就没写，便没法获取
style.height是字符串（并且带单位），offsetHeight是数值
demo.style.height能够设置行内样式，offsetHeight是只读属性
所以，通常用demo.offsetHeight来获取某元素的真实宽度/高度，用style.height来设置宽度/高度
\----------------------------------------------------------------------------------------------
@offsetLeft和style.left的区别
1、style.left只能获取行内样式
2、offsetLeft只读，style.left可读可写
3、offsetLeft是数值，style.left是字符串而且有单位px
4、若是没有加定位，style.left获取的数值多是无效的
5、最大区别在于offsetLeft以border左上角为基准，style.left以margin左上角为基准
\----------------------------------------------------------------------------------------------
@scrollHeight和scrollWidth
标签内部实际内容的高度/宽度
不计算边框，若是内容不超出盒子，值为盒子的宽高（不带边框）
若是内容超出了盒子，就是从顶部或左部边框内侧一直到内容a的最外部分
\----------------------------------------------------------------------------------------------
@scrollTop和scrollLeft
被卷去部分的 顶部/左侧 到可视区域 顶部/左侧 的距离
```


## 74、如果设计中使用了非标准的字体，你该如何去实现？
使用 `@font-face` 并为不同的 `font-weight` 定义 `font-family` 。


## 75、知道 css 有个 content 属性吗？有什么作用？有什么应用？
css 的 content 属性专门应用在 `before/after` 伪元素上，用来插入生成内容。最常见的应用是利用伪类清除浮动。
```css
/** 一种常见利用伪类清除浮动的代码 */
.clearfix:after {
  content: "."; /** 这里利用到了content属性 */
  display: block;
  height: 0;
  visibility: hidden;
  clear: both;
}

.clearfix {
  zoom: 1;
}
```
after 伪元素通过 content 在元素的后面生成了内容为一个点的块级素，再利用 clear:both 清除浮动。那么问题继续还有，知道 css 计数器（序列数字字符自动递增）吗？如何通过 css content 属性实现 css 计数器？
- css 计数器是通过设置 `counter-reset` 、`counter-increment` 两个属性 、及 `counter()/counters()`一个方法配合 after / before 伪类实现。


## 76、请阐述 float 定位的工作原理
浮动（float）是 CSS 定位属性。浮动元素从网页的正常流动中移出，但是保持了部分的流动性，会影响其他元素的定位（比如文字会围绕着浮动元素）。这一点与绝对定位不同，绝对定位的元素完全从文档流中脱离。

CSS 的 clear 属性通过使用 `left`、`right`、`both`，让该元素向下移动（清除浮动）到浮动元素下面。

如果父元素只包含浮动元素，那么该父元素的高度将塌缩为 0。我们可以通过清除（clear）从浮动元素后到父元素关闭前之间的浮动来修复这个问题。

有一种 hack 的方法，是自定义一个 `.clearfix` 类，利用伪元素选择器 `::after` 清除浮动。另外还有一些方法，比如添加空的`<div></div>`和设置浮动元素父元素的 overflow 属性。与这些方法不同的是， `clearfix`方法，只需要给父元素添加一个类，定义如下：
```css
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
```
值得一提的是，把父元素属性设置为`overflow: auto`或`overflow: hidden`，会使其内部的子元素形成块格式化上下文（Block Formatting Context），并且父元素会扩张自己，使其能够包围它的子元素。


## 77、请阐述 z-index 属性，并说明如何形成层叠上下文（stacking context）
CSS 中的 `z-index` 属性控制重叠元素的垂直叠加顺序。 `z-index`只能影响`position`值不是`static`的元素。

没有定义 z-index 的值时，元素按照它们出现在 DOM 中的顺序堆叠（层级越低，出现位置越靠上）。非静态定位的元素（及其子元素）将始终覆盖静态定位（static）的元素，而不管 HTML 层次结构如何。

**层叠上下文**：是包含一组图层的元素。 在一组层叠上下文中，其子元素的 z-index 值是相对于该父元素而不是 document root 设置的。每个层叠上下文完全独立于它的兄弟元素。如果元素 B 位于元素 A 之上，则即使元素 A 的子元素 C 具有比元素 B 更高的 z-index 值，元素 C 也永远不会在元素 B 之上.

每个层叠上下文是自包含的：当元素的内容发生层叠后，整个该元素将会在父层叠上下文中按顺序进行层叠。少数 CSS 属性会触发一个新的层叠上下文，例如 opacity 小于 1， filter 不是 none ， transform 不是 none 。


## 78、如何解决不同浏览器的样式兼容性问题？
- 在确定问题原因和有问题的浏览器后，使用单独的样式表，仅供出现问题的浏览器加载。这种方法需要使用服务器端渲染。
- 使用已经处理好此类问题的库，比如 Bootstrap。
- 使用 autoprefixer 自动生成 CSS 属性前缀。
- 使用 Reset CSS 或 Normalize. css。


## 79、如何为功能受限的浏览器提供页面？ 使用什么样的技术和流程？
- 优雅的降级：为现代浏览器构建应用，同时确保它在旧版浏览器中正常运行。
- Progressivepx enhancement - The practice of building an application for a base level of user experience, but adding - functional enhancements when a browser supports it.
- 渐进式增强：构建基于用户体验的应用，但在浏览器支持时添加新增功能。
- 利用 caniuse. com 检查特性支持。
- 使用 autoprefixer 自动生成 CSS 属性前缀。
- 使用 Modernizr进行特性检测。


## 80、除了 screen ，你还能说出一个 @media 属性的例子吗？
- all：适用于所有设备。
- print：为了加载合适的文档到当前使用的可视窗口. 需要提前咨询 paged media（媒体屏幕尺寸）, 以满足个别设备网页尺寸不匹配等问题。
- screen：主要适用于彩色的电脑屏幕
- speech：speech 这个合成器. 注意: CSS2 已经有一个相似的媒体类型叫 aural.

[更多参考](https://www.cnblogs.com/xiaohuochai/p/5848612.html)


## 81、对于你使用过的 CSS 预处理，说说喜欢和不喜欢的地方？
优点：
- 在CSS的语法基础上增加了变量（variable）、嵌套（nested rules）、混合（mixins)、导入（inline imports）、继承（extend）等高级功能，这些拓展令CSS更加强大与优雅。
- 让你的CSS更加简洁、适应性更强、可读性更佳，更易于代码的维护等诸多好处。
- 提高开发效率

缺点：
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


## 84、响应式设计与自适应设计有何不同？
响应式设计和自适应设计都以提高不同设备间的用户体验为目标，根据视窗大小、分辨率、使用环境和控制方式等参数进行优化调整。

**响应式设计的适应性原则**：网站应该凭借一份代码，在各种设备上都有良好的显示和使用效果。响应式网站通过使用媒体查询，自适应栅格和响应式图片，基于多种因素进行变化，创造出优良的用户体验。就像一个球通过膨胀和收缩，来适应不同大小的篮圈。

自适应设计更像是渐进式增强的现代解释。与响应式设计单一地去适配不同，自适应设计通过检测设备和其他特征，从早已定义好的一系列视窗大小和其他特性中，选出最恰当的功能和布局。与使用一个球去穿过各种的篮筐不同，自适应设计允许使用多个球，然后根据不同的篮筐大小，去选择最合适的一个。


## 85、你有没有使用过视网膜分辨率的图形？当中使用什么技术？
我倾向于使用更高分辨率的图形（显示尺寸的两倍）来处理视网膜显示。更好的方法是使用媒体查询，像`@media only screen and (min-device-pixel-ratio: 2) { ... }`，然后改变`background-image`。

对于图标类的图形，我会尽可能使用 svg 和图标字体，因为它们在任何分辨率下，都能被渲染得十分清晰。

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
- 因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对 CSS 初始化往往会出现浏览器之间的页面显示差异。
- 去掉标签的默认样式如：margin, padding，其他浏览器默认解析字体大小，字体设置。


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
原理类似图片轮播原理，超出隐藏部分，滚动时显示。<br>
css属性：`overflow:hidden; transform:translate(100%, 100%); display:none;`


## 90、什么是响应式设计？响应式设计的基本原理是什么？如何兼容低版本的 IE？
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
```css
-webkit-font-smoothing: antialiased;
```
其默认可以支持6个值：`auto | antialiased | inherit | initial | none | subpixel-antialiased`

暂时我能看到效果的就是三个：`none | subpixel-antialiased | antialiased`


## 94、font-style 属性可以让它赋值为“oblique” oblique 是什么意思？
- Italic会显示一个`斜体`的字体样式，不是我们强加给字体的属性，而是字体自身的一种状态；
- Oblique会显示一个`倾斜`的字体样式，自身没有斜体效果的字体，强制向右倾斜文字；


## 95、position:fixed; 在 android 下无效怎么处理？
这个是因为移动端浏览器默认的 viewport 是 layoutviewport，它的宽度大于移动端屏幕，所以页面会出现左右滚动条，fixed 是相对layoutviewport 来固定的，而不是屏幕，所以会感觉出现 fixed 无效;

如果想实现fixed相对于屏幕的固定效果，我们需要改变的是viewport的大小为ideal viewport，可以如下设置：
```html
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-sca
le=1.0,user-scalable=no"/>
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
1. 首先让原来的input不可见
2. 利用label for设置替代input的样式
3. 设置 input:checked + label:before的样式
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
对元素设置display：inline-block ，元素不会脱离文本流，而float就会使得元素脱离文本流，且还有父元素高度坍塌的效果。


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
包含块（containing block）就是元素用来计算和定位的一个框。
- （1）根元素（很多场景下可以看成是`<html>`）被称为“初始包含块”，其尺寸等同于浏览器可视窗口的大小。
- （2）对于其他元素，如果该元素的position是relative或者static，则“包含块”由其最近的块容器祖先盒的content box
边界形成。
- （3）如果元素position:fixed，则“包含块”是“初始包含块”。
- （4）如果元素position:absolute，则“包含块”由最近的position不为static的祖先元素建立，具体方式如下：
  如果该祖先元素是纯inline元素，则规则略复杂：
  - 假设给内联元素的前后各生成一个宽度为0的内联盒子（inline box），则这两个内联盒子的padding box外面的包
  围盒就是内联元素的“包含块”；
  - 如果该内联元素被跨行分割了，那么“包含块”是未定义的，也就是CSS2.1规范并没有明确定义，浏览器自行发挥
  否则，“包含块”由该祖先的padding box边界形成。
  - 如果没有符合条件的祖先元素，则“包含块”是“初始包含块”。

## 104、CSS 里的 visibility 属性有个 collapse 属性值是干嘛用的？在不同浏览器下以后什么区别？
- （1）对于一般的元素，它的表现跟visibility：hidden;是一样的。元素是不可见的，但此时仍占用页面空间。
- （2）但例外的是，如果这个元素是table相关的元素，例如table行，table group，table列，table column group，它的
表现却跟display:none一样，也就是说，它们占用的空间也会释放。

在不同浏览器下的区别：
- 在谷歌浏览器里，使用collapse值和使用hidden值没有什么区别。
- 在火狐浏览器、Opera和IE11里，使用collapse值的效果就如它的字面意思：table的行会消失，它的下面一行会补充它的位
置。


## 105、width:auto 和 width:100%的区别
一般而言
- `width:100%`会使元素box的宽度等于父元素的content box的宽度。
- `width:auto`会使元素撑满整个父元素，`margin`、`border`、`padding`、`content`区域会自动分配水平空间。


## 106、使用 clear 属性清除浮动的原理？
使用clear属性清除浮动，其语法如下：
```css
clear: none|left|right|both
```
如果单看字面意思，clear:left应该是“清除左浮动”，clear:right应该是“清除右浮动”的意思，实际上，这种解释是有问
题的，因为浮动一直还在，并没有清除。

官方对clear属性的解释是：“元素盒子的边不能和前面的浮动元素相邻。”，我们对元素设置clear属性是为了避免浮动元素
对该元素的影响，而不是清除掉浮动。

还需要注意的一点是clear属性指的是元素盒子的边不能和前面的浮动元素相邻，注意这里“前面的”3个字，也就是clear属
性对“后面的”浮动元素是不闻不问的。考虑到float属性要么是left，要么是right，不可能同时存在，同时由于clear
属性对“后面的”浮动元素不闻不问，因此，当clear:left有效的时候，clear:right必定无效，也就是此时clear:left
等同于设置clear:both；同样地，clear:right如果有效也是等同于设置clear:both。由此可见，clear:left和cle
ar:right这两个声明就没有任何使用的价值，至少在CSS世界中是如此，直接使用clear:both吧。

一般使用伪元素的方式清除浮动
```css
.clear::after{
  content:'';
  display:table;//也可以是'block'，或者是'list-item'
  clear:both;
}
```
clear属性只有块级元素才有效的，而::after等伪元素默认都是内联水平，这就是借助伪元素清除浮动影响时需要设置disp
lay属性值的原因。


## 107、zoom:1 的清除浮动原理?
清除浮动，触发hasLayout；zoom属性是IE浏览器的专有属性，它可以设置或检索对象的缩放比例。解决ie下比较奇葩的bug。譬如外边距（margin）的重叠，浮动清除，触发ie的haslayout属性等。

来龙去脉大概如下：
当设置了zoom的值之后，所设置的元素就会就会扩大或者缩小，高度宽度就会重新计算了，这里一旦改变zoom值时其实也会发生重新渲染，运用这个原理，也就解决了ie下子元素浮动时候父元素不随着自动扩大的问题。

zoom属性是IE浏览器的专有属性，火狐和老版本的webkit核心的浏览器都不支持这个属性。然而，zoom现在已经被逐步标准化，出现在CSS3.0规范草案中。

目前非ie由于不支持这个属性，它们又是通过什么属性来实现元素的缩放呢？可以通过css3里面的动画属性scale进行缩放。


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


## 110、对于 hasLayout 的理解？
hasLayout是IE特有的一个属性。很多的IE下的css bug都与其息息相关。在IE中，一个元素要么自己对自身的内容进行计算大小和组织，要么依赖于父元素来计算尺寸和组织内容。当一个元素的hasLayout属性值为true时，它负责对自己和可能的子孙元素进行尺寸计算和定位。虽然这意味着这个元素需要花更多的代价来维护自身和里面的内容，而不是依赖于祖先元素来完成这些工作。


## 111、视差滚动效果，如何给每页做不同的动画？（回到顶部，向下滑动要再次出现，和只出现一次分别怎么做？
视差滚动是指多层背景以不同的速度移动，形成立体的运动效果，带来非常出色的视觉体验。


## 112、layout viewport、visual viewport 和 ideal viewport 的区别？
如果把移动设备上浏览器的可视区域设为viewport的话，某些网站就会因为viewport太窄而显示错乱，所以这些浏览器就决定。
默认情况下把viewport设为一个较宽的值，比如980px，这样的话即使是那些为桌面设计的网站也能在移动浏览器上正常显示了。
ppk把这个浏览器默认的viewport叫做layout viewport。

layout viewport的宽度是大于浏览器可视区域的宽度的，所以我们还需要一个viewport来代表浏览器可视区域的大小，ppk把这个viewport叫做visual viewport。

ideal viewport是最适合移动设备的viewport，ideal viewport的宽度等于移动设备的屏幕宽度，只要在css中把某一元素的宽度设为ideal viewport的宽度（单位用px），那么这个元素的宽度就是设备屏幕的宽度了，也就是宽度为100%的效果。

ideal viewport的意义在于，无论在何种分辨率的屏幕下，那些针对ideal viewport而设计的网站，不需要用户手动缩放，也不需要出现横向滚动条，都可以完美的呈现给用户。


## 113、浏览器如何判断是否支持 webp 格式图片
- （1）宽高判断法。通过创建image对象，将其src属性设置为webp格式的图片，然后在onload事件中获取图片的宽高，如果能够获取，则说明浏览器支持webp格式图片。如果不能获取或者触发了onerror函数，那么就说明浏览器不支持webp格式的图片。
- （2）canvas判断方法。我们可以动态的创建一个canvas对象，通过canvas的toDataURL将设置为webp格式，然后判断返回值中是否含有image/webp字段，如果包含则说明支持WebP，反之则不支持。


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
- （1）max-width会覆盖width，即使width是行类样式或者设置了!important。
- （2）min-width会覆盖max-width，此规则发生在min-width和max-width冲突的时候。


## 119、内联盒模型基本概念
- （1）内容区域（content area）。内容区域指一种围绕文字看不见的盒子，其大小仅受字符本身特性控制，本质上是一个字符盒子
- （character box）；但是有些元素，如图片这样的替换元素，其内容显然不是文字，不存在字符盒子之类的，因此，对于这些元素，内容区域可以看成元素自身。
- （2）内联盒子（inline box）。“内联盒子”不会让内容成块显示，而是排成一行，这里的“内联盒子”实际指的就是元素的“外在盒子”，用来决定元素是内联还是块级。该盒子又可以细分为“内联盒子”和“匿名内联盒子”两类。
- （3）行框盒子（line box），每一行就是一个“行框盒子”（实线框标注），每个“行框盒子”又是由一个一个“内联盒子”组成的。
- （4）包含块（containing box），由一行一行的“行框盒子”组成。


## 120、什么是幽灵空白节点？
“幽灵空白节点”是内联盒模型中非常重要的一个概念，具体指的是：在HTML5文档声明中，内联元素的所有解析和渲染表现就如同每个行框盒子的前面有一个“空白节点”一样。这个“空白节点”永远透明，不占据任何宽度，看不见也无法通过脚本获取，就好像幽灵一样，但又确确实实地存在，表现如同文本节点一样，因此，我称之为“幽灵空白节点”。


## 121、什么是替换元素？
通过修改某个属性值呈现的内容就可以被替换的元素就称为“替换元素”。因此，`<img>`、`<object>`、`<video>`、`<iframe>`或者表单元素`<textarea>`和`<input>`和`<select>`都是典型的替换元素。

替换元素除了内容可替换这一特性以外，还有以下一些特性。
- （1）内容的外观不受页面上的CSS的影响。用专业的话讲就是在样式表现在CSS作用域之外。如何更改替换元素本身的外观需要类似appearance属性，或者浏览器自身暴露的一些样式接口，
- （2）有自己的尺寸。在Web中，很多替换元素在没有明确尺寸设定的情况下，其默认的尺寸（不包括边框）是300像素×150像素，如`<video>`、`<iframe>`或者`<canvas>`等，也有少部分替换元素为0像素，如`<img>`图片，而表单元素的替换元素的尺寸则和浏览器有关，没有明显的规律。
- （3）在很多CSS属性上有自己的一套表现规则。比较具有代表性的就是vertical-align属性，对于替换元素和非替换元素，vertical-align属性值的解释是不一样的。比方说vertical-align的默认值的baseline，很简单的属性值，基线之意，被定义为字符x的下边缘，而替换元素的基线却被硬生生定义成了元素的下边缘。
- （4）所有的替换元素都是内联水平元素，也就是替换元素和替换元素、替换元素和文字都是可以在一行显示的。但是，替换元素默认的display值却是不一样的，有的是inline，有的是inline-block。


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
- 没有设置left/top/right/bottom属性值的绝对定位称为“无依赖绝对定位”。
- 无依赖绝对定位其定位的位置和没有设置position:absolute时候的位置相关。


## 132、clip 裁剪是什么？
所谓“可访问性隐藏”，指的是虽然内容肉眼看不见，但是其他辅助设备却能够进行识别和访问的隐藏。
- clip剪裁被我称为“最佳可访问性隐藏”的另外一个原因就是，它具有更强的普遍适应性，任何元素、任何场景都可以无障碍使用。


## 133、什么是层叠水平？
层叠水平，英文称作stacking level，决定了同一个层叠上下文中元素在z轴上的显示顺序。
> 显而易见，所有的元素都有层叠水平，包括层叠上下文元素，也包括普通元素。然而，对普通元素的层叠水平探讨只局限在当前层叠上下文元素中。


## 134、隐藏元素的 background-image 到底加不加载？
根据测试，一个元素如果display计算值为none，在IE浏览器下（IE8～IE11，更高版本不确定）依然会发送图片请求，Firefox浏览器不会，至于Chrome和Safari浏览器则似乎更加智能一点：如果隐藏元素同时又设置了background-image，则图片依然会去加载；如果是父元素的display计算值为none，则背景图不会请求，此时浏览器或许放心地认为这个背景图暂时是不会使用的。

如果不是background-image，而是`<img>`元素，则设置display:none在所有浏览器下依旧都会请求图片资源。

还需要注意的是如果设置的样式没有对应的元素，则background-image也不会加载。hover情况下的background-image，在触发时加载。
- 元素的背景图片
  元素本身设置 display:none，会请求图片 -父级元素设置 display:none，不会请求图片 -样式没有元素使用，不会请求 -:hover 样式下，触发时请求
- img 标签图片任何情况下都会请求图片


<!-- ======================================== 评论区 ======================================== -->
<!-- <valine-comment/> -->