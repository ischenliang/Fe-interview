# Document
## Element.getBoundingClientRect()
返回一个 DOMRect 对象，其提供了元素的大小及其相对于**视口**(这里的视口就是浏览器渲染DOM树的视图边缘)的位置。

该对象使用`left、top、right、bottom、x、y、width 和 height`这几个以像素为单位的只读属性描述整个矩形的位置和大小。
> 注意: 除了`width`和`height`以外的属性是相对于视图窗口的左上角来计算的。
![202304011137388.png](http://img.itchenliang.club/img/202304011137388.png)

```html
<div style="height: 20000px;background: #ccc">
  <div class="item" style="height: 300px;background: #ddd;"></div>
</div>
<script>
  const item = document.querySelector('.item')
  console.log(window.innerHeight)
  window.addEventListener('scroll', () => {
    const rect = item.getBoundingClientRect()
    console.log("left:", rect.left, "top:", rect.top, "bottom:", rect.bottom, "right:", rect.right)
  })
</script>
```
![202304011141034.gif](http://img.itchenliang.club/img/202304011141034.gif)
