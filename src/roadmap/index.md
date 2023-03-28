# 学习路线
- https://emojipedia.org/
- https://getemoji.com/


所谓依赖就是`Wather`，视图中谁用到了这个响应式数据就更新谁，换句话说: 
> 我们把“谁用到了这个响应式数据”称为“谁依赖了这个响应式数据”，我们给每个数据都建一个依赖数组(因为一个数据可能被多处使用)，谁依赖了这个数据(即谁用到了这个数据)我们就把谁放入这个依赖数组中，那么当这个数据发生变化的时候，我们就去它对应的依赖数组中，把每个依赖都通知一遍，告诉他们："你们依赖的数据变啦，你们该更新啦！"。这个过程就是**依赖收集**。
::: tip 1、何时收集依赖？何时通知依赖更新？
在可观测的数据获取时会触发`getter`属性，那么我们就可以在`getter`收集这个依赖，同样，当这个数据发生变化时会触发`setter`属性，那么我们就可以在`setter`中通知依赖更新视图等操作。

**在getter中收集依赖，在setter中通知依赖更新。先收集依赖，即把用到该数据的地方收集起来，然后等属性发生变化时，把之前收集好的依赖循环触发一遍就行了。**
:::

::: tip 2、把依赖收集到哪里？
在前面我们说到会给每个数据都建一个依赖数组，谁依赖了这个数据我们就把谁放入这个依赖数组中。单单用一个数组来存放依赖的话，功能好像有点欠缺并且代码过于耦合。我们应该将依赖数组的功能扩展一下，更好的做法是我们应该为每一个数据都建立一个依赖管理器，把这个数据所有的依赖都管理起来。即下面代码中的**依赖管理器Dep类**
```js
export default class Dep {
  constructor () {
    // 依赖数组
    this.subs = []
  }
  // 添加一个依赖
  addSub (sub) {
    this.subs.push(sub)
  }
  // 删除一个依赖
  removeSub (sub) {
    const subs = this.subs
    if (subs.length) {
      const index = subs.findIndex(el => el === sub)
      if (index > -1) {
        subs.splice(index, 1)
      }
    }
  }
  // 通知所有依赖更新
  notify () {
    const subs = this.subs
    for (let i = 0; i < subs.length; i++) {
      subs[i].update()
    }
  }
}
```
:::

:tada: :tada: 庆祝
:memo: :memo: 笔记
:sparkles: :sparkles: 灿烂
:fire: :fire: 火焰
:rocket: :rocket: 火箭
:muscle: :muscle: 强壮
:ok_hand: :ok_hand: 好的
:clap: :clap: 鼓掌
:thumbsup: :thumbsup: 点赞
:warning: :warning: 警告
:x: :x: 叉号
:heavy_check_mark: :heavy_check_mark: 对勾

:heart: :heart: 红心
:star: :star: 星星
:rainbow: :rainbow: 彩虹
:sunny: :sunny: 太阳
:cloud: :cloud: 云
:snowflake: :snowflake: 雪花
:umbrella: :umbrella: 雨伞
:smile: :smile: 微笑
:laughing: :laughing: 大笑
:grinning: :grinning: 咧嘴笑
:wink: :wink: 眨眼

:sweat_smile: :sweat_smile: 尴尬笑
:thinking: :thinking: 思考
:yum: :yum: 好吃
:moneybag: :moneybag: 钱袋
:gift: :gift: 礼物
:broken_heart: :broken_heart: 破碎的心
:zzz: :zzz: 打呼噜
:ghost: :ghost: 幽灵
:bomb: :bomb: 炸弹
:skull: :skull: 骷髅头

:heart_eyes: :heart_eyes: 心形眼睛
:sunglasses: :sunglasses: 墨镜
:cry: :cry: 哭泣
:scream: :scream: 尖叫
:facepunch: :facepunch: 拳头
:musical_note: :musical_note: 音符
:pizza: :pizza: 比萨饼
:beer: :beer: 啤酒
:cake: :cake: 蛋糕
:fireworks: :fireworks: 烟花

:kiss: :kiss: 热吻
:v: :v: 胜利手势
:sweat_drops: :sweat_drops: 汗滴
:boom: :boom: 爆炸
:star2: :star2: 闪亮星星
:rose: :rose: 玫瑰花
:coffee: :coffee: 咖啡
:tropical_drink: :tropical_drink: 热带饮料
:doughnut: :doughnut: 甜甜圈
:dog: :dog: 狗

:cat: :cat: 猫
:sunny: :sunny: 太阳
:moon: :moon: 月亮
:partly_sunny: :partly_sunny: 部分晴天
:cloud: :cloud: 云
:snowman: :snowman: 雪人
:umbrella: :umbrella: 雨伞
:zap: :zap: 闪电
:earth_africa: :earth_africa: 地球
:anchor: :anchor: 锚

:fire: :fire: 火焰
:heart: :heart: 红心
:star: :star: 星星
:sweat_smile: :sweat_smile: 汗笑
:face_with_raised_eyebrow: :face_with_raised_eyebrow: 抬眉
:winking_face: :winking_face: 眨眼
:thinking_face: :thinking_face: 思考
:face_with_head_bandage: :face_with_head_bandage: 头部绷带
:skull_and_crossbones: :skull_and_crossbones: 骷髅头和骨头
:crystal_ball: :crystal_ball: 水晶球

:joy: :joy: 大笑
:heart_eyes_cat: :heart_eyes_cat: 爱心猫咪
:dancing_banana: :dancing_banana: 跳舞香蕉人
:fireworks: :fireworks: 烟花
:crying_cat_face: :crying_cat_face: 哭泣的猫脸
:party_parrot: :party_parrot: 聚会鹦鹉
:panda_face: :panda_face: 熊猫脸
:unicorn: :unicorn: 独角兽
:pizza-parrot: :pizza-parrot: 披萨鹦鹉



## 学习路线思维导图
导入processon等上的思维导图

## 学习路线
文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源文档学习资源

## 学习路线
视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源视频学习资源