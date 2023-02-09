---
title: CSS面试题汇总
editLink: true
updated: 2023-02-09 14:47:30
lastUpdated: true
comment: true
---
<post-meta/>

# CSS面试题汇总
参考：
- https://juejin.cn/post/7098689890933538853
- https://www.yuque.com/cuggz/interview/evfmq3
- https://github.com/yisainan/web-interview/blob/master/content/CSS.md

## 1、🔥px、em、rem和vw的区别
https://blog.csdn.net/weixin_70605166/article/details/126658517
`px`全称`pixel`像素，是相对于屏幕分辨率而言的，它是一个绝对单位，但同时具有一定的相对性。因为在同一个设备上每个像素代表的物理长度是固定不变的，这点表现的是绝对性。但是在不同的设备之间每个设备像素所代表的物理长度是可以变化的，这点表现的是相对性。

`em`是一个相对长度单位，具体的大小需要相对于自身元素计算，比如自身元素的字体大小为80px，那么1em就表示大小和自身元素一样为80px，0.5em就表示字体大小是自身元素的一半为40px，如果自身元素未设置font-size，则继承父级元素的font-size属性，直到浏览器的默认字体大小。

## 2、🔥vw、vh是什么？
`vw`和`vh`是 CSS3 新单位，即 view width 可视窗口宽度 和 view height 可视窗口高度。1vw 就等于可视窗口宽度的百分之一，1vh 就等于可视窗口高度的百分之一。

## 3、🔥介绍下BFC及其应用
所谓 BFC，指的是一个独立的布局环境，BFC 内部的元素布局与外部互不影响。

触发 BFC 的方式有很多，常见的有：
- 设置浮动
- overflow 设置为 auto、scroll、hidden
- positon 设置为 absolute、fixed

常见的 BFC 应用有：
- 解决浮动元素令父元素高度坍塌的问题
- 解决非浮动元素被浮动元素覆盖问题
- 解决外边距垂直方向重合的问题

## 4、🔥介绍下 BFC、IFC、GFC 和 FFC
- BFC：块级格式上下文，指的是一个独立的布局环境，BFC 内部的元素布局与外部互不影响。
- IFC：行内格式化上下文，将一块区域以行内元素的形式来格式化。
- GFC：网格布局格式化上下文，将一块区域以 grid 网格的形式来格式化
- FFC：弹性格式化上下文，将一块区域以弹性盒的形式来格式化

## 5、🔥flex布局如何使用？
flex 是 Flexible Box 的缩写，意为"弹性布局"。指定容器`display: flex`即可。

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

sticky 属性值有以下几个特点：
- 该元素并不脱离文档流，仍然保留元素原本在文档流中的位置。
- 当元素在容器中被滚动超过指定的偏移值时，元素在容器内固定在指定位置。亦即如果你设置了top: 50px，那么在sticky元素到达距离相对定位的元素顶部50px的位置时固定，不再向上移动。
- 元素固定的相对偏移是相对于离它最近的具有滚动框的祖先元素，如果祖先元素都不可以滚动，那么是相对于viewport来计算元素的偏移量

## 11、⭐说出 space-between 和 space-around 的区别？
这个是`flex`布局的内容，其实就是一个边距的区别，按水平布局来说，`space-between`是两端对齐，在左右两侧没有边距，而`space-around`是每个子项目左右方向的`margin`相等，所以两个item中间的间距会比较大。


## 12、⭐CSS3 中transition和animation的区别，属性分别有哪些
**区别**：
- transition是过渡属性：强调过渡，它的实现需要触发一个事件(比如鼠标移入移出、焦点、点击等)才执行动画，它类似于flash的补间动画，设置一个开始关键帧，一个结束帧；
- animation是动画属性：它的实现不需要触发事件，设定好时间之后可以自己执行，且可以循环一个动画；

transition 过渡动画：
- transition-property：指定过渡的 CSS 属性
- transition-duration：指定过渡所需的完成时间
- transition-timing-function：指定过渡函数
- transition-delay：指定过渡的延迟时间

animation 关键帧动画：
- animation-name：指定要绑定到选择器的关键帧的名称
- animation-duration：动画指定需要多少秒或毫秒完成
- animation-timing-function：设置动画将如何完成一个周期
- animation-delay：设置动画在启动前的延迟间隔
- animation-iteration-count：定义动画的播放次数
- animation-direction：指定是否应该轮流反向播放动画
- animation-fill-mode：规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式
- animation-play-state：指定动画是否正在运行或已暂停

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
- `clear`清除浮动（添加空div法）在浮动元素下方添加空div，并给该元素写css样式： `{clear:both;height:0;overflow:hidden;}`
- 给浮动元素父级设置高度
- 父级同时浮动（需要给父级同级元素添加浮动）
- 父级设置成`inline-block`，其`margin: 0 auto`居中方式失效
- 给父级添加`overflow:hidden`清除浮动方法
- 万能清除法`after`伪类清浮动（现在主流方法，推荐使用）


## 17、🔥说说两种盒模型以及区别
盒模型也称为框模型，就是从盒子顶部俯视所得的一张平面图，用于描述元素所占用的空间。它有两种盒模型，W3C盒模型和IE盒模型（IE6以下，不包括IE6以及怪异模式下的IE5.5+）。

![202302091538234.png](https://imgs.itchenliang.club/img/202302091538234.png)
![2023020915383510.png](https://imgs.itchenliang.club/img/2023020915383510.png)

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
![202302081749272.png](https://imgs.itchenliang.club/img/202302081749272.png)

对于选择器的优先级：
- 标签选择器、伪元素选择器：1
- 类选择器、伪类选择器、属性选择器：10
- id选择器：100
- 内联样式：1000

**注意事项**：
- `!important`声明的样式的优先级最高
- 如果优先级相同，则最后出现的样式生效
- 继承得到的样式的优先级最低
- 通用选择器(`*`)、子选择器(`<`)和相邻同胞选择器(`+`)并不在这四个等级中，他们的权值都是0
- 样式表的来源不同时，优先级顺序为：内联样式 > 内部样式 > 外部样式 > 浏览器用户自定义样式 > 浏览器默认样式

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
![202302091453214.png](https://imgs.itchenliang.club/img/202302091453214.png)

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

## 29、伪元素和伪类的区别和作用？
### 伪元素
即假元素，需要通过添加元素才能达到效果，在内容元素的前后插入额外的元素或样式，但是这些元素实际上并不在文档中生成，他们只在外部显示课件，但不会在文档的源代码中找到它们，因此称为“伪元素”，例如：
```css
p::before { content: '第一章' }
p::after { content: '第一章' }
p::first-line { background: red; }
p::first-letter { font-size: 20px; }
p::selection { color: #ccc; }
```

### 伪类
即假的类，需要添加类来达到效果，将特殊的效果添加到特定选择器上，它是已有元素上添加类别的，不会产生新的元素，例如：
```css
a:hover { color: red }
p:first-child { color: blue; }
```
**总结**：伪类是通过在元素选择器上加入伪类改变元素状态，而伪元素通过对元素的操作进行对元素的改变。

## 30、对requestAnimation的理解


## 31、为什么有时候用translate来改变位置而不是定位？
`translate`是`transform`属性的一个值，改变`transform`或`opacity`不会触发浏览器重排(reflow)或重绘(repaint)，只会触发复合(compositions)，而改变绝对定位会触发重排，进而触发重绘和复合。

`transform`使浏览器为元素创建一个GPU图层，但改变绝对定位会使用到CPU，因此`translate`更高效，可以缩短平滑动画的绘制时间，而translate改变位置时，元素依然会占据原始空间，绝对定位就不会发生这种情况。

## 32、❓li与li之间有看不见的空白间隔是什么原因引起？如何解决？
浏览器会把inline内联元素间的空白字符(空格、换行、tab等)渲染成一个空格，为了美观，通常是一个`<li>`放在一行，如下面所示：
```html
<li>
  哈哈
</li>
```
这样就导致产生了换行字符，它变成了一个空格，占用了一个字符的宽度。

**解决方法**：
- 为所有`<li>`设置`float: left`。不足：有些容器是不能设置浮动的，如左右切换的焦点图等
- 将所有`<li>写在同一行`。不足：代码不美观
- 将`<ul>`内的字符尺寸设为0，即`font-size: 0`。不足：`<ul>`中的其他字符尺寸也被设为0，需要额外重新设定其他字符尺寸，且在Safari浏览器依然会出现空白间隔
- 消除`<ul>`的字符间隔`letter-spacing: -8px`。不足：这也设置了`<li>`内的字符间隔，一次需要将`<li>`内的字符间隔设置为默认`letter-spacing: normal`

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
  是无损的、采用索引色的点阵图。采用LZW压缩算法进行编码。文件小，是GIF格式的优点，同时，GIF格式还具有支持动画以及透明的优点。但是GIF格式仅支持8bit的索引色，所以GIF格式适用于对色彩要求不高同时需要文件体积较小的场景。
3. JPEG
  是有损的、采用直接色的点阵图。JPEG的图片的优点是采用了直接色，得益于更丰富的色彩，JPEG非常适合用来存储照片，与GIF相比，JPEG不适合用来存储企业Logo、线框类的图。因为有损压缩会导致图片模糊，而直接色的选用，又会导致图片文件较GIF更大。
4. PNG-8
  是无损的、使用索引色的点阵图。PNG是一种比较新的图片格式，PNG-8是非常好的GIF格式替代者，在可能的情况下，应该尽可能的使用PNG-8而不是GIF，因为在相同的图片效果下，PNG-8具有更小的文件体积。除此之外，PNG-8还支持透明度的调节，而GIF并不支持。除非需要动画的支持，否则没有理由使用GIF而不是PNG-8。
5. PNG-24
  是无损的、使用直接色的点阵图。PNG-24的优点在于它压缩了图片的数据，使得同样效果的图片，PNG-24格式的文件大小要比BMP小得多。当然，PNG24的图片还是要比JPEG、GIF、PNG-8大得多。
6. SVG
  是无损的矢量图。SVG是矢量图意味着SVG图片由直线和曲线以及绘制它们的方法组成。当放大SVG图片时，看到的还是线和曲线，而不会出现像素点。SVG图片在放大时，不会失真，所以它适合用来绘制Logo、Icon等。
7. Webp
  是谷歌开发的一种新图片格式，WebP是同时支持有损和无损压缩的、使用直接色的点阵图。从名字就可以看出来它是为Web而生的，什么叫为Web而生呢？就是说相同质量的图片，WebP具有更小的文件体积。现在网站上充满了大量的图片，如果能够降低每一个图片的文件大小，那么将大大减少浏览器和服务器之间的数据传输量，进而降低访问延迟，提升访问体验。

  目前只有Chrome浏览器和Opera浏览器支持WebP格式，兼容性不太好。
  - 在无损压缩的情况下，相同质量的WebP图片，文件大小要比PNG小26%；
  - 在有损压缩的情况下，具有相同图片精度的WebP图片，文件大小要比JPEG小25%~34%；
  - WebP图片格式支持图片透明度，一个无损压缩的WebP图片，如果要支持透明度只需要22%的格外文件大小。

## 34、对 CSSSprites 的理解
CSSSprites（精灵图），将一个页面涉及到的所有图片都包含到一张大图中去，然后利用CSS的 background-image，background-repeat，background-position属性的组合进行背景定位。

优点：
- 利用 css sprites 能很好地减少网页的http请求，从而大大提高了页面的性能
- css sprites 能减少图片的字节，把3张图片合并成1张图片的字节总是小于这3张图片的字节总和

缺点：
- 在图片合并时，要把多张图片有序的、合理的合并成一张图片，还要留好足够的空间，防止板块内出现不必要的背景。在宽屏及高分辨率下的自适应页面，如果背景不够宽，很容易出现背景断裂；
- 在开发的时候相对来说有点麻烦，需要借助 photoshop或其他工具来对每个背景单元测量其准确的位置；
- 在维护的时候比较麻烦，页面背景有少许改动时，就要改这张合并的图片，无需改的地方尽量不要动，这样避免改动更多的 css，如果在原来的地方放不下，又只能（最好）往下加图片，这样图片的字节就增加了，还要改动css；

## 35、什么是物理像素，逻辑像素和像素密度，为什么在移动端开发时需要用到@3x, @2x这种图片？
以 iPhone XS 为例，当写 CSS 代码时，针对于单位 px，其宽度为 414px & 896px，也就是说当赋予一个 DIV元素宽度为 414px，这个 DIV 就会填满手机的宽度；

而如果有一把尺子来实际测量这部手机的物理像素，实际为 1242*2688 物理像素；经过计算可知，1242/414=3，也就是说，在单边上，一个逻辑像素=3个物理像素，就说这个屏幕的像素密度为 3，也就是常说的 3 倍屏。

对于图片来说，为了保证其不失真，1 个图片像素至少要对应一个物理像素，假如原始图片是 500300 像素，那么在 3 倍屏上就要放一个 1500900 像素的图片才能保证 1 个物理像素至少对应一个图片像素，才能不失真。
![202302091615558.png](https://imgs.itchenliang.club/img/202302091615558.png)

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
![202302091635511.png](https://imgs.itchenliang.club/img/202302091635511.png)

## 39、使用 CSS3 设计一个立起的圆形，并围绕自身中轴线做 360° 持续旋转

## 40、要求实现以下效果：字体颜色在 IE6 下为黑色（#000000）；IE7下为红色（#ff0000）; 而其他浏览器下为绿色（#00ff00）

## 41、position 属性有哪些值，分别代表什么意思？ 使用与什么场景？
- static: 正常文档流定位，此时 top, right, bottom, left 和 z-index 属性无效，块级元素从上往下纵向排布，行级元素从左向右排列。
- relative：相对定位，此时的『相对』是相对于正常文档流的位置。
- absolute：相对于最近的非 static 定位祖先元素的偏移，来确定元素位置，比如一个绝对定位元素它的父级、和祖父级元素都为relative，它会相对他的父级而产生偏移。
- fixed：指定元素相对于屏幕视口（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变，比如那种回到顶部的按钮一般都是用此定位方式。
- sticky：粘性定位，特性近似于relative和fixed的合体，其在实际应用中的近似效果就是IOS通讯录滚动的时候的『顶屁股』。

## 42、style 标签写在 body 后和 body 前有什么区别？

## 43、::bofore 和 :after 中双冒号和单冒号有什么区别？

## 44、有哪些手段可以优化 CSS, 提高性能

## 45、说下 CSS3 中一些样式的兼容，分别指兼容哪些浏览器

## 46、怎么样实现边框 0.5 个像素？

## 47、如何理解z-index？
CSS 中的z-index属性控制重叠元素的垂直叠加顺序，默认元素的z-index为0，我们可以修改z-index来控制元素的图层位置，而且z-index只能影响设置了position值的元素。

CSS 中的z-index属性控制重叠元素的垂直叠加顺序，默认元素的z-index为0，我们可以修改z-index来控制元素的图层位置，而且z-index只能影响设置了position值的元素。


## 48、如何理解层叠上下文？
层叠上下文是HTML元素的三维概念，这些HTML元素在一条假想的相对于面向（电脑屏幕的）视窗或者网页的用户的z轴上延伸，HTML元素依据其自身属性按照优先级顺序占用层叠上下文的空间。

**产生条件**
- 根元素 (HTML),
- z-index 值不为 "auto"的 绝对/相对定位，
- 一个 z-index 值不为 "auto"的 flex 项目 (flex item)，即：父元素 display: flex|inline-flex，
- opacity 属性值小于 1 的元素（参考 the specification for opacity），
- transform 属性值不为 "none"的元素，
- mix-blend-mode 属性值不为 "normal"的元素，
- filter值不为“none”的元素，
- perspective值不为“none”的元素，
- isolation 属性被设置为 "isolate"的元素，
- position: fixed
- 在 will-change 中指定了任意 CSS 属性，即便你没有直接指定这些属性的值（参考 这篇文章）
- -webkit-overflow-scrolling 属性被设置 "touch"的元素

## 49、你对媒体查询的理解？
媒体查询由一个可选的媒体类型和零个或多个使用媒体功能的限制了样式表范围的表达式组成，例如宽度、高度和颜色。媒体查询，添加自CSS3，允许内容的呈现针对一个特定范围的输出设备而进行裁剪，而不必改变内容本身,非常适合web网页应对不同型号的设备而做出对应的响应适配。

**如何使用？**
媒体查询包含一个可选的媒体类型和，满足CSS3规范的条件下，包含零个或多个表达式，这些表达式描述了媒体特征，最终会被解析为true或false。如果媒体查询中指定的媒体类型匹配展示文档所使用的设备类型，并且所有的表达式的值都是true，那么该媒体查询的结果为true.那么媒体查询内的样式将会生效。
```html
<!-- link元素中的CSS媒体查询 -->
<link rel="stylesheet" media="(max-width: 800px)" href="example.css" />

<!-- 样式表中的CSS媒体查询 -->
<style>
@media (max-width: 600px) {
  .facet_sidebar {
    display: none;
  }
}
</style>
```
[扩展阅读](https://www.cnblogs.com/xiaohuochai/p/5848612.html)










<!-- ======================================== 评论区 ======================================== -->
<valine-comment/>