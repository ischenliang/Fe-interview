const jsSidebar = [
  {
    text: "导读",
    link: 'guide',
  },
  {
    text: 'Web API接口',
    items: [
      { text: 'Observer', link: 'observer' }
    ]
  },
  {
    text: 'JavaScript基础',
    items: [
      { text: '解构赋值', link: 'destructuring' },
      { text: '解构赋值', link: 'destructuring' }
    ]
  },
  {
    text: "JavaScript对象",
    items: [
      { text: "Object", link: 'object' },
      { text: "Array", link: 'array' },
      { text: "Boolean", link: 'boolean' },
      { text: "String", link: 'string' },
      { text: "Number", link: 'number' },
      { text: "Date", link: 'date' },
      { text: "Math", link: 'math' },
      { text: "RegExp", link: 'regexp' },
      { text: "Error", link: 'error' },
      { text: "JSON", link: 'json' },
      { text: "Function", link: 'function' },
      { text: "Set&WeakSet", link: 'set' },
      { text: "Map&WeakMap", link: 'map' },
      { text: "Symbol", link: 'symbol' },
      { text: "Proxy", link: 'proxy' },
      { text: "Reflect", link: 'reflect' },
      { text: "Promise", link: 'promise' },
      { text: "Iterator", link: 'iterator' },
      { text: "Generator", link: 'generator' },
      { text: "async-await", link: 'async' },
      { text: "Class", link: 'class' },
      { text: "ArrayBuffer", link: 'arraybuffer' }
    ]
  },
  {
    text: 'BOM对象',
    items: [
      { text: 'Window', link: 'bom-window' },
      { text: 'Navigator', link: 'bom-navigator' },
      { text: 'Screen', link: 'bom-screen' },
      { text: 'History', link: 'bom-history' },
      { text: 'Location', link: 'bom-location' },
      { text: '存储对象', link: 'bom-storage' },
    ]
  },
  {
    text: 'DOM对象',
    items: [
      { text: 'Document', link: 'dom-document' },
      { text: '元素对象', link: 'dom-element' },
      { text: '属性对象', link: 'dom-attribute' },
      { text: '事件对象', link: 'dom-event' }
    ]
  },
  {
    text: 'JavaScript模块',
    link: 'module'
  }
]

const vueSiderBar = [
  {
    text: "导读",
    link: 'guide',
  },
  {
    text: 'Vue2基础篇',
    items: [
      { text: '日常技巧', link: 'destructuring' },
      { text: '问题记录', link: 'destructuring' }
    ]
  },
  {
    text: 'Vue2框架原理篇',
    items: [
      { text: '前言', link: 'reactive-guide' },
      { text: 'Object变化侦测', link: 'reactive-object' },
      { text: 'Array变化侦测', link: 'reactive-array' },
      { text: '虚拟DOM', link: 'virtual-dom' },
      { text: '模板编译', link: 'template-compile' }
    ]
  },
]

function recursion (arr, prefix) {
  for (let i = 0; i < arr.length; i++) {
    const tmp = arr[i]
    if (tmp.items && tmp.items.length) {
      tmp.items = recursion(tmp.items, prefix)
    } else {
      tmp.link = prefix + tmp.link
    }
  }
  return arr
}

export default {
  jsSidebar: recursion(jsSidebar, '/note/javascript/'),
  vueSiderBar: recursion(vueSiderBar, '/note/vue/')
}